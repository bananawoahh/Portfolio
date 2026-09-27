import { Asterisk } from './Icon';

export function MediaFallback({
  title,
  label = 'A story worth telling.',
  note,
}: {
  title: string;
  label?: string;
  note?: string;
}) {
  return (
    <div className="media-fallback">
      <span className="eyebrow">{label}</span>
      <Asterisk />
      <p>{title}</p>
      {note && <span className="fallback-note">{note}</span>}
    </div>
  );
}
