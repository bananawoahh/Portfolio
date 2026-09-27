import type { ReactNode } from 'react';
import type { AppId } from '../types';
import { AppIcon } from './AppIcon';
import { Arrow } from './Icon';

export function Navigation({
  app,
  title,
  children,
  onBack,
}: {
  app: AppId | 'detail';
  title: string;
  children?: ReactNode;
  onBack?: () => void;
}) {
  return (
    <header className={`app-navigation ${app === 'portfolio' ? 'app-navigation-dark' : ''}`}>
      <div className="app-navigation-title">
        {onBack ? (
          <button
            type="button"
            className="back-button"
            onClick={onBack}
            aria-label="Back to portfolio"
          >
            <Arrow direction="left" />
          </button>
        ) : (
          <AppIcon name={app === 'detail' ? 'portfolio' : app} />
        )}
        <h1 id={`${app}-heading`} tabIndex={-1}>
          {title}
          <span>.</span>
        </h1>
      </div>
      {children}
    </header>
  );
}
