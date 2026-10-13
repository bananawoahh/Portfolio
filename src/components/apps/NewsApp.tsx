import { useEffect, useState } from 'react';
import type { Portfolio, NewsArticle } from '../../types';
import { assetUrl, displayDate } from '../../lib/media';
import { Navigation } from '../Navigation';
import { Arrow } from '../Icon';

function ArticleReader({ article }: { article: NewsArticle }) {
  const [html, setHtml] = useState<string>();
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        // Serve local documents from this site so repository-prefixed URLs keep working.
        if (!article.file.startsWith('articles/') || article.file.includes('..'))
          throw new Error('Invalid article path');
        const url = new URL(assetUrl(article.file), window.location.href);
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error('Article unavailable');
        const text = await response.text();
        if (text.includes('id="root"') || !/<(?:html|body|article|p|h[1-6])\b/i.test(text))
          throw new Error('Not an HTML article');
        const doc = new DOMParser().parseFromString(text, 'text/html');
        doc.querySelectorAll('base').forEach((node) => node.remove());
        const base = doc.createElement('base');
        base.href = url.href;
        doc.head.prepend(base);
        const viewport = doc.createElement('meta');
        viewport.name = 'viewport';
        viewport.content = 'width=device-width, initial-scale=1';
        doc.head.append(viewport);
        const style = doc.createElement('style');
        style.textContent =
          'html{overflow-wrap:anywhere}body{box-sizing:border-box;max-width:100%;margin:0;padding:24px;font-family:system-ui,sans-serif;line-height:1.75;color:#302d24;background:#fffcf5}img,video,svg{max-width:100%;height:auto}pre{white-space:pre-wrap}';
        doc.head.append(style);
        if (!controller.signal.aborted) setHtml('<!doctype html>' + doc.documentElement.outerHTML);
      } catch {
        if (!controller.signal.aborted) setFailed(true);
      }
    }
    void load();
    return () => controller.abort();
  }, [article.file]);
  if (failed)
    return (
      <div className="screen-scroll news-message" role="status">
        <h2>Article unavailable</h2>
        <p>This piece could not be loaded. Please try another article.</p>
      </div>
    );
  if (!html)
    return (
      <p className="news-message" role="status">
        Opening article…
      </p>
    );
  return <iframe className="article-reader" title={article.title} srcDoc={html} sandbox="" />;
}

export function NewsApp({ data, active }: { data: Portfolio; active: boolean }) {
  const [selected, setSelected] = useState<NewsArticle | null>(null);
  const back = () => {
    const id = selected?.id;
    setSelected(null);
    requestAnimationFrame(() =>
      document.getElementById(`article-${id}`)?.focus({ preventScroll: true }),
    );
  };
  return (
    <div
      className="news-app"
      onKeyDown={(event) => {
        if (selected && event.key === 'Escape') {
          event.preventDefault();
          event.stopPropagation();
          back();
        }
      }}
    >
      <Navigation
        app="news"
        title="News"
        onBack={selected ? back : undefined}
        backLabel="Back to News"
      >
        <span className="app-subtitle">Articles · Essays · Research</span>
      </Navigation>
      <div
        className="screen-scroll news-content"
        role="region"
        aria-label="News content"
        tabIndex={0}
        hidden={!!selected}
      >
        <header className="news-intro">
          <span className="eyebrow">The reading room</span>
          <h2>News.</h2>
          <p>Articles, essays, and research from my desk.</p>
        </header>
        <div className="news-list">
          {data.articles.map((article) => (
            <article className="news-card" key={article.id}>
              <div className="news-meta">
                <span>{article.category}</span>
                <span>{displayDate(article.date)}</span>
              </div>
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
              <button
                id={`article-${article.id}`}
                type="button"
                onClick={() => {
                  setSelected(article);
                  requestAnimationFrame(() => document.getElementById('article-heading')?.focus());
                }}
              >
                Read {article.category.toLowerCase()} <Arrow />
              </button>
            </article>
          ))}
        </div>
        {!data.articles.length && <p className="news-message">New writing is on its way.</p>}
      </div>
      {selected && (
        <section className="news-detail" aria-labelledby="article-heading">
          <h2 id="article-heading" tabIndex={-1}>
            {selected.title}
          </h2>
          {active && <ArticleReader key={selected.id} article={selected} />}
        </section>
      )}
    </div>
  );
}
