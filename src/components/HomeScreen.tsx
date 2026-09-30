import type { AppId, Portfolio } from '../types';
import { AppLauncher } from './AppLauncher';
import { HomeWidgets } from './HomeWidgets';
import { Dock } from './Dock';

export function HomeScreen({
  data,
  now,
  onOpen,
}: {
  data: Portfolio;
  now: Date;
  onOpen: (app: AppId) => void;
}) {
  return (
    <section className="home-screen screen-scroll" aria-label="iPad home screen">
      <div className="home-content">
        <HomeWidgets data={data} now={now} onOpen={onOpen} />
        <nav className="home-apps" aria-label="Portfolio apps">
          {(['portfolio', 'resume', 'skills', 'notes'] as const).map((app) => (
            <AppLauncher key={app} app={app} onOpen={onOpen} />
          ))}
        </nav>
        <p className="home-welcome"></p>
        <Dock onOpen={onOpen} />
        {data.sampleContent && <p className="sample-home"></p>}
      </div>
    </section>
  );
}
