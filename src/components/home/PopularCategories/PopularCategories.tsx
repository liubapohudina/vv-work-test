import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import constructionImage from '@/assets/images/categories/construction.webp';
import driversImage from '@/assets/images/categories/drivers.webp';
import hospitalityImage from '@/assets/images/categories/hospitality.webp';
import itImage from '@/assets/images/categories/it.webp';
import logisticsImage from '@/assets/images/categories/logistics.webp';
import manufacturingImage from '@/assets/images/categories/manufacturing.webp';

import { jobs } from '@/data/jobs';
import type { JobCategory } from '@/types/job';

import { CategoryCard } from './CategoryCard';

type CategoryConfig = {
  id: JobCategory;
  image?: string;
};

const categoryConfig: CategoryConfig[] = [
  {
    id: 'construction',
    image: constructionImage,
  },
  {
    id: 'manufacturing',
    image: manufacturingImage,
  },
  {
    id: 'logistics',
    image: logisticsImage,
  },
  {
    id: 'hospitality',
    image: hospitalityImage,
  },
  {
    id: 'it',
    image: itImage,
  },
  {
    id: 'drivers',
    image: driversImage,
  },
  {
    id: 'other',
  },
];

export const PopularCategories = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang = 'uk' } = useParams();

  const categories = useMemo(() => {
    return categoryConfig.map((category) => {
      const vacanciesCount = jobs.filter(
        (job) => job.category === category.id,
      ).length;

      return {
        ...category,
        vacanciesCount,
      };
    });
  }, []);

  const handleCategoryClick = (category: JobCategory) => {
    navigate(`/${lang}?category=${category}#partners`);
  };

  return (
    <section
      id="categories"
      className="
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
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2
            className="
              text-[26px]
              font-extrabold
              leading-tight
              tracking-[-0.035em]
              text-[var(--color-text-primary)]
              sm:text-[30px]
              lg:text-[34px]
            "
          >
            {t('home.categories.title')}
          </h2>
        </div>

        <div
          className="
            grid
            grid-cols-2
            gap-3
            sm:gap-4
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-7
          "
        >
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category.id}
              image={category.image}
              vacanciesCount={category.vacanciesCount}
              onClick={handleCategoryClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
