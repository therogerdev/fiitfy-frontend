// src/components/ui/Spinner.tsx
import React from 'react';

interface SpinnerProps {
  size: "sm" | "md" | "lg"; // Size of the spinner
  color?: string; // Tailwind color class
  containerHeight?: number
}

const Spinner: React.FC<SpinnerProps> = ({ size = "sm", color = 'border-primary', containerHeight = 1 }) => {
  // Map size variants to their corresponding Tailwind classes
  const sizeMap: { [key in SpinnerProps['size']]: string } = {
    sm: 'h-4 w-4', // Small size
    md: 'h-8 w-8', // Medium size
    lg: 'h-16 w-16', // Large size
  };

  return (
    <div
    style={{height: containerHeight}}
    className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-t-4 border-b-4 ${color} ${sizeMap[size]}`}
      ></div>
    </div>
  );
};

export default Spinner;
