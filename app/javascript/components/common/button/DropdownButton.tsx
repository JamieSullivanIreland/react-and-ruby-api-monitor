import React from 'react';
import { nanoid } from 'nanoid';

interface IProps {
  labels: string[];
  activeLabel: string;
  onClick: (label: string) => void;
}

const DropdownButton = ({ labels, activeLabel, onClick }: IProps) => {
  return (
    <div className='dropdown'>
      <button
        className='btn btn-light dropdown-toggle'
        type='button'
        data-bs-toggle='dropdown'
        aria-expanded='false'
      >
        {activeLabel}
      </button>

      <ul className='dropdown-menu'>
        {labels.map((label: string) => (
          <li key={nanoid()}>
            <a
              onClick={() => {
                onClick(label);
              }}
              className='dropdown-item'
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownButton;
