import { MessageSquareMore } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const PartnerReviews = () => {
  const { t } = useTranslation();

  // TODO: Future feature.
  // Replace this placeholder with real employer reviews
  // when reviews API and review submission are implemented.

  return (
    <section
      className="
        mt-6
        rounded-2xl
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        px-5
        py-14
        text-center
      "
    >
      <div
        className="
          mx-auto
          grid
          h-12
          w-12
          place-items-center
          rounded-xl
          bg-[var(--color-card)]
          text-[var(--color-text-muted)]
        "
      >
        <MessageSquareMore size={24} aria-hidden="true" />
      </div>

      <h2
        className="
          mt-4
          font-bold
          text-[var(--color-text-primary)]
        "
      >
        {t('partnerPage.reviewsComingSoon')}
      </h2>

      <p
        className="
          mx-auto
          mt-2
          max-w-[450px]
          text-sm
          leading-6
          text-[var(--color-text-secondary)]
        "
      >
        {t('partnerPage.reviewsComingSoonDescription')}
      </p>
    </section>
  );
};
