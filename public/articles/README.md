# Add your writing

Save articles as `.html` files in this folder. A plain text file containing HTML can be renamed
from `.txt` to `.html`; rich-text formats must first be exported as HTML.

Add an entry to `articles` in `src/data/portfolio.ts`:

```ts
{
  id: 'my-essay',
  title: 'My essay title',
  category: 'Essay', // 'Article', 'Essay', or 'Research'
  date: '2026-10',
  summary: 'A short introduction to the piece.',
  file: 'articles/my-essay.html',
},
```

Use a unique ID and a local path starting with `articles/`. No `public/` prefix.
Images and CSS can live beside the HTML file; preserve their relative paths. Use descriptive
kebab-case filenames. Include meaningful headings, image alt text, and references in your article.
The reader applies basic responsive typography and image sizing. Export static HTML:
JavaScript, forms, popups, and other active behavior are disabled in the sandboxed reader.
Use the always-visible **Back to News** button to close an article (Escape works outside the
embedded document). Home returns to the launcher. Add more entries without editing components.
Replace or remove the supplied sample article before publishing. All files here will be public.
