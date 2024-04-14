import React, { type ChangeEvent, type FocusEvent, useState } from 'react';

import Modal from '../common/modal/Modal';
import Form from '../common/form/Form';
import Input from '../common/form/Input';
import Button from '../common/button/Button';
import { METRICS_KEYS } from '../../common/constants';
import { submitNewMetric } from '../../common/api';

import type { IServerMetric, IMetricFormErrors } from '../../common/types';

interface IProps {
  show: boolean;
  showModal: (show: boolean) => void;
}

const CreateMetricModal = ({ show, showModal }: IProps) => {
  const { CPU_TEMP, CPU_LOAD, DISK_LOAD } = METRICS_KEYS;
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

  const handleOnClose = () => {
    showModal(false);
  };

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

  const resetFormData = () => {
    setMetricFormData((prevState: IServerMetric) => ({
      ...prevState,
      cpu_temp: 0,
      cpu_load: 0,
      disk_load: 0,
    }));
  };

  const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    if (target) {
      setMetricFormErrors(() => ({
        ...metricFormErrors,
        [target.id]: '',
      }));
    }
  };

  const handleSubmitMeric = () => {
    const formErrorsCopy = Object.assign(metricFormErrors);
    const errorsCopy = Object.assign(metricFormErrors);

    errorsCopy.cpu_temp =
      metricFormData.cpu_temp > 200 ? 'CPU temp must be below 200' : '';
    errorsCopy.cpu_load =
      metricFormData.cpu_load > 100 ? 'CPU load must be below 100' : '';
    errorsCopy.disk_load =
      metricFormData.disk_load > 100 ? 'Disk load must be below 100' : '';

    const hasErrors = Object.keys(metricFormErrors).some(
      (key: string) => metricFormErrors[key].length > 0
    );

    if (hasErrors) {
      setMetricFormErrors(() => ({
        ...formErrorsCopy,
      }));
    } else {
      submitNewMetric(metricFormData)
        .then(() => {
          resetFormData();
          showModal(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Modal
      show={show}
      header='Create New Server Metric'
      onClose={handleOnClose}
    >
      <Form onSubmit={handleSubmitMeric}>
        <Input
          id={CPU_TEMP}
          label='CPU Temp'
          type='number'
          onChange={handleChange}
          value={metricFormData.cpu_temp}
          errorMessage={metricFormErrors.cpu_temp}
          inputClasses='form-control mb-2'
          labelClasses='form-label'
          maxValue={200}
          onBlur={handleOnBlur}
        />
        <Input
          id={CPU_LOAD}
          label='CPU Load'
          type='number'
          onChange={handleChange}
          value={metricFormData.cpu_load}
          errorMessage={metricFormErrors.cpu_load}
          inputClasses='form-control mb-2'
          labelClasses='form-label mt-4'
          maxValue={100}
          onBlur={handleOnBlur}
        />
        <Input
          id={DISK_LOAD}
          label='Disk Load'
          type='number'
          onChange={handleChange}
          value={metricFormData.disk_load}
          errorMessage={metricFormErrors.disk_load}
          inputClasses='form-control mb-2'
          labelClasses='form-label mt-4'
          maxValue={100}
          onBlur={handleOnBlur}
        />
        <div className='d-flex mt-5 justify-content-end'>
          <Button
            label='Cancel'
            onClick={handleOnClose}
            classes='btn btn-light me-4'
          />
          <Input
            type='submit'
            inputClasses='form-control btn btn-primary w-auto'
          />
        </div>
      </Form>
    </Modal>
  );
};

export default CreateMetricModal;
