import React from 'react';

interface LabelProps {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Label = ({ 
  htmlFor, 
  required = false, 
  children, 
  className = '' 
}: LabelProps) => (
  <label htmlFor={htmlFor} className={`form-label ${className}`}>
    {children}
    {required && <span className="text-red-500 ml-1">*</span>}
  </label>
);