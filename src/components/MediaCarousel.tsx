import { useEffect, useRef, useState, type CSSProperties } from 'react';
import type { ProjectLayout, ProjectMedia } from '../types';
import { assetUrl } from '../lib/media';
import { Arrow } from './Icon';
import { MediaFallback } from './MediaFallback';

function MediaAsset({
  media,
  active,
  title,
  onDimensions,
}: {
  onDimensions: (width: number, height: number) => void;
  media: ProjectMedia;
  active: boolean;
  title: string;
}) {
  const [failed, setFailed] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!active) videoRef.current?.pause();
  }, [active]);

  if (failed || !media.src)
    return (
      <MediaFallback
        title={title}
        label="The story continues"
        note="Media unavailable. Explore the project below."
      />
    );
  if (media.type === 'video' && media.placeholder) {
    return (
      <div className="video-placeholder">
        {!posterFailed && (
          <img
            src={assetUrl(media.poster)}
            alt=""
            width={media.width}
            height={media.height}
            loading="lazy"
            onError={() => setPosterFailed(true)}
          />
        )}
        <div>
          <span className="video-play" aria-hidden="true">
            ▷
          </span>
          <strong>Your campaign film goes here.</strong>
          <span>Sample video slot · replace with your own MP4</span>
        </div>
      </div>
    );
  }
  if (media.type === 'image')
    return (
      <img
        src={assetUrl(media.src)}
        alt={media.alt}
        width={media.width}
        height={media.height}
        srcSet={media.variants
          ?.map((variant) => `${assetUrl(variant.src)} ${variant.width}w`)
          .join(', ')}
        sizes={media.variants ? '(max-width: 767px) calc(100vw - 48px), 640px' : undefined}
        loading="lazy"
        onLoad={(event) =>
          onDimensions(event.currentTarget.naturalWidth, event.currentTarget.naturalHeight)
        }
        decoding="async"
        onError={() => setFailed(true)}
      />
    );
  return (
    <video
      ref={videoRef}
      onLoadedMetadata={(event) =>
        onDimensions(event.currentTarget.videoWidth, event.currentTarget.videoHeight)
      }
      controls
      playsInline
      preload="none"
      poster={assetUrl(media.poster)}
      width={media.width}
      height={media.height}
      aria-label={media.alt}
      onError={() => setFailed(true)}
    >
      <source src={assetUrl(media.src)} onError={() => setFailed(true)} />
      {media.captions?.map((track) => (
        <track
          key={track.language}
          kind="captions"
          src={assetUrl(track.src)}
          srcLang={track.language}
          label={track.label}
        />
      ))}
      Your browser does not support this video.
    </video>
  );
}

export function MediaCarousel({
  media,
  title,
  isActive = true,
  layout = 'auto',
}: {
  media: ProjectMedia[];
  title: string;
  isActive?: boolean;
  layout?: ProjectLayout;
}) {
  const [active, setActive] = useState(0);
  const [dimensions, setDimensions] = useState<Record<string, number>>({});
  const item = media[active];
  const naturalRatio = item ? (dimensions[item.src] ?? item.width / item.height) : undefined;
  const ratio =
    typeof layout === 'object'
      ? Number.isFinite(layout.width) &&
        Number.isFinite(layout.height) &&
        layout.width > 0 &&
        layout.height > 0
        ? layout.width / layout.height
        : undefined
      : {
          auto: naturalRatio && naturalRatio > 0 && naturalRatio < 1 ? naturalRatio : undefined,
          portrait: 9 / 16,
          square: 1,
          landscape: 16 / 9,
        }[layout];
  const trackRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const multiple = media.length > 1;
  const goTo = (index: number) => {
    const next = Math.max(0, Math.min(media.length - 1, index));
    activeRef.current = next;
    setActive(next);
    trackRef.current?.scrollTo({
      left: next * trackRef.current.clientWidth,
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };
  // Preserve the current slide when the viewport changes (including device rotation).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(() => {
      if (track.clientWidth)
        track.scrollTo({ left: activeRef.current * track.clientWidth, behavior: 'instant' });
    });
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const portrait = !!ratio && ratio < 1;
  useEffect(() => {
    const track = trackRef.current;
    const carousel = track?.parentElement;
    const reel = carousel?.closest<HTMLElement>('.project-reel');
    const feed = reel?.parentElement;
    if (!portrait || !carousel || !reel || !feed) return;
    const header = reel.querySelector<HTMLElement>('.reel-byline');
    const caption = reel.querySelector<HTMLElement>('.reel-caption');
    const controls = carousel.querySelector<HTMLElement>('.carousel-controls');
    const resize = () => {
      if (!feed.clientHeight) return;
      const stacked = getComputedStyle(reel).display !== 'grid';
      const available =
        feed.clientHeight -
        (header?.offsetHeight ?? 0) -
        (stacked ? (caption?.offsetHeight ?? 0) : 0) -
        (controls?.offsetHeight ?? 0) -
        16;
      carousel.style.setProperty('--portrait-height', `${Math.max(96, available)}px`);
    };
    const observer = new ResizeObserver(resize);
    [feed, header, caption, controls].forEach((element) => element && observer.observe(element));
    resize();
    return () => observer.disconnect();
  }, [portrait, ratio, multiple]);

  return (
    <section
      className={`carousel${ratio ? ' carousel-sized' : ''}${portrait ? ' carousel-portrait' : ''}`}
      style={ratio ? ({ '--media-ratio': ratio } as CSSProperties) : undefined}
      aria-label={`${title} media`}
      aria-roledescription="carousel"
      tabIndex={multiple ? 0 : undefined}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault();
          goTo(active + (event.key === 'ArrowRight' ? 1 : -1));
        }
      }}
    >
      <div
        className="carousel-track"
        ref={trackRef}
        onScroll={(event) => {
          const track = event.currentTarget;
          if (track.clientWidth) {
            const index = Math.round(track.scrollLeft / track.clientWidth);
            activeRef.current = index;
            setActive(index);
          }
        }}
      >
        {!media.length && (
          <div className="carousel-slide">
            <MediaFallback title={title} label="Behind the work" />
          </div>
        )}
        {media.map((item, index) => (
          <div
            className="carousel-slide"
            key={item.src || index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${media.length}`}
            inert={index !== active}
          >
            <MediaAsset
              media={item}
              active={isActive && index === active}
              title={title}
              onDimensions={(width, height) => {
                if (width > 0 && height > 0)
                  setDimensions((previous) =>
                    previous[item.src] === width / height
                      ? previous
                      : { ...previous, [item.src]: width / height },
                  );
              }}
            />
          </div>
        ))}
      </div>
      {multiple && (
        <div className="carousel-controls">
          <span className="slide-count" aria-live="polite" aria-atomic="true">
            {String(active + 1).padStart(2, '0')}{' '}
            <span>/ {String(media.length).padStart(2, '0')}</span>
          </span>
          <div className="carousel-dots">
            {media.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Show slide ${index + 1}`}
                aria-current={index === active ? 'true' : undefined}
                onClick={() => goTo(index)}
              >
                <span />
              </button>
            ))}
          </div>
          <div className="carousel-arrows">
            <button
              type="button"
              aria-label="Previous slide"
              disabled={active === 0}
              onClick={() => goTo(active - 1)}
            >
              <Arrow direction="left" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              disabled={active === media.length - 1}
              onClick={() => goTo(active + 1)}
            >
              <Arrow direction="right" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
