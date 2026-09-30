import type { AppId } from '../types';
import { AppLauncher } from './AppLauncher';

export function Dock({ onOpen }: { onOpen: (id: AppId) => void }) {
  return (
    <nav className="home-dock" aria-label="Favourite apps">
      {(['portfolio', 'resume', 'notes'] as const).map((app) => (
        <AppLauncher key={app} app={app} onOpen={onOpen} dock />
      ))}
    </nav>
  );
}
