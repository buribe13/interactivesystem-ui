import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function Card({ children, className = '', title }: CardProps) {
  return (
    <div className={`bg-gray-800 rounded-lg p-4 border border-gray-700 ${className}`}>
      {title && <h3 className="text-lg font-semibold mb-3 text-white">{title}</h3>}
      {children}
    </div>
  );
}

