import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { LegalPage } from '@/components/legal/LegalPage';
import { PageMeta } from '@/components/seo/PageMeta';

export const TermsPage = () => {
  const { t } = useTranslation();
  const { lang = 'uk' } = useParams();

  return (
    <>
      <PageMeta
        title={t('seo.terms.title')}
        description={t('seo.terms.description')}
        canonical={`/${lang}/terms`}
        lang={lang}
      />

      <LegalPage
        eyebrow={t('terms.eyebrow')}
        title={t('terms.title')}
        description={t('terms.description')}
        updated={t('legal.lastUpdated')}
      >
        <Section title={t('terms.sections.general.title')}>
          {t('terms.sections.general.text')}
        </Section>

        <Section title={t('terms.sections.service.title')}>
          {t('terms.sections.service.text')}
        </Section>

        <Section title={t('terms.sections.responsibility.title')}>
          {t('terms.sections.responsibility.text')}
        </Section>

        <Section title={t('terms.sections.content.title')}>
          {t('terms.sections.content.text')}
        </Section>

        <Section title={t('terms.sections.changes.title')}>
          {t('terms.sections.changes.text')}
        </Section>

        <Section title={t('terms.sections.contact.title')}>
          {t('terms.sections.contact.text')}
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
