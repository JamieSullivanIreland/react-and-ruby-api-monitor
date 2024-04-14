import React, { type ChangeEvent } from 'react';

import Modal from '../common/modal/Modal';
import Form from '../common/form/Form';
import Input from '../common/form/Input';
import Button from '../common/button/Button';
import { METRICS_KEYS } from '../../common/constants';

import type { IServerMetric, IMetricFormErrors } from '../../common/types';

interface IProps {
  show: boolean;
  onSubmit: (e: Event) => void;
  onClose: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  formData: IServerMetric;
  formErrors: IMetricFormErrors;
}

const CreateMetricModal = ({
  show,
  onSubmit,
  onClose,
  onChange,
  formData,
  formErrors,
}: IProps) => {
  const { CPU_TEMP, CPU_LOAD, DISK_LOAD } = METRICS_KEYS;

  return (
    <Modal
      show={show}
      header='Create New Server Metric'
      onSubmit={onSubmit}
      onClose={onClose}
    >
      <Form onSubmit={onSubmit}>
        <Input
          id={CPU_TEMP}
          label='CPU Temp'
          type='number'
          onChange={onChange}
          value={formData.cpu_temp}
          errorMessage={formErrors.cpu_temp}
          inputClasses='form-control mb-2'
          labelClasses='form-label'
          maxValue={200}
        />
        <Input
          id={CPU_LOAD}
          label='CPU Load'
          type='number'
          onChange={onChange}
          value={formData.cpu_load}
          errorMessage={formErrors.cpu_load}
          inputClasses='form-control mb-2'
          labelClasses='form-label mt-4'
          maxValue={100}
        />
        <Input
          id={DISK_LOAD}
          label='Disk Load'
          type='number'
          onChange={onChange}
          value={formData.disk_load}
          errorMessage={formErrors.disk_load}
          inputClasses='form-control mb-2'
          labelClasses='form-label mt-4'
          maxValue={100}
        />
        <div className='d-flex mt-5 justify-content-end'>
          <Button
            label='Cancel'
            onClick={onClose}
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
