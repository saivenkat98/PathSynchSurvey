import React from 'react';
import { Star } from 'lucide-react';

interface RatingInputProps {
  name: string;
  value: number;
  onChange: (value: number) => void;
  label: string;
  error?: string;
}

const RatingInput: React.FC<RatingInputProps> = ({ 
  name, 
  value, 
  onChange, 
  label,
  error
}) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor={name}>
        {label}
      </label>
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => onChange(rating)}
            className={`h-10 w-10 rounded-full flex items-center justify-center transition-all ${
              value >= rating 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
            }`}
            aria-label={`Rate ${rating} out of 5`}
          >
            <Star size={16} fill={value >= rating ? 'currentColor' : 'none'} />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-500">
          {value > 0 ? `${value} out of 5` : 'Select a rating'}
        </span>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default RatingInput;