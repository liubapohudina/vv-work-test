import { jobs } from '@/data/jobs';
import type { Job, JobSearchParams, JobSearchResult } from '@/types/job';

import { mockFetch } from './mockFetch';

const normalize = (value: string) => {
  return value.trim().toLocaleLowerCase();
};

const matchesQuery = (job: Job, query: string) => {
  if (!query) {
    return true;
  }

  const normalizedQuery = normalize(query);

  return [job.company, job.city, job.country, job.category].some((value) =>
    normalize(value).includes(normalizedQuery),
  );
};

export const getJobs = async (
  params: JobSearchParams = {},
): Promise<JobSearchResult> => {
  const { query = '', country = '', category } = params;

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = matchesQuery(job, query);

    const matchesCountry = !country || job.country === country;

    const matchesCategory = !category || job.category === category;

    return matchesSearch && matchesCountry && matchesCategory;
  });

  return mockFetch({
    items: filteredJobs,
    total: filteredJobs.length,
  });
};
