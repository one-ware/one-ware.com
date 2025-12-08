import { useState, useEffect } from 'react';

export function useDelayedUnmount(show: boolean, delayMs: number = 500): boolean {
  const [shouldRender, setShouldRender] = useState(show);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), delayMs);
      return () => clearTimeout(timer);
    }
  }, [show, delayMs]);

  return shouldRender;
}
