type Movie = {
  title: string;
  year: number;
  genres: string[];
  overview: string;
};

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <article>
      <p className="text-xs tracking-[0.18em] text-[#8a8680] uppercase">
        {movie.year}
      </p>
      <h2 className="mt-2 text-2xl font-medium tracking-tight">{movie.title}</h2>
      <p className="mt-3 text-sm text-[#6d6963]">{movie.genres.join(" · ")}</p>
      <p className="mt-4 text-sm leading-7">{movie.overview}</p>
    </article>
  );
}
