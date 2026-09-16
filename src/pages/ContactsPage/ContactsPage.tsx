import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { ContactForm } from '@/components/contacts/ContactForm';
import { ContactInfo } from '@/components/contacts/ContactInfo';
import { FaqSection } from '@/components/contacts/FaqSection';
import { OfficeMap } from '@/components/contacts/OfficeMap';
import { PageMeta } from '@/components/seo/PageMeta';

export const ContactsPage = () => {
  const { t } = useTranslation();
  const { lang = 'uk' } = useParams();

  return (
    <>
      <PageMeta
        title={t('seo.contacts.title')}
        description={t('seo.contacts.description')}
        canonical={`/${lang}/contacts`}
        lang={lang}
      />

      <div
        className="
          min-h-screen
          bg-[var(--color-bg)]
          pb-16 pt-28
          sm:pb-20
          lg:pt-32
        "
      >
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
          <div
            className="
              grid gap-10
              lg:grid-cols-[1fr_0.9fr]
              lg:items-start
              lg:gap-16
            "
          >
            <ContactInfo />
            <ContactForm />
          </div>

          <OfficeMap />
          <FaqSection />
        </div>
      </div>
    </>
  );
};
