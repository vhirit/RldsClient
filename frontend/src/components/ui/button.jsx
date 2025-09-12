/* Simple reusable Button component */
import React from 'react';

const base = 'inline-flex items-center justify-center px-5 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 focus:ring-gray-400',
  outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
};

export function Button({ variant = 'primary', className = '', ...props }) {
  const variantClasses = variants[variant] || variants.primary;
  return <button className={`${base} ${variantClasses} ${className}`} {...props} />;
}

export default Button;
