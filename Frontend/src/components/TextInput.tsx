import React from 'react';

interface TextInputProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  multiline?: boolean;
  required?: boolean;
  error?: string;
  type?: 'text' | 'email' | 'tel';
}

const TextInput: React.FC<TextInputProps> = ({ 
  name, 
  value, 
  onChange, 
  label, 
  placeholder = '',
  multiline = false,
  required = false,
  error,
  type = 'text'
}) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor={name}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B4C32] focus:border-transparent transition-all duration-200 resize-y min-h-[100px]"
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B4C32] focus:border-transparent transition-all duration-200"
        />
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default TextInput;