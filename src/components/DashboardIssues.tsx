import React from 'react';
import { Bar } from 'react-chartjs-2';

interface ComparisonBarChartProps {
  years: string[];
  malfunctionData: number[];
  accidentData: number[];
}

const ComparisonBarChart: React.FC<ComparisonBarChartProps> = ({
  years,
  malfunctionData,
  accidentData,
}) => {
  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'Malfunctions',
        data: malfunctionData,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
          },
      {
        label: 'Accidents',
        data: accidentData,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
          },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const, // Set position to 'top' explicitly
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
        beginAtZero: true, // Ensure the Y-axis starts at zero
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
  };

  return (
    <div style={{ height: '300px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ComparisonBarChart;
