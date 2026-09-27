import { useState } from 'react';
import { assetUrl } from '../lib/media';

export function Wallpaper({ src, position = 'center' }: { src: string; position?: string }) {
  const [failed, setFailed] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const fallback = assetUrl('media/ipad-wallpaper.svg');
  const source = failed || !src ? fallback : assetUrl(src);
  return (
    <div className="wallpaper" aria-hidden="true">
      {!unavailable && (
        <img
          src={source}
          style={{ objectPosition: position }}
          alt=""
          fetchPriority="high"
          onError={() => (source === fallback ? setUnavailable(true) : setFailed(true))}
        />
      )}
      <div className="wallpaper-shade" />
    </div>
  );
}
