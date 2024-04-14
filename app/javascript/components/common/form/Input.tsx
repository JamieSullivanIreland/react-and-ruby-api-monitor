import React from 'react';

interface IProps {
  id?: string;
  label?: string;
  type: string;
  inputClasses?: string;
  labelClasses?: string;
}

const Input = ({
  id,
  label,
  type,
  inputClasses = 'form-control mb-4',
  labelClasses = 'form-label',
}: IProps) => {
  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className={labelClasses}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={inputClasses}
        id={id}
      />
    </>
  );
};

export default Input;
