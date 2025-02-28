"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { financeApiService } from '@/lib/axios';
import { NewsArticle } from '@/types/finance';
import { Badge } from '@/components/ui/badge';

export function NewsSection() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to parse compact date format
  const parseCompactDate = (compactDate: string) => {
    const year = compactDate.substring(0, 4);
    const month = compactDate.substring(4, 6);
    const day = compactDate.substring(6, 8);
    const hour = compactDate.substring(9, 11);
    const minute = compactDate.substring(11, 13);
    const second = compactDate.substring(13, 15);
    return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await financeApiService.getNewsArticles();
        setNews(response.data.feed.slice(0, 5));
      } catch (error) {
        console.error('Error fetching news:', error);
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
      <h2 className="text-xl font-semibold">Stock News</h2>
      {news.map((article, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="space-y-3"
            >
              <h3 className="font-medium line-clamp-2 hover:text-primary">
                {article.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{article.source}</span>
                <span>•</span>
                <span>
                  {parseCompactDate(article.time_published).toLocaleString()}
                </span>
              </div>
              <Badge variant="secondary">
                {article.overall_sentiment_label}
              </Badge>
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
