import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { LegalPage } from '@/components/legal/LegalPage';
import { PageMeta } from '@/components/seo/PageMeta';

export const PrivacyPolicyPage = () => {
  const { t } = useTranslation();
  const { lang = 'uk' } = useParams();

  return (
    <>
      <PageMeta
        title={t('seo.privacy.title')}
        description={t('seo.privacy.description')}
        canonical={`/${lang}/privacy-policy`}
        lang={lang}
      />

      <LegalPage
        eyebrow={t('privacy.eyebrow')}
        title={t('privacy.title')}
        description={t('privacy.description')}
        updated={t('legal.lastUpdated')}
      >
        <Section title={t('privacy.sections.collection.title')}>
          <p>{t('privacy.sections.collection.text')}</p>
        </Section>

        <Section title={t('privacy.sections.usage.title')}>
          <p>{t('privacy.sections.usage.text')}</p>
        </Section>

        <Section title={t('privacy.sections.storage.title')}>
          <p>{t('privacy.sections.storage.text')}</p>
        </Section>

        <Section title={t('privacy.sections.sharing.title')}>
          <p>{t('privacy.sections.sharing.text')}</p>
        </Section>

        <Section title={t('privacy.sections.rights.title')}>
          <p>{t('privacy.sections.rights.text')}</p>
        </Section>

        <Section title={t('privacy.sections.contact.title')}>
          <p>{t('privacy.sections.contact.text')}</p>
        </Section>
      </LegalPage>
    </>
  );
};

type SectionProps = {
  title: string;
  children: React.ReactNode;
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

      <div
        className="
          mt-3
          text-sm
          leading-7
          text-[var(--color-text-secondary)]
          sm:text-base
        "
      >
        {children}
      </div>
    </section>
  );
};
