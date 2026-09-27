import type { Portfolio } from '../types';
import { Navigation } from './Navigation';
import { Arrow, Asterisk } from './Icon';

export function Contact({ data }: { data: Portfolio }) {
  const { contact } = data;
  return (
    <>
      <Navigation app="contact" title="Contact">
        <span className="app-subtitle">Start something</span>
      </Navigation>
      <div
        className="screen-scroll contact-content"
        role="region"
        aria-label="Contact content"
        tabIndex={0}
      >
        <div className="contact-introduction">
          <Asterisk />
          <span className="eyebrow">Good things start here</span>
          <h2>{contact.heading}</h2>
          <p>{contact.description}</p>
        </div>
        <div className="contact-methods">
          {contact.email ? (
            <a className="contact-method" href={`mailto:${contact.email}`}>
              <span>
                <small>Email me</small>
                <strong>{contact.email}</strong>
              </span>
              <Arrow />
            </a>
          ) : (
            <div className="contact-method">
              <span>
                <small>Email</small>
                <strong>Your email goes here</strong>
                <span className="contact-coming">Contact details coming soon</span>
              </span>
              <Arrow />
            </div>
          )}
          {contact.socials.map((social) =>
            social.url ? (
              <a
                className="contact-method"
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <small>Find me on</small>
                  <strong>{social.label}</strong>
                </span>
                <Arrow />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <div className="contact-method" key={social.label}>
                <span>
                  <strong>{social.label}</strong>
                  <span className="contact-coming">Profile coming soon</span>
                </span>
                <Arrow />
              </div>
            ),
          )}
        </div>
        <div className="contact-signoff">
          <span className="availability">
            <i />
            {data.profile.availability}
          </span>
          <p>{data.profile.location}</p>
          <span>
            © {new Date().getFullYear()} {data.profile.name}
            {data.sampleContent ? ' · Sample portfolio' : ''}
          </span>
        </div>
      </div>
    </>
  );
}
