import { beforeEach, describe, expect, it, vi } from 'vitest';

import { partners } from '@/data/partners';

import { getPartnerBySlug, getPartners } from './partnersApi';
import { mockFetch } from './mockFetch';

vi.mock('./mockFetch', () => ({
  mockFetch: vi.fn(),
}));

const mockedMockFetch = vi.mocked(mockFetch);

describe('partnersApi', () => {
  beforeEach(() => {
    mockedMockFetch.mockImplementation(async (data) => data);
  });

  describe('getPartners', () => {
    it('returns all partners', async () => {
      const result = await getPartners();

      expect(result).toEqual(partners);

      expect(mockedMockFetch).toHaveBeenCalledWith(partners);
    });
  });

  describe('getPartnerBySlug', () => {
    it('returns partner by slug', async () => {
      const partner = partners[0];

      expect(partner).toBeDefined();

      if (!partner) {
        return;
      }

      const result = await getPartnerBySlug(partner.slug);

      expect(result).toEqual(partner);

      expect(mockedMockFetch).toHaveBeenCalledWith(partner);
    });

    it('throws when partner does not exist', async () => {
      await expect(getPartnerBySlug('unknown-partner')).rejects.toThrow(
        'Partner not found',
      );

      expect(mockedMockFetch).not.toHaveBeenCalled();
    });
  });
});
