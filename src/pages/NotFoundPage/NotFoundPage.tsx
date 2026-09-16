import { ArrowLeft, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import { PageMeta } from '@/components/seo/PageMeta';

export const NotFoundPage = () => {
  const { t } = useTranslation();
  const { lang = 'uk' } = useParams();

  return (
    <>
      <PageMeta
        title={t('seo.notFound.title')}
        description={t('seo.notFound.description')}
        lang={lang}
        noIndex
      />

      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[var(--color-bg)]
          px-4
          py-24
        "
      >
        <div className="max-w-[600px] text-center">
          <p
            className="
              text-[clamp(7rem,25vw,13rem)]
              font-extrabold
              leading-none
              tracking-[-0.08em]
              text-[var(--color-primary)]
              opacity-10
            "
            aria-hidden="true"
          >
            404
          </p>

          <div className="-mt-10 sm:-mt-14">
            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.18em]
                text-[var(--color-primary)]
              "
            >
              404
            </p>

            <h1
              className="
                mt-3
                text-3xl
                font-extrabold
                tracking-[-0.04em]
                text-[var(--color-text-primary)]
                sm:text-4xl
              "
            >
              {t('notFound.title')}
            </h1>

            <p
              className="
                mx-auto
                mt-4
                max-w-[480px]
                text-sm
                leading-7
                text-[var(--color-text-secondary)]
                sm:text-base
              "
            >
              {t('notFound.description')}
            </p>

            <div
              className="
                mt-8
                flex
                flex-col
                justify-center
                gap-3
                sm:flex-row
              "
            >
              <Link
                to={`/${lang}`}
                className="
                  inline-flex
                  h-12
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[var(--color-primary)]
                  px-6
                  text-sm
                  font-bold
                  text-[#07110d]
                  transition-colors
                  hover:bg-[var(--color-primary-hover)]
                "
              >
                <Home size={17} aria-hidden="true" />

                {t('notFound.home')}
              </Link>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="
                  inline-flex
                  h-12
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-[var(--color-border)]
                  bg-[var(--color-surface)]
                  px-6
                  text-sm
                  font-semibold
                  text-[var(--color-text-primary)]
                  transition-colors
                  hover:bg-[var(--color-card)]
                "
              >
                <ArrowLeft size={17} aria-hidden="true" />

                {t('notFound.back')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
