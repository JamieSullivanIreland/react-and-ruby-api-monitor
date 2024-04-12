import React from 'react';
import ServerMetrics from './metrics/ServerMetrics';
import LineChart from './common/LineChart';
import MetricsCharts from './metrics/MetricsCharts';
import Navbar from './layout/Navbar';

const App = () => (
  <main className='vw-100 vh-100'>
    <Navbar />
    <div className='contain'>
      {/* <ServerMetrics /> */}
      {/* <LineChart /> */}
      <MetricsCharts />
    </div>
  </main>
);

export default App;
