import React, { useState } from 'react';

import MetricsTable from './metrics/MetricsTable';
import MetricsCharts from './metrics/MetricsCharts';
import Navbar from './layout/Navbar';
import CreateMetricModal from './metrics/CreateMetricModal';

const App = () => {
  const [showCreateMetricModal, setShowCreateMetricModal] =
    useState<boolean>(false);

  const handleShowModal = (show: boolean) => {
    setShowCreateMetricModal(show);
  };

  return (
    <main className='vw-100 vh-100'>
      <Navbar />
      <div className='container mt-5'>
        <MetricsCharts
          onCreateMetricClick={() => {
            handleShowModal(true);
          }}
        />
        <MetricsTable />
        <CreateMetricModal
          show={showCreateMetricModal}
          showModal={handleShowModal}
        />
      </div>
    </main>
  );
};

export default App;
