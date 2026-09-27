import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { MediaCarousel } from './MediaCarousel';
import { Metrics } from './Metrics';
import type { ProjectMedia } from '../types';

const images: ProjectMedia[] = [
  { type: 'image', src: 'media/one.svg', alt: 'First campaign image', width: 1600, height: 1200 },
  { type: 'image', src: 'media/two.svg', alt: 'Second campaign image', width: 1600, height: 1200 },
];

describe('Media carousel', () => {
  it('accepts preset and custom frame dimensions while rejecting invalid dimensions', () => {
    const { container, rerender } = render(
      <MediaCarousel media={images} title="Campaign" layout="portrait" />,
    );
    const frame = container.querySelector<HTMLElement>('.carousel')!;
    expect(frame.style.getPropertyValue('--media-ratio')).toBe(String(9 / 16));
    rerender(<MediaCarousel media={images} title="Campaign" layout={{ width: 4, height: 5 }} />);
    expect(frame.style.getPropertyValue('--media-ratio')).toBe('0.8');
    rerender(<MediaCarousel media={images} title="Campaign" layout={{ width: 4, height: 0 }} />);
    expect(frame).not.toHaveClass('carousel-sized');
    expect(frame.style.getPropertyValue('--media-ratio')).toBe('');
  });
  it('supports buttons, keyboard navigation, and bounded controls', async () => {
    const user = userEvent.setup();
    render(<MediaCarousel media={images} title="Campaign" />);
    expect(screen.getByRole('button', { name: 'Previous slide' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Next slide' }));
    expect(screen.getByRole('button', { name: 'Show slide 2' })).toHaveAttribute(
      'aria-current',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Next slide' })).toBeDisabled();
    screen.getByRole('region', { name: 'Campaign media' }).focus();
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('button', { name: 'Show slide 1' })).toHaveAttribute(
      'aria-current',
      'true',
    );
  });
  it('replaces broken images with an accessible fallback', () => {
    render(<MediaCarousel media={images.slice(0, 1)} title="Campaign" />);
    fireEvent.error(screen.getByAltText('First campaign image'));
    expect(screen.getByText('Media unavailable. Explore the project below.')).toBeVisible();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
  it('supports empty media and absent metrics', () => {
    const { container } = render(
      <>
        <MediaCarousel media={[]} title="Experience" />
        <Metrics metrics={[]} />
      </>,
    );
    expect(screen.getByText('Experience')).toBeVisible();
    expect(container.querySelector('dl')).toBeNull();
  });
  it('pauses hidden video and falls back on video failure', async () => {
    const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause');
    const video: ProjectMedia = {
      type: 'video',
      src: 'media/film.mp4',
      alt: 'Campaign film',
      poster: 'media/poster.svg',
      width: 1600,
      height: 1200,
    };
    render(<MediaCarousel media={[video, images[0]]} title="Campaign" />);
    const element = screen.getByLabelText('Campaign film');
    expect(element).toHaveAttribute('preload', 'none');
    expect(element).not.toHaveAttribute('autoplay');
    await userEvent.click(screen.getByRole('button', { name: 'Next slide' }));
    expect(pause).toHaveBeenCalled();
    fireEvent.error(element);
    expect(screen.getByText('Media unavailable. Explore the project below.')).toBeInTheDocument();
  });
  it('labels sample video slots without fetching missing files', () => {
    const { container } = render(
      <MediaCarousel
        title="Film"
        media={[
          {
            type: 'video',
            src: 'missing.mp4',
            poster: 'poster.svg',
            alt: 'Demo',
            width: 1600,
            height: 1200,
            placeholder: true,
          },
        ]}
      />,
    );
    expect(screen.getByText('Your campaign film goes here.')).toBeVisible();
    expect(container.querySelector('video')).toBeNull();
  });
  it('pauses video when its reel or app becomes inactive', () => {
    const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause');
    const media: ProjectMedia[] = [
      {
        type: 'video',
        src: 'film.mp4',
        poster: 'poster.svg',
        alt: 'Film',
        width: 1600,
        height: 1200,
      },
    ];
    const { rerender } = render(<MediaCarousel media={media} title="Film" isActive />);
    expect(pause).not.toHaveBeenCalled();
    rerender(<MediaCarousel media={media} title="Film" isActive={false} />);
    expect(pause).toHaveBeenCalledOnce();
  });
});
