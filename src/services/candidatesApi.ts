import { candidates } from '@/data/candidates';
import type {
  CandidateSearchParams,
  CandidateSearchResult,
} from '@/types/candidate';

import { mockFetch } from './mockFetch';

const normalize = (value: string): string => {
  return value.trim().toLocaleLowerCase();
};

export const getCandidates = async (
  params: CandidateSearchParams = {},
): Promise<CandidateSearchResult> => {
  const { query = '', country = '', category } = params;

  const normalizedQuery = normalize(query);

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesQuery =
      !normalizedQuery ||
      [candidate.name, candidate.profession, candidate.city].some((value) =>
        normalize(value).includes(normalizedQuery),
      );

    const matchesCountry = !country || candidate.country === country;

    const matchesCategory = !category || candidate.category === category;

    return matchesQuery && matchesCountry && matchesCategory;
  });

  return mockFetch({
    items: filteredCandidates,
    total: filteredCandidates.length,
  });
};
