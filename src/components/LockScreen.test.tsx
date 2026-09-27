import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LockScreen } from './LockScreen';
import { clockTime } from '../lib/clock';

afterEach(() => vi.useRealTimers());

describe('Lock screen', () => {
  it('shows local time and unlocks after its short transition', () => {
    vi.useFakeTimers();
    const now = new Date(2026, 8, 19, 9, 41);
    const onUnlock = vi.fn();
    render(<LockScreen now={now} name="Alex" onUnlock={onUnlock} />);
    expect(screen.getByText(clockTime(now))).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: /Swipe up to unlock/ }));
    expect(onUnlock).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(260));
    expect(onUnlock).toHaveBeenCalledOnce();
  });
  it('unlocks immediately with reduced motion', () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: true } as MediaQueryList);
    const onUnlock = vi.fn();
    render(<LockScreen now={new Date()} name="Alex" onUnlock={onUnlock} />);
    fireEvent.click(screen.getByRole('button', { name: /Swipe up to unlock/ }));
    expect(onUnlock).toHaveBeenCalledOnce();
  });
});
