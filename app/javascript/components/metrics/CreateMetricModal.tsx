import React from 'react';

import Modal from '../common/modal/Modal';
import Form from '../common/form/Form';
import Input from '../common/form/Input';
import Button from '../common/button/Button';
import { METRICS_KEYS } from '../../common/constants';

interface IProps {
  show: boolean;
  onSubmit: (e: Event) => void;
  onClose: () => void;
}

const CreateMetricModal = ({ show, onSubmit, onClose }: IProps) => {
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
        />
        <Input
          id={CPU_LOAD}
          label='CPU Load'
          type='number'
        />
        <Input
          id={DISK_LOAD}
          label='Disk Load'
          type='number'
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
