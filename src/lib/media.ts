export function assetUrl(path: string, base = import.meta.env.BASE_URL): string {
  if (!path) return '';
  if (/^(https?:\/\/|data:|blob:)/i.test(path)) return path;
  return `${base.replace(/\/$/, '')}/${path.replace(/^\/+/, '')}`;
}

export function displayDate(value: string): string {
  if (!/^\d{4}-\d{2}$/.test(value)) return value;
  const date = new Date(`${value}-01T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-AU', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function instagramUrl(value?: string): string | undefined {
  if (!value?.trim()) return undefined;
  try {
    const url = new URL(value.trim());
    if (
      url.protocol === 'https:' &&
      (url.hostname === 'instagram.com' || url.hostname.endsWith('.instagram.com')) &&
      !url.username &&
      !url.password
    )
      return url.href;
  } catch {
    /* Incomplete URLs remain unlinked while editing. */
  }
  return undefined;
}
