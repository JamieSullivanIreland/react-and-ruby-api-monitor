import React from 'react';
import MetricsTable from './metrics/MetricsTable';
import LineChart from './common/chart/LineChart';
import MetricsCharts from './metrics/MetricsCharts';
import Navbar from './layout/Navbar';
import Modal from './common/modal/Modal';
import Form from './common/form/Form';

const App = () => (
  <main className='vw-100 vh-100'>
    <Navbar />
    <div className='container mt-5'>
      {/* <LineChart /> */}
      <MetricsCharts />
      <MetricsTable />
      <Modal />
      <Form />
    </div>
  </main>
);

export default App;
