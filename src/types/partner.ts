import type { JobCategory } from '@/types/job';

export type Partner = {
  id: string;
  slug: string;

  name: string;
  descriptionKey: string;

  country: string;
  city: string;

  verified: boolean;

  employeesCount?: string;
  jobsCount: number;

  foundedYear?: number;
  rating?: number;

  logo?: string;
  coverImage?: string;

  categories: JobCategory[];
};
