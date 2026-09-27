# iPad portfolio

A React + TypeScript portfolio presented as an interactive iPad: a live lock screen, wallpaper-based
home screen, widgets, and four working apps. The device is landscape on desktop and portrait on phones.
The page stays fixed; scrolling happens only inside the iPad.

## Run locally

Install **Node.js 22.12 or newer** (Node 22 is pinned in `.nvmrc`). Then:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. To check the production version:

```sh
npm run build
npm run preview
```

If Node/npm are not found, install Node's LTS macOS package from https://nodejs.org/ and reopen your
terminal. For command-line Git on macOS, install Apple's Command Line Tools (`xcode-select --install`)
if `git --version` reports that developer tools are missing. Git is not needed to run the website locally.

## Make it yours

**All editable portfolio content lives in [`src/data/portfolio.ts`](src/data/portfolio.ts).**

1. Replace `profile`: name, initials, professional title, location, availability, positioning,
   biography, and optional photo.
2. Set `contact.email` and complete social-profile URLs. Empty values intentionally display unlinked
   “coming soon” placeholders.
3. Replace the sample projects and experience. Duplicate a project record to add another entry; use a
   unique `id`. Entries with `type: 'project'` become Portfolio reels, in array order; entries with
   `type: 'experience'` appear in Resume. Replace `resume.education` with your actual qualifications.
4. Replace sample metrics with substantiated results, including comparison periods and context.
   Use an empty `metrics` array when numerical outcomes are unavailable.
5. Update SEO title, description, image, and image alternative text. `seo.siteUrl` can remain empty for
   GitHub Pages because the deployment workflow supplies the canonical URL.
6. After replacing fictional content, set `sampleContent: false` and each real project's `illustrative: false`.

The sample identity, organisations, biography, roles, and outcomes are fictional. Sample labels are
deliberately visible until you replace them. The orange palette can be adjusted through CSS variables
in `src/styles/global.css`. Device sizing uses `device.css`; lock-screen and wallpaper styling use
`lock.css`; widgets/icons/dock use `home.css`; app content uses `apps.css`; media uses `media.css`.

### Set a project's layout

Add `layout` beside a project's `title` or `type` in `src/data/portfolio.ts`:

```ts
layout: 'portrait', // 9:16 vertical frame
```

Options: `'auto'` (existing adaptive layout, also the default when omitted), `'portrait'`
(9:16), `'square'` (1:1), `'landscape'` (16:9), or custom proportions:

```ts
layout: { width: 4, height: 5 }, // Same ratio as 1080 × 1350
```

This changes that project's media frame in both its reel and case study. Frames scale to the
available screen; values are proportions, not fixed pixels. Each project's carousel uses one
consistent frame. Images/videos remain uncropped, so mismatched assets may have empty space.
Keep media `width` and `height` set to the original file dimensions. Captions and navigation
remain responsive, and tall content scrolls inside the iPad.

### Upload media

Place images, videos, posters, and profile photos in **[`public/media/`](public/media/)**.
Detailed format, size, naming, alt-text, and caption guidance is in
**[`public/media/README.md`](public/media/README.md)**.

Media records support local paths, optional responsive image variants, video posters, and WebVTT
captions. Use `media/filename.webp`, not `public/media/filename.webp`. The provided video slot is a
labeled placeholder; upload a file and remove `placeholder: true` to activate video playback.

## Lock screen, home screen, and apps

Every reload starts locked. Swipe upward about 80px, drag upward with a mouse, or click the
**Swipe up to unlock** button. Keyboard users can Tab to the button and press Enter or Space.
The small physical button along the top frame relocks the iPad. This is a presentation interaction,
not password protection; the portfolio remains a public static website.

The clock uses the visitor's local timezone and locale. It updates each minute and resynchronizes when
returning to the tab. The home screen includes a clock/calendar widget, a Resume profile widget, a
featured Portfolio widget, four apps, and a dock of favourites. No live weather, battery, or account
integration is simulated.

