import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';

// Registering the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  data: {
    dates: string[]; // Dates for the x-axis (e.g., ['2025-10-01', '2025-10-02', ...])
    values: number[]; // Transaction amounts
    balances: number[]; // Balance at each point in time
  };
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  // Chart.js data structure
  const chartData: ChartData<'line'> = {
    labels: data.dates.map(date => new Date(date).toLocaleDateString()),
    datasets: [
      {
        label: 'Balance Over Time',
        data: data.balances,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Balance ($)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='w-full h-full'>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
