import { afterEach, describe, expect, it, vi } from 'vitest';

import { mockFetch } from './mockFetch';

describe('mockFetch', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('returns provided data', async () => {
    vi.useFakeTimers();

    const data = {
      id: 1,
      name: 'VV Work',
    };

    const promise = mockFetch(data, {
      minDelay: 100,
      maxDelay: 100,
      errorRate: 0,
    });

    await vi.advanceTimersByTimeAsync(100);

    await expect(promise).resolves.toEqual(data);
  });

  it('waits for configured delay', async () => {
    vi.useFakeTimers();

    let resolved = false;

    const promise = mockFetch('success', {
      minDelay: 500,
      maxDelay: 500,
      errorRate: 0,
    }).then(() => {
      resolved = true;
    });

    await vi.advanceTimersByTimeAsync(499);

    expect(resolved).toBe(false);

    await vi.advanceTimersByTimeAsync(1);

    await promise;

    expect(resolved).toBe(true);
  });

  it('throws an error when request fails', async () => {
    vi.useFakeTimers();

    const promise = mockFetch('data', {
      minDelay: 0,
      maxDelay: 0,
      errorRate: 1,
    });

    const expectation = expect(promise).rejects.toThrow(
      'Mock API request failed',
    );

    await vi.runAllTimersAsync();

    await expectation;
  });

  it('uses a random delay inside provided range', async () => {
    vi.useFakeTimers();

    vi.spyOn(Math, 'random').mockReturnValueOnce(0.5).mockReturnValueOnce(0.9);

    const promise = mockFetch('data', {
      minDelay: 100,
      maxDelay: 200,
      errorRate: 0,
    });

    await vi.advanceTimersByTimeAsync(150);

    await expect(promise).resolves.toBe('data');
  });
});
