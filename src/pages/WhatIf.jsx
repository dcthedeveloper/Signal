import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingDown, TrendingUp, Sparkles } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from '../components/shared/ui';
import useStore from '../store/useStore';
import { analyzeScenario } from '../api/claude';
import { LoadingSkeleton } from '../components/shared/LoadingSkeleton';

const WhatIf = () => {
  const { portfolio } = useStore();
  const [scenario, setScenario] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const prebuiltScenarios = [
    { 
      title: 'Fed Rate Hike',
      description: 'Federal Reserve announces 0.5% interest rate increase'
    },
    {
      title: 'Tech Sector Correction',
      description: '15% correction in technology stocks due to valuation concerns'
    },
    {
      title: 'Market Rally',
      description: 'Strong economic data drives broad market rally of 8%'
    },
    {
      title: 'Geopolitical Crisis',
      description: 'Major geopolitical tensions cause market volatility and flight to safety'
    },
  ];

  const handleAnalyze = async (scenarioText) => {
    setIsAnalyzing(true);
    setScenario(scenarioText);
    
    try {
      const result = await analyzeScenario(scenarioText, portfolio);
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing scenario:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">What If Scenarios</h1>
        <p className="text-muted-foreground">
          Model potential market scenarios and their impact on your portfolio
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Prebuilt Scenarios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {prebuiltScenarios.map((item, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3"
                  onClick={() => handleAnalyze(item.description)}
                  disabled={isAnalyzing}
                >
                  <div>
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Scenario</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                className="w-full min-h-[150px] p-4 border rounded-md bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Describe your custom market scenario..."
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
              />
              <Button
                onClick={() => handleAnalyze(scenario)}
                disabled={isAnalyzing || !scenario.trim()}
                className="w-full gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles className="h-4 w-4" />
                    </motion.div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" />
                    Analyze Scenario
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div>
          {isAnalyzing ? (
            <Card>
              <CardHeader>
                <LoadingSkeleton className="h-6 w-1/3" />
              </CardHeader>
              <CardContent className="space-y-4">
                <LoadingSkeleton className="h-20" />
                <LoadingSkeleton className="h-20" />
                <LoadingSkeleton className="h-20" />
              </CardContent>
            </Card>
          ) : analysis ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Impact Analysis</CardTitle>
                    <Badge variant={
                      analysis.impact === 'high' ? 'danger' : 
                      analysis.impact === 'moderate' ? 'warning' : 
                      'success'
                    }>
                      {analysis.impact.toUpperCase()} Impact
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <TrendingDown className="h-4 w-4 text-red-600" />
                      Affected Sectors
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.affectedSectors?.map((sector, index) => (
                        <Badge key={index} variant="outline">
                          {sector}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      Recommendations
                    </h3>
                    <ul className="space-y-2">
                      {analysis.recommendations?.map((rec, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary">→</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">AI Confidence</span>
                      <span className="font-semibold">{Math.round(analysis.confidence * 100)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center py-12">
                <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Ready to Analyze</h3>
                <p className="text-muted-foreground">
                  Select a prebuilt scenario or create your own
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhatIf;
