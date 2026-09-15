import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useDebounce } from '@/hooks/useDebounce';
import { getJobs } from '@/services/jobsApi';
import type { JobCategory } from '@/types/job';

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
      setResultsCount(0);
      setError(null);
      setIsLoading(false);

      return () => {
        ignore = true;
      };
    }

    const loadJobs = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await getJobs({
          query: debouncedQuery.trim(),
          country,
          category,
        });

        if (!ignore) {
          setResultsCount(result.total);
        }
      } catch {
        if (!ignore) {
          setResultsCount(0);
          setError(t('home.search.error'));
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    void loadJobs();

    return () => {
      ignore = true;
    };
  }, [debouncedQuery, country, category, retryKey, hasFilters, t]);

  const handleModeChange = (newMode: SearchMode) => {
    setMode(newMode);
    setQuery('');
    setCountry('');
    setCategory(undefined);
    setResultsCount(0);
    setError(null);
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setCategory(undefined);
  };

  const handleCategoryChange = (value: JobCategory) => {
    setCategory((current) => (current === value ? undefined : value));

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
        onCountryChange={setCountry}
        onSubmit={handleSubmit}
      />

      <PopularSearches
        activeCategory={category}
        onCategoryChange={handleCategoryChange}
      />

      <JobSearchStatus
        isVisible={hasFilters}
        isLoading={isLoading}
        error={error}
        resultsCount={resultsCount}
        onRetry={handleRetry}
      />
    </div>
  );
};
