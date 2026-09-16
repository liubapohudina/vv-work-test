import { beforeEach, describe, expect, it, vi } from 'vitest';

import { sendContactMessage } from './contactApi';
import { mockFetch } from './mockFetch';

vi.mock('./mockFetch', () => ({
  mockFetch: vi.fn(),
}));

const mockedMockFetch = vi.mocked(mockFetch);

describe('sendContactMessage', () => {
  beforeEach(() => {
    mockedMockFetch.mockImplementation(async (data) => data);
  });

  it('returns successful response', async () => {
    const result = await sendContactMessage();

    expect(result).toEqual({
      success: true,
    });
  });

  it('passes successful response to mockFetch', async () => {
    await sendContactMessage();

    expect(mockedMockFetch).toHaveBeenCalledWith({
      success: true,
    });
  });

  it('propagates API errors', async () => {
    mockedMockFetch.mockRejectedValueOnce(new Error('Mock API request failed'));

    await expect(sendContactMessage()).rejects.toThrow(
      'Mock API request failed',
    );
  });
});
