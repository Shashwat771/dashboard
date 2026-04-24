const { mean, std, quantile, correlation } = require('simple-statistics');

/**
 * Enhanced Insights Service
 * Generates comprehensive statistical, business, and predictive insights from data
 */

class EnhancedInsightsService {
  /**
   * Generate all types of insights from data
   * @param {Array} data - Raw data array
   * @param {Object} config - Dashboard configuration with columns info
   * @returns {Object} Enhanced insights with categories
   */
  static generateInsights(data, config) {
    if (!data || data.length === 0) {
      return {
        statistical: [],
        business: [],
        predictive: [],
      };
    }

    return {
      statistical: this.generateStatisticalInsights(data, config),
      business: this.generateBusinessInsights(data, config),
      predictive: this.generatePredictiveInsights(data, config),
    };
  }

  /**
   * Statistical Insights: Trends, anomalies, correlations, distributions
   */
  static generateStatisticalInsights(data, config) {
    const insights = [];

    // Find numeric columns
    const numericColumns = this.getNumericColumns(data, config);
    
    if (numericColumns.length === 0) return insights;

    // Analyze each numeric column
    numericColumns.forEach((col) => {
      const values = data.map((row) => row[col]).filter((v) => !isNaN(v));
      
      if (values.length < 2) return;

      const avg = mean(values);
      const stdDev = std(values);
      const max = Math.max(...values);
      const min = Math.min(...values);
      const q1 = quantile(values, 0.25);
      const q3 = quantile(values, 0.75);
      const iqr = q3 - q1;

      // Detect outliers (IQR method)
      const outliers = values.filter((v) => v < q1 - 1.5 * iqr || v > q3 + 1.5 * iqr);

      if (outliers.length > 0) {
        insights.push({
          id: `stat-outliers-${col}`,
          type: 'outlier',
          title: 'Outlier Detection',
          description: `Found ${outliers.length} outlier(s) in ${col}. Max deviation: ${Math.max(...outliers.map((v) => Math.abs(v - avg))).toFixed(2)}`,
          severity: outliers.length > values.length * 0.1 ? 'warning' : 'info',
          icon: 'alert-circle',
        });
      }

      // High variance indicator
      const cv = (stdDev / avg) * 100; // Coefficient of variation
      if (cv > 50) {
        insights.push({
          id: `stat-variance-${col}`,
          type: 'variance',
          title: 'High Variability',
          description: `${col} shows high variability (CV: ${cv.toFixed(1)}%). Values range from ${min.toFixed(2)} to ${max.toFixed(2)}.`,
          severity: 'warning',
          icon: 'trending-up',
        });
      }

      // Distribution skewness
      const skewness = this.calculateSkewness(values);
      if (Math.abs(skewness) > 1) {
        const direction = skewness > 0 ? 'right-skewed' : 'left-skewed';
        insights.push({
          id: `stat-skew-${col}`,
          type: 'distribution',
          title: 'Skewed Distribution',
          description: `${col} is ${direction} with skewness of ${skewness.toFixed(2)}, indicating asymmetric distribution.`,
          severity: 'info',
          icon: 'bar-chart-2',
        });
      }
    });

    // Correlation analysis between numeric columns
    if (numericColumns.length >= 2) {
      const correlations = this.findCorrelations(data, numericColumns);
      correlations.forEach((corr) => {
        if (Math.abs(corr.value) > 0.7) {
          insights.push({
            id: `stat-corr-${corr.col1}-${corr.col2}`,
            type: 'correlation',
            title: 'Strong Correlation',
            description: `${corr.col1} and ${corr.col2} show ${corr.value > 0 ? 'positive' : 'negative'} correlation (${corr.value.toFixed(2)}).`,
            severity: 'info',
            icon: 'link-2',
          });
        }
      });
    }

    return insights.slice(0, 4); // Limit to 4 insights
  }

