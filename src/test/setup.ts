import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }),
});
Element.prototype.scrollTo = vi.fn();
HTMLMediaElement.prototype.pause = vi.fn();
globalThis.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
