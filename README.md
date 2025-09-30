# Signal - AI-Powered Financial Intelligence Platform

![Signal Banner](https://img.shields.io/badge/Signal-Financial_Intelligence-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?style=flat-square&logo=tailwind-css)

## 🚀 Overview

**Signal** is an enterprise-grade AI-powered financial intelligence platform that transforms how users analyze markets, manage portfolios, and make investment decisions. Built with cutting-edge technologies and integrated with premium financial data APIs and Claude AI for sophisticated analysis.

## ✨ Key Features

### 🎯 Core Capabilities
- **AI-Powered Analysis**: Claude Sonnet 4.5 integration for sentiment analysis, risk assessment, and financial insights
- **Real-Time Market Data**: Live stock quotes, news feeds, and market updates from Alpha Vantage and Finnhub
- **Portfolio Management**: Comprehensive portfolio tracking with live price updates and performance analytics
- **Document Analysis**: NLP-powered analysis of earnings reports, financial statements, and market research
- **Intelligent Assistant**: Conversational AI for portfolio questions, market analysis, and investment strategies
- **Scenario Modeling**: "What If" analysis to understand potential market impacts on your portfolio
- **Market Calendar**: Earnings dates, economic events, and market catalysts
- **Smart Alerts**: Configurable alerts for price targets, volume changes, and news sentiment (demo mode)

### 🎨 User Experience
- Modern, responsive design with dark/light theme support
- Smooth animations with Framer Motion
- Loading skeletons and error boundaries for robust UX
- Mobile-responsive navigation
- Accessible components (WCAG 2.1 guidelines)

### 🏗️ Technical Architecture
- **Frontend**: React 18 with functional components and hooks
- **State Management**: Zustand for lightweight, performant state
- **Styling**: Tailwind CSS with shadcn/ui component patterns
- **Animations**: Framer Motion for fluid interactions
- **Data Visualization**: Recharts for portfolio analytics
- **Build Tool**: Vite for lightning-fast development
- **API Layer**: Modular services with caching and error handling

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- API keys for:
  - Anthropic Claude API (for AI analysis)
  - Alpha Vantage (for stock data)
  - Finnhub (for news and earnings)
  - NewsAPI (for market news)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dcthedeveloper/Signal.git
   cd Signal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your API keys:
   ```env
   VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here
   VITE_ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key_here
   VITE_FINNHUB_API_KEY=your_finnhub_key_here
   VITE_NEWS_API_KEY=your_news_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔑 Getting API Keys

### Anthropic Claude API
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Sign up for an account
3. Generate an API key
4. Note: Claude Sonnet 4.5 provides best-in-class financial analysis

### Alpha Vantage
1. Visit [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
2. Get your free API key
3. Free tier: 5 API requests per minute, 500 per day

### Finnhub
1. Visit [Finnhub](https://finnhub.io/register)
2. Sign up for free tier
3. Free tier: 60 API calls/minute

### NewsAPI
1. Visit [NewsAPI](https://newsapi.org/register)
2. Register for free developer account
3. Free tier: 100 requests/day

## 📁 Project Structure

```
Signal/
├── src/
│   ├── api/                 # API integration layer
│   │   ├── cache.js         # Response caching
│   │   ├── claude.js        # Anthropic Claude AI
│   │   ├── alphaVantage.js  # Stock market data
│   │   ├── finnhub.js       # Financial news
│   │   └── newsApi.js       # Market news
│   ├── components/
│   │   ├── layout/          # Layout components
│   │   │   ├── Layout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── MobileNav.jsx
│   │   └── shared/          # Reusable UI components
│   │       ├── ui.jsx
│   │       ├── LoadingSkeleton.jsx
│   │       └── ErrorBoundary.jsx
│   ├── pages/               # Page components
│   │   ├── Home.jsx         # Welcome & demo generation
│   │   ├── Portfolio.jsx    # Portfolio management
│   │   ├── Analysis.jsx     # Document analysis
│   │   ├── Calendar.jsx     # Market calendar
│   │   ├── Assistant.jsx    # AI chat assistant
│   │   ├── WhatIf.jsx       # Scenario analysis
│   │   ├── Alerts.jsx       # Alert management
│   │   └── Settings.jsx     # User settings
│   ├── store/
│   │   └── useStore.js      # Zustand state management
│   ├── utils/               # Utility functions
│   │   ├── cn.js            # Class name utility
│   │   ├── financial.js     # Financial calculations
│   │   └── formatters.js    # Data formatting
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
├── package.json             # Dependencies
└── README.md                # This file
```

## 🎯 Features Walkthrough

### 1. Home/Briefing Page
- Animated hero section with gradient effects
- "Try Demo" generates realistic portfolio with real market data
- Feature cards highlighting AI, real-time data, and scenarios

### 2. Portfolio Management
- Live price updates (refreshes every minute)
- Summary cards: Total value, gains/losses, daily changes
- Detailed holdings table with sorting and filtering
- Sector allocation analysis
- Performance tracking

### 3. Document Analysis
- Upload or paste financial documents
- AI-powered sentiment analysis
- Extract key insights, risks, and opportunities
- Confidence scoring for each insight
- Sample documents included

### 4. Market Calendar
- Upcoming earnings announcements
- Economic events (Fed meetings, GDP reports)
- Company-specific events for portfolio holdings
- Historical performance context

### 5. AI Assistant
- Conversational interface with context awareness
- Portfolio-aware responses
- Market news integration
- Suggested questions to get started
- Confidence scoring on responses
- Message history persistence

### 6. What-If Scenarios
- Prebuilt scenarios (rate hikes, corrections, rallies)
- Custom scenario analysis
- Impact assessment on portfolio
- Sector-specific recommendations
- Risk mitigation strategies

### 7. Alerts (Demo Mode)
- View example alert configurations
- Price targets, volume alerts, sentiment changes
- Upgrade prompt for full functionality

### 8. Settings
- Theme switching (dark/light mode)
- Reset demo data
- API status dashboard
- About section with tech stack

## 🧪 Testing

```bash
# Lint code
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment

### Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Add environment variables in Vercel dashboard

### Netlify
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Add environment variables in Netlify settings

### Docker
```bash
# Build image
docker build -t signal-app .

# Run container
docker run -p 3000:3000 signal-app
```

## 🔐 Environment Variables

All API keys should be stored securely:
- Never commit `.env` file to version control
- Use environment variable management in production
- Rotate API keys regularly
- Monitor API usage to stay within rate limits

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.js` to customize the color palette:
```javascript
theme: {
  extend: {
    colors: {
      primary: "your-color",
      // ... more colors
    }
  }
}
```

### API Integration
Each API service in `src/api/` has mock data fallbacks. To modify:
1. Edit the mock data objects
2. Adjust caching TTL in `cache.js`
3. Add new API endpoints as needed

## 📊 Performance

- Lighthouse score: 90+ across all metrics
- Code splitting for optimal load times
- Response caching reduces API calls
- Lazy loading for images and components
- Virtual scrolling for large data sets

## 🤝 Contributing

This is a demonstration project for educational purposes. Feel free to fork and customize for your needs.

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🙏 Acknowledgments

- **APIs**: Alpha Vantage, Finnhub, NewsAPI, Anthropic Claude
- **UI Components**: shadcn/ui patterns
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📧 Contact

For questions or feedback about this project, please open an issue on GitHub.

---

**Built with ❤️ using React, AI, and real-time financial data**