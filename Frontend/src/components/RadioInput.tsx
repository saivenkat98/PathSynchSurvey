import React from 'react';

interface RadioInputProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
  options: string[];
  error?: string;
}

const RadioInput: React.FC<RadioInputProps> = ({ 
  name, 
  value, 
  onChange, 
  label, 
  options,
  error
}) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-medium mb-2">
        {label}
      </label>
      <div className="flex flex-wrap gap-4">
        {options.map((option) => (
          <label 
            key={option} 
            className={`flex items-center p-3 border rounded-md cursor-pointer transition-all ${
              value === option 
                ? 'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-200' 
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 mr-2"
            />
            {option}
          </label>
        ))}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default RadioInput;