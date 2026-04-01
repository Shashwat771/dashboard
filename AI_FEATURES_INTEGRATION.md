# AI Features Integration Guide

This document explains how to integrate the new AI-powered features into the Enhanced Analytics Dashboard (EAD).

## Features Added

### 1. AI Insights Panel ✨
Generate AI-powered insights with trends, predictions, and summaries.

**Component**: `frontend/src/components/AIInsightsPanel.jsx`

**Usage in Dashboard**:
```jsx
import AIInsightsPanel from './AIInsightsPanel';

// Add to Dashboard state
const [showInsights, setShowInsights] = useState(false);

// Add button to header
<button onClick={() => setShowInsights(true)}>
  🤖 AI Insights
</button>

// Add panel
{showInsights && (
  <AIInsightsPanel
    data={data}
    columns={columns}
    analysis={analysis}
    charts={charts}
    onClose={() => setShowInsights(false)}
  />
)}
```

**API Endpoint**:
- POST `/api/dashboard/insights`
- Required: `data`, `columns`, `analysis`
- Optional: `charts`

### 2. Natural Language Query Box 🔍
Ask questions about your data like "Show sales in 2023"

**Component**: `frontend/src/components/NLQueryBox.jsx`

**Usage in Dashboard**:
```jsx
import NLQueryBox from './NLQueryBox';

<NLQueryBox
  charts={charts}
  columns={columns}
  data={data}
  onQueryResult={(result) => {
    // Handle query result
    // result.matchingCharts - array of matching charts
    // result.suggestedChart - new chart config if needed
  }}
  onGenerateChart={(chartConfig) => {
    // Handle new chart generation
    setCharts([...charts, chartConfig]);
  }}
/>
```

**API Endpoints**:
- POST `/api/dashboard/nl-query` - Interpret query and find matching charts
- POST `/api/dashboard/chart-from-query` - Generate new chart from query

**Features**:
- Suggests matching existing charts
- Shows relevance score (0-100%)
- Recommends new charts if needed
- Maintains query history
- Touch-friendly suggestions

### 3. Chart Exporter 📥
Download charts as PNG or PDF with high quality and metadata.

**Component**: `frontend/src/components/ChartExporter.jsx`

**Usage in Chart Card**:
```jsx
import ChartExporter from './ChartExporter';

<div className="chart-card">
  <div className="chart-header">
    <h3>{chartTitle}</h3>
    <ChartExporter 
      chartElement={chartRef.current}
      chartTitle={chartTitle}
    />
  </div>
  
  <div ref={chartRef} className="chart-body">
    {/* Your chart component */}
  </div>
</div>
```

**Features**:
- Export as PNG: High-quality 2x scale image
- Export as PDF: With title, date, and metadata
- Batch export: Export multiple charts as PDF report
- Progress indicator
- Touch-friendly menu

**Utilities**:
```jsx
import { 
  exportChartAsPNG, 
  exportChartAsPDF,
  exportChartsAsPDFReport,
  getTimestampFileName
} from '../utils/chartExport';
```

## Complete Integration Example

Here's how to integrate all features into `Dashboard.jsx`:

```jsx
import React, { useState, useRef } from 'react';
import AIInsightsPanel from './AIInsightsPanel';
import NLQueryBox from './NLQueryBox';
import ChartExporter from './ChartExporter';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [analysis, setAnalysis] = useState({});
  const [charts, setCharts] = useState([]);
  const [showInsights, setShowInsights] = useState(false);
  const chartRefs = useRef({});

  // Your existing dashboard code...

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Enhanced Analytics Dashboard</h1>
        
        {/* AI Insights Button */}
        <button 
          className="ai-button"
          onClick={() => setShowInsights(true)}
        >
          🤖 AI Insights
        </button>
      </header>

      {/* Natural Language Query Box */}
      <NLQueryBox
        charts={charts}
        columns={columns}
        data={data}
        onQueryResult={(result) => {
          console.log('Query result:', result);
          // Highlight matching charts
        }}
        onGenerateChart={(chartConfig) => {
          setCharts([...charts, chartConfig]);
        }}
      />

      {/* Charts with Export */}
      <div className="charts-section">
        {charts.map((chart, idx) => (
          <div key={idx} className="chart-card" ref={(el) => {
            chartRefs.current[chart.id] = el;
          }}>
            <div className="chart-header">
              <h3>{chart.title}</h3>
              <ChartExporter
                chartElement={chartRefs.current[chart.id]}
                chartTitle={chart.title}
              />
            </div>
            {/* Your chart rendering */}
          </div>
        ))}
      </div>

      {/* AI Insights Panel */}
      {showInsights && (
        <AIInsightsPanel
          data={data}
          columns={columns}
          analysis={analysis}
          charts={charts}
          onClose={() => setShowInsights(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
```

