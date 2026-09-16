import { beforeEach, describe, expect, it, vi } from 'vitest';

import { sendContactMessage, type ContactFormData } from './contactApi';
import { mockFetch } from './mockFetch';

vi.mock('./mockFetch', () => ({
  mockFetch: vi.fn(),
}));

const mockedMockFetch = vi.mocked(mockFetch);

const formData: ContactFormData = {
  name: 'Anna',
  contact: '+48 123 456 789',
  message: 'Hello',
};

describe('sendContactMessage', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockedMockFetch.mockImplementation(async (data) => data);
  });

  it('returns successful response', async () => {
    const result = await sendContactMessage(formData);

    expect(result).toEqual({
      success: true,
    });
  });

  it('passes successful response to mockFetch', async () => {
    await sendContactMessage(formData);

    expect(mockedMockFetch).toHaveBeenCalledWith({
      success: true,
    });
  });

  it('propagates API errors', async () => {
    mockedMockFetch.mockRejectedValueOnce(new Error('Mock API request failed'));

    await expect(sendContactMessage(formData)).rejects.toThrow(
      'Mock API request failed',
    );
  });
});
