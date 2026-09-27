import { useRef, useState } from 'react';
import { portfolio } from './data/portfolio';
import type { AppId } from './types';
import { useClock } from './hooks/useClock';
import { IPadFrame } from './components/IPadFrame';
import { LockScreen } from './components/LockScreen';
import { HomeScreen } from './components/HomeScreen';
import { PortfolioApp } from './components/apps/PortfolioApp';
import { ResumeApp, SkillsApp } from './components/apps/ProfileApps';
import { Contact } from './components/Contact';
import { ProjectPost } from './components/ProjectPost';

export function App() {
  const [locked, setLocked] = useState(true);
  const [app, setApp] = useState<AppId | 'home'>('home');
  const [projectId, setProjectId] = useState<string | null>(null);
  const lastTrigger = useRef('launch-portfolio');
  const now = useClock();
  const project = portfolio.projects.find((entry) => entry.id === projectId);
  const focus = (id: string) =>
    requestAnimationFrame(() => document.getElementById(id)?.focus({ preventScroll: true }));
  const openApp = (id: AppId) => {
    lastTrigger.current = document.activeElement?.id || `launch-${id}`;
    setApp(id);
    focus(`${id}-heading`);
  };
  const goHome = () => {
    setProjectId(null);
    setApp('home');
    focus(lastTrigger.current);
  };
  const closeProject = () => {
    const id = projectId;
    setProjectId(null);
    focus(`open-project-${id}`);
  };
  const lock = () => {
    setLocked(true);
    setApp('home');
    setProjectId(null);
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
        if (project) {
          event.preventDefault();
          closeProject();
        } else if (app !== 'home') {
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
          focus(
            locked
              ? 'unlock-ipad'
              : app === 'home'
                ? 'launch-portfolio'
                : project
                  ? 'detail-heading'
                  : `${app}-heading`,
          );
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
        <div className="app-panel" hidden={app !== 'portfolio' || !!project}>
          <PortfolioApp
            data={portfolio}
            active={!locked && app === 'portfolio' && !project}
            onOpenProject={(id) => {
              setProjectId(id);
              focus('detail-heading');
            }}
          />
        </div>
        <div className="app-panel" hidden={app !== 'resume'}>
          <ResumeApp data={portfolio} />
        </div>
        <div className="app-panel" hidden={app !== 'skills'}>
          <SkillsApp data={portfolio} />
        </div>
        <div className="app-panel" hidden={app !== 'contact'}>
          <Contact data={portfolio} />
        </div>
        {project && (
          <div className="app-panel">
            <ProjectPost project={project} onBack={closeProject} />
          </div>
        )}
      </IPadFrame>
    </main>
  );
}
