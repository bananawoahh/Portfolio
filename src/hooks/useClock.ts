import { useEffect, useState } from 'react';

/** A single clock for the device, aligned with the visitor's local minute. */
export function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const refresh = () => {
      setNow(new Date());
      schedule();
    };
    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(refresh, 60_000 - (Date.now() % 60_000));
    };
    const onVisibility = () => {
      if (!document.hidden) refresh();
    };
    schedule();
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('focus', refresh);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('focus', refresh);
    };
  }, []);
  return now;
}
