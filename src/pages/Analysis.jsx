import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Sparkles } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from '../components/shared/ui';
import { analyzeDocument } from '../api/claude';
import { LoadingSkeleton } from '../components/shared/LoadingSkeleton';

const Analysis = () => {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const sampleDocuments = [
    {
      title: 'Q4 Earnings Call Transcript',
      text: 'We are pleased to report record-breaking revenue this quarter, exceeding analyst expectations by 15%. Our cloud services division showed exceptional growth of 40% year-over-year, driven by strong enterprise adoption. However, we face headwinds in consumer hardware due to supply chain constraints. Looking ahead, we remain optimistic about our product pipeline and expect continued momentum in our high-margin software business.'
    },
    {
      title: 'Market Analysis Report',
      text: 'The technology sector continues to demonstrate resilience despite macroeconomic uncertainties. AI and machine learning investments are driving innovation across all major players. However, regulatory scrutiny and valuation concerns pose risks. We recommend a balanced approach with focus on companies with strong cash flows and sustainable competitive advantages.'
    }
  ];

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const result = await analyzeDocument(text, 'financial');
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing document:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const loadSample = (doc) => {
    setText(doc.text);
    setAnalysis(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Document Analysis</h1>
        <p className="text-muted-foreground">
          AI-powered NLP analysis with Claude Sonnet 4.5
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Input Document
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                className="w-full min-h-[300px] p-4 border rounded-md bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Paste earnings transcripts, financial reports, news articles, or any financial document here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              
              <div className="flex gap-2">
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !text.trim()}
                  className="gap-2 flex-1"
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
                      <Sparkles className="h-4 w-4" />
                      Analyze with AI
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sample Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Sample Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {sampleDocuments.map((doc, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => loadSample(doc)}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  {doc.title}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
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
                    <CardTitle>Analysis Results</CardTitle>
                    <Badge variant="success">
                      {Math.round(analysis.confidence * 100)}% Confidence
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Summary</h3>
                    <p className="text-sm text-muted-foreground">{analysis.summary}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Key Points</h3>
                    <ul className="space-y-1">
                      {analysis.keyPoints?.map((point, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-primary">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {analysis.risks && analysis.risks.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2 text-red-600">Risk Factors</h3>
                      <ul className="space-y-1">
                        {analysis.risks.map((risk, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex gap-2">
                            <span className="text-red-600">⚠</span>
                            <span>{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {analysis.opportunities && analysis.opportunities.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2 text-green-600">Opportunities</h3>
                      <ul className="space-y-1">
                        {analysis.opportunities.map((opp, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex gap-2">
                            <span className="text-green-600">✓</span>
                            <span>{opp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center py-12">
                <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Ready to Analyze</h3>
                <p className="text-muted-foreground">
                  Enter or select a document to get AI-powered insights
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analysis;
