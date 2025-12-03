import React from 'react';
import classNames from 'classnames';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'info';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={classNames(
        'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
        {
          'bg-gray-700 text-gray-300': variant === 'default',
          'bg-green-700 text-green-200': variant === 'success',
          'bg-yellow-700 text-yellow-200': variant === 'warning',
          'bg-blue-700 text-blue-200': variant === 'info',
        },
        className
      )}
    >
      {children}
    </span>
  );
}

