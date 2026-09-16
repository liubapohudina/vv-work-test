import { Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import { CookieBanner } from '@/components/CookieBanner';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { PageLoader } from '@/components/ui/PageLoader';

import { DEFAULT_LANGUAGE, isSupportedLanguage } from '@/i18n/config';

import { ScrollToHash } from './ScrollToHash';
import { ScrollToTop } from './ScrollToTop';

export const PageLayout = () => {
  const { lang } = useParams();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  useEffect(() => {
    if (!isSupportedLanguage(lang)) {
      navigate(`/${DEFAULT_LANGUAGE}`, {
        replace: true,
      });

      return;
    }

    if (i18n.resolvedLanguage !== lang) {
      void i18n.changeLanguage(lang);
    }

    document.documentElement.lang = lang;

    localStorage.setItem('vv-work-language', lang);
  }, [lang, i18n, navigate]);

  return (
    <>
      <ScrollToTop />
      <ScrollToHash />

      <a
        href="#main-content"
        className="
          fixed
          left-4
          top-4
          z-[9999]
          -translate-y-24
          rounded-xl
          bg-[var(--color-primary)]
          px-4
          py-3
          text-sm
          font-bold
          text-[#07110d]
          shadow-lg
          transition-transform

          focus:translate-y-0
          focus:outline-none
          focus:ring-2
          focus:ring-white
          focus:ring-offset-2
          focus:ring-offset-[var(--color-bg)]
        "
      >
        {t('common.skipToContent')}
      </a>

      <Header />

      <main id="main-content" tabIndex={-1} className="min-h-screen">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />

      <CookieBanner />
    </>
  );
};
