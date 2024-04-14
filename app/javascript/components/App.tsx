import React, { useState } from 'react';

import MetricsTable from './metrics/MetricsTable';
import LineChart from './common/chart/LineChart';
import MetricsCharts from './metrics/MetricsCharts';
import Navbar from './layout/Navbar';
import CreateMetricModal from './metrics/CreateMetricModal';

const App = () => {
  const [showCreateMetricModal, setShowCreateMetricModal] =
    useState<boolean>(false);

  const handleShowModal = (show: boolean) => {
    setShowCreateMetricModal(show);
  };

  const handleSubmitMeric = (e: Event) => {
    console.log(e);
  };

  return (
    <main className='vw-100 vh-100'>
      <Navbar />
      <div className='container mt-5'>
        {/* <LineChart /> */}
        <MetricsCharts
          onCreateMetricClick={() => {
            handleShowModal(true);
          }}
        />
        <MetricsTable />
        <CreateMetricModal
          show={showCreateMetricModal}
          onSubmit={handleSubmitMeric}
          onClose={() => {
            handleShowModal(false);
          }}
        />
      </div>
    </main>
  );
};

export default App;
