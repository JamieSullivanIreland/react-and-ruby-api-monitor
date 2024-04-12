import React from 'react';
import LineChart from '../common/LineChart';

const MetricsCharts = () => {
  return (
    <div className='metrics-charts'>
      <div>
        <LineChart />
      </div>
      <div>
        <LineChart />
      </div>
      <div>
        <LineChart />
      </div>
    </div>
  );
};

export default MetricsCharts;
