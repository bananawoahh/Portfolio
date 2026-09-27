export const clockTime = (now: Date) =>
  new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(now);
export const clockDate = (now: Date) =>
  new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric' }).format(
    now,
  );
