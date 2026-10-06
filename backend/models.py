from enum import Enum

from bson import ObjectId
from pydantic import BaseModel, field_validator


class Genre(str, Enum):
    ACTION = "Action"
    ADVENTURE = "Adventure"
    ANIMATION = "Animation"
    CHILDREN = "Children"
    COMEDY = "Comedy"
    CRIME = "Crime"
    DOCUMENTARY = "Documentary"
    DRAMA = "Drama"
    FANTASY = "Fantasy"
    FILM_NOIR = "Film-Noir"
    HORROR = "Horror"
    IMAX = "IMAX"
    MUSICAL = "Musical"
    MYSTERY = "Mystery"
    ROMANCE = "Romance"
    SCI_FI = "Sci-Fi"
    THRILLER = "Thriller"
    WAR = "War"
    WESTERN = "Western"


class Movie(BaseModel):
    title: str
    year: int
    genres: list[Genre]
    overview: str


class MovieWithId(Movie):
    id: str

    @field_validator("id")
    @classmethod
    def valid_object_id(cls, value: str) -> str:
        if not ObjectId.is_valid(value):
            raise ValueError("Invalid movie id")
        return value
