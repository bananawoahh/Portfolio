import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { portfolio } from '../../data/portfolio';
import { PortfolioApp } from './PortfolioApp';
import type { ProjectMedia } from '../../types';

const data = (url: string, media: ProjectMedia[] = []) => ({
  ...portfolio,
  projects: [
    {
      ...portfolio.projects.find((project) => project.type === 'project')!,
      instagramUrl: url,
      media,
    },
  ],
});

describe('Instagram project previews', () => {
  it('supports a link-only reel without an embed or missing-media warning', () => {
    const { container } = render(
      <PortfolioApp data={data('https://www.instagram.com/reel/example/')} active />,
    );
    expect(screen.getByRole('link', { name: /View on Instagram/ })).toHaveAttribute(
      'href',
      'https://www.instagram.com/reel/example/',
    );
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
    expect(screen.getByText('Open the original post or reel to see the work.')).toBeVisible();
    expect(container.querySelector('iframe, video, img')).toBeNull();
    expect(screen.queryByText(/Media unavailable/)).toBeNull();
  });
  it('keeps the destination available even if a thumbnail fails', () => {
    render(
      <PortfolioApp
        data={data('https://www.instagram.com/p/example/', [
          {
            type: 'image',
            src: 'media/preview.webp',
            alt: 'Post preview',
            width: 1080,
            height: 1350,
          },
        ])}
        active
      />,
    );
    fireEvent.error(screen.getByAltText('Post preview'));
    expect(screen.getByRole('link', { name: /View on Instagram/ })).toBeVisible();
    expect(screen.getByText(/Media unavailable/)).toBeVisible();
  });
  it.each(['', 'javascript:alert(1)', 'https://instagram.com.example.org/p/post/'])(
    'leaves invalid or absent destinations unlinked: %s',
    (url) => {
      render(<PortfolioApp data={data(url)} active />);
      expect(screen.queryByRole('link', { name: /View on Instagram/ })).toBeNull();
    },
  );
});
