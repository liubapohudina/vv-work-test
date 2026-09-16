import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useDebounce } from '@/hooks/useDebounce';
import { getCandidates } from '@/services/candidatesApi';
import { getJobs } from '@/services/jobsApi';
import type { Job, JobCategory } from '@/types/job';

import { JobSearchForm } from './JobSearchForm';
import { JobSearchStatus } from './JobSearchStatus';
import { PopularSearches } from './PopularSearches';

export type SearchMode = 'job' | 'employee';

export const JobSearch = () => {
  const { t } = useTranslation();

  const [mode, setMode] = useState<SearchMode>('job');

  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('');
  const [category, setCategory] = useState<JobCategory | undefined>();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [resultsCount, setResultsCount] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  const debouncedQuery = useDebounce(query, 400);

  const hasFilters =
    debouncedQuery.trim().length >= 2 || Boolean(country) || Boolean(category);

  useEffect(() => {
    let ignore = false;

    if (!hasFilters) {
      setJobs([]);
      setResultsCount(0);
      setError(null);
      setIsLoading(false);

      return () => {
        ignore = true;
      };
    }

    const loadResults = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const searchParams = {
          query: debouncedQuery.trim(),
          country,
          category,
        };

        if (mode === 'job') {
          const result = await getJobs(searchParams);

          if (ignore) {
            return;
          }

          setJobs(result.items);
          setResultsCount(result.total);

          return;
        }

        const result = await getCandidates(searchParams);

        if (ignore) {
          return;
        }

        setJobs([]);
        setResultsCount(result.total);
      } catch {
        if (ignore) {
          return;
        }

        setJobs([]);
        setResultsCount(0);
        setError(t('home.search.error'));
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    void loadResults();

    return () => {
      ignore = true;
    };
  }, [mode, debouncedQuery, country, category, retryKey, hasFilters, t]);

  const handleModeChange = (newMode: SearchMode) => {
    if (newMode === mode) {
      return;
    }

    setMode(newMode);

    setQuery('');
    setCountry('');
    setCategory(undefined);

    setJobs([]);
    setResultsCount(0);

    setError(null);
    setIsLoading(false);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);

    if (category) {
      setCategory(undefined);
    }
  };

  const handleCountryChange = (value: string) => {
    setCountry(value);
  };

  const handleCategoryChange = (value: JobCategory) => {
    setCategory((currentCategory) =>
      currentCategory === value ? undefined : value,
    );

    setQuery('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hasFilters) {
      return;
    }

    setRetryKey((current) => current + 1);
  };

  const handleRetry = () => {
    setRetryKey((current) => current + 1);
  };

  return (
    <div className="mt-8 w-full max-w-[780px] sm:mt-10">
      <JobSearchForm
        mode={mode}
        query={query}
        country={country}
        isLoading={isLoading}
        onModeChange={handleModeChange}
        onQueryChange={handleQueryChange}
        onCountryChange={handleCountryChange}
        onSubmit={handleSubmit}
      />

      <PopularSearches
        activeCategory={category}
        onCategoryChange={handleCategoryChange}
      />

      <JobSearchStatus
        mode={mode}
        isVisible={hasFilters}
        isLoading={isLoading}
        error={error}
        jobs={jobs}
        resultsCount={resultsCount}
        onRetry={handleRetry}
      />
    </div>
  );
};
