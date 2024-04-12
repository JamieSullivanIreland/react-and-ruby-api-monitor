import React, { Fragment } from 'react';
import Button from './Button';

interface IProps {
  label: string;
  btnLabels: string[];
  onClick: (e: Event) => void;
}

const ButtonGroup = ({ label, btnLabels, onClick }: IProps) => {
  return (
    <div
      className='btn-group'
      role='group'
      aria-label={label}
    >
      {btnLabels.map((label: string, i: number) => (
        <Fragment key={i}>
          <Button
            label={label}
            onClick={onClick}
            classes='btn btn-light border-secondary'
          />
        </Fragment>
      ))}
    </div>
  );
};

export default ButtonGroup;
