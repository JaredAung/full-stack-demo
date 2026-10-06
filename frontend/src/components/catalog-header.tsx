"use client";

import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";
import { MovieCard } from "@/components/movie-card";

const buttonClass = "border border-[#d9d6d0] px-3 py-1.5 text-sm";

function FormHeading({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="mb-6">
      <p className="text-xs tracking-[0.22em] text-[#8a8680] uppercase">
        {title}
      </p>
      <p className="mt-2 text-sm leading-6 text-[#6d6963]">{detail}</p>
    </div>
  );
}

const GENRES = [
  "Action",
  "Adventure",
  "Animation",
  "Children",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Fantasy",
  "Film-Noir",
  "Horror",
  "IMAX",
  "Musical",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "War",
  "Western",
] as const;

export function CatalogHeader({ count }: { count: number }) {
  const [formKey, setFormKey] = useState(0);
  const [open, setOpen] = useState<"add" | "search" | "edit" | "delete" | null>(
    null,
  );

  function openForm(name: "add" | "search" | "edit" | "delete") {
    setFormKey((current) => current + 1);
    setOpen(name);
  }

  return (
    <>
      <header className="flex items-start justify-between gap-6">
        <div>
          <p className="text-xs tracking-[0.22em] text-[#8a8680] uppercase">
            Catalog
          </p>
          <h1 className="mt-2 text-4xl font-medium tracking-tight">Library</h1>
          <p className="mt-3 text-sm leading-6 text-[#6d6963]">{count} films</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            className={buttonClass}
            onClick={() => openForm("search")}
          >
            Search
          </button>
          <button
            type="button"
            className={buttonClass}
            onClick={() => openForm("add")}
          >
            Add
          </button>
          <button
            type="button"
            className={buttonClass}
            onClick={() => openForm("edit")}
          >
            Edit
          </button>
          <button
            type="button"
            className={buttonClass}
            onClick={() => openForm("delete")}
          >
            Delete
          </button>
        </div>
      </header>
      {open === "search" ? <SearchForm key={formKey} /> : null}
      {open === "add" ? <AddForm key={formKey} /> : null}
      {open === "edit" ? <EditForm key={formKey} /> : null}
      {open === "delete" ? <DeleteForm key={formKey} /> : null}
    </>
  );
}

type SearchMovie = {
  _id: string;
  title: string;
  year: number;
  genres: string[];
  overview: string;
};

function SearchForm() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SearchMovie[] | null>(null);

  async function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = String(
      new FormData(event.currentTarget).get("title") ?? "",
    ).trim();

    setPending(true);
    setError(null);

    // TODO: READ (search movies)
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/search?query=${encodeURIComponent(title)}`,
      );

      if (!response.ok) {
        setResults(null);
        setError("Could not search.");
        return;
      }

      const data: { items: SearchMovie[] } = await response.json();
      setResults(data.items);
    } catch {
      setResults(null);
      setError("Could not search.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mt-10">
      <form
        className="border border-[#e6e3dc] bg-white p-6"
        onSubmit={onSubmit}
      >
        <FormHeading title="Search" detail="Find a film by its exact title." />
        <label className="block text-sm">
          Title
          <input
            name="title"
            required
            className="mt-2 w-full border-b border-[#d9d6d0] bg-transparent py-2 outline-none focus:border-[#1c1b19]"
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className={`mt-8 ${buttonClass}`}
        >
          {pending ? "Searching…" : "Submit"}
        </button>
        {error ? <p className="mt-4 text-sm text-[#6d6963]">{error}</p> : null}
      </form>
      {results ? (
        results.length === 0 ? (
          <p className="mt-6 text-sm text-[#6d6963]">No film matches that title.</p>
        ) : (
          <ul className="mt-6 divide-y divide-[#e6e3dc] border-y border-[#e6e3dc]">
            {results.map((movie) => (
              <li key={movie._id} className="py-8">
                <MovieCard movie={movie} />
              </li>
            ))}
          </ul>
        )
      ) : null}
    </div>
  );
}

function DeleteForm() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [movies, setMovies] = useState<SearchMovie[] | null>(null);

  async function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = String(
      new FormData(event.currentTarget).get("title") ?? "",
    ).trim();

    setPending(true);
    setError(null);
    setMovies(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/search?query=${encodeURIComponent(title)}`,
      );

      if (!response.ok) {
        setError("Could not search.");
        return;
      }

      const data: { items: SearchMovie[] } = await response.json();
      setMovies(data.items);
    } catch {
      setError("Could not search.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mt-10">
      <form
        className="border border-[#e6e3dc] bg-white p-6"
        onSubmit={onSubmit}
      >
        <FormHeading
          title="Delete"
          detail="Find a film by its exact title, then delete it."
        />
        <label className="block text-sm">
          Title
          <input
            name="title"
            required
            className="mt-2 w-full border-b border-[#d9d6d0] bg-transparent py-2 outline-none focus:border-[#1c1b19]"
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className={`mt-8 ${buttonClass}`}
        >
          {pending ? "Searching…" : "Submit"}
        </button>
        {error ? <p className="mt-4 text-sm text-[#6d6963]">{error}</p> : null}
      </form>
      {movies?.length === 0 ? (
        <p className="mt-6 text-sm text-[#6d6963]">No film matches that title.</p>
      ) : null}
      {movies?.map((movie) => (
        <DeleteMovie key={movie._id} movie={movie} />
      ))}
    </div>
  );
}

