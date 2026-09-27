export function Arrow({
  direction = 'up-right',
  className = '',
}: {
  direction?: 'up-right' | 'right' | 'left' | 'down';
  className?: string;
}) {
  const paths = {
    'up-right': 'M5 19 19 5M5 5h14v14',
    right: 'M4 12h16m-7-7 7 7-7 7',
    left: 'M20 12H4m7-7-7 7 7 7',
    down: 'M12 4v16m-7-7 7 7 7-7',
  };
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[direction]} />
    </svg>
  );
}

export function Asterisk({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="13"
      aria-hidden="true"
    >
      <path d="M50 4v92M4 50h92M17.5 17.5l65 65m-65 0 65-65" />
    </svg>
  );
}
