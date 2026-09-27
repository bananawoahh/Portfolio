# Your portfolio media

Upload project images, video files, posters, captions, and your profile photo here.
Reference them from `src/data/portfolio.ts` as `media/filename.webp` — omit `public/`.
Do not hardcode your repository name into paths; the site adds the GitHub Pages base automatically.

## Formats and recommended sizes

| Asset                     | Supported formats          | Recommendation                                     |
| ------------------------- | -------------------------- | -------------------------------------------------- |
| Project image             | WebP, AVIF, JPEG, PNG, SVG | 1600 × 1200 (4:3); aim for under 300KB             |
| Additional image variants | Same as above              | 480px, 960px, and 1600px wide; keep the same ratio |
| Video                     | MP4 (H.264), WebM          | 720p or 1080p, 10–30 seconds; aim for under 10MB   |
| Video poster              | WebP, JPEG, PNG, SVG       | Same ratio as the video; under 200KB               |
| Profile photo             | WebP, JPEG, PNG            | Square, 400 × 400 or larger; under 150KB           |
| Social share image        | PNG or JPEG                | 1200 × 630; under 500KB                            |
| Captions                  | WebVTT (`.vtt`)            | Include dialogue and meaningful non-speech sounds  |

4:3 is a good source ratio for project art. Images and videos are contained without cropping inside
the responsive reel stage. The small featured-work widget may crop its preview.
SVG is ideal for original vector campaign art, but use PNG/JPEG for social sharing compatibility.
No third-party photos or logos are included. All supplied artwork is original illustrative content.

## Names

Use lowercase, kebab-case, descriptive names:

```
common-ground-launch-hero.webp
common-ground-launch-social-01.webp
common-ground-launch-film.mp4
common-ground-launch-poster.webp
common-ground-launch-en.vtt
alex-morgan-profile.webp
```

Names and capitalization must match exactly: GitHub Pages paths are case-sensitive.
Use filenames without spaces and keep media below GitHub's per-file limits.
Compress videos before uploading; do not commit camera originals.

## Adding images

Add an entry to a project's `media` array in `src/data/portfolio.ts`:

```ts
{
  type: 'image',
  src: 'media/common-ground-launch-hero.webp',
  alt: 'Describe the actual campaign artwork and its meaningful text.',
  width: 1600,
  height: 1200,
  variants: [ // Optional; only list files that actually exist.
    { src: 'media/common-ground-launch-hero-480.webp', width: 480 },
    { src: 'media/common-ground-launch-hero-960.webp', width: 960 },
    { src: 'media/common-ground-launch-hero.webp', width: 1600 },
  ],
}
```

The dimensions should describe your actual source file. The optional responsive variants prevent
small devices from downloading larger files than necessary. More than one media entry automatically
creates a carousel. Empty arrays and broken files receive a designed fallback.

## Adding videos

```ts
{
  type: 'video',
  src: 'media/common-ground-launch-film.mp4',
  poster: 'media/common-ground-launch-poster.webp',
  alt: 'A 20-second film introducing the local makers behind the campaign.',
  width: 1920,
  height: 1080,
  captions: [
    { src: 'media/common-ground-launch-en.vtt', language: 'en', label: 'English' },
  ],
}
```

Remove `placeholder: true` from the supplied sample video slot after uploading your video.
The sample slot intentionally does not request a missing MP4. Real videos use native playback controls,
never autoplay, and pause when their slide becomes inactive. Captions are especially important for
speech. Describe important visual-only information in the project text or linked transcript.

## Replace these sample assets

- The `common-ground-*`, `after-hours`, `better-together`, and `northline` SVGs are fictional campaign art.
- `social-card.png` and its editable SVG source contain the sample name. Upload your own share image
  and update `seo.image` and `seo.imageAlt` in the central data file.
- A profile photo is optional. Set `profile.photo` to its media path; otherwise your initials are shown.

Do not change UI components to add or reorder projects: edit the central data file instead.

## Wallpaper

`ipad-wallpaper.svg` is the original blue/mint background and fallback. To use your own image, add a
WebP, AVIF, JPEG, PNG, or SVG here and update `device.wallpaper` in `src/data/portfolio.ts`. Recommended
size: 2400 × 1800, ideally under 500KB. The same file fills the lock and home screens. Use
`device.wallpaperPosition` (for example `center` or `60% center`) to adjust cropping. Keep important
subjects near the centre so the image works in landscape and portrait. Wallpaper is decorative, so
there is no alt-text field; avoid using it to convey essential portfolio information.
