import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { portfolio } from '../../data/portfolio';
import { ResumeApp } from './ProfileApps';

const unconfigured = {
  ...portfolio,
  contact: { ...portfolio.contact, email: '', socials: [{ label: 'LinkedIn', url: '' }] },
};
const configured = {
  ...portfolio,
  contact: {
    ...portfolio.contact,
    email: 'hello@example.com',
    socials: [{ label: 'LinkedIn', url: 'https://www.linkedin.com/in/example/' }],
  },
};

describe('Resume', () => {
  it('uses an honest placeholder instead of an iframe or fake LinkedIn link', () => {
    const { container } = render(<ResumeApp data={unconfigured} />);
    expect(screen.getByText('LinkedIn profile coming soon')).toBeVisible();
    expect(screen.queryByRole('link', { name: /Open LinkedIn/ })).toBeNull();
    expect(container.querySelector('iframe')).toBeNull();
  });
  it('links to the configured LinkedIn profile without changing the local resume', () => {
    render(<ResumeApp data={configured} />);
    const link = screen.getByRole('link', { name: /Open LinkedIn/ });
    expect(link).toHaveAttribute('href', configured.contact.socials[0].url);
    expect(link).toHaveAttribute('target', '_blank');
    expect(screen.getByRole('heading', { name: 'Experience' })).toBeVisible();
    expect(screen.getByRole('heading', { name: 'Education' })).toBeVisible();
  });
});