  /**
   * Business Insights: Top/bottom performers, growth drivers, revenue trends
   */
  static generateBusinessInsights(data, config) {
    const insights = [];

    // Find numeric columns (likely revenue/sales metrics)
    const numericColumns = this.getNumericColumns(data, config);
    if (numericColumns.length === 0) return insights;

    // Top performer insight
    const primaryMetric = numericColumns[0];
    const topValue = Math.max(...data.map((row) => row[primaryMetric]).filter((v) => !isNaN(v)));
    const topRow = data.find((row) => row[primaryMetric] === topValue);
    
    if (topRow) {
      const categoryCol = Object.keys(topRow).find((key) => typeof topRow[key] === 'string' && key !== 'id');
      const topLabel = categoryCol ? topRow[categoryCol] : 'Top Performer';
      insights.push({
        id: 'biz-top-performer',
        type: 'top-performer',
        title: 'Top Performer',
        description: `${topLabel} leads with ${primaryMetric} of ${topValue.toFixed(2)}. This represents peak performance.`,
        severity: 'success',
        icon: 'star',
      });
    }

    // Bottom performer insight
    const bottomValue = Math.min(...data.map((row) => row[primaryMetric]).filter((v) => !isNaN(v)));
    const bottomRow = data.find((row) => row[primaryMetric] === bottomValue);
    
    if (bottomRow) {
      const categoryCol = Object.keys(bottomRow).find((key) => typeof bottomRow[key] === 'string' && key !== 'id');
      const bottomLabel = categoryCol ? bottomRow[categoryCol] : 'Bottom Performer';
      const gap = ((topValue - bottomValue) / bottomValue * 100).toFixed(1);
      insights.push({
        id: 'biz-bottom-performer',
        type: 'bottom-performer',
        title: 'Improvement Opportunity',
        description: `${bottomLabel} has ${primaryMetric} of ${bottomValue.toFixed(2)}. ${gap}% growth potential vs top performer.`,
        severity: 'warning',
        icon: 'target',
      });
    }

    // Growth trend insight
    const sortedByValue = [...data]
      .filter((row) => !isNaN(row[primaryMetric]))
      .sort((a, b) => a[primaryMetric] - b[primaryMetric]);
    
    if (sortedByValue.length > 2) {
      const firstQuartile = sortedByValue.slice(0, Math.ceil(sortedByValue.length / 4));
      const lastQuartile = sortedByValue.slice(Math.floor(sortedByValue.length * 0.75));
      
      const firstAvg = mean(firstQuartile.map((row) => row[primaryMetric]));
      const lastAvg = mean(lastQuartile.map((row) => row[primaryMetric]));
      const growth = ((lastAvg - firstAvg) / firstAvg * 100).toFixed(1);
      
      insights.push({
        id: 'biz-growth-trend',
        type: 'growth-trend',
        title: 'Growth Trend',
        description: `Data shows ${growth > 0 ? 'positive' : 'negative'} trend with ${Math.abs(growth)}% change from bottom to top performers.`,
        severity: growth > 0 ? 'success' : 'warning',
        icon: growth > 0 ? 'trending-up' : 'trending-down',
      });
    }

    // Revenue concentration insight
    const avgValue = mean(data.map((row) => row[primaryMetric]).filter((v) => !isNaN(v)));
    const aboveAvg = data.filter((row) => row[primaryMetric] > avgValue).length;
    const concentration = ((aboveAvg / data.length) * 100).toFixed(1);
    
    insights.push({
      id: 'biz-concentration',
      type: 'concentration',
      title: 'Revenue Concentration',
      description: `${concentration}% of items are above average (${avgValue.toFixed(2)}). ${concentration > 50 ? 'Concentrated revenue stream' : 'Well distributed revenue'}.`,
      severity: concentration > 70 ? 'warning' : 'info',
      icon: 'pie-chart',
    });

    return insights.slice(0, 4);
  }

