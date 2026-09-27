import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Wallpaper } from './Wallpaper';

describe('Configurable wallpaper', () => {
  it('uses a custom path and focal position, then falls back if it fails', () => {
    const { container } = render(<Wallpaper src="media/my-photo.webp" position="60% center" />);
    const img = container.querySelector('img')!;
    expect(img).toHaveAttribute('src', '/media/my-photo.webp');
    expect(img).toHaveStyle({ objectPosition: '60% center' });
    fireEvent.error(img);
    expect(img).toHaveAttribute('src', '/media/ipad-wallpaper.svg');
    fireEvent.error(img);
    expect(container.querySelector('img')).toBeNull();
  });
  it('uses the bundled wallpaper for an empty path', () => {
    const { container } = render(<Wallpaper src="" />);
    expect(container.querySelector('img')).toHaveAttribute('src', '/media/ipad-wallpaper.svg');
    fireEvent.error(container.querySelector('img')!);
    expect(container.querySelector('img')).toBeNull();
  });
});
