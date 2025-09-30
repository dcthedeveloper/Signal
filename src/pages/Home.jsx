import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { Button, Card, CardDescription, CardHeader, CardTitle } from '../components/shared/ui';
import useStore from '../store/useStore';
import { getQuote } from '../api/alphaVantage';
import { getMarketNews } from '../api/finnhub';

const Home = () => {
  const navigate = useNavigate();
  const { setPortfolio, setNews } = useStore();
  const [isGenerating, setIsGenerating] = useState(false);

  const generateDemoData = async () => {
    setIsGenerating(true);
    
    try {
      // Generate demo portfolio with real prices
      const symbols = ['AAPL', 'TSLA', 'NVDA', 'MSFT', 'AMZN'];
      const portfolioPromises = symbols.map(async (symbol) => {
        const quote = await getQuote(symbol);
        return {
          id: Date.now() + Math.random(),
          ticker: symbol,
          company_name: `${symbol} Inc.`,
          sector: 'Technology',
          shares: Math.floor(Math.random() * 50) + 10,
          avg_cost: quote.price * (0.85 + Math.random() * 0.2),
          current_price: quote.price,
          change_percent: quote.changePercent,
          change_value: quote.change,
          market_value: 0, // Will be calculated
          day_high: quote.high,
          day_low: quote.low,
          volume: quote.volume,
          pe_ratio: 25 + Math.random() * 15,
          market_cap: 1000000000000 + Math.random() * 1000000000000,
          is_watchlist: false,
          added_at: new Date().toISOString(),
        };
      });

      const portfolio = await Promise.all(portfolioPromises);
      portfolio.forEach(holding => {
        holding.market_value = holding.shares * holding.current_price;
      });

      setPortfolio(portfolio);

      // Fetch news
      const news = await getMarketNews('general');
      setNews(news);

      // Navigate to portfolio
      setTimeout(() => {
        navigate('/portfolio');
      }, 1000);
    } catch (error) {
      console.error('Error generating demo:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Hero Section */}
          <div className="space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-block"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                <TrendingUp className="relative h-20 w-20 text-primary mx-auto" />
              </div>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Signal
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enterprise-grade AI-powered financial intelligence platform that transforms how you analyze markets, manage portfolios, and make investment decisions.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-4 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="text-left">
                <CardHeader>
                  <CardTitle className="text-lg">AI-Powered Analysis</CardTitle>
                  <CardDescription>
                    Claude Sonnet 4.5 provides sophisticated financial insights and sentiment analysis
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="text-left">
                <CardHeader>
                  <CardTitle className="text-lg">Real-Time Data</CardTitle>
                  <CardDescription>
                    Live market prices, news feeds, and earnings calendar from premium data sources
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="text-left">
                <CardHeader>
                  <CardTitle className="text-lg">Advanced Scenarios</CardTitle>
                  <CardDescription>
                    Model market scenarios and understand potential impacts on your portfolio
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="pt-8"
          >
            <Button
              size="lg"
              onClick={generateDemoData}
              disabled={isGenerating}
              className="gap-2"
            >
              {isGenerating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="h-5 w-5" />
                  </motion.div>
                  Generating Demo Portfolio...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Try Demo with Real Data
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>
          </motion.div>

          <p className="text-sm text-muted-foreground">
            Demo uses real-time market data from Alpha Vantage, Finnhub, and AI analysis from Claude
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
