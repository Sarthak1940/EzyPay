"use client"
import React, { useState, useEffect } from 'react';
import LineChart from '@/components/LineChart';
import { fetchGraphData } from '@/app/lib/actions/fetchGraphData';
import toast from 'react-hot-toast';


const Dashboard: React.FC = () => {
  const [chartData, setChartData] = useState<{ dates: string[]; values: number[]; balances: number[] }>({
    dates: [],
    values: [],
    balances: [],
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchGraphData();
        setChartData(data);
      } catch (error) {
        console.error("Error loading graph data:", error);
        toast.error("Failed to load transaction data");
      }
    };

    loadData();
  }, []);

  return (
    <div className='w-full h-full'>
      <LineChart data={chartData} />
    </div>
  );
};

export default Dashboard;
