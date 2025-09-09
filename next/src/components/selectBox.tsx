import React from 'react';

interface SelectBoxProps {
  id: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  disabled?: boolean;
  options: Array<{
    value: any;
    label: string;
    disabled?: boolean;
  }>;
  className?: string;
  errorMessage?: string;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  id,
  value,
  onChange,
  required = false,
  disabled = false,
  options = [],
  className = '',
  errorMessage = '',
}) => {
  return (
    <div className={`my-3 w-full max-w-[460px] form-group ${className}`}>
      
      <select
        id={id}
        className={`w-full ring-2 ring-[rgb(180,222,243)] rounded-[10px] py-1 px-3 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base form-select ${errorMessage ? 'is-invalid' : ''}`}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      >
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      
      {errorMessage && (
        <div className="invalid-feedback">{errorMessage}</div>
      )}
    </div>
  );
};

export default SelectBox;