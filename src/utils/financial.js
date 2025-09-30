// Financial calculation utilities

export const calculatePortfolioValue = (holdings) => {
  return holdings.reduce((total, holding) => {
    return total + (holding.shares * holding.current_price);
  }, 0);
};

export const calculateTotalGainLoss = (holdings) => {
  return holdings.reduce((total, holding) => {
    const costBasis = holding.shares * holding.avg_cost;
    const currentValue = holding.shares * holding.current_price;
    return total + (currentValue - costBasis);
  }, 0);
};

export const calculateTotalGainLossPercent = (holdings) => {
  const totalCost = holdings.reduce((total, holding) => {
    return total + (holding.shares * holding.avg_cost);
  }, 0);
  
  const totalGainLoss = calculateTotalGainLoss(holdings);
  
  return totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0;
};

export const calculateSectorAllocation = (holdings) => {
  const sectorMap = {};
  const totalValue = calculatePortfolioValue(holdings);
  
  holdings.forEach(holding => {
    const value = holding.shares * holding.current_price;
    if (!sectorMap[holding.sector]) {
      sectorMap[holding.sector] = 0;
    }
    sectorMap[holding.sector] += value;
  });
  
  return Object.entries(sectorMap).map(([sector, value]) => ({
    sector,
    value,
    percentage: totalValue > 0 ? (value / totalValue) * 100 : 0
  }));
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

export const formatPercent = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value / 100);
};

export const formatLargeNumber = (value) => {
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(2)}T`;
  } else if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  }
  return formatCurrency(value);
};

export const getChangeColor = (value) => {
  if (value > 0) return 'text-green-600';
  if (value < 0) return 'text-red-600';
  return 'text-gray-600';
};
