"use client";

import { useState, useEffect } from "react";
import { WeatherCard } from "./weather-card";
import { WeatherData } from "@/lib/api/types";
import { weatherApiService } from "@/lib/axios";

export function WeatherWidget() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const weatherResponse = await weatherApiService.getWeather(lat, lon);
        setWeatherData(weatherResponse.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Failed to fetch weather data.");
      } finally {
        setIsLoading(false);
      }
    };

    const getLocationAndFetchWeather = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
          },
          (geoError) => {
            console.error("Error getting location:", geoError);
            setError("Failed to get location. Using default location.");
            // Fallback to Durgapur, West Bengal
            fetchWeather(23.5204, 87.3119);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setError("Geolocation is not supported. Using default location.");
        // Fallback to Durgapur, West Bengal
        fetchWeather(23.5204, 87.3119);
      }
    };

    getLocationAndFetchWeather();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Latest Weather</h2>
      {error && <p className="text-red-500">{error}</p>}
      <WeatherCard data={weatherData} isLoading={isLoading} />
    </div>
  );
}
