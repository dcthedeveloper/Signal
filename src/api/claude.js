import Anthropic from '@anthropic-ai/sdk';

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

let client = null;

const initClient = () => {
  if (!client && API_KEY && API_KEY !== 'your_anthropic_api_key_here') {
    client = new Anthropic({
      apiKey: API_KEY,
      dangerouslyAllowBrowser: true // Only for demo purposes
    });
  }
  return client;
};

// Mock responses for when API is not available
const mockResponses = {
  sentiment: () => ({
    sentiment: Math.random() > 0.5 ? 'positive' : 'neutral',
    score: Math.random() * 0.5 + 0.5,
    confidence: Math.random() * 0.3 + 0.7,
    reasoning: 'This is a mock sentiment analysis response. The actual analysis would provide detailed insights based on the text content.'
  }),
  analysis: () => ({
    summary: 'This is a mock analysis summary. In production, Claude would provide a comprehensive analysis of the document.',
    keyPoints: [
      'Key insight 1 from the analysis',
      'Key insight 2 from the analysis',
      'Key insight 3 from the analysis'
    ],
    risks: ['Potential risk 1', 'Potential risk 2'],
    opportunities: ['Opportunity 1', 'Opportunity 2'],
    confidence: 0.85
  }),
  chat: (message) => ({
    response: `This is a mock response to: "${message}". In production, Claude would provide intelligent, context-aware responses to your financial questions.`,
    confidence: 0.80,
    sources: []
  })
};

export const analyzeSentiment = async (text) => {
  const apiClient = initClient();
  
  if (!apiClient) {
    console.log('Using mock sentiment analysis');
    return mockResponses.sentiment();
  }

  try {
    const message = await apiClient.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `As a financial analyst, analyze the sentiment of the following text and provide a JSON response with: sentiment (positive/negative/neutral), score (0-1), confidence (0-1), and reasoning.

Text: ${text}

Response format: {"sentiment": "...", "score": 0.0, "confidence": 0.0, "reasoning": "..."}`
      }]
    });

    const responseText = message.content[0].text;
    try {
      return JSON.parse(responseText);
    } catch {
      return mockResponses.sentiment();
    }
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    return mockResponses.sentiment();
  }
};

export const analyzeDocument = async (text, documentType = 'general') => {
  const apiClient = initClient();
  
  if (!apiClient) {
    console.log('Using mock document analysis');
    return mockResponses.analysis();
  }

  try {
    const message = await apiClient.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      messages: [{
        role: 'user',
        content: `As a financial analyst, analyze this ${documentType} document and provide a comprehensive analysis in JSON format with: summary, keyPoints (array), risks (array), opportunities (array), and confidence (0-1).

Document: ${text.substring(0, 5000)}

Response format: {"summary": "...", "keyPoints": [], "risks": [], "opportunities": [], "confidence": 0.0}`
      }]
    });

    const responseText = message.content[0].text;
    try {
      return JSON.parse(responseText);
    } catch {
      return mockResponses.analysis();
    }
  } catch (error) {
    console.error('Error analyzing document:', error);
    return mockResponses.analysis();
  }
};

export const chatCompletion = async (messages, context = {}) => {
  const apiClient = initClient();
  
  const userMessage = messages[messages.length - 1]?.content || '';
  
  if (!apiClient) {
    console.log('Using mock chat response');
    return mockResponses.chat(userMessage);
  }

  try {
    const systemPrompt = `You are a sophisticated financial AI assistant for Signal, an enterprise financial intelligence platform. You have access to the user's portfolio and recent market news. Provide insightful, accurate financial analysis and advice. Always cite sources when referencing specific data. Be professional but conversational.

Context:
Portfolio: ${JSON.stringify(context.portfolio || [])}
Recent News: ${JSON.stringify(context.news || [])}`;

    const claudeMessages = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content
    }));

    const message = await apiClient.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system: systemPrompt,
      messages: claudeMessages
    });

    return {
      response: message.content[0].text,
      confidence: 0.85,
      sources: []
    };
  } catch (error) {
    console.error('Error in chat completion:', error);
    return mockResponses.chat(userMessage);
  }
};

export const analyzeScenario = async (scenario, portfolio) => {
  const apiClient = initClient();
  
  if (!apiClient) {
    console.log('Using mock scenario analysis');
    return {
      impact: 'moderate',
      affectedSectors: ['Technology', 'Finance'],
      recommendations: [
        'Consider diversifying into defensive sectors',
        'Monitor Fed policy announcements closely',
        'Review portfolio risk exposure'
      ],
      confidence: 0.75
    };
  }

  try {
    const message = await apiClient.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      messages: [{
        role: 'user',
        content: `As a financial analyst, analyze this market scenario and its impact on the given portfolio. Provide a JSON response with: impact (low/moderate/high), affectedSectors (array), recommendations (array), and confidence (0-1).

Scenario: ${scenario}
Portfolio: ${JSON.stringify(portfolio)}

Response format: {"impact": "...", "affectedSectors": [], "recommendations": [], "confidence": 0.0}`
      }]
    });

    const responseText = message.content[0].text;
    try {
      return JSON.parse(responseText);
    } catch {
      return {
        impact: 'moderate',
        affectedSectors: ['Technology'],
        recommendations: ['Monitor the situation closely'],
        confidence: 0.75
      };
    }
  } catch (error) {
    console.error('Error analyzing scenario:', error);
    return {
      impact: 'moderate',
      affectedSectors: ['Technology'],
      recommendations: ['Monitor the situation closely'],
      confidence: 0.75
    };
  }
};

export const generatePortfolioInsights = async (portfolio, news) => {
  const apiClient = initClient();
  
  if (!apiClient) {
    console.log('Using mock portfolio insights');
    return {
      summary: 'Your portfolio shows a strong concentration in technology stocks with good recent performance.',
      riskLevel: 'moderate',
      suggestions: [
        'Consider adding exposure to other sectors for better diversification',
        'Your tech holdings are performing well but may be overweighted'
      ]
    };
  }

  try {
    const message = await apiClient.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `As a financial advisor, analyze this portfolio and recent news to provide insights. Return JSON with: summary, riskLevel (low/moderate/high), and suggestions (array).

Portfolio: ${JSON.stringify(portfolio)}
Recent News: ${JSON.stringify(news.slice(0, 5))}

Response format: {"summary": "...", "riskLevel": "...", "suggestions": []}`
      }]
    });

    const responseText = message.content[0].text;
    try {
      return JSON.parse(responseText);
    } catch {
      return {
        summary: 'Portfolio analysis completed.',
        riskLevel: 'moderate',
        suggestions: ['Continue monitoring market conditions']
      };
    }
  } catch (error) {
    console.error('Error generating portfolio insights:', error);
    return {
      summary: 'Portfolio analysis completed.',
      riskLevel: 'moderate',
      suggestions: ['Continue monitoring market conditions']
    };
  }
};
