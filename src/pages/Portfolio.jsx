import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Percent, RefreshCw } from 'lucide-react';
import useStore from '../store/useStore';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from '../components/shared/ui';
import { formatCurrency, formatPercent, calculatePortfolioValue, calculateTotalGainLoss, calculateTotalGainLossPercent } from '../utils/financial';
import { getQuote } from '../api/alphaVantage';

const Portfolio = () => {
  const { portfolio, updatePortfolioItem } = useStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const totalValue = calculatePortfolioValue(portfolio);
  const totalGainLoss = calculateTotalGainLoss(portfolio);
  const totalGainLossPercent = calculateTotalGainLossPercent(portfolio);

  const refreshPrices = async () => {
    setIsRefreshing(true);
    try {
      for (const holding of portfolio) {
        const quote = await getQuote(holding.ticker);
        updatePortfolioItem(holding.id, {
          current_price: quote.price,
          change_percent: quote.changePercent,
          change_value: quote.change,
          day_high: quote.high,
          day_low: quote.low,
          volume: quote.volume,
          market_value: holding.shares * quote.price,
        });
      }
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error refreshing prices:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (portfolio.length > 0) {
      const interval = setInterval(() => {
        refreshPrices();
      }, 60000); // Refresh every minute

      return () => clearInterval(interval);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [portfolio]);

  if (portfolio.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Portfolio</h1>
          <p className="text-muted-foreground">Manage your investment portfolio</p>
        </div>
        
        <Card className="py-12">
          <CardContent className="text-center">
            <DollarSign className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Portfolio Yet</h3>
            <p className="text-muted-foreground mb-4">
              Start by generating a demo portfolio from the home page
            </p>
            <Button onClick={() => window.location.href = '/'}>
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Portfolio</h1>
          <p className="text-muted-foreground">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>
        <Button
          onClick={refreshPrices}
          disabled={isRefreshing}
          variant="outline"
          className="gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh Prices
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
              <p className="text-xs text-muted-foreground">
                Across {portfolio.length} holdings
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Gain/Loss</CardTitle>
              {totalGainLoss >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(totalGainLoss)}
              </div>
              <p className="text-xs text-muted-foreground">
                {totalGainLoss >= 0 ? '+' : ''}{formatPercent(totalGainLossPercent)}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Day&apos;s Change</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {portfolio.length > 0 
                  ? formatPercent(portfolio.reduce((sum, h) => sum + h.change_percent, 0) / portfolio.length)
                  : '0%'
                }
              </div>
              <p className="text-xs text-muted-foreground">
                Average across holdings
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Portfolio Table */}
      <Card>
        <CardHeader>
          <CardTitle>Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-medium">Symbol</th>
                  <th className="pb-3 font-medium">Shares</th>
                  <th className="pb-3 font-medium">Avg Cost</th>
                  <th className="pb-3 font-medium">Current Price</th>
                  <th className="pb-3 font-medium">Market Value</th>
                  <th className="pb-3 font-medium">Gain/Loss</th>
                  <th className="pb-3 font-medium">Day Change</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((holding, index) => {
                  const gainLoss = (holding.current_price - holding.avg_cost) * holding.shares;
                  const gainLossPercent = ((holding.current_price - holding.avg_cost) / holding.avg_cost) * 100;
                  
                  return (
                    <motion.tr
                      key={holding.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b last:border-0"
                    >
                      <td className="py-4">
                        <div>
                          <div className="font-semibold">{holding.ticker}</div>
                          <div className="text-sm text-muted-foreground">{holding.company_name}</div>
                        </div>
                      </td>
                      <td className="py-4">{holding.shares}</td>
                      <td className="py-4">{formatCurrency(holding.avg_cost)}</td>
                      <td className="py-4 font-semibold">{formatCurrency(holding.current_price)}</td>
                      <td className="py-4 font-semibold">{formatCurrency(holding.market_value)}</td>
                      <td className="py-4">
                        <div className={gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}>
                          <div className="font-semibold">{formatCurrency(gainLoss)}</div>
                          <div className="text-sm">
                            {gainLoss >= 0 ? '+' : ''}{formatPercent(gainLossPercent)}
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <Badge variant={holding.change_percent >= 0 ? 'success' : 'danger'}>
                          {holding.change_percent >= 0 ? '+' : ''}{holding.change_percent.toFixed(2)}%
                        </Badge>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Portfolio;
