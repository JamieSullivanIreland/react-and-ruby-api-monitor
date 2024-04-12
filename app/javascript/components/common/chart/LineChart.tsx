import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(CategoryScale);

interface IProps {
  header: string;
  labels: string[];
  data: number[];
}

const LineChart = ({ header, labels, data }: IProps) => {
  const [chartData, setChartData] = useState({
    labels: labels.map((label: string) => label),
    datasets: [
      {
        data: data.map((num: number) => num),
        backgroundColor: ['#2a71d0'],
        borderColor: 'black',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    setChartData({
      labels: labels.map((label: string) => label),
      datasets: [
        {
          data: data.map((num: number) => num),
        },
      ],
    });
  }, [labels, data]);

  return (
    <div className='chart-container line-chart'>
      <h3 className='text-center text-dark'>{header}</h3>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: false,
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};

export default LineChart;
