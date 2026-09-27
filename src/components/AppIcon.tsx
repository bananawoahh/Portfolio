import type { AppId } from '../types';

export function AppIcon({ name }: { name: AppId | 'home' }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === 'portfolio' && (
        <>
          <rect x="7" y="5" width="20" height="23" rx="4" />
          <path d="M20 2H8a5 5 0 0 0-5 5v16" />
          <path d="m14 12 7 4-7 4z" fill="currentColor" strokeWidth="1" />
        </>
      )}
      {name === 'resume' && (
        <>
          <rect x="5" y="3" width="22" height="26" rx="3" />
          <circle cx="12" cy="12" r="3" />
          <path d="M8 19c1-4 7-4 8 0m4-8h3m-3 4h3M9 24h14" />
        </>
      )}
      {name === 'skills' && (
        <>
          <path d="M16 3v26M3 16h26M7 7l18 18M7 25 25 7" strokeWidth="3" />
          <circle cx="16" cy="16" r="6" fill="currentColor" />
        </>
      )}
      {name === 'contact' && (
        <>
          <rect x="3" y="7" width="26" height="19" rx="4" />
          <path d="m4 9 12 9L28 9M4 25l8-8m16 8-8-8" />
        </>
      )}
      {name === 'home' && (
        <>
          <rect x="5" y="5" width="8" height="8" rx="2" />
          <rect x="19" y="5" width="8" height="8" rx="2" />
          <rect x="5" y="19" width="8" height="8" rx="2" />
          <rect x="19" y="19" width="8" height="8" rx="2" />
        </>
      )}
    </svg>
  );
}
