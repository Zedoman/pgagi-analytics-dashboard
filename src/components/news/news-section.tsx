"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { newsApiService } from "@/lib/axios";
import { NewsArticle } from "@/types/finance";
import { Badge } from "@/components/ui/badge";

export function NewsSection() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await newsApiService.getTopHeadlines();
        setNews(response.data.articles); // Ensure 'articles' field is used
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">World News</h2>
      {news.map((article, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="space-y-3"
            >
             <h3 className="font-medium line-clamp-2 hover:text-gray-300">
  {article.title}
</h3>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>
                  {new Date(article.publishedAt).toLocaleString()}
                </span>
              </div>
              <Badge variant="secondary">
                {article.author || "Unknown"}
              </Badge>
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
