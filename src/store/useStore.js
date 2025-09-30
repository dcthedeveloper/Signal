import { create } from 'zustand';

const useStore = create((set) => ({
  // Portfolio state
  portfolio: [],
  watchlist: [],
  
  // News state
  news: [],
  
  // Chat history
  chatMessages: [],
  
  // Settings
  theme: 'dark',
  
  // API status
  apiStatus: {
    alphaVantage: 'idle',
    finnhub: 'idle',
    newsApi: 'idle',
    claude: 'idle'
  },
  
  // Actions
  setPortfolio: (portfolio) => set({ portfolio }),
  
  addToPortfolio: (holding) => set((state) => ({
    portfolio: [...state.portfolio, { ...holding, id: Date.now() }]
  })),
  
  removeFromPortfolio: (id) => set((state) => ({
    portfolio: state.portfolio.filter(h => h.id !== id)
  })),
  
  updatePortfolioItem: (id, updates) => set((state) => ({
    portfolio: state.portfolio.map(h => 
      h.id === id ? { ...h, ...updates } : h
    )
  })),
  
  setNews: (news) => set({ news }),
  
  addChatMessage: (message) => set((state) => ({
    chatMessages: [...state.chatMessages, { ...message, id: Date.now() }]
  })),
  
  clearChatHistory: () => set({ chatMessages: [] }),
  
  setTheme: (theme) => set({ theme }),
  
  setApiStatus: (api, status) => set((state) => ({
    apiStatus: { ...state.apiStatus, [api]: status }
  })),
  
  resetDemo: () => set({
    portfolio: [],
    watchlist: [],
    news: [],
    chatMessages: []
  }),
}));

export default useStore;
