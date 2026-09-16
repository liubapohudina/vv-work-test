import {
  ArrowRight,
  BriefcaseBusiness,
  Clock3,
  Heart,
  MapPin,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { Job } from '@/types/job';

type PartnerJobCardProps = {
  job: Job;
};

export const PartnerJobCard = ({ job }: PartnerJobCardProps) => {
  const { t } = useTranslation();

  const formattedSalary = new Intl.NumberFormat('en-US').format(
    job.salary.from,
  );

  const formattedSalaryTo = new Intl.NumberFormat('en-US').format(
    job.salary.to,
  );

  return (
    <article
      className="
        group
        flex
        flex-col
        gap-5
        rounded-2xl
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-4
        transition-all
        duration-200

        hover:border-[var(--color-border-strong)]
        hover:shadow-[var(--shadow-card)]

        sm:flex-row
        sm:items-center
      "
    >
      {/* Job image */}
      <div
        className="
          grid
          h-[76px]
          w-full
          shrink-0
          place-items-center
          overflow-hidden
          rounded-xl
          bg-[var(--color-card)]
          text-[var(--color-primary)]

          sm:w-[76px]
        "
      >
        <BriefcaseBusiness size={28} aria-hidden="true" />
      </div>

      {/* Job information */}
      <div className="min-w-0 flex-1">
        <h2
          className="
            text-base
            font-bold
            text-[var(--color-text-primary)]
          "
        >
          {t(job.titleKey)}
        </h2>

        <p
          className="
            mt-1
            text-xs
            font-medium
            text-[var(--color-text-muted)]
          "
        >
          {job.company}
        </p>

        <div
          className="
            mt-2
            flex
            flex-wrap
            items-center
            gap-x-5
            gap-y-2
            text-xs
            text-[var(--color-text-secondary)]
          "
        >
          {/* Location */}
          <span className="flex items-center gap-1.5">
            <MapPin size={13} aria-hidden="true" />
            {job.city}, {t(`countries.${job.country}`)}
          </span>

          {/* Employment type */}
          <span className="flex items-center gap-1.5">
            <Clock3 size={13} aria-hidden="true" />

            {t('partnerPage.fullTime')}
          </span>

          {/* Salary */}
          <span
            className="
              font-semibold
              text-[var(--color-primary)]
            "
          >
            {formattedSalary} – {formattedSalaryTo} {job.salary.currency}
          </span>
        </div>

        {/* Category */}
        <div className="mt-3">
          <span
            className="
              inline-flex
              rounded-lg
              bg-[rgba(34,204,86,0.08)]
              px-2.5
              py-1
              text-[11px]
              font-semibold
              text-[var(--color-primary)]
            "
          >
            {t(`categories.${job.category}`)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div
        className="
    flex
    items-center
    gap-3
    sm:ml-auto
  "
      >
        {/* TODO: Future feature — favorites will be implemented later */}
        <div className="group/tooltip relative">
          <button
            type="button"
            disabled
            aria-label={t('partnerPage.addFavorite')}
            className="
        grid
        h-10
        w-10
        shrink-0
        cursor-not-allowed
        place-items-center
        rounded-xl
        text-[var(--color-text-muted)]
        opacity-50
      "
          >
            <Heart size={19} aria-hidden="true" />
          </button>

          <div
            role="tooltip"
            className="
        pointer-events-none
        absolute
        bottom-[calc(100%+8px)]
        left-1/2
        z-20
        w-max
        max-w-[220px]
        -translate-x-1/2
        rounded-lg
        bg-[var(--color-text-primary)]
        px-3
        py-2
        text-center
        text-xs
        font-medium
        text-[var(--color-bg)]
        opacity-0
        shadow-lg
        transition-opacity
        duration-200

        group-hover/tooltip:opacity-100
      "
          >
            {t('partnerPage.featureInDevelopment')}

            <span
              className="
          absolute
          left-1/2
          top-full
          -translate-x-1/2
          border-4
          border-transparent
          border-t-[var(--color-text-primary)]
        "
            />
          </div>
        </div>

        {/* TODO: Future feature — job details page will be implemented later */}
        <div className="group/tooltip relative">
          <button
            type="button"
            disabled
            className="
        inline-flex
        h-11
        cursor-not-allowed
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-[var(--color-primary)]
        px-5
        text-sm
        font-bold
        text-[#07110d]
        opacity-50
      "
          >
            {t('partnerPage.details')}

            <ArrowRight size={16} aria-hidden="true" />
          </button>

          <div
            role="tooltip"
            className="
        pointer-events-none
        absolute
        bottom-[calc(100%+8px)]
        left-1/2
        z-20
        w-max
        max-w-[220px]
        -translate-x-1/2
        rounded-lg
        bg-[var(--color-text-primary)]
        px-3
        py-2
        text-center
        text-xs
        font-medium
        text-[var(--color-bg)]
        opacity-0
        shadow-lg
        transition-opacity
        duration-200

        group-hover/tooltip:opacity-100
      "
          >
            {t('partnerPage.featureInDevelopment')}

            <span
              className="
          absolute
          left-1/2
          top-full
          -translate-x-1/2
          border-4
          border-transparent
          border-t-[var(--color-text-primary)]
        "
            />
          </div>
        </div>
      </div>
    </article>
  );
};
