import React, { useState, useRef } from 'react';
import { exportChartAsPNG, exportChartAsPDF, getTimestampFileName } from '../utils/chartExport';
import '../styles/AIFeatures.css';

const ChartExporter = ({ chartElement, chartTitle = 'Chart' }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState(null);
  const [progress, setProgress] = useState(0);
  const menuRef = useRef(null);

  const handleExport = async (format) => {
    try {
      setExporting(true);
      setExportFormat(format);
      setProgress(30);

      const fileName = getTimestampFileName(chartTitle.replace(/\s+/g, '-'));

      if (format === 'png') {
        setProgress(60);
        await exportChartAsPNG(chartElement, fileName);
      } else if (format === 'pdf') {
        setProgress(60);
        await exportChartAsPDF(chartElement, {
          fileName,
          title: chartTitle,
          subtitle: `Generated on ${new Date().toLocaleDateString()}`,
        });
      }

      setProgress(100);
      setTimeout(() => {
        setShowMenu(false);
        setExporting(false);
        setProgress(0);
        setExportFormat(null);
      }, 500);
    } catch (error) {
      console.error('[v0] Export error:', error);
      setExporting(false);
      alert(`Export failed: ${error.message}`);
    }
  };

  const exportOptions = [
    {
      id: 'png',
      label: 'PNG Image',
      icon: '🖼️',
      description: 'High-quality image',
    },
    {
      id: 'pdf',
      label: 'PDF Document',
      icon: '📄',
      description: 'PDF with metadata',
    },
  ];

  return (
    <div className="chart-exporter">
      <div className="ce-trigger" ref={menuRef}>
        <button
          className="ce-btn"
          onClick={() => setShowMenu(!showMenu)}
          title="Export chart"
          aria-label="Export options"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          <span className="ce-label">Export</span>
        </button>

        {showMenu && !exporting && (
          <div className="ce-menu">
            <div className="cem-header">
              <h4>Export Chart</h4>
              <button
                className="cem-close"
                onClick={() => setShowMenu(false)}
              >
                ✕
              </button>
            </div>

            <div className="cem-options">
              {exportOptions.map((option) => (
                <button
                  key={option.id}
                  className="cem-option"
                  onClick={() => handleExport(option.id)}
                  disabled={exporting}
                >
                  <span className="cemo-icon">{option.icon}</span>
                  <div className="cemo-content">
                    <div className="cemo-label">{option.label}</div>
                    <div className="cemo-desc">{option.description}</div>
                  </div>
                  <span className="cemo-arrow">→</span>
                </button>
              ))}
            </div>

            <div className="cem-footer">
              <p className="cem-note">
                💡 High-resolution export at 2x scale
              </p>
            </div>
          </div>
        )}

        {exporting && (
          <div className="ce-exporting">
            <div className="cee-spinner"></div>
            <div className="cee-status">
              <div className="cee-label">
                Exporting as {exportFormat?.toUpperCase()}
              </div>
              <div className="cee-progress">
                <div className="ceep-bar" style={{width: `${progress}%`}}></div>
              </div>
              <div className="cee-percent">{progress}%</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Batch Export Button - Export multiple charts at once
 */
export const BatchExporter = ({ charts = [], reportTitle = 'Data Report' }) => {
  const [exporting, setExporting] = useState(false);
  const [format, setFormat] = useState(null);

  const handleBatchExport = async (exportFormat) => {
    try {
      setExporting(true);
      setFormat(exportFormat);

      // Dynamic import to avoid circular dependency
      const { exportChartsAsPDFReport } = await import('../utils/chartExport');

      const chartData = charts.map((chart) => ({
        element: chart.element,
        title: chart.title || 'Chart',
      }));

      const fileName = getTimestampFileName(reportTitle.replace(/\s+/g, '-'));

      if (exportFormat === 'pdf') {
        await exportChartsAsPDFReport(chartData, {
          reportTitle,
          fileName,
        });
      }

      setTimeout(() => {
        setExporting(false);
        setFormat(null);
      }, 1000);
    } catch (error) {
      console.error('[v0] Batch export error:', error);
      setExporting(false);
      alert(`Export failed: ${error.message}`);
    }
  };

  return (
    <div className="batch-exporter">
      <button
        className="be-btn"
        onClick={() => handleBatchExport('pdf')}
        disabled={exporting || charts.length === 0}
        title="Export all charts as PDF report"
      >
        {exporting ? (
          <>
            <span className="be-spinner"></span>
            Exporting...
          </>
        ) : (
          <>
            <span>📑</span>
            Export All ({charts.length})
          </>
        )}
      </button>
    </div>
  );
};

export default ChartExporter;
