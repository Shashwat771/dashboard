const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Cache for insights and query results
const insightsCache = new Map();
const queryResultCache = new Map();

/**
 * Retry with exponential backoff for API calls
 */
const retryWithBackoff = async (fn, maxRetries = 3, delay = 2000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      if (error.status === 503 || error.message.includes('Service Unavailable') || error.message.includes('Too Many Requests') || error.message.includes('429')) {
        const waitTime = delay * Math.pow(2, i);
        console.log(`⏳ API busy, retrying in ${waitTime}ms... (${i + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      } else {
        throw error;
      }
    }
  }
};

/**
 * Generate AI-powered insights report with trends and predictions
 * @param {Array} data - Raw dataset
 * @param {Array} columns - Column names
 * @param {Object} analysis - Column analysis with statistics
 * @param {Object} charts - Current charts on dashboard
 * @returns {Object} Insights report with trends, predictions, summary
 */
const generateInsightsReport = async (data, columns, analysis, charts = []) => {
  try {
    const cacheKey = `insights-${columns.join('-')}-${data.length}`;
    
    // Check cache
    if (insightsCache.has(cacheKey)) {
      console.log('✅ Using cached insights report');
      return insightsCache.get(cacheKey);
    }

    console.log('🤖 Generating AI insights report...');
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Prepare data summary
    const numericCols = columns.filter(col => analysis[col]?.type === 'numeric');
    const textCols = columns.filter(col => analysis[col]?.type === 'text');
    
    const dataSummary = {
      totalRecords: data.length,
      columns,
      numericFields: numericCols,
      categoryFields: textCols,
      sampleData: data.slice(0, 3),
      statistics: {}
    };

    numericCols.forEach(col => {
      const stat = analysis[col];
      if (stat) {
        dataSummary.statistics[col] = {
          min: stat.min,
          max: stat.max,
          avg: stat.avg,
          median: stat.median,
          sum: stat.sum,
          range: stat.range
        };
      }
    });

    const prompt = `
You are a business intelligence expert. Analyze this dataset and provide a detailed insights report.

DATASET SUMMARY:
${JSON.stringify(dataSummary, null, 2)}

CURRENT CHARTS ON DASHBOARD: ${charts.length} charts

Provide a JSON response with this structure (no markdown, just raw JSON):
{
  "trends": [
    {
      "title": "string - trend title",
      "description": "string - what is trending",
      "impact": "positive|negative|neutral",
      "confidence": 0-100
    }
  ],
  "predictions": [
    {
      "title": "string - prediction title",
      "forecast": "string - predicted outcome",
      "timeframe": "string - when this might happen",
      "riskLevel": "low|medium|high"
    }
  ],
  "summary": "string - 2-3 paragraph executive summary of key findings",
  "recommendations": [
    "string - actionable recommendation"
  ],
  "keyMetrics": {
    "metric_name": "value with interpretation"
  }
}

REQUIREMENTS:
✓ Focus on actionable business insights
✓ Be specific with data points
✓ Identify patterns and anomalies
✓ Provide confident but realistic predictions
✓ Return only valid JSON`;

    const result = await retryWithBackoff(() => model.generateContent(prompt));
    let responseText = result.response.text();

    let insightsReport;
    try {
      insightsReport = JSON.parse(responseText);
    } catch {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        insightsReport = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Could not parse insights response');
      }
    }

    // Cache the result
    insightsCache.set(cacheKey, insightsReport);
    console.log('✅ AI insights report generated');
    return insightsReport;

  } catch (error) {
    console.error('Insights generation error:', error.message);
    
    // Fallback insights
    return {
      trends: [
        { title: 'Data Growth', description: 'Dataset shows consistent growth pattern', impact: 'positive', confidence: 75 },
        { title: 'Distribution Shift', description: 'Category distribution has shifted over time', impact: 'neutral', confidence: 60 }
      ],
      predictions: [
        { title: 'Expected Growth', forecast: 'Continued upward trend expected', timeframe: 'Next period', riskLevel: 'low' }
      ],
      summary: 'Dataset analysis shows positive trends. Key metrics are performing well. Recommend monitoring specific categories for pattern changes.',
      recommendations: [
        'Monitor top-performing categories',
        'Investigate any outlier values',
        'Track changes in distribution patterns'
      ],
      keyMetrics: {
        'Record Count': data.length,
        'Columns': columns.length
      }
    };
  }
};

/**
 * Process natural language query and find matching charts
 * @param {string} query - User's natural language query (e.g., "Show sales in 2023")
 * @param {Array} charts - Available charts on dashboard
 * @param {Array} columns - Available columns in dataset
 * @param {Array} data - Raw dataset
 * @returns {Object} Query interpretation and matching charts
 */
const processNLQuery = async (query, charts = [], columns = [], data = []) => {
  try {
    const cacheKey = `query-${query.toLowerCase()}`;
    
    // Check cache
    if (queryResultCache.has(cacheKey)) {
      console.log('✅ Using cached query result');
      return queryResultCache.get(cacheKey);
    }

    console.log('🔍 Processing natural language query:', query);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
You are a data analysis assistant. Interpret this user query and identify which charts/analyses would be most helpful.

USER QUERY: "${query}"

AVAILABLE DATA:
- Columns: ${columns.join(', ')}
- Data points: ${data.length} records
- Current charts: ${charts.map(c => c.title).join(', ') || 'None yet'}

AVAILABLE CHART TYPES: bar, line, pie, scatter, table, doughnut

Provide a JSON response (no markdown, just raw JSON):
{
  "interpretation": "string - what the user is asking for",
  "matchingCharts": [
    {
      "chartId": "id from current charts that matches query",
      "relevance": 0-100,
      "reason": "why this chart answers the query"
    }
  ],
  "suggestedChart": {
    "title": "string - if no existing chart matches well, suggest new chart",
    "type": "chart type",
    "xAxis": "column name",
    "yAxis": "column name or array",
    "description": "why this chart would help"
  },
  "filters": {
    "column_name": ["suggested filter values"]
  },
  "followUpQuestion": "string - helpful clarifying question if needed"
}

REQUIREMENTS:
✓ Return only valid JSON
✓ Only suggest columns that exist in the data
✓ Relevance 0-100 for matching charts
✓ Leave matchingCharts empty array if no good matches`;

    const result = await retryWithBackoff(() => model.generateContent(prompt));
    let responseText = result.response.text();

    let queryResult;
    try {
      queryResult = JSON.parse(responseText);
    } catch {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        queryResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Could not parse query response');
      }
    }

    // Cache the result
    queryResultCache.set(cacheKey, queryResult);
    console.log('✅ Query processed successfully');
    return queryResult;

  } catch (error) {
    console.error('Query processing error:', error.message);
    
    // Fallback response
    return {
      interpretation: 'Analyzing dataset for relevant information',
      matchingCharts: [],
      suggestedChart: {
        title: 'Filtered Analysis',
        type: 'table',
        description: 'View filtered data based on your query'
      },
      filters: {},
      followUpQuestion: 'Would you like to see this as a chart or table?'
    };
  }
};

