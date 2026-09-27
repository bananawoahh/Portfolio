import { useState } from 'react';
import type { AppId, Portfolio } from '../types';
import { clockDate, clockTime } from '../lib/clock';
import { assetUrl } from '../lib/media';
import { Avatar } from './Avatar';
import { Arrow, Asterisk } from './Icon';

export function ClockWidget({ now }: { now: Date }) {
  const hourAngle = (now.getHours() % 12) * 30 + now.getMinutes() * 0.5;
  const minuteAngle = now.getMinutes() * 6;
  return (
    <section
      className="clock-widget home-widget"
      aria-label={`${clockDate(now)}, ${clockTime(now)}`}
    >
      <svg className="analog-clock" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="47" fill="#fafaf6" />
        {Array.from({ length: 12 }, (_, index) => (
          <line
            key={index}
            x1="50"
            y1="8"
            x2="50"
            y2="13"
            transform={`rotate(${index * 30} 50 50)`}
            stroke="#485568"
            strokeWidth="1.5"
          />
        ))}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="27"
          transform={`rotate(${hourAngle} 50 50)`}
          stroke="#253c55"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="17"
          transform={`rotate(${minuteAngle} 50 50)`}
          stroke="#253c55"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="50" cy="50" r="3.5" fill="#d86546" />
      </svg>
      <div className="widget-date">
        <span>{new Intl.DateTimeFormat(undefined, { weekday: 'long' }).format(now)}</span>
        <strong>{now.getDate()}</strong>
        <span>{new Intl.DateTimeFormat(undefined, { month: 'long' }).format(now)}</span>
      </div>
      <time dateTime={now.toISOString()} className="widget-digital-time">
        {clockTime(now)}
      </time>
    </section>
  );
}

export function HomeWidgets({
  data,
  now,
  onOpen,
}: {
  data: Portfolio;
  now: Date;
  onOpen: (id: AppId) => void;
}) {
  const [failed, setFailed] = useState(false);
  const featured = data.projects.find((project) => project.type === 'project');
  const media = featured?.media[0];
  const image = media?.type === 'video' ? media.poster : media?.src;
  return (
    <div className="home-widgets">
      <ClockWidget now={now} />
      <button
        id="widget-profile"
        className="profile-widget home-widget"
        type="button"
        onClick={() => onOpen('resume')}
        aria-label="Open resume profile"
      >
        <Avatar />
        <span className="profile-widget-name">{data.profile.name}</span>
        <span className="profile-widget-title">{data.profile.title}</span>
        <span className="profile-widget-location">
          {data.profile.location}
          <Arrow />
        </span>
      </button>
      <button
        id="widget-featured"
        className="featured-widget home-widget"
        type="button"
        onClick={() => onOpen('portfolio')}
        aria-label="Explore portfolio"
      >
        <span className="featured-widget-image">
          {image && !failed ? (
            <img
              src={assetUrl(image)}
              alt=""
              onError={() => setFailed(true)}
              width="800"
              height="600"
              decoding="async"
            />
          ) : (
            <Asterisk />
          )}
        </span>
        <span className="featured-widget-caption">
          <span>
            <small>SELECTED WORK</small>
            <strong>{featured?.client || 'Ideas into impact'}</strong>
          </span>
          <Arrow />
        </span>
      </button>
    </div>
  );
}
