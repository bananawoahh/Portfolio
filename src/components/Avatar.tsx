import { useState } from 'react';
import { portfolio } from '../data/portfolio';
import { assetUrl } from '../lib/media';

export function Avatar({ large = false }: { large?: boolean }) {
  const [failed, setFailed] = useState(false);
  const { profile } = portfolio;
  return (
    <div className={`profile-avatar${large ? ' profile-avatar-large' : ''}`}>
      {profile.photo && !failed ? (
        <img
          src={assetUrl(profile.photo)}
          alt={profile.name}
          onError={() => setFailed(true)}
          loading="lazy"
          width="160"
          height="160"
        />
      ) : (
        <span aria-label={profile.name}>
          {profile.initials}
          <span className="avatar-dot">.</span>
        </span>
      )}
    </div>
  );
}
