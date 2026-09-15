import { useTranslation } from 'react-i18next';

import { ErrorState } from '@/components/ui/ErrorState';
import { Skeleton } from '@/components/ui/Skeleton';

type JobSearchStatusProps = {
  isVisible: boolean;
  isLoading: boolean;
  error: string | null;
  resultsCount: number;
  onRetry: () => void;
};

export const JobSearchStatus = ({
  isVisible,
  isLoading,
  error,
  resultsCount,
  onRetry,
}: JobSearchStatusProps) => {
  const { t } = useTranslation();

  if (!isVisible) {
    return null;
  }

  if (isLoading) {
    return (
      <div
        className="mt-3 flex items-center gap-2"
        aria-label={t('common.loading')}
      >
        <Skeleton className="h-3 w-[110px]" />
        <Skeleton className="h-3 w-[55px]" />
        <Skeleton className="h-3 w-[75px]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-3">
        <ErrorState message={error} onRetry={onRetry} />
      </div>
    );
  }

  if (resultsCount === 0) {
    return (
      <p
        className="mt-3 text-[12px] font-medium text-white/55"
        aria-live="polite"
      >
        {t('home.search.noResults')}
      </p>
    );
  }

  return (
    <p
      className="mt-3 text-[12px] font-medium text-white/55"
      aria-live="polite"
    >
      {t('home.search.resultsFound', {
        count: resultsCount,
      })}
    </p>
  );
};
