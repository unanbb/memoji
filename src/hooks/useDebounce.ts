import { useEffect, useRef, useState } from 'react';

export default function useDebounce<T>(
  value: T,
  delay: number,
): { debouncedValue: T; isDebouncing: boolean } {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isDebouncing, setIsDebouncing] = useState<boolean>(true);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncing(false);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        setIsDebouncing(true);
      }
    };
  }, [value, delay]);

  return { debouncedValue, isDebouncing };
}
