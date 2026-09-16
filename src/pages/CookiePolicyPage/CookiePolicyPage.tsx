import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { LegalPage } from '@/components/legal/LegalPage';
import { PageMeta } from '@/components/seo/PageMeta';

export const CookiePolicyPage = () => {
  const { t } = useTranslation();
  const { lang = 'uk' } = useParams();

  return (
    <>
      <PageMeta
        title={t('seo.cookies.title')}
        description={t('seo.cookies.description')}
        canonical={`/${lang}/cookie-policy`}
        lang={lang}
      />

      <LegalPage
        eyebrow={t('cookies.eyebrow')}
        title={t('cookies.title')}
        description={t('cookies.description')}
        updated={t('legal.lastUpdated')}
      >
        <Section title={t('cookies.sections.what.title')}>
          {t('cookies.sections.what.text')}
        </Section>

        <Section title={t('cookies.sections.types.title')}>
          {t('cookies.sections.types.text')}
        </Section>

        <Section title={t('cookies.sections.purpose.title')}>
          {t('cookies.sections.purpose.text')}
        </Section>

        <Section title={t('cookies.sections.control.title')}>
          {t('cookies.sections.control.text')}
        </Section>

        <Section title={t('cookies.sections.changes.title')}>
          {t('cookies.sections.changes.text')}
        </Section>
      </LegalPage>
    </>
  );
};

type SectionProps = {
  title: string;
  children: string;
};

const Section = ({ title, children }: SectionProps) => {
  return (
    <section>
      <h2
        className="
          text-xl
          font-bold
          text-[var(--color-text-primary)]
        "
      >
        {title}
      </h2>

      <p
        className="
          mt-3
          text-sm
          leading-7
          text-[var(--color-text-secondary)]
          sm:text-base
        "
      >
        {children}
      </p>
    </section>
  );
};
