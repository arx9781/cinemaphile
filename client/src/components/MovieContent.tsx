import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetails } from "../api/movie.api";
import { LoadingScreen } from "./LoadingWave";
import { Comments } from './Comments';

interface MovieProps {
  title: string;
  year: string;
  poster: string;
  plot: string;
  runtime: string;
  genre: string[];
  rating: string;
  director: string;
  actors: string;
  imdbRating: string;
}

export default function MovieContent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState<MovieProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      try {
        const details = await getMovieDetails(id);
        console.log(details);
        setMovieData({
          title: details.Title,
          year: details.Year,
          poster: details.Poster,
          plot: details.Plot,
          runtime: details.Runtime,
          genre: details.Genre.split(", "),
          rating: details.Rated,
          director: details.Director,
          actors: details.Actors,
          imdbRating: details.imdbRating,
        });
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!movieData) {
    return (
      <>
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">
          <div className="text-xl">Movie not found</div>
          <button
            onClick={() => navigate(-1)}
            className="bg-emerald-500 px-4 py-2 rounded-lg hover:bg-emerald-600"
          >
            Go Back
          </button>
        </div>
      </>
    );
  }

  const {
    title,
    year,
    poster,
    plot,
    runtime,
    genre,
    rating,
    director,
    actors,
    imdbRating,
  } = movieData;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-inter mt-16">
      <div className="flex w-full items-center justify-between p-4 rounded-xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-12 flex items-center text-neutral-400 hover:text-neutral-100 transition-colors cursor-pointer"
          title="Go Back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {/* bookmark button */}
        <button
          className="cursor-pointer flex items-center fill-neutral-600 bg-zinc-800 hover:bg-neutral-800 active:border active:border-neutral-400 rounded-md duration-100 p-2"
          title="Save"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            viewBox="0 -0.5 25 25"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.507 19.853V6.034C18.5116 5.49905 18.3034 4.98422 17.9283 4.60277C17.5532 4.22131 17.042 4.00449 16.507 4H8.50705C7.9721 4.00449 7.46085 4.22131 7.08577 4.60277C6.7107 4.98422 6.50252 5.49905 6.50705 6.034V19.853C6.45951 20.252 6.65541 20.6407 7.00441 20.8399C7.35342 21.039 7.78773 21.0099 8.10705 20.766L11.907 17.485C12.2496 17.1758 12.7705 17.1758 13.113 17.485L16.9071 20.767C17.2265 21.0111 17.6611 21.0402 18.0102 20.8407C18.3593 20.6413 18.5551 20.2522 18.507 19.853Z"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
          <span className="text-sm md:text-base text-neutral-400 px-1 font-inter">
            Save Post
          </span>
        </button>
      </div>
      <div className="container mx-auto">
        <div className="grid gap-8 md:grid-cols-[300px_1fr] lg:gap-12">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-lg border border-zinc-800">
              <img
                src={poster || "/placeholder.svg"}
                alt={title}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <div className="flex items-center justify-center gap-2 rounded-lg border border-zinc-800 p-4">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="text-xl font-bold font-doto">{imdbRating}</span>
              <span className="text-base text-zinc-400 font-doto">/10</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight font-doto">
                {title} <span className="text-zinc-500">({year})</span>
              </h1>
              <div className="flex flex-wrap gap-2 text-sm text-zinc-400">
                <span>{runtime}</span>
                <span>•</span>
                <span>{rating}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {genre.map((g) => (
                <span
                  key={g}
                  className="rounded-full bg-zinc-800 px-3 py-1 text-sm font-medium text-neutral-600 hover:text-neutral-300 transition-all duration-200 cursor-pointer"
                >
                  {g}
                </span>
              ))}
            </div>

            <div className="space-y-4 border-t border-zinc-800 pt-4">
              <p className="text-zinc-300 justify-evenly">{plot}</p>
            </div>

            <div className="space-y-4 border-t border-zinc-800 pt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h2 className="text-sm md:text-base font-semibold text-zinc-400 font-doto">
                    Director
                  </h2>
                  <p className="text-zinc-100">{director}</p>
                </div>
                <div>
                  <h2 className="text-sm md:text-base font-semibold text-zinc-400 font-doto">
                    Starring
                  </h2>
                  <p className="text-zinc-100">{actors}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Comments movieId={id!} movieTitle={movieData.title} />
    </div>
  );
}
