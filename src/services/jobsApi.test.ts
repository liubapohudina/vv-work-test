import { beforeEach, describe, expect, it, vi } from 'vitest';

import { jobs } from '@/data/jobs';

import { getJobs } from './jobsApi';
import { mockFetch } from './mockFetch';

vi.mock('./mockFetch', () => ({
  mockFetch: vi.fn(),
}));

const mockedMockFetch = vi.mocked(mockFetch);

describe('getJobs', () => {
  beforeEach(() => {
    mockedMockFetch.mockImplementation(async (data) => data);
  });

  it('returns all jobs when filters are empty', async () => {
    const result = await getJobs();

    expect(result.items).toEqual(jobs);
    expect(result.total).toBe(jobs.length);
  });

  it('filters jobs by country', async () => {
    const result = await getJobs({
      country: 'poland',
    });

    expect(result.items.length).toBeGreaterThan(0);

    expect(result.items.every((job) => job.country === 'poland')).toBe(true);

    expect(result.total).toBe(result.items.length);
  });

  it('filters jobs by category', async () => {
    const result = await getJobs({
      category: 'construction',
    });

    expect(result.items).toHaveLength(1);

    expect(result.items[0]?.category).toBe('construction');
  });

  it('filters jobs by company query', async () => {
    const result = await getJobs({
      query: 'Build Europe',
    });

    expect(result.items).toHaveLength(1);
    expect(result.items[0]?.company).toBe('Build Europe');
  });

  it('filters jobs by city query', async () => {
    const result = await getJobs({
      query: 'Krakow',
    });

    expect(result.items).toHaveLength(1);
    expect(result.items[0]?.city).toBe('Krakow');
  });

  it('search is case insensitive', async () => {
    const result = await getJobs({
      query: 'bUiLd EuRoPe',
    });

    expect(result.items).toHaveLength(1);
    expect(result.items[0]?.company).toBe('Build Europe');
  });

  it('trims the search query', async () => {
    const result = await getJobs({
      query: '   Krakow   ',
    });

    expect(result.items).toHaveLength(1);
    expect(result.items[0]?.city).toBe('Krakow');
  });

  it('combines query, country and category filters', async () => {
    const result = await getJobs({
      query: 'Krakow',
      country: 'poland',
      category: 'construction',
    });

    expect(result.items).toHaveLength(1);

    expect(result.items[0]).toMatchObject({
      company: 'Build Europe',
      country: 'poland',
      city: 'Krakow',
      category: 'construction',
    });
  });

  it('returns an empty result when nothing matches', async () => {
    const result = await getJobs({
      query: 'something-that-does-not-exist',
    });

    expect(result.items).toEqual([]);
    expect(result.total).toBe(0);
  });
});
