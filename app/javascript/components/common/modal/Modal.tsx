import React, { type ReactNode } from 'react';

import Button from '../button/Button';

interface IProps {
  show: boolean;
  header?: string;
  onClose: () => void;
  footer?: ReactNode;
}

const Modal = ({
  children,
  show,
  header,
  onClose,
  footer,
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
          {footer && <div className='modal-footer'>{footer}</div>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
