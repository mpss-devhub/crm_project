import React from 'react';

type InputBoxProps = {
    label: string;
    id: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;


export default function InputBox({
    label,
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
            {label && (
                <label htmlFor={id} className="block mb-1 font-medium text-sm sm:text-base">
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className={`w-full bg-[#D9D9D9] ring-2 ring-[rgb(180,222,243)] rounded-[10px] py-2 px-3 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base ${className}`}
                {...rest}
            />
        </div>

    );
}
