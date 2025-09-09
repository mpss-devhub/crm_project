import React from 'react';

type InputBoxProps = {
    id: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;


export default function InputBox({
    id,
    type = 'text',
    placeholder = '',
    value,
    onChange,
    className = '',
    required = false,
    ...rest
}: InputBoxProps) {
    return (
        <div className="my-3 w-full max-w-[460px]">
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className={`w-full ring-2 ring-[rgb(180,222,243)] rounded-[10px] py-1 px-3 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base ${className}`}
                {...rest}
            />
        </div>

    );
}
