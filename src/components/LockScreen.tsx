import { useEffect, useRef, useState } from 'react';
import { clockDate, clockTime } from '../lib/clock';

export function LockScreen({
  now,
  name,
  onUnlock,
}: {
  now: Date;
  name: string;
  onUnlock: () => void;
}) {
  const [drag, setDrag] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const gesture = useRef<{ id: number; x: number; y: number } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const unlocking = useRef(false);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  const unlock = () => {
    if (unlocking.current) return;
    unlocking.current = true;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onUnlock();
      return;
    }
    setLeaving(true);
    timer.current = setTimeout(onUnlock, 260);
  };
  const reset = () => {
    gesture.current = null;
    setDrag(0);
  };
  return (
    <section
      className={`lock-screen${leaving ? ' is-unlocking' : ''}${drag ? ' is-dragging' : ''}`}
      aria-label="iPad lock screen"
      style={{ '--unlock-drag': `${-drag}px` } as React.CSSProperties}
      onPointerDown={(event) => {
        if (!event.isPrimary || event.button !== 0 || leaving) return;
        gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
      }}
      onPointerMove={(event) => {
        const start = gesture.current;
        if (!start || start.id !== event.pointerId) return;
        const dy = Math.max(0, start.y - event.clientY);
        if (dy > 10 && dy > Math.abs(start.x - event.clientX)) {
          if (!event.currentTarget.hasPointerCapture(event.pointerId))
            event.currentTarget.setPointerCapture(event.pointerId);
          setDrag(Math.min(dy, 200));
        }
      }}
      onPointerUp={(event) => {
        const start = gesture.current;
        if (!start || start.id !== event.pointerId) return;
        const dy = start.y - event.clientY;
        const valid = dy >= 80 && dy > Math.abs(start.x - event.clientX) * 1.4;
        reset();
        if (valid) unlock();
      }}
      onPointerCancel={reset}
      onLostPointerCapture={reset}
    >
      <div className="lock-clock">
        <svg
          className="lock-symbol"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <rect x="6" y="10" width="12" height="10" rx="2" fill="currentColor" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          <circle cx="12" cy="15" r="1" fill="#243e59" stroke="none" />
        </svg>
        <p className="lock-date">{clockDate(now)}</p>
        <time className="lock-time" dateTime={now.toISOString()}>
          {clockTime(now)}
        </time>
      </div>
      <div className="lock-owner">
        <span></span>
        <h1>{name}’s portfolio</h1>
      </div>
      <button
        id="unlock-ipad"
        className="unlock-control"
        type="button"
        onClick={unlock}
        disabled={leaving}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <path d="m6 14 6-6 6 6" />
        </svg>
        <span>Swipe up to unlock</span>
        <span className="unlock-click-hint">or click to explore</span>
        <i aria-hidden="true" />
      </button>
    </section>
  );
}