- **Portfolio:** scroll/swipe vertically between projects, swipe horizontally between assets, or use
  the arrow buttons. “View case study” opens the complete challenge, strategy, and results.
- **Resume:** local profile, About, experience, and education. Set the `LinkedIn` URL in
  `contact.socials` to activate “Open LinkedIn.” This opens a new tab; it does not embed or synchronize LinkedIn.
- **Skills:** your editable skill groups.
- **Contact:** your email and social links, with honest placeholders for missing destinations.

**Home** returns to the app launcher. **Escape** returns from a case study to its reel, then from an app
Home. App positions persist while the page stays open, including after relocking. Refreshing starts a
new session. In the focused reel area, Up/Down change projects; Left/Right work in a focused carousel.
Videos never autoplay and pause when their app, reel, or slide becomes inactive. Reduced motion disables
unlock animation and smooth scrolling.

### Change the wallpaper

1. Add your image to `public/media/`, for example `public/media/my-wallpaper.webp`.
2. Update the following block in `src/data/portfolio.ts`:

```ts
device: {
  wallpaper: 'media/my-wallpaper.webp',
  wallpaperPosition: 'center', // Try '60% center' to adjust the crop.
},
```

Both lock and home screens use this image. It fills the display using `object-fit: cover`, so its edges
crop differently in landscape and portrait. Prefer a 2400 × 1800 image with a forgiving central focal
area, ideally under 500KB. The supplied blue/mint wallpaper is original SVG artwork. A missing custom
file falls back to it. A solid colour remains if both images fail. You can replace the wallpaper without
editing a component or running a generation tool.

## Publish on GitHub Pages

The repository includes [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

1. Create a GitHub repository, normally public for free GitHub Pages hosting, and upload this project
   with its `package-lock.json` and `.github` folder. Exclude `node_modules`, `dist`, and test artifacts.
2. Push the files to the `main` branch. Use GitHub Desktop if you prefer a graphical workflow.
3. In **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**.
4. In **Actions → Deploy portfolio to GitHub Pages**, choose **Run workflow** (or push a new change).
5. Once successful, the deployment displays the live Pages URL. Future pushes to `main` redeploy.

The workflow runs lint, type checking, unit tests, a production build, and Chromium browser checks
before publishing. The Pages configuration supplies `BASE_PATH` and `SITE_URL`, so both
`https://username.github.io/repository/` and `https://username.github.io/` work without hardcoded paths.
There is no client-side router or backend; all app navigation is local React state. A custom domain can be
configured later in Pages settings. No repository or live site is created automatically by this project.

To simulate a repository URL locally:

```sh
BASE_PATH=/Portfolio/ SITE_URL=https://example.github.io/Portfolio npm run build
BASE_PATH=/Portfolio/ npm run preview
# Open http://127.0.0.1:4173/Portfolio/
```

`SITE_URL` takes precedence over `seo.siteUrl`. If neither is set, local builds omit canonical/og:url
instead of emitting a made-up URL. The initial generated HTML contains the SEO metadata even before
JavaScript runs. Rebuild after editing content or metadata.

## Quality checks

```sh
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

Browser checks cover desktop, tablet, phone, short landscape, and enlarged-text layouts; lock/unlock
and cancelled gestures; app navigation; reel/media controls; focus restoration; retained scroll
positions; reduced motion; wallpaper fallback; and deployed asset paths. Unit tests also verify local
clock updates across midnight and configured/unconfigured LinkedIn and email links.
To test a repository-prefixed build, also pass `BASE_PATH=/Portfolio/` to `npm run test:e2e`.
For an existing Chrome installation, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its executable
instead of downloading Playwright's Chromium.

Runtime dependencies are React and React DOM only. All artwork is original local SVG, with a PNG
social card. No external fonts, analytics, tracking, stock photography, or social-platform branding load.

To regenerate the sample share PNG after editing `public/media/social-card.svg`, run
`npm run social-card` with Playwright Chromium installed (or the Chrome executable environment variable).
