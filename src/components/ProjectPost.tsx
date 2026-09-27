import type { Project } from '../types';
import { displayDate } from '../lib/media';
import { MediaCarousel } from './MediaCarousel';
import { Metrics } from './Metrics';
import { Navigation } from './Navigation';
import { Arrow } from './Icon';

export function ProjectPost({ project, onBack }: { project: Project; onBack: () => void }) {
  return (
    <>
      <Navigation app="detail" title="Case study" onBack={onBack}>
        <span className="app-subtitle">{project.discipline}</span>
      </Navigation>
      <article
        className="screen-scroll case-study-content"
        aria-label={`${project.title} case study`}
        tabIndex={0}
      >
        <div className="case-study-intro">
          <div className="reel-kicker">
            <span className="eyebrow">{project.client}</span>
            {project.illustrative && <span className="sample-label">Illustrative project</span>}
          </div>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <dl className="project-meta">
            <div>
              <dt>My role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>When</dt>
              <dd>{displayDate(project.date)}</dd>
            </div>
          </dl>
        </div>
        <MediaCarousel media={project.media} title={project.title} layout={project.layout} />
        <div className="case-study-body">
          <Metrics metrics={project.metrics} />
          {project.illustrative && project.metrics.length > 0 && (
            <p className="metric-disclaimer">
              Illustrative outcomes for demonstration, not actual client results.
            </p>
          )}
          <section>
            <span className="eyebrow">01 / The brief</span>
            <h3>The challenge</h3>
            <p>{project.challenge}</p>
          </section>
          <section>
            <span className="eyebrow">02 / The approach</span>
            <h3>Strategy & execution</h3>
            <p>{project.strategy}</p>
          </section>
          <section>
            <span className="eyebrow">03 / The difference</span>
            <h3>The impact</h3>
            <p>{project.results}</p>
          </section>
          <ul className="project-tags" aria-label="Skills used">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <button type="button" className="button button-dark" onClick={onBack}>
            <Arrow direction="left" />
            Back to reels
          </button>
        </div>
      </article>
    </>
  );
}
