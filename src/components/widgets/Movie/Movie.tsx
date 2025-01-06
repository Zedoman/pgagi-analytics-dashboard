"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

// Interface for Movie Data
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
}

export function MovieCard() {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch trending movie
  useEffect(() => {
    const fetchTrendingMovie = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY; // Store your TMDb API key in environment variables
        const endpoint = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`; // Trending movie of the day

        const response = await fetch(endpoint);

        if (response.ok) {
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            setMovie(data.results[0]); // Get the first trending movie
          } else {
            setError("No trending movie found.");
          }
        } else {
          console.error("Error fetching movie:", response.statusText);
          setError("Failed to fetch the trending movie.");
        }
      } catch (error) {
        console.error("Error fetching movie:", error);
        setError("An error occurred while fetching the trending movie.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingMovie();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!movie) {
    return <p className="text-muted-foreground">No movie to display.</p>;
  }

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex items-center space-x-4">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
              : "/default-poster.jpg"
          } // Fallback to default image if poster is unavailable
          alt={movie.title}
          className="w-16 h-16 rounded-lg"
        />
        <div>
          <CardTitle className="text-lg font-bold">{movie.title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            Release Date: {movie.release_date}
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {movie.overview || "No description available"}
        </p>
        <a
          href={`https://www.themoviedb.org/movie/${movie.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="mt-2 px-4 py-2 text-sm font-semibold text-orange-500 bg-primary rounded-full hover:bg-primary-dark transition-colors duration-300">
            View Details
          </button>
        </a>
      </CardContent>
    </Card>
  );
}
