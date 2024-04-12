import React from 'react';

interface IProps {
  label: string;
  onClick: (e: Event) => void;
  key?: number;
  classes?: string;
}

const Button = ({
  label,
  onClick,
  key,
  classes = 'btn btn-primary',
}: IProps) => {
  return (
    <button
      type='button'
      className={classes}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
