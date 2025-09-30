import axios from 'axios';
import { cache } from './cache';

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

// Mock news data
const mockNews = [
  {
    id: 1,
    headline: 'Apple Unveils New AI Features in iOS 18',
    summary: 'Apple announced groundbreaking AI capabilities that will transform user experience across all devices.',
    source: 'TechCrunch',
    datetime: Date.now() / 1000 - 3600,
    url: 'https://techcrunch.com',
    image: '',
    category: 'technology',
    sentiment: 0.8,
    related: 'AAPL'
  },
  {
    id: 2,
    headline: 'Tesla Reports Record Q4 Deliveries',
    summary: 'Tesla exceeded analyst expectations with strong delivery numbers, signaling robust demand.',
    source: 'Bloomberg',
    datetime: Date.now() / 1000 - 7200,
    url: 'https://bloomberg.com',
    image: '',
    category: 'business',
    sentiment: 0.7,
    related: 'TSLA'
  },
  {
    id: 3,
    headline: 'NVIDIA Partners with Leading AI Startups',
    summary: 'NVIDIA expands its ecosystem with strategic partnerships in the AI infrastructure space.',
    source: 'Reuters',
    datetime: Date.now() / 1000 - 10800,
    url: 'https://reuters.com',
    image: '',
    category: 'technology',
    sentiment: 0.6,
    related: 'NVDA'
  },
  {
    id: 4,
    headline: 'Microsoft Cloud Revenue Surges 30%',
    summary: 'Azure continues to capture market share with strong growth in enterprise AI services.',
    source: 'CNBC',
    datetime: Date.now() / 1000 - 14400,
    url: 'https://cnbc.com',
    image: '',
    category: 'business',
    sentiment: 0.75,
    related: 'MSFT'
  },
  {
    id: 5,
    headline: 'Amazon Expands AI-Powered Logistics Network',
    summary: 'Amazon invests billions in AI-driven warehouse automation to improve delivery times.',
    source: 'Wall Street Journal',
    datetime: Date.now() / 1000 - 18000,
    url: 'https://wsj.com',
    image: '',
    category: 'business',
    sentiment: 0.65,
    related: 'AMZN'
  }
];

export const getCompanyNews = async (symbol, fromDate, toDate) => {
  const cacheKey = `news_${symbol}_${fromDate}_${toDate}`;
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    if (!API_KEY || API_KEY === 'your_finnhub_key_here') {
      // Return mock news
      const news = mockNews.filter(n => n.related === symbol);
      cache.set(cacheKey, news, 300);
      return news;
    }

    const response = await axios.get(`${BASE_URL}/company-news`, {
      params: {
        symbol,
        from: fromDate,
        to: toDate,
        token: API_KEY
      }
    });

    const news = response.data.map((item, index) => ({
      id: index + 1,
      headline: item.headline,
      summary: item.summary,
      source: item.source,
      datetime: item.datetime,
      url: item.url,
      image: item.image,
      category: item.category,
      sentiment: item.sentiment || 0,
      related: symbol
    }));

    cache.set(cacheKey, news, 300);
    return news;
  } catch (error) {
    console.error('Error fetching company news:', error);
    return mockNews.filter(n => n.related === symbol);
  }
};

export const getMarketNews = async (category = 'general') => {
  const cacheKey = `market_news_${category}`;
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    if (!API_KEY || API_KEY === 'your_finnhub_key_here') {
      cache.set(cacheKey, mockNews, 300);
      return mockNews;
    }

    const response = await axios.get(`${BASE_URL}/news`, {
      params: {
        category,
        token: API_KEY
      }
    });

    const news = response.data.map((item, index) => ({
      id: index + 1,
      headline: item.headline,
      summary: item.summary,
      source: item.source,
      datetime: item.datetime,
      url: item.url,
      image: item.image,
      category: item.category,
      sentiment: item.sentiment || 0,
      related: ''
    }));

    cache.set(cacheKey, news, 300);
    return news;
  } catch (error) {
    console.error('Error fetching market news:', error);
    return mockNews;
  }
};

export const getEarningsCalendar = async (from, to) => {
  const cacheKey = `earnings_${from}_${to}`;
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    if (!API_KEY || API_KEY === 'your_finnhub_key_here') {
      // Return mock earnings data
      const mockEarnings = [
        { date: '2024-01-15', symbol: 'AAPL', eps: 2.18, estimate: 2.10 },
        { date: '2024-01-20', symbol: 'MSFT', eps: 2.95, estimate: 2.83 },
        { date: '2024-01-25', symbol: 'TSLA', eps: 1.07, estimate: 1.15 },
      ];
      cache.set(cacheKey, mockEarnings, 3600);
      return mockEarnings;
    }

    const response = await axios.get(`${BASE_URL}/calendar/earnings`, {
      params: {
        from,
        to,
        token: API_KEY
      }
    });

    cache.set(cacheKey, response.data.earningsCalendar, 3600);
    return response.data.earningsCalendar;
  } catch (error) {
    console.error('Error fetching earnings calendar:', error);
    return [];
  }
};
