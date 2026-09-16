import { Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { PageLoader } from '@/components/ui/PageLoader';
import { ScrollToHash } from './ScrollToHash';

import { DEFAULT_LANGUAGE, isSupportedLanguage } from '@/i18n/config';

export const PageLayout = () => {
  const { lang } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

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
      <ScrollToHash />
      <Header />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </>
  );
};
