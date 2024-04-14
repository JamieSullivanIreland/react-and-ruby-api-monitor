import React from 'react';

interface IProps {
  type?: string;
  label?: string;
  onClick: (e: Event) => void;
  classes?: string;
}

const Button = ({
  type = 'button',
  label,
  onClick,
  classes = 'btn btn-primary',
}: IProps) => {
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
