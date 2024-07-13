//DownloadButton.tsx
import React from 'react';
import Button from '@mui/material/Button';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Base64 encoded Times New Roman font (if needed)

interface PrintButtonProps {
  tableRef: React.RefObject<HTMLTableElement>;
}

const PrintButton: React.FC<PrintButtonProps> = ({ tableRef }) => {
  const handleDownloadPDF = () => {
    if (!tableRef.current) {
      console.error('Table ref is null or undefined');
      return;
    }

    html2canvas(tableRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'in', 'a3');

  
      pdf.setFont('times'); // Set font to Times New Roman
      pdf.setFontSize(12); // Set font size

      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save('Table_of_content.pdf');
    });
  };

  return (
    <div>
      <Button variant="contained" onClick={handleDownloadPDF} style={{ backgroundColor: 'blue', color: 'black' }}>
        Download
      </Button>
    </div>
  );
};

export default PrintButton;
