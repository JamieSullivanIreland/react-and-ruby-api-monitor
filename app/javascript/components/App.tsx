import React, { type ChangeEvent, useState } from 'react';

import MetricsTable from './metrics/MetricsTable';
import MetricsCharts from './metrics/MetricsCharts';
import Navbar from './layout/Navbar';
import CreateMetricModal from './metrics/CreateMetricModal';
import { submitNewMetric } from '../common/api';

import type { IMetricFormErrors, IServerMetric } from '../common/types';

const App = () => {
  const [showCreateMetricModal, setShowCreateMetricModal] =
    useState<boolean>(false);
  const [metricFormData, setMetricFormData] = useState<IServerMetric>({
    cpu_temp: 0,
    cpu_load: 0,
    disk_load: 0,
  });
  const [metricFormErrors, setMetricFormErrors] = useState<IMetricFormErrors>({
    cpu_temp: '',
    cpu_load: '',
    disk_load: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target) {
      const { name, value } = target;
      setMetricFormData((prevState) => ({
        ...prevState,
        [name]: Number(value),
      }));
    }
  };

  const handleShowModal = (show: boolean) => {
    setShowCreateMetricModal(show);
  };

  const resetFormData = () => {
    setMetricFormData((prevState) => ({
      ...prevState,
      cpu_temp: 0,
      cpu_load: 0,
      disk_load: 0,
    }));
  };

  const handleSubmitMeric = (e: Event) => {
    e.preventDefault();
    const formErrorsCopy = Object.assign(metricFormErrors);
    let hasErrors = false;

    if (metricFormData.cpu_temp > 200) {
      formErrorsCopy.cpu_temp = 'CPU temp must be below 200';
      hasErrors = true;
    }
    if (metricFormData.cpu_load > 100) {
      formErrorsCopy.cpu_load = 'CPU load must be below 100';
      hasErrors = true;
    }
    if (metricFormData.disk_load > 100) {
      formErrorsCopy.disk_load = 'Disk load must be below 100';
      hasErrors = true;
    }
    if (hasErrors) {
      setMetricFormErrors(() => ({
        ...formErrorsCopy,
      }));
    } else {
      submitNewMetric(metricFormData)
        .then(() => {
          resetFormData();
          handleShowModal(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
          onSubmit={handleSubmitMeric}
          onClose={() => {
            resetFormData();
            handleShowModal(false);
          }}
          onChange={handleChange}
          formData={metricFormData}
          formErrors={metricFormErrors}
        />
      </div>
    </main>
  );
};

export default App;