function DeleteMovie({ movie }: { movie: SearchMovie }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);
    setSuccess(false);

    // TODO: DELETE (delete movie)
    try {
      const response = await fetch("http://127.0.0.1:8000/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: movie._id,
          title: movie.title,
          year: movie.year,
          genres: movie.genres,
          overview: movie.overview,
        }),
      });

      if (!response.ok) {
        setError("Could not delete the movie.");
        return;
      }

      setSuccess(true);
      router.refresh();
    } catch {
      setError("Could not delete the movie.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mt-6">
      <div className="border-y border-[#e6e3dc] py-8">
        <MovieCard movie={movie} />
      </div>
      <form className="mt-6" onSubmit={onSubmit}>
        <button
          type="submit"
          disabled={pending || success}
          className={buttonClass}
        >
          {pending ? "Deleting…" : "Delete"}
        </button>
        {error ? <p className="mt-4 text-sm text-[#6d6963]">{error}</p> : null}
        {success ? (
          <p className="mt-4 text-sm text-[#6d6963]">Deleted successfully</p>
        ) : null}
      </form>
    </div>
  );
}

function EditForm() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [movies, setMovies] = useState<SearchMovie[] | null>(null);

  async function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = String(
      new FormData(event.currentTarget).get("title") ?? "",
    ).trim();

    setPending(true);
    setError(null);
    setMovies(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/search?query=${encodeURIComponent(title)}`,
      );

      if (!response.ok) {
        setError("Could not search.");
        return;
      }

      const data: { items: SearchMovie[] } = await response.json();
      setMovies(data.items);
    } catch {
      setError("Could not search.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mt-10">
      <form
        className="border border-[#e6e3dc] bg-white p-6"
        onSubmit={onSubmit}
      >
        <FormHeading
          title="Edit"
          detail="Find a film by its exact title, then update it."
        />
        <label className="block text-sm">
          Movie name
          <input
            name="title"
            required
            className="mt-2 w-full border-b border-[#d9d6d0] bg-transparent py-2 outline-none focus:border-[#1c1b19]"
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className={`mt-8 ${buttonClass}`}
        >
          {pending ? "Searching…" : "Submit"}
        </button>
        {error ? <p className="mt-4 text-sm text-[#6d6963]">{error}</p> : null}
      </form>
      {movies?.length === 0 ? (
        <p className="mt-6 text-sm text-[#6d6963]">No film matches that title.</p>
      ) : null}
      {movies?.map((movie) => (
        <EditMovieForm key={movie._id} movie={movie} />
      ))}
    </div>
  );
}

function EditMovieForm({ movie }: { movie: SearchMovie }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const genres = data.getAll("genres").map(String);

    if (genres.length === 0) {
      setSuccess(false);
      setError("Select at least one genre.");
      return;
    }

    setPending(true);
    setError(null);
    setSuccess(false);

    // TODO: UPDATE (edit movie)
    try {
      const response = await fetch("http://127.0.0.1:8000/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: movie._id,
          title: String(data.get("title") ?? ""),
          year: Number(data.get("year")),
          genres,
          overview: String(data.get("overview") ?? ""),
        }),
      });

      if (!response.ok) {
        setError("Could not edit the movie.");
        return;
      }

      setSuccess(true);
      router.refresh();
    } catch {
      setError("Could not edit the movie.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      className="mt-6 border border-[#e6e3dc] bg-white p-6"
      onSubmit={onSubmit}
    >
      <FormHeading title="Edit" detail="Update this film." />
      <div className="grid gap-6">
        <label className="block text-sm">
          Title
          <input
            name="title"
            required
            defaultValue={movie.title}
            className="mt-2 w-full border-b border-[#d9d6d0] bg-transparent py-2 outline-none focus:border-[#1c1b19]"
          />
        </label>
        <label className="block text-sm">
          Year
          <input
            name="year"
            type="number"
            required
            defaultValue={movie.year}
            className="mt-2 w-full border-b border-[#d9d6d0] bg-transparent py-2 outline-none focus:border-[#1c1b19]"
          />
        </label>
        <fieldset className="text-sm">
          <legend>Genres</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {GENRES.map((genre) => (
              <label key={genre} className="cursor-pointer">
                <input
                  type="checkbox"
                  name="genres"
                  value={genre}
                  defaultChecked={movie.genres.includes(genre)}
                  className="peer sr-only"
                />
                <span className="inline-block border border-[#d9d6d0] px-3 py-1.5 peer-checked:border-[#1c1b19] peer-checked:bg-[#1c1b19] peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-[#1c1b19]">
                  {genre}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className="block text-sm">
          Overview
          <textarea
            name="overview"
            required
            rows={4}
            defaultValue={movie.overview}
            className="mt-2 w-full resize-y border-b border-[#d9d6d0] bg-transparent py-2 outline-none focus:border-[#1c1b19]"
          />
        </label>
      </div>
      <button type="submit" disabled={pending} className={`mt-8 ${buttonClass}`}>
        {pending ? "Saving…" : "Submit"}
      </button>
      {error ? <p className="mt-4 text-sm text-[#6d6963]">{error}</p> : null}
      {success ? (
        <p className="mt-4 text-sm text-[#6d6963]">Updated successfully</p>
      ) : null}
    </form>
  );
}

function AddForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const genres = data.getAll("genres").map(String);

    if (genres.length === 0) {
      setSuccess(false);
      setError("Select at least one genre.");
      return;
    }

    setPending(true);
    setError(null);
    setSuccess(false);
    
    // TODO: CREATE (add movie)
    try {
      const response = await fetch("http://127.0.0.1:8000/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: String(data.get("title") ?? ""),
          year: Number(data.get("year")),
          genres,
          overview: String(data.get("overview") ?? ""),
        }),
      });

      if (!response.ok) {
        setError("Could not add the movie.");
        return;
      }

      form.reset();
      setSuccess(true);
      router.refresh();
    } catch {
      setError("Could not add the movie.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      className="mt-10 border border-[#e6e3dc] bg-white p-6"
      onSubmit={onSubmit}
    >
      <FormHeading title="Add" detail="Add a film to the catalog." />
      <div className="grid gap-6">
        <label className="block text-sm">
          Title
          <input
            name="title"
            required
            className="mt-2 w-full border-b border-[#d9d6d0] bg-transparent py-2 outline-none focus:border-[#1c1b19]"
          />
        </label>
        <label className="block text-sm">
          Year
          <input
            name="year"
            type="number"
            required
            className="mt-2 w-full border-b border-[#d9d6d0] bg-transparent py-2 outline-none focus:border-[#1c1b19]"
          />
        </label>
        <fieldset className="text-sm">
          <legend>Genres</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {GENRES.map((genre) => (
              <label key={genre} className="cursor-pointer">
                <input
                  type="checkbox"
                  name="genres"
                  value={genre}
                  className="peer sr-only"
                />
                <span className="inline-block border border-[#d9d6d0] px-3 py-1.5 peer-checked:border-[#1c1b19] peer-checked:bg-[#1c1b19] peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-[#1c1b19]">
                  {genre}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className="block text-sm">
          Overview
          <textarea
            name="overview"
            required
            rows={4}
            className="mt-2 w-full resize-y border-b border-[#d9d6d0] bg-transparent py-2 outline-none focus:border-[#1c1b19]"
          />
        </label>
      </div>
      <button type="submit" disabled={pending} className={`mt-8 ${buttonClass}`}>
        {pending ? "Adding…" : "Submit"}
      </button>
      {error ? <p className="mt-4 text-sm text-[#6d6963]">{error}</p> : null}
      {success ? (
        <p className="mt-4 text-sm text-[#6d6963]">Added successfully</p>
      ) : null}
    </form>
  );
}
