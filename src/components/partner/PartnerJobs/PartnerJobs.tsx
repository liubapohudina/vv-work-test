import { BriefcaseBusiness } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { PartnerJobCard } from '@/components/partner/PartnerJobCard';
import type { Job } from '@/types/job';

type PartnerJobsProps = {
  jobs: Job[];
};

export const PartnerJobs = ({ jobs }: PartnerJobsProps) => {
  const { t } = useTranslation();

  if (jobs.length === 0) {
    return (
      <div
        className="
          mt-5
          rounded-2xl
          border
          border-[var(--color-border)]
          bg-[var(--color-surface)]
          px-5
          py-14
          text-center
        "
      >
        <BriefcaseBusiness
          size={32}
          aria-hidden="true"
          className="
            mx-auto
            text-[var(--color-text-muted)]
          "
        />

        <h2
          className="
            mt-4
            font-bold
            text-[var(--color-text-primary)]
          "
        >
          {t('partnerPage.noJobs')}
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-[var(--color-text-secondary)]
          "
        >
          {t('partnerPage.noJobsDescription')}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-5 space-y-3">
      {jobs.map((job) => (
        <PartnerJobCard key={job.id} job={job} />
      ))}
    </div>
  );
};
