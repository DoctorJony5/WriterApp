import { useEffect, useState, useRef } from 'react';

export function useTimeTracking(initialTime: number = 0, onTimeUpdate: (time: number) => void) {
  const [timeSpent, setTimeSpent] = useState(initialTime);
  const [isActive, setIsActive] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastActiveRef = useRef<number>(Date.now());

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsActive(false);
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      } else {
        setIsActive(true);
        lastActiveRef.current = Date.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        const now = Date.now();
        const delta = now - lastActiveRef.current;
        lastActiveRef.current = now;

        if (delta < 60000) { // Only count time if less than 1 minute has passed
          setTimeSpent(prev => {
            const newTime = prev + 1;
            onTimeUpdate(newTime);
            return newTime;
          });
        }
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, onTimeUpdate]);

  return timeSpent;
}