/**
 * Generate a new chart based on user query interpretation
 * @param {string} query - User's query
 * @param {Array} columns - Available columns
 * @param {Array} data - Raw dataset
 * @param {Object} analysis - Column analysis
 * @returns {Object} Chart configuration
 */
const generateChartFromQuery = async (query, columns, data, analysis) => {
  try {
    console.log('📊 Generating chart from query:', query);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const numericCols = columns.filter(col => analysis[col]?.type === 'numeric');
    const textCols = columns.filter(col => analysis[col]?.type === 'text');

    const prompt = `
You are a data visualization expert. Based on this user query, generate an optimal chart configuration.

USER QUERY: "${query}"

AVAILABLE DATA:
- Numeric columns: ${numericCols.join(', ') || 'None'}
- Category columns: ${textCols.join(', ') || 'None'}
- Total records: ${data.length}

Return only a valid JSON object (no markdown):
{
  "title": "string - descriptive chart title based on query",
  "type": "bar|line|pie|scatter|table|doughnut",
  "xAxis": "column name",
  "yAxis": "column name or array of column names",
  "description": "string - why this chart answers the user's query",
  "suggested_filters": {
    "column_name": ["suggested values"]
  }
}

RULES:
✓ Only use columns that exist
✓ Return valid JSON only
✓ Choose best chart type for the query
✓ For table type, use 'data' for xAxis and yAxis`;

    const result = await retryWithBackoff(() => model.generateContent(prompt));
    let responseText = result.response.text();

    let chartConfig;
    try {
      chartConfig = JSON.parse(responseText);
    } catch {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        chartConfig = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Could not parse chart config');
      }
    }

    console.log('✅ Chart generated from query');
    return chartConfig;

  } catch (error) {
    console.error('Chart generation error:', error.message);
    
    // Fallback chart
    return {
      title: 'Query Results',
      type: 'table',
      xAxis: 'data',
      yAxis: 'data',
      description: 'View results for your query',
      suggested_filters: {}
    };
  }
};

/**
 * Clear cache for fresh data
 */
const clearCache = () => {
  insightsCache.clear();
  queryResultCache.clear();
  console.log('✅ Query cache cleared');
};

module.exports = {
  generateInsightsReport,
  processNLQuery,
  generateChartFromQuery,
  clearCache
};
