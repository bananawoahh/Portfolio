import type { ReactNode } from 'react';
import type { Portfolio } from '../types';
import { AppIcon } from './AppIcon';
import { Wallpaper } from './Wallpaper';
import { clockTime } from '../lib/clock';

export function IPadFrame({
  children,
  home,
  locked,
  onHome,
  onLock,
  now,
  data,
  lockScreen,
}: {
  children: ReactNode;
  home: boolean;
  locked: boolean;
  onHome: () => void;
  onLock: () => void;
  now: Date;
  data: Portfolio;
  lockScreen: ReactNode;
}) {
  return (
    <div className="device-area">
      <div className="ipad-frame">
        <button
          type="button"
          className="ipad-power"
          aria-label="Lock screen"
          title="Lock screen"
          onClick={onLock}
          disabled={locked}
        />
        <span className="ipad-camera" aria-hidden="true" />
        <div
          className={`ipad-screen${home ? ' is-home' : ''}${locked ? ' is-locked' : ''}`}
          id="ipad-content"
        >
          <Wallpaper
            key={data.device.wallpaper}
            src={data.device.wallpaper}
            position={data.device.wallpaperPosition}
          />
          <div className="device-interface" hidden={locked}>
            <div className="device-status">
              <time dateTime={now.toISOString()}>
                {clockTime(now)}
                <span>
                  {new Intl.DateTimeFormat(undefined, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  }).format(now)}
                </span>
              </time>
              <span>{data.profile.name}</span>
            </div>
            <div className="app-viewport">{children}</div>
            <div className="device-home-bar">
              <button
                className="home-control"
                type="button"
                onClick={onHome}
                aria-label="Home"
                aria-current={home ? 'page' : undefined}
              >
                <AppIcon name="home" />
                <span>Home</span>
              </button>
              <span className="home-indicator" aria-hidden="true" />
            </div>
          </div>
          {lockScreen}
        </div>
      </div>

    </div>
  );
}
