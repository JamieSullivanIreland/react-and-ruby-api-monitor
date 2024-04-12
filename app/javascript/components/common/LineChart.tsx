import React, { useState } from 'react';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';

import { Data } from '../../common/constants';

Chart.register(CategoryScale);

const LineChart = () => {
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.day),
    datasets: [
      {
        data: Data.map((data) => data.cpuTemp),
        backgroundColor: ['#2a71d0'],
        borderColor: 'black',
        borderWidth: 1,
        maxWidth: 200,
      },
    ],
  });

  return (
    <div className='chart-container line-chart'>
      <h2 className='text-primary-color fs-2'>API Monitor</h2>
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
