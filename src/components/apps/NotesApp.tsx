import type { Portfolio } from '../../types';
import { Navigation } from '../Navigation';

export function NotesApp({ data }: { data: Portfolio }) {
  return (
    <>
      <Navigation app="notes" title="Notes">
        <span className="app-subtitle">A personal note</span>
      </Navigation>
      <div
        className="screen-scroll notes-content"
        role="region"
        aria-label="Notes content"
        tabIndex={0}
      >
        <article className="notes-page">
          <span className="eyebrow">Notes</span>
          <h2>{data.notes.title}</h2>
          <p className="notes-body">{data.notes.body}</p>
          {data.notes.signOff && <p className="notes-signoff">{data.notes.signOff}</p>}
        </article>
      </div>
    </>
  );
}
