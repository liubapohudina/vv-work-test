import { Building2, CheckCircle2, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { Partner } from '@/types/partner';

type PartnerAboutProps = {
  partner: Partner;
};

export const PartnerAbout = ({ partner }: PartnerAboutProps) => {
  const { t } = useTranslation();

  return (
    <section
      className="
        mt-6
        rounded-2xl
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-5
        sm:p-7
      "
    >
      <div className="flex items-center gap-3">
        <div
          className="
            grid
            h-10
            w-10
            shrink-0
            place-items-center
            rounded-xl
            bg-[rgba(34,204,86,0.08)]
            text-[var(--color-primary)]
          "
        >
          <Building2 size={20} aria-hidden="true" />
        </div>

        <div>
          <h2
            className="
              text-lg
              font-bold
              text-[var(--color-text-primary)]
            "
          >
            {t('partnerPage.aboutCompany')}
          </h2>

          <p
            className="
              mt-0.5
              text-sm
              text-[var(--color-text-secondary)]
            "
          >
            {partner.name}
          </p>
        </div>
      </div>

      <p
        className="
          mt-6
          max-w-[800px]
          text-sm
          leading-7
          text-[var(--color-text-secondary)]
        "
      >
        {t(partner.descriptionKey)}
      </p>

      <div
        className="
          mt-6
          flex
          flex-wrap
          gap-3
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-[var(--color-card)]
            px-4
            py-3
            text-sm
            text-[var(--color-text-secondary)]
          "
        >
          <MapPin
            size={16}
            className="text-[var(--color-primary)]"
            aria-hidden="true"
          />
          {partner.city}, {t(`countries.${partner.country}`)}
        </div>

        {partner.verified && (
          <div
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-[rgba(34,204,86,0.08)]
              px-4
              py-3
              text-sm
              font-semibold
              text-[var(--color-primary)]
            "
          >
            <CheckCircle2 size={16} aria-hidden="true" />

            {t('partnerPage.verified')}
          </div>
        )}
      </div>
    </section>
  );
};
