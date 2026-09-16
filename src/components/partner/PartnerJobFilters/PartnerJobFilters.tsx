import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { JobCategory } from '@/types/job';

type PartnerJobFiltersProps = {
  search: string;
  category: string;
  categories: JobCategory[];

  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
};

export const PartnerJobFilters = ({
  search,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
}: PartnerJobFiltersProps) => {
  const { t } = useTranslation();

  return (
    <div
      className="
        mt-6
        grid
        gap-3
        md:grid-cols-[1fr_220px]
      "
    >
      {/* Search */}
      <label className="relative block">
        <span className="sr-only">{t('partnerPage.searchJobs')}</span>

        <Search
          size={17}
          aria-hidden="true"
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-[var(--color-text-muted)]
          "
        />

        <input
          type="search"
          value={search}
          onChange={(event) => {
            onSearchChange(event.target.value);
          }}
          placeholder={t('partnerPage.searchPlaceholder')}
          className="
            h-12
            w-full
            rounded-xl
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            pl-11
            pr-4
            text-sm
            text-[var(--color-text-primary)]
            outline-none
            transition
            placeholder:text-[var(--color-text-muted)]
            focus:border-[var(--color-primary)]
            focus:ring-2
            focus:ring-[rgba(34,204,86,0.12)]
          "
        />
      </label>

      {/* Category */}
      <select
        value={category}
        onChange={(event) => {
          onCategoryChange(event.target.value);
        }}
        aria-label={t('partnerPage.category')}
        className="
          h-12
          rounded-xl
          border
          border-[var(--color-border)]
          bg-[var(--color-surface)]
          px-4
          text-sm
          font-medium
          text-[var(--color-text-primary)]
          outline-none
          transition
          focus:border-[var(--color-primary)]
          focus:ring-2
          focus:ring-[rgba(34,204,86,0.12)]
        "
      >
        <option value="all">{t('partnerPage.allCategories')}</option>

        {categories.map((item) => (
          <option key={item} value={item}>
            {t(`categories.${item}`)}
          </option>
        ))}
      </select>
    </div>
  );
};
