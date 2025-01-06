"use client";

import { useState, useEffect } from 'react';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { financeApiService } from '@/lib/axios';
import { StockSearchResult, TimeSeriesData } from '@/types/finance';
import { useDebounce } from '@/hooks/use-debounce';
import React from 'react';

interface StockSearchProps {
  onStockData: (data: TimeSeriesData) => void;
  onLoadingChange: (isLoading: boolean) => void;
}

export function StockSearch({ onStockData, onLoadingChange }: StockSearchProps) {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<StockSearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const debouncedSearch = useDebounce(search, 300);

  const handleSearch = async (query: string) => {
    if (!query) {
      setResults([]);
      setOpen(false);
      return;
    }

    try {
      const response = await financeApiService.searchSymbol(query);
      const bestMatches = response.data.bestMatches || [];
      setResults(bestMatches);
      setOpen(bestMatches.length > 0);
    } catch (error) {
      console.error('Error searching stocks:', error);
    }
  };

  const handleStockSelect = async (symbol: string) => {
    setOpen(false);
    onLoadingChange(true);

    try {
      const response = await financeApiService.getDailyTimeSeries(symbol);
      onStockData(response.data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    } finally {
      onLoadingChange(false);
    }
  };

  useEffect(() => {
    handleSearch(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className="relative">
      <div className="relative flex gap-2">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search stocks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 mt-1 z-10 bg-gray-800 border border-gray-700 rounded shadow">
          <div className="py-2 px-4 font-semibold text-gray-300">
            Stock Results
          </div>
          <div className="border-t border-gray-700">
            {results.map((result) => (
              <div
                key={result["1. symbol"]}
                onClick={() => handleStockSelect(result["1. symbol"])}
                className="py-2 px-4 cursor-pointer hover:bg-gray-700"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-gray-200">
                    {result["2. name"]}
                  </span>
                  <span className="text-sm text-gray-400">
                    {result["1. symbol"]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
