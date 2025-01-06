"use client";

import { useState, useEffect } from "react";
import { StockChart } from "./stock-chart";
import { StockData } from "@/lib/api/types";

export function FinanceWidget() {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const data: StockData = {
          symbol: "TSLA",
          price: 250.75,
          change: 5.25,
          changePercent: 2.13,
          high: 255.50,
          low: 245.30,
          volume: 2000000,
          historicalData: Array.from({ length: 7 }, (_, i) => ({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
            price: 250 + Math.random() * 10 - 5,
            volume: 2000000 + Math.random() * 500000,
          })),
        };
        setStockData(data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStockData();
  }, []);

  if (isLoading || !stockData) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-[200px] bg-muted rounded"></div>
      </div>
    );
  }

  return <StockChart data={stockData} />;
}
