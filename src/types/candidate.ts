import type { JobCategory } from './job';

export type Candidate = {
  id: string;
  name: string;
  profession: string;
  category: JobCategory;
  country: string;
  city: string;
  experienceYears: number;
  available: boolean;
};

export type CandidateSearchParams = {
  query?: string;
  country?: string;
  category?: JobCategory;
};

export type CandidateSearchResult = {
  items: Candidate[];
  total: number;
};
