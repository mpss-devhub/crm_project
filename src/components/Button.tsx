import React from 'react';

type ButtonProps = {
  id: string;
  type?: 'button' | 'submit' | 'reset';
  value: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  id,
  type = 'button',
  value,
  onClick,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      className={`my-3 bg-[rgba(16,53,163,0.57)] text-white px-4 py-2 rounded w-full max-w-[460px] cursor-pointer text-sm sm:text-base ${className}`}
      {...rest}
    >
      {value}
    </button>

  );
}
