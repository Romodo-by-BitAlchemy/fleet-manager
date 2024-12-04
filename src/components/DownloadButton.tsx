import React from 'react';
import Button from '@mui/material/Button';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface PrintButtonProps {
  tableRef: React.RefObject<HTMLTableElement>;
}

const PrintButton: React.FC<PrintButtonProps> = ({ tableRef }) => {
  const handleDownloadPDF = () => {
    if (!tableRef.current) {
      console.error('Table ref is null or undefined');
      return;
    }

    const scale = 2; // Increase scale for better quality
    const tableElement = tableRef.current;

    html2canvas(tableElement, { scale: scale }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height, '', 'FAST');
      pdf.save('Table_of_content.pdf');
    });
  };

  return (
    <div>
      <Button 
        variant="contained" 
        onClick={handleDownloadPDF} 
        style={{ backgroundColor: 'blue', color: 'black' }}
      >
        Download
      </Button>
    </div>
  );
};

export default PrintButton;