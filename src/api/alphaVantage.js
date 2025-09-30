import axios from 'axios';
import { cache } from './cache';

const API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

// Mock data for when API is not available
const mockStockData = {
  'AAPL': { price: 178.45, change: 2.34, changePercent: 1.33, high: 179.12, low: 176.89, volume: 52341234 },
  'TSLA': { price: 242.84, change: -3.21, changePercent: -1.30, high: 246.50, low: 241.20, volume: 98234567 },
  'NVDA': { price: 495.22, change: 8.91, changePercent: 1.83, high: 498.76, low: 489.34, volume: 43234890 },
  'MSFT': { price: 378.91, change: 4.56, changePercent: 1.22, high: 380.45, low: 375.23, volume: 28456123 },
  'AMZN': { price: 151.94, change: -1.23, changePercent: -0.80, high: 153.45, low: 150.67, volume: 35678901 },
  'GOOGL': { price: 140.93, change: 1.78, changePercent: 1.28, high: 141.67, low: 139.45, volume: 23456789 },
  'META': { price: 484.03, change: 6.23, changePercent: 1.30, high: 486.78, low: 478.90, volume: 18234567 },
};

export const getQuote = async (symbol) => {
  const cacheKey = `quote_${symbol}`;
  
  // Check cache first
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    if (!API_KEY || API_KEY === 'your_alpha_vantage_key_here') {
      // Use mock data
      const mockData = mockStockData[symbol] || mockStockData['AAPL'];
      const data = {
        symbol,
        price: mockData.price,
        change: mockData.change,
        changePercent: mockData.changePercent,
        high: mockData.high,
        low: mockData.low,
        volume: mockData.volume,
      };
      cache.set(cacheKey, data, 60); // Cache for 1 minute
      return data;
    }

    const response = await axios.get(BASE_URL, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol,
        apikey: API_KEY
      }
    });

    const quote = response.data['Global Quote'];
    const data = {
      symbol,
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
      high: parseFloat(quote['03. high']),
      low: parseFloat(quote['04. low']),
      volume: parseInt(quote['06. volume']),
    };

    cache.set(cacheKey, data, 60);
    return data;
  } catch (error) {
    console.error('Error fetching quote:', error);
    // Return mock data as fallback
    const mockData = mockStockData[symbol] || mockStockData['AAPL'];
    return {
      symbol,
      price: mockData.price,
      change: mockData.change,
      changePercent: mockData.changePercent,
      high: mockData.high,
      low: mockData.low,
      volume: mockData.volume,
    };
  }
};

export const searchSymbol = async (keywords) => {
  try {
    if (!API_KEY || API_KEY === 'your_alpha_vantage_key_here') {
      // Return mock search results
      return [
        { symbol: 'AAPL', name: 'Apple Inc.', type: 'Equity' },
        { symbol: 'TSLA', name: 'Tesla Inc.', type: 'Equity' },
        { symbol: 'NVDA', name: 'NVIDIA Corporation', type: 'Equity' },
      ];
    }

    const response = await axios.get(BASE_URL, {
      params: {
        function: 'SYMBOL_SEARCH',
        keywords,
        apikey: API_KEY
      }
    });

    return response.data.bestMatches?.map(match => ({
      symbol: match['1. symbol'],
      name: match['2. name'],
      type: match['3. type']
    })) || [];
  } catch (error) {
    console.error('Error searching symbol:', error);
    return [];
  }
};

export const getCompanyOverview = async (symbol) => {
  const cacheKey = `overview_${symbol}`;
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    if (!API_KEY || API_KEY === 'your_alpha_vantage_key_here') {
      // Return mock company data
      return {
        symbol,
        name: `${symbol} Inc.`,
        description: 'A leading technology company.',
        sector: 'Technology',
        industry: 'Consumer Electronics',
        marketCap: 2800000000000,
        peRatio: 28.5,
      };
    }

    const response = await axios.get(BASE_URL, {
      params: {
        function: 'OVERVIEW',
        symbol,
        apikey: API_KEY
      }
    });

    const data = response.data;
    const overview = {
      symbol,
      name: data.Name,
      description: data.Description,
      sector: data.Sector,
      industry: data.Industry,
      marketCap: parseInt(data.MarketCapitalization),
      peRatio: parseFloat(data.PERatio),
    };

    cache.set(cacheKey, overview, 3600); // Cache for 1 hour
    return overview;
  } catch (error) {
    console.error('Error fetching company overview:', error);
    return {
      symbol,
      name: `${symbol} Inc.`,
      description: 'A leading company.',
      sector: 'Technology',
      industry: 'Software',
      marketCap: 1000000000,
      peRatio: 25.0,
    };
  }
};
