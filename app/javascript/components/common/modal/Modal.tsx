import React, { type ReactNode } from 'react';
import Button from '../button/Button';

interface IProps {
  show: boolean;
  header?: string;
  onSubmit: (e: Event) => void;
  onClose: () => void;
}

const Modal = ({
  children,
  show,
  header,
  onSubmit,
  onClose,
}: React.FC<IProps>) => {
  return (
    <div
      className={`modal ${show ? 'show' : 'fade'}`}
      style={{ display: show ? 'block' : 'none' }}
      id='exampleModal'
      tabIndex='-1'
      aria-labelledby='exampleModalLabel'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1
              className='modal-title fs-5'
              id='exampleModalLabel'
            >
              {header}
            </h1>
            <Button
              classes='btn-close'
              onClick={onClose}
            />
          </div>
          <div className='modal-body'>{children}</div>
          {/* <div className='modal-footer'>
            <Button
              label='Cancel'
              onClick={onClose}
              classes='btn btn-light'
            />
            <Button
              type='submit'
              label='Submit'
              onClick={onSubmit}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
