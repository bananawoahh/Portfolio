import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { Portfolio } from '../../types';
import { displayDate } from '../../lib/media';
import { Navigation } from '../Navigation';
import { MediaCarousel } from '../MediaCarousel';
import { Arrow } from '../Icon';

export function PortfolioApp({
  data,
  active,
  onOpenProject,
}: {
  data: Portfolio;
  active: boolean;
  onOpenProject: (id: string) => void;
}) {
  const projects = data.projects.filter((project) => project.type === 'project');
  const [index, setIndex] = useState(0);
  const feedRef = useRef<HTMLDivElement>(null);
  const savedTop = useRef(0);
  const indexRef = useRef(0);
  const lastSize = useRef({ width: 0, height: 0 });

  // Keep panels mounted to retain positions; browsers may reset hidden snap containers.
  useLayoutEffect(() => {
    const feed = feedRef.current;
    if (active && feed) feed.scrollTop = savedTop.current;
  }, [active]);

  useEffect(() => {
    const feed = feedRef.current;
    if (!feed) return;
    const observer = new ResizeObserver(() => {
      if (!active || !feed.clientHeight) return;
      const previous = lastSize.current;
      lastSize.current = { width: feed.clientWidth, height: feed.clientHeight };
      if (
        !previous.height ||
        (previous.width === feed.clientWidth && previous.height === feed.clientHeight)
      )
        return;
      const reel = feed.children[indexRef.current] as HTMLElement | undefined;
      if (reel) {
        feed.scrollTop = reel.offsetTop;
        savedTop.current = reel.offsetTop;
      }
    });
    observer.observe(feed);
    return () => observer.disconnect();
  }, [active]);

  const goTo = (next: number) => {
    const feed = feedRef.current;
    if (!feed || !projects.length) return;
    const bounded = Math.max(0, Math.min(projects.length - 1, next));
    const reel = feed.children[bounded] as HTMLElement;
    feed.scrollTo({
      top: reel.offsetTop,
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };

  return (
    <>
      <Navigation app="portfolio" title="Portfolio">
        <div className="reel-navigation">
          <span className="reel-counter" aria-live="polite" aria-atomic="true">
            {projects.length ? String(index + 1).padStart(2, '0') : '00'}{' '}
            <span>/ {String(projects.length).padStart(2, '0')}</span>
          </span>
          <button
            type="button"
            aria-label="Previous project"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
          >
            <Arrow direction="down" className="arrow-up" />
          </button>
          <button
            type="button"
            aria-label="Next project"
            onClick={() => goTo(index + 1)}
            disabled={index >= projects.length - 1}
          >
            <Arrow direction="down" />
          </button>
        </div>
      </Navigation>
      <div
        className="reel-feed"
        ref={feedRef}
        tabIndex={0}
        role="region"
        aria-label="Project reels"
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
            event.preventDefault();
            goTo(index + (event.key === 'ArrowDown' ? 1 : -1));
          }
        }}
        onScroll={(event) => {
          if (!active) return;
          const feed = event.currentTarget;
          savedTop.current = feed.scrollTop;
          const children = Array.from(feed.children) as HTMLElement[];
          const midpoint = feed.scrollTop + feed.clientHeight * 0.45;
          const found = children.findIndex(
            (reel) => midpoint >= reel.offsetTop && midpoint < reel.offsetTop + reel.offsetHeight,
          );
          if (found >= 0) {
            indexRef.current = found;
            setIndex(found);
          }
        }}
      >
        {projects.map((project, position) => (
          <article
            key={project.id}
            className="project-reel"
            aria-labelledby={`reel-${project.id}`}
            inert={position !== index}
          >
            <header className="reel-byline">
              <span className="client-avatar" aria-hidden="true">
                {project.clientInitials}
                <span>.</span>
              </span>
              <div>
                <strong>{project.client}</strong>
                <span>
                  {project.discipline} · {displayDate(project.date)}
                </span>
              </div>
              <span className="reel-edition">{String(position + 1).padStart(2, '0')}</span>
            </header>
            <div className="reel-media">
              <MediaCarousel
                media={project.media}
                title={project.title}
                layout={project.layout}
                isActive={active && index === position}
              />
            </div>
            <div className="reel-caption">
              <div className="reel-kicker">
                <span className="eyebrow">{project.discipline}</span>
                {project.illustrative && <span className="sample-label">Illustrative project</span>}
              </div>
              <h2 id={`reel-${project.id}`}>{project.title}</h2>
              <p className="reel-role">{project.role}</p>
              <p className="reel-description">{project.description}</p>
              <div className="reel-bottom">
                {project.metrics[0] ? (
                  <div className="reel-highlight">
                    <strong>{project.metrics[0].value}</strong>
                    <span>
                      {project.metrics[0].label}
                      {project.illustrative && <small>Sample outcome</small>}
                    </span>
                  </div>
                ) : (
                  <span className="reel-no-metric">
                    The thinking behind the work <Arrow />
                  </span>
                )}
                <button
                  className="case-study-button"
                  id={`open-project-${project.id}`}
                  type="button"
                  onClick={() => onOpenProject(project.id)}
                >
                  View case study <Arrow />
                </button>
              </div>
            </div>
          </article>
        ))}
        {!projects.length && (
          <div className="empty-state">
            <h2>Good things are in the works.</h2>
            <p>Projects will appear here soon.</p>
          </div>
        )}
      </div>
    </>
  );
}
