import { useState } from 'react';

export const InputMain = ({
  value,
  setValue,
  placeholder,
  errorMessage,
  pattern,
  isValidated, 
  setIsValidated,
}: {
  value: string;
  setValue: (s: string) => void;
  placeholder: string;
  errorMessage: string;
  pattern: string | undefined | RegExp;
  isValidated: boolean, 
  setIsValidated: (s:boolean) => void
}) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  const isValid = pattern ? new RegExp(pattern).test(value) : true;

  const handleBlur = () => {
    setIsValidated(true); 
  };

  return (
    <div className={'ui-input__main'}>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        onBlur={handleBlur} 
      />
      {(!isValid && isValidated) && <span className='ui-input__main--invalid'>{errorMessage}</span>}
    </div>
  );
};