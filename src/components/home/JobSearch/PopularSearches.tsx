import { useTranslation } from 'react-i18next';

import type { JobCategory } from '@/types/job';

const popularSearches = [
  'drivers',
  'construction',
  'manufacturing',
  'hospitality',
  'it',
] as const satisfies readonly JobCategory[];

type PopularSearchesProps = {
  activeCategory?: JobCategory;
  onCategoryChange: (category: JobCategory) => void;
};

export const PopularSearches = ({
  activeCategory,
  onCategoryChange,
}: PopularSearchesProps) => {
  const { t } = useTranslation();

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <span className="mr-1 text-[11px] font-medium text-white/55">
        {t('home.search.popular')}:
      </span>

      {popularSearches.map((item) => {
        const isActive = activeCategory === item;

        return (
          <button
            key={item}
            type="button"
            aria-pressed={isActive}
            onClick={() => onCategoryChange(item)}
            className={`
              rounded-full
              border
              px-3 py-1.5
              text-[11px] font-medium
              transition-all duration-200

              ${
                isActive
                  ? `
                    border-[rgba(34,204,86,0.45)]
                    bg-[rgba(34,204,86,0.14)]
                    text-[var(--color-primary)]
                  `
                  : `
                    border-white/10
                    bg-white/[0.04]
                    text-white/70
                    hover:border-[rgba(34,204,86,0.28)]
                    hover:bg-[rgba(34,204,86,0.08)]
                    hover:text-white
                  `
              }
            `}
          >
            {t(`categories.${item}`)}
          </button>
        );
      })}
    </div>
  );
};
