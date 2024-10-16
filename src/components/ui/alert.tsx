import React from 'react';
import { cn } from '@/lib/utils'; // Optional utility for Tailwind classes

interface AlertProps {
  variant?: 'default' | 'destructive';
  children: React.ReactNode;
}

export const Alert = ({ variant = 'default', children }: AlertProps) => {
  return (
    <div
      className={cn(
        'border-l-4 p-4',
        variant === 'destructive' ? 'bg-red-50 border-red-500' : 'bg-gray-50 border-gray-300'
      )}
    >
      {children}
    </div>
  );
};

export const AlertTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-semibold text-lg mb-2">{children}</h3>
);
