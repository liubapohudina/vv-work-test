import {
  ArrowUpRight,
  BriefcaseBusiness,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import type { Partner } from '@/types/partner';

type PartnerCardProps = {
  partner: Partner;
};

const getInitials = (name: string): string => {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase();
};

export const PartnerCard = ({ partner }: PartnerCardProps) => {
  const { t } = useTranslation();
  const { lang = 'uk' } = useParams();

  const partnerUrl = `/${lang}/partners/${partner.slug}`;

  return (
    <article className="h-full">
      <Link
        to={partnerUrl}
        aria-label={`${partner.name} — ${t('home.partners.openPartner')}`}
        className="
          group
          relative
          flex
          h-full
          min-h-[270px]
          flex-col
          overflow-hidden
          rounded-[22px]
          border
          border-[var(--color-border)]
          bg-[var(--color-surface)]
          p-5
          text-left
          shadow-[var(--shadow-card)]
          transition-all
          duration-300

          hover:-translate-y-1
          hover:border-[rgba(34,204,86,0.28)]
          hover:shadow-[var(--shadow-glow)]

          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-[var(--color-primary)]
          focus-visible:ring-offset-2
          focus-visible:ring-offset-[var(--color-bg)]

          sm:p-6
        "
      >
        {/* Decorative glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-14
            -top-14
            h-36
            w-36
            rounded-full
            bg-[var(--color-primary)]
            opacity-[0.04]
            blur-3xl
            transition-opacity
            duration-300
            group-hover:opacity-[0.09]
          "
        />

        {/* Header */}
        <div
          className="
            relative
            z-10
            flex
            items-start
            justify-between
            gap-4
          "
        >
          {partner.logo ? (
            <div
              className="
                grid
                h-14
                w-14
                shrink-0
                place-items-center
                overflow-hidden
                rounded-[16px]
                border
                border-[var(--color-border)]
                bg-[var(--color-card)]
              "
            >
              <img
                src={partner.logo}
                alt=""
                width={56}
                height={56}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div
              aria-hidden="true"
              className="
                grid
                h-14
                w-14
                shrink-0
                place-items-center
                rounded-[16px]
                border
                border-[rgba(34,204,86,0.22)]
                bg-[rgba(34,204,86,0.08)]
                text-[17px]
                font-extrabold
                tracking-[-0.03em]
                text-[var(--color-primary)]
              "
            >
              {getInitials(partner.name)}
            </div>
          )}

          {partner.verified && (
            <span
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                border
                border-[rgba(34,204,86,0.18)]
                bg-[rgba(34,204,86,0.07)]
                px-2.5
                py-1.5
                text-[10px]
                font-bold
                uppercase
                tracking-[0.04em]
                text-[var(--color-primary)]
              "
            >
              <ShieldCheck size={13} strokeWidth={2.2} aria-hidden="true" />

              {t('home.partners.verified')}
            </span>
          )}
        </div>

        {/* Main content */}
        <div className="relative z-10 mt-5">
          <h3
            className="
              text-[20px]
              font-extrabold
              leading-[1.2]
              tracking-[-0.03em]
              text-[var(--color-text-primary)]
              transition-colors
              duration-200

              group-hover:text-[var(--color-primary)]
            "
          >
            {partner.name}
          </h3>

          <div
            className="
              mt-2
              flex
              items-center
              gap-1.5
              text-[13px]
              font-medium
              text-[var(--color-text-secondary)]
            "
          >
            <MapPin
              size={14}
              className="
                shrink-0
                text-[var(--color-primary)]
              "
              aria-hidden="true"
            />

            <span>
              {partner.city}, {partner.country}
            </span>
          </div>

          <p
            className="
    mt-4
    line-clamp-2
    text-[13px]
    leading-[1.6]
    text-[var(--color-text-secondary)]
  "
          >
            {t(partner.descriptionKey)}
          </p>
        </div>

        {/* Footer */}
        <div
          className="
            relative
            z-10
            mt-auto
            flex
            items-center
            justify-between
            gap-4
            border-t
            border-[var(--color-border)]
            pt-5
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
              text-[12px]
              font-semibold
              text-[var(--color-text-secondary)]
            "
          >
            <BriefcaseBusiness
              size={15}
              className="
                shrink-0
                text-[var(--color-primary)]
              "
              aria-hidden="true"
            />

            <span>
              {t('home.partners.jobsCount', {
                count: partner.jobsCount,
              })}
            </span>
          </div>

          <span
            aria-hidden="true"
            className="
              grid
              h-9
              w-9
              shrink-0
              place-items-center
              rounded-full
              border
              border-[var(--color-border)]
              bg-[var(--color-card)]
              text-[var(--color-text-primary)]
              transition-all
              duration-300

              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
              group-hover:border-[var(--color-primary)]
              group-hover:bg-[var(--color-primary)]
              group-hover:text-[#07110d]
            "
          >
            <ArrowUpRight size={17} strokeWidth={2} />
          </span>
        </div>
      </Link>
    </article>
  );
};
