import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import { ErrorState } from '@/components/ui/ErrorState';
import { Skeleton } from '@/components/ui/Skeleton';
import { partners } from '@/data/partners';
import type { Job } from '@/types/job';
import type { SearchMode } from './JobSearch';

type JobSearchStatusProps = {
  mode: SearchMode;
  isVisible: boolean;
  isLoading: boolean;
  error: string | null;
  jobs: Job[];
  resultsCount: number;
  onRetry: () => void;
};

export const JobSearchStatus = ({
  mode,
  isVisible,
  isLoading,
  error,
  jobs,
  resultsCount,
  onRetry,
}: JobSearchStatusProps) => {
  const { t } = useTranslation();
  const { lang = 'uk' } = useParams();

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
        <Skeleton className="h-3 w-[70px]" />
        <Skeleton className="h-3 w-[90px]" />
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

  const partnerIds = new Set(jobs.map((job) => job.partnerId));

  const matchedPartners = partners.filter((partner) =>
    partnerIds.has(partner.id),
  );

  return (
    <div className="mt-3" aria-live="polite">
      <p className="text-[12px] font-medium text-white/55">
        {t('home.search.resultsFound', {
          count: resultsCount,
        })}
      </p>

      {mode === 'job'
        ? t('home.search.jobsFound', {
            count: resultsCount,
          })
        : t('home.search.candidatesFound', {
            count: resultsCount,
          })}

      {mode === 'job' && matchedPartners.length > 0 && (
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="text-[11px] text-white/45">
            {t('home.search.foundAt')}:
          </span>

          {matchedPartners.map((partner) => (
            <Link
              key={partner.id}
              to={`/${lang}/partners/${partner.slug}`}
              className="
          inline-flex items-center gap-1
          text-[11px] font-semibold
          text-[var(--color-primary)]
          transition-opacity
          hover:opacity-75
        "
            >
              {partner.name}

              <ArrowRight size={12} aria-hidden="true" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
