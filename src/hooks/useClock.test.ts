import { act, renderHook, fireEvent } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useClock } from './useClock';

afterEach(() => vi.useRealTimers());

describe('Local device clock', () => {
  it('updates at a minute boundary, including the date at midnight', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 8, 19, 23, 59, 58));
    const { result, unmount } = renderHook(useClock);
    expect(result.current.getDate()).toBe(19);
    act(() => vi.advanceTimersByTime(2000));
    expect(result.current.getDate()).toBe(20);
    expect(result.current.getHours()).toBe(0);
    expect(result.current.getMinutes()).toBe(0);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
  it('refreshes immediately on tab visibility and window focus', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 8, 19, 9, 41));
    const { result, unmount } = renderHook(useClock);
    vi.setSystemTime(new Date(2026, 8, 19, 10, 15));
    act(() => fireEvent(window, new Event('focus')));
    expect(result.current.getHours()).toBe(10);
    expect(result.current.getMinutes()).toBe(15);
    vi.setSystemTime(new Date(2026, 8, 19, 12, 30));
    act(() => fireEvent(document, new Event('visibilitychange')));
    expect(result.current.getHours()).toBe(12);
    expect(result.current.getMinutes()).toBe(30);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
