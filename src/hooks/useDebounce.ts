import { useEffect, useState } from 'react';

export function useDebounce(value: string, delay: number = 500, minLength: number = 3): string {
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    if (value.length < minLength) {
      setDebouncedValue('');
      return;
    }

    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, minLength]);

  return debouncedValue;
}
