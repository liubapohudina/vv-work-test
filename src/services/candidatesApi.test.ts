import { beforeEach, describe, expect, it, vi } from 'vitest';

import { candidates } from '@/data/candidates';

import { getCandidates } from './candidatesApi';
import { mockFetch } from './mockFetch';

vi.mock('./mockFetch', () => ({
  mockFetch: vi.fn(),
}));

const mockedMockFetch = vi.mocked(mockFetch);

describe('getCandidates', () => {
  beforeEach(() => {
    mockedMockFetch.mockImplementation(async (data) => data);
  });

  it('returns all candidates without filters', async () => {
    const result = await getCandidates();

    expect(result.items).toEqual(candidates);
    expect(result.total).toBe(candidates.length);
  });

  it('filters candidates by name', async () => {
    const candidate = candidates[0];

    expect(candidate).toBeDefined();

    if (!candidate) {
      return;
    }

    const result = await getCandidates({
      query: candidate.name,
    });

    expect(result.items.some((item) => item.id === candidate.id)).toBe(true);
  });

  it('filters candidates by profession', async () => {
    const candidate = candidates[0];

    expect(candidate).toBeDefined();

    if (!candidate) {
      return;
    }

    const result = await getCandidates({
      query: candidate.profession,
    });

    expect(result.items.some((item) => item.id === candidate.id)).toBe(true);
  });

  it('filters candidates by city', async () => {
    const candidate = candidates[0];

    expect(candidate).toBeDefined();

    if (!candidate) {
      return;
    }

    const result = await getCandidates({
      query: candidate.city,
    });

    expect(result.items.some((item) => item.id === candidate.id)).toBe(true);
  });

  it('filters candidates by country', async () => {
    const candidate = candidates[0];

    expect(candidate).toBeDefined();

    if (!candidate) {
      return;
    }

    const result = await getCandidates({
      country: candidate.country,
    });

    expect(result.items.length).toBeGreaterThan(0);

    expect(
      result.items.every((item) => item.country === candidate.country),
    ).toBe(true);
  });

  it('filters candidates by category', async () => {
    const candidate = candidates[0];

    expect(candidate).toBeDefined();

    if (!candidate) {
      return;
    }

    const result = await getCandidates({
      category: candidate.category,
    });

    expect(result.items.length).toBeGreaterThan(0);

    expect(
      result.items.every((item) => item.category === candidate.category),
    ).toBe(true);
  });

  it('search is case insensitive and trims whitespace', async () => {
    const candidate = candidates[0];

    expect(candidate).toBeDefined();

    if (!candidate) {
      return;
    }

    const result = await getCandidates({
      query: `   ${candidate.name.toUpperCase()}   `,
    });

    expect(result.items.some((item) => item.id === candidate.id)).toBe(true);
  });

  it('returns empty result when nothing matches', async () => {
    const result = await getCandidates({
      query: 'candidate-that-does-not-exist-xyz',
    });

    expect(result.items).toEqual([]);
    expect(result.total).toBe(0);
  });
});
