import React from 'react';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Slider({ label, className = '', ...props }: SliderProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}: {props.value}
        </label>
      )}
      <input
        type="range"
        className={`w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600 ${className}`}
        {...props}
      />
    </div>
  );
}

