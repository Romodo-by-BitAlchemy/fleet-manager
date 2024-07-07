import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface DoughnutChartProps {
  numberOfTotalTrips: number;
  scheduledTrips: number;
  cancelledTrips: number;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  numberOfTotalTrips,
  scheduledTrips,
  cancelledTrips,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart<"doughnut"> | null>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) {
      console.error('Canvas context not available');
      return;
    }


    const chartData = {
      labels: ['Scheduled Trips', 'Cancelled Trips'],
      datasets: [
        {
          label: 'Trips',
          data: [scheduledTrips, cancelledTrips],
          backgroundColor: ['#36A2EB', '#FF6384'],
          hoverOffset: 4,
        },
      ],
    };

    const options = {
      plugins: {
        tooltip: {
          callbacks: {
            label: (tooltipItem: any) => {
              if (tooltipItem.raw !== undefined) {
                return `${tooltipItem.label}: ${tooltipItem.raw}`;
              }
              return '';
            },
          },
        },
      },
    };

    try {
      if (chartRef.current) {
        chartRef.current.data = chartData;
        chartRef.current.options = options;
        chartRef.current.update();
      } else {
        chartRef.current = new Chart(ctx, {
          type: 'doughnut',
          data: chartData,
          options: options,
        });
      }
    } catch (error) {
      console.error('Error initializing chart:', error);
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [numberOfTotalTrips, scheduledTrips, cancelledTrips]);

  return <canvas ref={canvasRef} />; // Render the chart using a canvas element
};

export default DoughnutChart;
