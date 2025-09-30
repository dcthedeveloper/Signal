import axios from 'axios';
import { cache } from './cache';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

const mockNewsArticles = [
  {
    title: 'Fed Signals Potential Rate Cuts in 2024',
    description: 'Federal Reserve officials hint at monetary policy adjustments as inflation shows signs of cooling.',
    url: 'https://example.com',
    source: { name: 'Financial Times' },
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    urlToImage: '',
  },
  {
    title: 'Tech Stocks Rally on Strong Earnings Reports',
    description: 'Major technology companies exceed analyst expectations, driving market optimism.',
    url: 'https://example.com',
    source: { name: 'MarketWatch' },
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    urlToImage: '',
  },
  {
    title: 'Energy Sector Sees Significant Volatility',
    description: 'Oil prices fluctuate amid geopolitical tensions and supply chain concerns.',
    url: 'https://example.com',
    source: { name: 'Bloomberg' },
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    urlToImage: '',
  }
];

export const getTopHeadlines = async (category = 'business', country = 'us') => {
  const cacheKey = `headlines_${category}_${country}`;
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    if (!API_KEY || API_KEY === 'your_news_api_key_here') {
      cache.set(cacheKey, mockNewsArticles, 300);
      return mockNewsArticles;
    }

    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        category,
        country,
        apiKey: API_KEY
      }
    });

    cache.set(cacheKey, response.data.articles, 300);
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    return mockNewsArticles;
  }
};

export const searchNews = async (query, from, to, sortBy = 'publishedAt') => {
  const cacheKey = `search_${query}_${from}_${to}_${sortBy}`;
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    if (!API_KEY || API_KEY === 'your_news_api_key_here') {
      cache.set(cacheKey, mockNewsArticles, 300);
      return mockNewsArticles;
    }

    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: query,
        from,
        to,
        sortBy,
        apiKey: API_KEY
      }
    });

    cache.set(cacheKey, response.data.articles, 300);
    return response.data.articles;
  } catch (error) {
    console.error('Error searching news:', error);
    return mockNewsArticles;
  }
};
