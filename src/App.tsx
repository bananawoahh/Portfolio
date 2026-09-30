import { useRef, useState } from 'react';
import { portfolio } from './data/portfolio';
import type { AppId } from './types';
import { useClock } from './hooks/useClock';
import { IPadFrame } from './components/IPadFrame';
import { LockScreen } from './components/LockScreen';
import { HomeScreen } from './components/HomeScreen';
import { PortfolioApp } from './components/apps/PortfolioApp';
import { ResumeApp, SkillsApp } from './components/apps/ProfileApps';
import { NotesApp } from './components/apps/NotesApp';

export function App() {
  const [locked, setLocked] = useState(true);
  const [app, setApp] = useState<AppId | 'home'>('home');
  const lastTrigger = useRef('launch-portfolio');
  const now = useClock();
  const focus = (id: string) =>
    requestAnimationFrame(() => document.getElementById(id)?.focus({ preventScroll: true }));
  const openApp = (id: AppId) => {
    lastTrigger.current = document.activeElement?.id || `launch-${id}`;
    setApp(id);
    focus(`${id}-heading`);
  };
  const goHome = () => {
    setApp('home');
    focus(lastTrigger.current);
  };
  const lock = () => {
    setLocked(true);
    setApp('home');
    focus('unlock-ipad');
  };
  const unlock = () => {
    setLocked(false);
    focus('launch-portfolio');
  };

  return (
    <main
      className="viewport-shell"
      onKeyDown={(event) => {
        if (locked || event.key !== 'Escape' || document.fullscreenElement) return;
        if (app !== 'home') {
          event.preventDefault();
          goHome();
        }
      }}
    >
      <a
        className="skip-link"
        href="#ipad-content"
        onClick={(event) => {
          event.preventDefault();
          focus(locked ? 'unlock-ipad' : app === 'home' ? 'launch-portfolio' : `${app}-heading`);
        }}
      >
        Skip to iPad content
      </a>
      <IPadFrame
        home={app === 'home'}
        locked={locked}
        onHome={goHome}
        onLock={lock}
        now={now}
        data={portfolio}
        lockScreen={
          locked ? <LockScreen now={now} name={portfolio.profile.name} onUnlock={unlock} /> : null
        }
      >
        <div className="app-panel" hidden={app !== 'home'}>
          <HomeScreen data={portfolio} now={now} onOpen={openApp} />
        </div>
        <div className="app-panel" hidden={app !== 'portfolio'}>
          <PortfolioApp data={portfolio} active={!locked && app === 'portfolio'} />
        </div>
        <div className="app-panel" hidden={app !== 'resume'}>
          <ResumeApp data={portfolio} />
        </div>
        <div className="app-panel" hidden={app !== 'skills'}>
          <SkillsApp data={portfolio} />
        </div>
        <div className="app-panel" hidden={app !== 'notes'}>
          <NotesApp data={portfolio} />
        </div>
      </IPadFrame>
    </main>
  );
}
