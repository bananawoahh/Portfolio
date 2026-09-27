import { describe, expect, it } from 'vitest';
import { assetUrl, displayDate } from './media';

describe('GitHub Pages assets', () => {
  it('resolves media under root and repository paths', () => {
    expect(assetUrl('media/hero.svg', '/')).toBe('/media/hero.svg');
    expect(assetUrl('/media/hero.svg', '/Portfolio/')).toBe('/Portfolio/media/hero.svg');
    expect(assetUrl('https://example.com/hero.webp', '/Portfolio/')).toBe(
      'https://example.com/hero.webp',
    );
    expect(assetUrl('', '/Portfolio/')).toBe('');
  });
  it('formats project months and preserves experience ranges', () => {
    expect(displayDate('2025-11')).toBe('Nov 2025');
    expect(displayDate('2024–2025')).toBe('2024–2025');
    expect(displayDate('2025-13')).toBe('2025-13');
  });
});
