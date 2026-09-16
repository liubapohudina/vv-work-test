import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns initial value immediately', () => {
    vi.useFakeTimers();

    const { result } = renderHook(() => useDebounce('initial'));

    expect(result.current).toBe('initial');
  });

  it('does not update value before delay', () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 400),
      {
        initialProps: {
          value: 'first',
        },
      },
    );

    rerender({
      value: 'second',
    });

    act(() => {
      vi.advanceTimersByTime(399);
    });

    expect(result.current).toBe('first');
  });

  it('updates value after delay', () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 400),
      {
        initialProps: {
          value: 'first',
        },
      },
    );

    rerender({
      value: 'second',
    });

    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(result.current).toBe('second');
  });

  it('uses 400ms as the default delay', () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: {
        value: 'first',
      },
    });

    rerender({
      value: 'second',
    });

    act(() => {
      vi.advanceTimersByTime(399);
    });

    expect(result.current).toBe('first');

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(result.current).toBe('second');
  });

  it('resets timer when value changes again', () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 400),
      {
        initialProps: {
          value: 'first',
        },
      },
    );

    rerender({
      value: 'second',
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    rerender({
      value: 'third',
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current).toBe('first');

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe('third');
  });

  it('clears timeout when component unmounts', () => {
    vi.useFakeTimers();

    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');

    const { unmount } = renderHook(() => useDebounce('test', 400));

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();

    clearTimeoutSpy.mockRestore();
  });
});
