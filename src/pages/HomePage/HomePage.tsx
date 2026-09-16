import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { PageMeta } from '@/components/seo/PageMeta';
import { AboutSection } from '@/components/home/AboutSection/AboutSection';
import { EmployerSection } from '@/components/home/EmployerSection';
import { Hero } from '@/components/home/Hero/Hero';
import { PartnersSection } from '@/components/home/PartnersSection';
import { PopularCategories } from '@/components/home/PopularCategories';

export const HomePage = () => {
  const { t } = useTranslation();
  const { lang = 'uk' } = useParams();

  return (
    <>
      <PageMeta
        title={t('seo.home.title')}
        description={t('seo.home.description')}
        canonical={`/${lang}`}
        lang={lang}
      />

      <Hero />
      <PopularCategories />
      <PartnersSection />
      <AboutSection />
      <EmployerSection />
    </>
  );
};
