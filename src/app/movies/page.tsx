"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const endpoint = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`;
  
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
  
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        // Type narrowing for the error
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchMovies();
  }, []);
  

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Loading movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-6">Trending Movies</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={500}
                height={750}
                className="w-full h-auto"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold truncate">{movie.title}</h2>
                <p className="text-sm text-gray-400">
                  Release Date: {movie.release_date}
                </p>
                <p className="mt-2 text-gray-300 text-sm truncate">
                  {movie.overview}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-yellow-400 font-bold">
                    ⭐ {movie.vote_average.toFixed(1)}
                  </span>
                  <a
                    href={`https://www.themoviedb.org/movie/${movie.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
