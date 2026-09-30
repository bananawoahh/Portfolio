import type { AppId } from '../types';
import { AppIcon } from './AppIcon';

export function AppLauncher({
  app,
  onOpen,
  dock = false,
}: {
  app: AppId;
  onOpen: (id: AppId) => void;
  dock?: boolean;
}) {
  const title = { portfolio: 'Portfolio', resume: 'Resume', skills: 'Skills', notes: 'Notes' }[app];
  return (
    <button
      id={`${dock ? 'dock' : 'launch'}-${app}`}
      className={`app-launcher launcher-${app}${dock ? ' dock-launcher' : ''}`}
      type="button"
      aria-label={dock ? `Open ${title}` : title}
      onClick={() => onOpen(app)}
    >
      <span className="app-icon-tile">
        <AppIcon name={app} />
      </span>
      <span className={dock ? 'sr-only' : 'app-icon-label'}>{title}</span>
    </button>
  );
}
