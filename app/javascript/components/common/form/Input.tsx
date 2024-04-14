import React, {
  type ChangeEvent,
  type KeyboardEvent,
  type FocusEvent,
} from 'react';

interface IProps {
  id?: string;
  label?: string;
  type: string;
  inputClasses?: string;
  labelClasses?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  value?: string | number;
  errorMessage?: string;
  maxValue?: number;
}

const Input = ({
  id,
  label,
  type,
  inputClasses = 'form-control',
  labelClasses = 'form-label',
  onChange,
  value,
  errorMessage,
  maxValue,
  onBlur,
}: IProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      type === 'number' &&
      (e.code === 'Minus' || e.code === 'NumpadSubtract')
    ) {
      e.preventDefault();
    }
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

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
        autoComplete='off'
        step='any'
        id={id}
        name={id}
        type={type}
        className={inputClasses}
        onChange={onChange}
        value={value}
        min={0}
        max={maxValue}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          handleKeyDown(e);
        }}
        onFocus={(e: FocusEvent<HTMLInputElement>) => {
          handleFocus(e);
        }}
        onBlur={onBlur}
      />
      {errorMessage && (
        <div className='form-text text-danger'>{errorMessage}</div>
      )}
    </>
  );
};

export default Input;
