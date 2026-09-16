import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { JobCategory } from '@/types/job';

type CategoryCardProps = {
  category: JobCategory;
  image?: string;
  vacanciesCount: number;
  onClick: (category: JobCategory) => void;
};

export const CategoryCard = ({
  category,
  image,
  vacanciesCount,
  onClick,
}: CategoryCardProps) => {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={() => onClick(category)}
      className="
        group
        flex
        min-h-[280px]
        w-full
        min-w-0
        flex-col
        overflow-hidden
        rounded-[20px]
        border
        border-[var(--color-border)]
        bg-[var(--color-card)]
        text-left
        shadow-[var(--shadow-card)]
        transition-all
        duration-300

        hover:-translate-y-1
        hover:border-[rgba(34,204,86,0.35)]
        hover:bg-[var(--color-card-hover)]
        hover:shadow-[var(--shadow-glow)]

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[var(--color-primary)]
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[var(--color-bg)]
      "
    >
      {/* IMAGE */}
      <div
        className="
          relative
          h-[190px]
          w-full
          shrink-0
          overflow-hidden
          bg-[var(--color-surface)]
        "
      >
        {image ? (
          <>
            <img
              src={image}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              width={360}
              height={300}
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-500
                group-hover:scale-[1.05]
              "
            />

            <div
              aria-hidden="true"
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-black/35
                via-transparent
                to-transparent
              "
            />
          </>
        ) : (
          <div
            className="
              grid
              h-full
              w-full
              place-items-center
              bg-[linear-gradient(145deg,var(--color-card-hover),var(--color-surface))]
            "
          >
            <div
              className="
                grid
                h-[62px]
                w-[62px]
                place-items-center
                rounded-full
                border
                border-[var(--color-border-strong)]
                bg-[var(--color-surface)]
                text-[var(--color-text-primary)]
                transition-all
                duration-300

                group-hover:scale-105
                group-hover:border-[var(--color-primary)]
                group-hover:text-[var(--color-primary)]
              "
            >
              <Plus size={28} strokeWidth={1.8} aria-hidden="true" />
            </div>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div
        className="
          flex
          min-h-[90px]
          w-full
          min-w-0
          flex-1
          flex-col
          justify-center
          px-4
          py-3.5
        "
      >
        <h3
          className="
            w-full
            min-w-0
            text-[15px]
            font-bold
            leading-[1.25]
            tracking-[-0.02em]
            text-[var(--color-text-primary)]
            sm:text-[18px]
          "
        >
          {t(`categories.${category}`)}
        </h3>

        <p
          className="
            mt-1.5
            text-[12px]
            font-medium
            leading-none
            text-[var(--color-text-secondary)]
          "
        >
          {t('home.categories.vacancies', {
            count: vacanciesCount,
          })}
        </p>
      </div>
    </button>
  );
};
