import { X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { ErrorState } from '@/components/ui/ErrorState';
import { jobs } from '@/data/jobs';
import { getPartners } from '@/services/partnersApi';
import type { JobCategory } from '@/types/job';
import type { Partner } from '@/types/partner';

import { PartnerCard } from './PartnerCard';
import { PartnersSkeleton } from './PartnersSkeleton';

const jobCategories: JobCategory[] = [
  'construction',
  'manufacturing',
  'logistics',
  'hospitality',
  'it',
  'drivers',
  'other',
];

const isJobCategory = (value: string | null): value is JobCategory => {
  return value !== null && jobCategories.includes(value as JobCategory);
};

export const PartnersSection = () => {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  const categoryParam = searchParams.get('category');

  const activeCategory = isJobCategory(categoryParam)
    ? categoryParam
    : undefined;

  useEffect(() => {
    let ignore = false;

    const loadPartners = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await getPartners();

        if (!ignore) {
          setPartners(result);
        }
      } catch {
        if (!ignore) {
          setError(t('home.partners.error'));
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    void loadPartners();

    return () => {
      ignore = true;
    };
  }, [retryKey, t]);

  const visiblePartners = useMemo(() => {
    if (!activeCategory) {
      return partners;
    }

    const partnerIds = new Set(
      jobs
        .filter((job) => job.category === activeCategory)
        .map((job) => job.partnerId),
    );

    return partners.filter((partner) => partnerIds.has(partner.id));
  }, [activeCategory, partners]);

  const handleRetry = useCallback(() => {
    setRetryKey((current) => current + 1);
  }, []);

  const handleClearCategory = () => {
    const nextParams = new URLSearchParams(searchParams);

    nextParams.delete('category');

    const queryString = nextParams.toString();

    navigate({
      pathname: location.pathname,
      search: queryString ? `?${queryString}` : '',
      hash: '#partners',
    });
  };

  return (
    <section
      id="partners"
      aria-labelledby="partners-heading"
      className="
        scroll-mt-24
        bg-[var(--color-bg)]
        py-14
        sm:py-16
        lg:py-20
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1440px]
          px-4
          sm:px-6
          lg:px-12
        "
      >
        <div
          className="
            mb-8
            flex
            flex-col
            gap-5
            sm:mb-10
            md:flex-row
            md:items-end
            md:justify-between
          "
        >
          <div className="max-w-[680px]">
            <span
              className="
                text-[11px]
                font-bold
                uppercase
                tracking-[0.08em]
                text-[var(--color-primary)]
              "
            >
              {t('home.partners.eyebrow')}
            </span>

            <h2
              id="partners-heading"
              className="
                mt-2
                text-[28px]
                font-extrabold
                leading-[1.1]
                tracking-[-0.04em]
                text-[var(--color-text-primary)]
                sm:text-[34px]
                lg:text-[40px]
              "
            >
              {activeCategory
                ? t('home.partners.filteredTitle', {
                    category: t(`categories.${activeCategory}`),
                  })
                : t('home.partners.title')}
            </h2>

            <p
              className="
                mt-3
                max-w-[580px]
                text-[14px]
                leading-[1.6]
                text-[var(--color-text-secondary)]
                sm:text-[15px]
              "
            >
              {activeCategory
                ? t('home.partners.filteredDescription', {
                    count: visiblePartners.length,
                  })
                : t('home.partners.description')}
            </p>
          </div>

          {activeCategory && (
            <button
              type="button"
              onClick={handleClearCategory}
              className="
                inline-flex
                w-fit
                items-center
                gap-2
                rounded-full
                border
                border-[rgba(34,204,86,0.22)]
                bg-[rgba(34,204,86,0.07)]
                px-3.5
                py-2
                text-[12px]
                font-semibold
                text-[var(--color-primary)]
                transition-colors

                hover:bg-[rgba(34,204,86,0.12)]

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[var(--color-primary)]
              "
            >
              {t(`categories.${activeCategory}`)}

              <X size={14} strokeWidth={2} aria-hidden="true" />
            </button>
          )}
        </div>

        {isLoading && <PartnersSkeleton />}

        {!isLoading && error && (
          <ErrorState message={error} onRetry={handleRetry} />
        )}

        {!isLoading && !error && visiblePartners.length === 0 && (
          <div
            className="
                rounded-[22px]
                border
                border-[var(--color-border)]
                bg-[var(--color-surface)]
                px-5
                py-12
                text-center
                sm:px-8
              "
          >
            <h3
              className="
                  text-[18px]
                  font-bold
                  text-[var(--color-text-primary)]
                "
            >
              {t('home.partners.emptyTitle')}
            </h3>

            <p
              className="
                  mx-auto
                  mt-2
                  max-w-[440px]
                  text-[13px]
                  leading-[1.6]
                  text-[var(--color-text-secondary)]
                "
            >
              {t('home.partners.emptyDescription')}
            </p>

            {activeCategory && (
              <button
                type="button"
                onClick={handleClearCategory}
                className="
                    mt-5
                    rounded-[12px]
                    bg-[var(--color-primary)]
                    px-4
                    py-2.5
                    text-[13px]
                    font-bold
                    text-[#07110d]
                    transition-colors
                    hover:bg-[var(--color-primary-hover)]
                  "
              >
                {t('home.partners.showAll')}
              </button>
            )}
          </div>
        )}

        {!isLoading && !error && visiblePartners.length > 0 && (
          <div
            className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
                xl:grid-cols-4
              "
          >
            {visiblePartners.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
