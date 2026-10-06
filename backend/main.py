import os
from datetime import datetime

from bson import ObjectId
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient

from models import Movie, MovieWithId

load_dotenv()

PROJECTION = {
    "embedding": 0,
    "recentEmbedding": 0,
    "genreVector": 0,
    "themeVector": 0,
    "toneVector": 0,
    "itemTowerVector": 0,
}

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def env(name: str) -> str:
    return os.environ[name].strip().strip('"')


client = MongoClient(env("MongoDB_URI"))
database = client[env("MONGO_DATABASE_NAME")]
collection = database[env("MONGO_COLLECTION_NAME")]

# Turn MongoDB documents into JSON-serializable objects
def serialize(value):
    if isinstance(value, ObjectId):
        return str(value)
    if isinstance(value, datetime):
        return value.isoformat()
    if isinstance(value, list):
        return [serialize(item) for item in value]
    if isinstance(value, dict):
        return {key: serialize(item) for key, item in value.items()}
    return value


@app.get("/health")
def health():
    return {"status": "ok"}

# TODO: READ API (fetch movies)
@app.get("/items")
def read_items(
    limit: int = Query(20, ge=1, le=100),
    skip: int = Query(0, ge=0),
):
    cursor = collection.find({}, PROJECTION).skip(skip).limit(limit)
    items = [serialize(doc) for doc in cursor]
    return {
        "database": collection.database.name,
        "collection": collection.name,
        "skip": skip,
        "limit": limit,
        "count": len(items),
        "items": items,
    }

# TODO: CREATE API (add movie)
@app.post("/add", status_code=201)
def add_item(movie: Movie):
    document = movie.model_dump(mode="json")
    collection.insert_one(document)
    return serialize(document)

# TODO: READ API (search movies)
@app.get("/search")
def search_items(query: str = Query(min_length=1)):
    cursor = collection.find(
        {"title": query},
        PROJECTION,
    ).limit(5)
    items = [serialize(doc) for doc in cursor]
    return {
        "count": len(items),
        "items": items,
    }

# TODO: UPDATE API (edit movie)
@app.post("/edit")
def edit_item(movie: MovieWithId):
    document = movie.model_dump(mode="json", exclude={"id"})
    result = collection.update_one({"_id": ObjectId(movie.id)}, {"$set": document})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Movie not found")

    return {"_id": movie.id, **document}

# TODO: DELETE API (delete movie)
@app.delete("/delete")
def delete_item(movie: MovieWithId):
    result = collection.delete_one({"_id": ObjectId(movie.id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Movie not found")

    return {"_id": movie.id}