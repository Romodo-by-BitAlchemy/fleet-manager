// src/components/PieChart.tsx

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary components for the pie chart
Chart.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  
  noOfAvailableDrivers: number;
  noOfUnavailableDrivers: number;
}

const PieChart: React.FC<PieChartProps> = ({
  
  noOfAvailableDrivers,
  noOfUnavailableDrivers,
}) => {
  const chartData = {
    labels: [ 'No Of Available Drivers', 'No of Unavailable Drivers'],
    datasets: [
      {
        label: 'Details of Drivers',
        data: [ noOfAvailableDrivers, noOfUnavailableDrivers],
        backgroundColor: [
          // Indigo
               'rgba(255, 193, 7, 0.6)',  // Violet
    'rgba(233, 30, 99, 0.6)'  ,
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
         
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChart;
