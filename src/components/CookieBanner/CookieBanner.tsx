import { Cookie, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/Button';

type CookieConsent = 'accepted' | 'rejected';

const COOKIE_CONSENT_KEY = 'vv-work-cookie-consent';

export const CookieBanner = () => {
  const { t } = useTranslation();
  const { lang = 'uk' } = useParams();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);

    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const saveConsent = (consent: CookieConsent) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, consent);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <aside
      aria-label={t('cookieBanner.ariaLabel')}
      className="
        fixed
        inset-x-3
        bottom-3
        z-[100]

        mx-auto
        w-[calc(100%-24px)]
        max-w-[1180px]

        rounded-[20px]
        border
        border-[var(--color-border-strong)]

        bg-[color-mix(in_srgb,var(--color-surface)_94%,transparent)]
        p-4

        shadow-[0_20px_70px_rgba(0,0,0,0.28)]

        backdrop-blur-xl
        sm:inset-x-5
        sm:bottom-5
        sm:w-[calc(100%-40px)]
        sm:p-5
      "
    >
      <div
        className="
          flex
          flex-col
          gap-5

          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        {/* Content */}
        <div className="flex min-w-0 items-start gap-3.5">
          <div
            aria-hidden="true"
            className="
              grid
              h-11
              w-11
              shrink-0
              place-items-center
              rounded-[13px]

              border
              border-[rgba(34,204,86,0.18)]
              bg-[rgba(34,204,86,0.08)]
              text-[var(--color-primary)]
            "
          >
            <Cookie size={21} strokeWidth={2} />
          </div>

          <div className="min-w-0">
            <h2
              className="
                text-[14px]
                font-bold
                leading-[1.3]
                tracking-[-0.02em]
                text-[var(--color-text-primary)]

                sm:text-[15px]
              "
            >
              {t('cookieBanner.title')}
            </h2>

            <p
              className="
                mt-1
                max-w-[680px]
                text-[12px]
                font-medium
                leading-[1.55]
                text-[var(--color-text-secondary)]

                sm:text-[13px]
              "
            >
              {t('cookieBanner.description')}{' '}
              <Link
                to={`/${lang}/cookie-policy`}
                className="
                  font-semibold
                  text-[var(--color-primary)]
                  underline
                  decoration-[rgba(34,204,86,0.35)]
                  underline-offset-2

                  transition-opacity
                  hover:opacity-75
                "
              >
                {t('cookieBanner.learnMore')}
              </Link>
            </p>
          </div>
        </div>

        <div
          className="
            flex
            shrink-0
            items-center
            gap-2

            max-sm:grid
            max-sm:grid-cols-2
          "
        >
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => saveConsent('rejected')}
            className="max-sm:w-full"
          >
            {t('cookieBanner.reject')}
          </Button>

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => saveConsent('accepted')}
            className="
              min-w-[120px]
              max-sm:w-full
            "
          >
            {t('cookieBanner.accept')}
          </Button>

          <button
            type="button"
            onClick={() => saveConsent('rejected')}
            aria-label={t('cookieBanner.close')}
            className="
              grid
              h-9
              w-9
              shrink-0
              place-items-center

              rounded-full
              text-[var(--color-text-muted)]

              transition-colors
              hover:bg-[var(--color-card)]
              hover:text-[var(--color-text-primary)]

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--color-primary)]

              max-sm:absolute
              max-sm:right-3
              max-sm:top-3
            "
          >
            <X size={17} aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  );
};
