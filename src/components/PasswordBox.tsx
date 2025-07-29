import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type PasswordBoxProps = {
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clasName?: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function PasswordBox({
  id,
  value,
  onChange,
  placeholder = '*************',
  className = '',
  required = false,
  ...rest
}: PasswordBoxProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative my-3 w-full max-w-[460px]">
      <input
        id={id}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full ring-2 ring-[#b4def3] border border-gray-300 rounded-[10px] py-1 px-3 pr-10 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
        {...rest}
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-600"
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? <FaEye /> : <FaEyeSlash />}
      </button>
    </div>
  );
}
