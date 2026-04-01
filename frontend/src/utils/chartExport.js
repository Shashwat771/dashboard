import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Export chart as PNG image
 * @param {HTMLElement} chartElement - The chart DOM element to export
 * @param {string} fileName - Name for the PNG file
 * @returns {Promise<void>}
 */
export const exportChartAsPNG = async (chartElement, fileName = 'chart.png') => {
  try {
    if (!chartElement) {
      throw new Error('Chart element not found');
    }

    // Show a temporary export indicator
    const originalStyle = chartElement.style.cssText;
    
    // Capture the chart
    const canvas = await html2canvas(chartElement, {
      scale: 2, // Higher resolution
      backgroundColor: '#ffffff',
      allowTaint: true,
      useCORS: true,
    });

    // Restore original style
    chartElement.style.cssText = originalStyle;

    // Create download link
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = fileName.endsWith('.png') ? fileName : `${fileName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log(`[v0] Chart exported as PNG: ${fileName}`);
  } catch (error) {
    console.error('[v0] PNG export error:', error);
    throw new Error(`Failed to export PNG: ${error.message}`);
  }
};

/**
 * Export chart as PDF
 * @param {HTMLElement} chartElement - The chart DOM element to export
 * @param {Object} options - Export options
 * @param {string} options.fileName - PDF file name
 * @param {string} options.title - Chart title for PDF
 * @param {string} options.subtitle - Optional subtitle
 * @returns {Promise<void>}
 */
export const exportChartAsPDF = async (
  chartElement,
  options = {}
) => {
  try {
    if (!chartElement) {
      throw new Error('Chart element not found');
    }

    const {
      fileName = 'chart.pdf',
      title = 'Chart Report',
      subtitle = '',
    } = options;

    // Capture the chart
    const canvas = await html2canvas(chartElement, {
      scale: 2,
      backgroundColor: '#ffffff',
      allowTaint: true,
      useCORS: true,
    });

    // Get canvas dimensions
    const imgWidth = 190; // A4 width minus margins
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageHeight = pdf.internal.pageSize.getHeight();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 10;

    // Add title
    pdf.setFontSize(18);
    pdf.setFont(undefined, 'bold');
    pdf.text(title, margin, margin + 5);

    // Add subtitle if provided
    if (subtitle) {
      pdf.setFontSize(12);
      pdf.setFont(undefined, 'normal');
      pdf.text(subtitle, margin, margin + 12);
    }

    // Add chart image
    const chartStartY = subtitle ? margin + 18 : margin + 12;
    const imgData = canvas.toDataURL('image/png');
    
    // Check if chart fits on one page
    if (imgHeight + chartStartY + margin > pageHeight) {
      // Multi-page support
      let heightLeft = imgHeight;
      let position = chartStartY;

      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - chartStartY - margin;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', margin, 10, imgWidth, imgHeight);
        heightLeft -= pageHeight - 20;
      }
    } else {
      pdf.addImage(imgData, 'PNG', margin, chartStartY, imgWidth, imgHeight);
    }

    // Add metadata footer
    pdf.setFontSize(8);
    pdf.setFont(undefined, 'normal');
    pdf.setTextColor(128);
    const footerY = pageHeight - 10;
    pdf.text(
      `Generated on ${new Date().toLocaleString()} | DataViz AI`,
      margin,
      footerY
    );

    // Save PDF
    pdf.save(fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`);
    console.log(`[v0] Chart exported as PDF: ${fileName}`);
  } catch (error) {
    console.error('[v0] PDF export error:', error);
    throw new Error(`Failed to export PDF: ${error.message}`);
  }
};

/**
 * Export multiple charts to a single PDF report
 * @param {Array} charts - Array of { element, title }
 * @param {Object} options - Report options
 * @returns {Promise<void>}
 */
export const exportChartsAsPDFReport = async (charts, options = {}) => {
  try {
    if (!Array.isArray(charts) || charts.length === 0) {
      throw new Error('Charts array is required and must not be empty');
    }

    const {
      reportTitle = 'Data Analysis Report',
      reportSubtitle = '',
      fileName = 'report.pdf',
    } = options;

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageHeight = pdf.internal.pageSize.getHeight();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 10;
    const contentWidth = pageWidth - 2 * margin;

    // Add title page
    pdf.setFontSize(24);
    pdf.setFont(undefined, 'bold');
    pdf.text(reportTitle, margin, 40);

    if (reportSubtitle) {
      pdf.setFontSize(14);
      pdf.setFont(undefined, 'normal');
      pdf.text(reportSubtitle, margin, 50);
    }

    pdf.setFontSize(10);
    pdf.setFont(undefined, 'normal');
    pdf.text(
      `Generated on ${new Date().toLocaleString()}`,
      margin,
      pageHeight - 20
    );

    // Add each chart
    for (let i = 0; i < charts.length; i++) {
      const { element, title = `Chart ${i + 1}` } = charts[i];
      
      if (!element) continue;

      // Add new page
      pdf.addPage();

      // Add chart title
      pdf.setFontSize(14);
      pdf.setFont(undefined, 'bold');
      pdf.text(title, margin, margin + 5);

      // Capture and add chart
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        allowTaint: true,
        useCORS: true,
      });

      const imgHeight = (canvas.height * contentWidth) / canvas.width;
      const chartY = margin + 12;

      if (imgHeight + chartY + margin > pageHeight) {
        // Split chart across pages if needed
        const imgData = canvas.toDataURL('image/png');
        let heightLeft = imgHeight;
        let position = chartY;

        pdf.addImage(imgData, 'PNG', margin, position, contentWidth, imgHeight);
        heightLeft -= pageHeight - chartY - margin;

        while (heightLeft > 0) {
          pdf.addPage();
          position = heightLeft - imgHeight;
          pdf.addImage(imgData, 'PNG', margin, 10, contentWidth, imgHeight);
          heightLeft -= pageHeight - 20;
        }
      } else {
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', margin, chartY, contentWidth, imgHeight);
      }
    }

    // Save final PDF
    pdf.save(fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`);
    console.log(`[v0] Report exported as PDF with ${charts.length} charts`);
  } catch (error) {
    console.error('[v0] Report export error:', error);
    throw new Error(`Failed to export report: ${error.message}`);
  }
};

/**
 * Get export options for a specific format
 */
export const getExportOptions = (format) => {
  const options = {
    png: {
      label: 'PNG Image',
      icon: '🖼️',
      description: 'High-quality PNG image',
      handler: exportChartAsPNG,
    },
    pdf: {
      label: 'PDF Document',
      icon: '📄',
      description: 'PDF with metadata',
      handler: exportChartAsPDF,
    },
  };

  return options[format] || null;
};

/**
 * Generate a timestamp for file naming
 */
export const getTimestampFileName = (baseName) => {
  const now = new Date();
  const date = now.toISOString().split('T')[0];
  const time = now.toTimeString().split(' ')[0].replace(/:/g, '');
  return `${baseName}-${date}-${time}`;
};
