import { act, renderHook } from '@testing-library/react';
import type { TFunction } from 'i18next';
import { describe, expect, it, vi } from 'vitest';

import { jobs } from '@/data/jobs';
import { partners } from '@/data/partners';

import { usePartnerPage } from './usePartnerPage';

const t = vi.fn((key: string) => {
  const translations: Record<string, string> = {
    'jobs.driverB.title': 'Водій категорії B',
    'jobs.productionWorker.title': 'Працівник на виробництво',
    'jobs.builder.title': 'Будівельник',
    'jobs.frontendDeveloper.title': 'Frontend Developer',
    'jobs.hotelWorker.title': 'Працівник готелю',
    'jobs.warehouseWorker.title': 'Працівник складу',

    'countries.poland': 'Польща',
    'countries.germany': 'Німеччина',
    'countries.netherlands': 'Нідерланди',
    'countries.austria': 'Австрія',
    'countries.czech-republic': 'Чехія',
  };

  return translations[key] ?? key;
}) as unknown as TFunction;

describe('usePartnerPage', () => {
  it('returns partner by slug', () => {
    const partner = partners.find((item) => item.slug === 'build-europe');

    const { result } = renderHook(() => usePartnerPage('build-europe', t));

    expect(result.current.partner).toEqual(partner);
  });

  it('returns undefined partner when slug is undefined', () => {
    const { result } = renderHook(() => usePartnerPage(undefined, t));

    expect(result.current.partner).toBeUndefined();
    expect(result.current.partnerJobs).toEqual([]);
    expect(result.current.availableCategories).toEqual([]);
  });

  it('returns undefined partner for unknown slug', () => {
    const { result } = renderHook(() => usePartnerPage('unknown-partner', t));

    expect(result.current.partner).toBeUndefined();
    expect(result.current.partnerJobs).toEqual([]);
  });

  it('returns only jobs belonging to current partner', () => {
    const partner = partners.find((item) => item.slug === 'build-europe');

    expect(partner).toBeDefined();

    if (!partner) {
      return;
    }

    const expectedJobs = jobs.filter((job) => job.partnerId === partner.id);

    const { result } = renderHook(() => usePartnerPage(partner.slug, t));

    expect(result.current.partnerJobs).toEqual(expectedJobs);

    expect(
      result.current.partnerJobs.every((job) => job.partnerId === partner.id),
    ).toBe(true);
  });

  it('returns available categories for current partner', () => {
    const { result } = renderHook(() => usePartnerPage('build-europe', t));

    expect(result.current.availableCategories).toContain('construction');
  });

  it('has empty search and all category by default', () => {
    const { result } = renderHook(() => usePartnerPage('build-europe', t));

    expect(result.current.search).toBe('');
    expect(result.current.category).toBe('all');
  });

  it('updates search value', () => {
    const { result } = renderHook(() => usePartnerPage('build-europe', t));

    act(() => {
      result.current.setSearch('builder');
    });

    expect(result.current.search).toBe('builder');
  });

  it('updates category value', () => {
    const { result } = renderHook(() => usePartnerPage('build-europe', t));

    act(() => {
      result.current.setCategory('construction');
    });

    expect(result.current.category).toBe('construction');
  });

  it('filters jobs by translated title', () => {
    const { result } = renderHook(() => usePartnerPage('build-europe', t));

    act(() => {
      result.current.setSearch('будівельник');
    });

    expect(result.current.partnerJobs).toHaveLength(1);
    expect(result.current.partnerJobs[0]?.partnerId).toBe('partner-3');
  });

  it('search by translated title is case insensitive', () => {
    const { result } = renderHook(() => usePartnerPage('build-europe', t));

    act(() => {
      result.current.setSearch('БУДІВЕЛЬНИК');
    });

    expect(result.current.partnerJobs).toHaveLength(1);
  });

  it('trims search value before filtering', () => {
    const { result } = renderHook(() => usePartnerPage('build-europe', t));

    act(() => {
      result.current.setSearch('   будівельник   ');
    });

    expect(result.current.partnerJobs).toHaveLength(1);
  });

  it('filters jobs by company', () => {
    const { result } = renderHook(() => usePartnerPage('build-europe', t));

    act(() => {
      result.current.setSearch('build europe');
    });

    expect(result.current.partnerJobs).toHaveLength(1);
    expect(result.current.partnerJobs[0]?.company).toBe('Build Europe');
  });

  it('filters jobs by city', () => {
    const { result } = renderHook(() => usePartnerPage('build-europe', t));

    act(() => {
      result.current.setSearch('krakow');
    });

    expect(result.current.partnerJobs).toHaveLength(1);
    expect(result.current.partnerJobs[0]?.city).toBe('Krakow');
  });

  it('filters jobs by translated country', () => {
    const { result } = renderHook(() => usePartnerPage('build-europe', t));

    act(() => {
      result.current.setSearch('польща');
    });

    expect(result.current.partnerJobs).toHaveLength(1);
    expect(result.current.partnerJobs[0]?.country).toBe('poland');
  });

  it('returns no jobs when search does not match', () => {
    const { result } = renderHook(() => usePartnerPage('build-europe', t));

    act(() => {
      result.current.setSearch('something-that-does-not-exist');
    });

    expect(result.current.partnerJobs).toEqual([]);
  });

  it('filters jobs by category', () => {
    const { result } = renderHook(() => usePartnerPage('build-europe', t));

    act(() => {
      result.current.setCategory('construction');
    });

    expect(result.current.partnerJobs).toHaveLength(1);

    expect(
      result.current.partnerJobs.every(
        (job) => job.category === 'construction',
      ),
    ).toBe(true);
  });

  it('returns no jobs when category does not match', () => {
    const { result } = renderHook(() => usePartnerPage('build-europe', t));

    act(() => {
      result.current.setCategory('it');
    });

    expect(result.current.partnerJobs).toEqual([]);
  });

  it('combines search and category filters', () => {
    const { result } = renderHook(() => usePartnerPage('build-europe', t));

    act(() => {
      result.current.setSearch('будівельник');
      result.current.setCategory('construction');
    });

    expect(result.current.partnerJobs).toHaveLength(1);

    expect(result.current.partnerJobs[0]).toMatchObject({
      partnerId: 'partner-3',
      category: 'construction',
      company: 'Build Europe',
    });
  });

  it('updates partner when slug changes', () => {
    const { result, rerender } = renderHook(
      ({ slug }) => usePartnerPage(slug, t),
      {
        initialProps: {
          slug: 'build-europe',
        },
      },
    );

    expect(result.current.partner?.slug).toBe('build-europe');

    rerender({
      slug: 'digital-europe',
    });

    expect(result.current.partner?.slug).toBe('digital-europe');

    expect(
      result.current.partnerJobs.every(
        (job) => job.partnerId === result.current.partner?.id,
      ),
    ).toBe(true);
  });
});
