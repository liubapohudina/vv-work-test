import { useTranslation } from 'react-i18next';

const faqItems = ['response', 'countries', 'start', 'commission'] as const;

export const FaqSection = () => {
  const { t } = useTranslation();

  return (
    <section aria-labelledby="faq-title" className="mt-10">
      <div
        className="
          mb-4 flex items-end
          justify-between gap-4
        "
      >
        <h2
          id="faq-title"
          className="
            text-xl font-bold
            tracking-[-0.02em]
            text-[var(--color-text-primary)]
          "
        >
          {t('contacts.faq.title')}
        </h2>

        <a
          href="mailto:info@vvwork.eu"
          className="
            text-xs font-bold
            text-[var(--color-primary)]
            hover:underline
          "
        >
          {t('contacts.faq.contact')}
        </a>
      </div>

      <div
        className="
          overflow-hidden rounded-2xl
          border border-[var(--color-border)]
          bg-[var(--color-surface)]
        "
      >
        {faqItems.map((item) => (
          <details
            key={item}
            className="
              group border-b
              border-[var(--color-border)]
              last:border-b-0
            "
          >
            <summary
              className="
                flex cursor-pointer
                list-none items-center
                justify-between gap-4
                px-5 py-4
                text-sm font-semibold
                text-[var(--color-text-primary)]

                transition
                hover:bg-[var(--color-card)]

                [&::-webkit-details-marker]:hidden
              "
            >
              {t(`contacts.faq.items.${item}.question`)}

              <span
                aria-hidden="true"
                className="
                  text-lg font-medium
                  text-[var(--color-text-secondary)]
                  transition-transform
                  group-open:rotate-45
                "
              >
                +
              </span>
            </summary>

            <p
              className="
                px-5 pb-5
                text-sm leading-6
                text-[var(--color-text-secondary)]
              "
            >
              {t(`contacts.faq.items.${item}.answer`)}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
};
