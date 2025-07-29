import React from 'react';

type ButtonProps = {
  id: string;
  type?: 'button' | 'submit' | 'reset';
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children: React.ReactNode;
  href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  id,
  type = 'button',
  value,
  onClick,
  className = '',
  children,
  href,
  ...rest
}: ButtonProps) {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      className={`my-3 text-white px-4 py-1 rounded-2xl w-full max-w-[150px] cursor-pointer text-sm sm:text-base ${className}`}
      {...rest}
    >
      {children}
    </button>

  );
}