  /**
   * Predictive Insights: Forecasts, recommendations, patterns
   */
  static generatePredictiveInsights(data, config) {
    const insights = [];

    const numericColumns = this.getNumericColumns(data, config);
    if (numericColumns.length === 0) return insights;

    const primaryMetric = numericColumns[0];
    const values = data.map((row) => row[primaryMetric]).filter((v) => !isNaN(v));

    // Trend forecast
    const trend = this.calculateTrend(values);
    if (trend !== 0) {
      insights.push({
        id: 'pred-trend-forecast',
        type: 'forecast',
        title: 'Trend Forecast',
        description: `Data shows ${trend > 0 ? 'upward' : 'downward'} trend. Expect ${trend > 0 ? 'increase' : 'decrease'} in ${primaryMetric} in coming periods.`,
        severity: trend > 0 ? 'success' : 'warning',
        icon: 'zap',
      });
    }

    // Momentum indicator
    const lastFive = values.slice(-5);
    if (lastFive.length === 5) {
      const momentum = lastFive[4] - lastFive[0];
      const direction = momentum > 0 ? 'gaining momentum' : 'losing momentum';
      insights.push({
        id: 'pred-momentum',
        type: 'momentum',
        title: 'Momentum Indicator',
        description: `${direction.charAt(0).toUpperCase() + direction.slice(1)} with recent change of ${momentum.toFixed(2)}. Current pace is ${Math.abs(momentum).toFixed(2)} units.`,
        severity: momentum > 0 ? 'success' : 'warning',
        icon: 'activity',
      });
    }

    // Volatility forecast
    const recentValues = values.slice(-Math.ceil(values.length * 0.3)); // Last 30%
    const volatility = std(recentValues);
    const avgVolatility = std(values);
    
    if (volatility > avgVolatility * 1.2) {
      insights.push({
        id: 'pred-volatility',
        type: 'volatility',
        title: 'Increased Volatility',
        description: `Recent volatility (${volatility.toFixed(2)}) is ${((volatility / avgVolatility - 1) * 100).toFixed(0)}% higher than average. Exercise caution in planning.`,
        severity: 'warning',
        icon: 'alert-triangle',
      });
    } else {
      insights.push({
        id: 'pred-stability',
        type: 'stability',
        title: 'Market Stability',
        description: `Current volatility (${volatility.toFixed(2)}) is stable. Good conditions for confident planning and forecasting.`,
        severity: 'success',
        icon: 'shield',
      });
    }

    // Recommendation insight
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const range = maxValue - minValue;
    const currentAvg = mean(recentValues);
    const recommendation =
      currentAvg > mean(values) ? 'Capitalize on strong performance' : 'Focus on operational improvements';
    
    insights.push({
      id: 'pred-recommendation',
      type: 'recommendation',
      title: 'Strategic Recommendation',
      description: `${recommendation}. Current performance is ${currentAvg > mean(values) ? 'above' : 'below'} historical average. ${range > std(values) * 3 ? 'High variance suggests need for stability measures.' : ''}`,
      severity: 'info',
      icon: 'lightbulb',
    });

    return insights.slice(0, 4);
  }

  // Helper Methods
  static getNumericColumns(data, config) {
    if (data.length === 0) return [];
    const firstRow = data[0];
    return Object.keys(firstRow).filter((key) => {
      return data.some((row) => !isNaN(row[key]) && row[key] !== null && row[key] !== '');
    });
  }

  static calculateSkewness(values) {
    const avg = mean(values);
    const stdDev = std(values);
    const n = values.length;
    const m3 = mean(values.map((v) => Math.pow(v - avg, 3)));
    return m3 / Math.pow(stdDev, 3);
  }

  static findCorrelations(data, columns) {
    const correlations = [];
    for (let i = 0; i < columns.length; i++) {
      for (let j = i + 1; j < columns.length; j++) {
        const col1Values = data.map((row) => row[columns[i]]).filter((v) => !isNaN(v));
        const col2Values = data.map((row) => row[columns[j]]).filter((v) => !isNaN(v));
        
        if (col1Values.length === col2Values.length) {
          const corr = correlation(col1Values, col2Values);
          if (!isNaN(corr)) {
            correlations.push({
              col1: columns[i],
              col2: columns[j],
              value: corr,
            });
          }
        }
      }
    }
    return correlations;
  }

  static calculateTrend(values) {
    if (values.length < 3) return 0;
    const n = values.length;
    const xMean = (n - 1) / 2;
    const yMean = mean(values);
    
    let numerator = 0;
    let denominator = 0;
    
    for (let i = 0; i < n; i++) {
      numerator += (i - xMean) * (values[i] - yMean);
      denominator += Math.pow(i - xMean, 2);
    }
    
    return denominator !== 0 ? numerator / denominator : 0;
  }
}

module.exports = EnhancedInsightsService;
