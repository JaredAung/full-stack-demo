import { CatalogHeader } from "@/components/catalog-header";
import { MovieCard } from "@/components/movie-card";

type ItemsResponse = {
  items: {
    _id: string;
    title: string;
    year: number;
    genres: string[];
    overview: string;
  }[];
};

export async function Library() {
  // TODO: READ (fetch movies)
  const response = await fetch("http://127.0.0.1:8000/items?limit=25", {
    cache: "no-store",
  });
  const data: ItemsResponse = await response.json();
  const movies = data.items;

  return (
    <div className="min-h-full bg-[#f7f6f3] text-[#1c1b19]">
      <div className="mx-auto max-w-2xl px-5 py-10 md:px-8 md:py-14">
        <CatalogHeader count={movies.length} />

        <ul className="mt-10 divide-y divide-[#e6e3dc] border-y border-[#e6e3dc]">
          {movies.map((movie) => (
            <li key={movie._id} className="py-8">
              <MovieCard movie={movie} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
