"use client";

import { useState, useEffect } from "react";
import { NewsCard } from "./news-card";
import { NewsArticle } from "@/lib/api/types";
import { newsApiService } from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsSearch() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [suggestions, setSuggestions] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await newsApiService.getNewsByQuery(query);
      setArticles(response.data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setIsLoading(false);
      setShowDropdown(false);
    }
  };

  const fetchSuggestions = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    try {
      const response = await newsApiService.getNewsByQuery(query);
      setSuggestions(response.data.articles.slice(0, 5));
      setShowDropdown(true);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 relative">
        <div className="relative">
          <Input
            placeholder="Search News on Any Topic..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 py-2 border border-grey rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onFocus={() => setShowDropdown(true)}
          />
          {showDropdown && suggestions.length > 0 && (
            <ul className="absolute left-0 w-full bg-white border border-gray-300 text-black rounded-lg shadow-md max-h-60 overflow-auto z-10">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.publishedAt}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setQuery(suggestion.title);
                    setShowDropdown(false);
                  }}
                >
                  {suggestion.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Button onClick={handleSearch} className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600">
          Search
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {articles.map((article) => (
          <NewsCard key={article.publishedAt} article={article} />
        ))}
      </div>
    </div>
  );
}
