import type { Portfolio } from '../../types';
import { Avatar } from '../Avatar';
import { Navigation } from '../Navigation';
import { Arrow, Asterisk } from '../Icon';

export function ResumeApp({ data }: { data: Portfolio }) {
  const linkedin = data.contact.socials.find(
    (social) => social.label.toLowerCase() === 'linkedin',
  )?.url;
  const experience = data.projects.filter((entry) => entry.type === 'experience');
  return (
    <>
      <Navigation app="resume" title="Resume">
        <span className="app-subtitle">The story so far</span>
      </Navigation>
      <div
        className="screen-scroll resume-content"
        role="region"
        aria-label="Resume content"
        tabIndex={0}
      >
        <section className="resume-profile profile-section">
          <div className="resume-cover" aria-hidden="true">
            <Asterisk />
            <span>
              Always curious.
              <br />
              Always connecting.
            </span>
          </div>
          <div className="resume-profile-body">
            <Avatar large />
            <h2>{data.profile.name}</h2>
            <p className="resume-title">{data.profile.title}</p>
            <p className="resume-location">{data.profile.location}</p>
            <p>{data.profile.positioning}</p>
            {linkedin ? (
              <a
                className="button button-dark"
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open LinkedIn <Arrow />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <span className="placeholder-link">
                LinkedIn profile coming soon <Arrow />
              </span>
            )}
          </div>
        </section>
        <section className="profile-section">
          <span className="eyebrow">A little about me</span>
          <h2>{data.profile.aboutHeading.replace('\n', ' ')}</h2>
          {data.profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
        <section className="profile-section">
          <h2>Experience</h2>
          {experience.map((entry) => (
            <article className="experience-entry" key={entry.id}>
              <span className="organisation-icon" aria-hidden="true">
                {entry.clientInitials}
              </span>
              <div>
                <h3>{entry.role}</h3>
                <p className="experience-company">{entry.client}</p>
                <span className="entry-date">{entry.date}</span>
                <p>{entry.description}</p>
                <p>{entry.strategy}</p>
                <p>{entry.results}</p>
                {entry.illustrative && (
                  <span className="sample-label">Illustrative experience</span>
                )}
              </div>
            </article>
          ))}
          {!experience.length && <p>Experience details coming soon.</p>}
        </section>
        <section className="profile-section">
          <h2>Education</h2>
          {data.resume.education.map((entry, index) => (
            <article className="education-entry" key={`${entry.institution}-${index}`}>
              <h3>{entry.qualification}</h3>
              <p>{entry.institution}</p>
              <span className="entry-date">{entry.date}</span>
              {entry.description && <p>{entry.description}</p>}
            </article>
          ))}
          {!data.resume.education.length && <p>Education details coming soon.</p>}
        </section>
        <p className="app-footnote">
          {data.sampleContent
            ? 'Sample resume · replace with your experience and education.'
            : 'A snapshot of my professional journey.'}
        </p>
      </div>
    </>
  );
}

export function SkillsApp({ data }: { data: Portfolio }) {
  return (
    <>
      <Navigation app="skills" title="Skills">
        <span className="app-subtitle">What I bring</span>
      </Navigation>
      <div
        className="screen-scroll skills-content"
        role="region"
        aria-label="Skills content"
        tabIndex={0}
      >
        <div className="app-introduction">
          <span className="eyebrow">A connected skill set</span>
          <h2>
            From the why
            <br />
            to the what’s next.
          </h2>
          <p>Thoughtful strategy, creative execution, and a clear understanding of what worked.</p>
          <Asterisk />
        </div>
        <div className="skills-grid">
          {data.skills.map((skill, index) => (
            <article className="skill-card" key={skill.title}>
              <span className="skill-number">
                0{index + 1}
                <Arrow />
              </span>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
              <ul>
                {skill.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="app-footnote">Strategy-led. Story-driven. Made to matter.</p>
      </div>
    </>
  );
}
