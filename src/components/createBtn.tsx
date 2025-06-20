import React from 'react';

type CreateBtnProps = {
  id: string;
  type?: 'submit' | 'button' | 'reset';
  value: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function CreateButton({
  id,
  type = 'submit',
  value,
  onClick,
  className = '',
  disabled = false,
  ...props
}: CreateBtnProps) {
  return (
    <button 
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        my-2
        bg-[rgba(16,53,163,0.57)] 
        hover:bg-[rgba(16,53,163,0.7)] 
        text-white 
        px-4 py-2 
        rounded 
        w-full 
        max-w-[150px] 
        cursor-pointer 
        text-sm sm:text-base 
        transition-colors 
        disabled:opacity-50 
        disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {value}
    </button>
  );
}