## API Response Examples

### AI Insights Response
```json
{
  "success": true,
  "insightsReport": {
    "trends": [
      {
        "title": "Upward Trend",
        "description": "Sales increasing month over month",
        "impact": "positive",
        "confidence": 85
      }
    ],
    "predictions": [
      {
        "title": "Expected Growth",
        "forecast": "Continued growth expected",
        "timeframe": "Next quarter",
        "riskLevel": "low"
      }
    ],
    "summary": "Dataset shows positive trends...",
    "recommendations": [
      "Monitor top-performing categories",
      "Investigate outliers"
    ],
    "keyMetrics": {
      "Total Records": 1000,
      "Average Value": 250
    }
  }
}
```

### NL Query Response
```json
{
  "success": true,
  "queryResult": {
    "interpretation": "User wants to see sales data for 2023",
    "matchingCharts": [
      {
        "chartId": "chart1",
        "relevance": 95,
        "reason": "This chart shows 2023 sales by region"
      }
    ],
    "suggestedChart": {
      "title": "2023 Sales Trend",
      "type": "line",
      "xAxis": "month",
      "yAxis": "sales",
      "description": "Monthly sales trend for 2023"
    },
    "filters": {
      "year": ["2023"]
    },
    "followUpQuestion": "Would you like to see this broken down by product category?"
  }
}
```

## Environment Variables

No additional environment variables needed. The system uses the existing `GEMINI_API_KEY`.

## Dependencies Added

```json
{
  "html2canvas": "^1.4.1",  // Chart to image conversion
  "jspdf": "^2.5.1"          // PDF generation
}
```

## File Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── AIInsightsPanel.jsx      ✨ New
│   │   ├── NLQueryBox.jsx           🔍 New
│   │   ├── ChartExporter.jsx        📥 New
│   │   └── Dashboard.jsx            (Updated)
│   ├── utils/
│   │   └── chartExport.js           📁 New
│   └── styles/
│       └── AIFeatures.css           🎨 New

backend/
├── src/
│   ├── services/
│   │   ├── aiQuery.js               ⚡ New
│   │   └── gemini.js                (Existing)
│   ├── controllers/
│   │   └── dashboard.controller.js  (Updated)
│   └── routes/
│       └── dashboard.route.js       (Updated)
```

## Key Features

✅ **AI Insights**
- Trend analysis
- Predictions with confidence levels
- Executive summary
- Actionable recommendations
- Key metrics dashboard

✅ **Natural Language Queries**
- Understands user intent
- Matches existing charts
- Suggests new charts
- Shows relevance scores
- Query history tracking
- Smart suggestions

✅ **Chart Export**
- High-quality PNG (2x scale)
- Professional PDF with metadata
- Batch PDF reports
- Progress indicators
- Touch-friendly interface
- Responsive on all devices

## Responsive Design

All components are fully responsive:
- **Desktop**: Full feature set (320px-2560px+)
- **Tablet**: Optimized layouts (768px-1024px)
- **Mobile**: Touch-friendly, single column (320px-767px)
- **Ultra-mobile**: Compact UI (<320px)

## Caching & Performance

- Insights and query results are cached to prevent duplicate API calls
- Clear cache on new data upload
- Retry logic with exponential backoff for API failures
- Graceful fallbacks when API quota exceeded

## Troubleshooting

**Issue**: "Failed to generate insights"
- Check GEMINI_API_KEY is set
- Verify data is properly formatted
- Check API quota

**Issue**: Export not working
- Ensure chartElement ref is properly connected
- Check browser console for errors
- Verify html2canvas and jsPDF are installed

**Issue**: Query returns no matches
- Data may not match the query
- Try rephrasing the question
- Check available columns

## Future Enhancements

- Voice input for natural language queries
- Custom prompt templates for insights
- Scheduled report generation
- Multi-language support
- Chart customization before export
- Collaborative annotations
