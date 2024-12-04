
import React from "react";
import { Line } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import {  format, isValid, parseISO } from 'date-fns';

interface LineChartForNoOfTripsDashboardProps {
  completedTripCounts: { date: string; count: number }[];
}

const colorPalette = [
  'rgba(255, 99, 132, 1)',  // Red
  'rgba(54, 162, 235, 1)',  // Blue
  'rgba(255, 206, 86, 1)',  // Yellow
  'rgba(75, 192, 192, 1)',  // Teal
  'rgba(153, 102, 255, 1)', // Purple
  'rgba(255, 159, 64, 1)',  // Orange
  'rgba(199, 199, 199, 1)', // Grey
  'rgba(83, 102, 255, 1)',  // Light Blue
  'rgba(183, 102, 255, 1)', // Lavender
  'rgba(53, 159, 64, 1)',   // Green
  'rgba(255, 0, 0, 1)',     // Bright Red
  'rgba(0, 255, 0, 1)',     // Bright Green
  'rgba(0, 0, 255, 1)',     // Bright Blue
  'rgba(128, 0, 128, 1)',   // Dark Purple
  'rgba(255, 165, 0, 1)',   // Amber
  'rgba(0, 255, 255, 1)',   // Cyan
  'rgba(255, 192, 203, 1)', // Pink
  'rgba(128, 128, 0, 1)',   // Olive
  'rgba(165, 42, 42, 1)',   // Brown
  'rgba(0, 128, 128, 1)',   // Dark Teal
  'rgba(210, 105, 30, 1)',  // Chocolate
  'rgba(255, 69, 0, 1)',    // Orange Red
  'rgba(238, 130, 238, 1)', // Violet
  'rgba(105, 105, 105, 1)', // Dim Grey
];


const LineChartForNoOfTripsDashboard: React.FC<LineChartForNoOfTripsDashboardProps> = ({ completedTripCounts }) => {
  const groupedData: { [key: string]: { day: number; count: number }[] } = {};

  completedTripCounts.forEach(({ date, count }) => {
    const parsedDate = parseISO(date);
    if (isValid(parsedDate)) {
      const yearMonth = format(parsedDate, "yyyy-MM");
      const day = parsedDate.getDate();

      if (!groupedData[yearMonth]) {
        groupedData[yearMonth] = [];
      }
      groupedData[yearMonth].push({ day, count });
    } else {
      console.error(`Invalid date format for date: ${date}`);
    }
  });

  const datasets = Object.keys(groupedData).map((yearMonth, index) => ({
    label: yearMonth,
    data: Array.from({ length: 31 }, (_, i) => {
      const foundDay = groupedData[yearMonth].find((item) => item.day === i + 1);
      return foundDay ? foundDay.count : null;
    }),
    fill: false,
    borderColor: colorPalette[index % colorPalette.length],
    tension: 0,
    spanGaps: true,
  }));

  const labels = Array.from({ length: 31 }, (_, i) => i + 1);

  const data = {
    labels,
    datasets,
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true, // Show the legend
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const datasetLabel = tooltipItem.dataset.label;
            const value = tooltipItem.raw;
            return `${datasetLabel}: ${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Day of the Month",
        },
        type: "category",
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Trips",
        },
        ticks: {
          stepSize: 2,
        },
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
    <div style={{ height: "450px", width: "820px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChartForNoOfTripsDashboard;