import { Building2, CheckCircle2, MapPin, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { Partner } from '@/types/partner';

import { PartnerStat } from './PartnerStat';

type PartnerHeroProps = {
  partner: Partner;
};

export const PartnerHero = ({ partner }: PartnerHeroProps) => {
  const { t } = useTranslation();

  return (
    <section
      className="
        relative
        min-h-[340px]
        overflow-hidden
        border-b
        border-[var(--color-border)]
        bg-[#07110d]
      "
    >
      {partner.coverImage && (
        <img
          src={partner.coverImage}
          alt=""
          width={1440}
          height={500}
          fetchPriority="high"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
          "
        />
      )}

      {/* Dark overlay */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-[#07110d]
          via-[#07110d]/90
          to-[#07110d]/20
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-[#07110d]/80
          via-transparent
          to-transparent
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[340px]
          max-w-[1180px]
          items-center
          px-4
          py-12
          sm:px-6
        "
      >
        <div
          className="
            flex
            w-full
            flex-col
            gap-8
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          {/* Company */}
          <div className="flex items-center gap-5">
            {/* Logo */}
            <div
              className="
                grid
                h-[92px]
                w-[92px]
                shrink-0
                place-items-center
                overflow-hidden
                rounded-[24px]
                border
                border-white/15
                bg-white
                shadow-[0_15px_40px_rgba(0,0,0,0.25)]
                sm:h-[110px]
                sm:w-[110px]
              "
            >
              {partner.logo ? (
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  width={110}
                  height={110}
                  className="
                    h-full
                    w-full
                    object-contain
                    p-3
                  "
                />
              ) : (
                <Building2
                  size={42}
                  className="text-[#07110d]"
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Information */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1
                  className="
                    text-3xl
                    font-extrabold
                    tracking-[-0.04em]
                    text-white
                    sm:text-4xl
                  "
                >
                  {partner.name}
                </h1>

                {partner.verified && (
                  <CheckCircle2
                    size={22}
                    aria-label={t('partnerPage.verified')}
                    className="
                      fill-[var(--color-primary)]
                      text-[#07110d]
                    "
                  />
                )}
              </div>

              <p
                className="
                  mt-2
                  max-w-[500px]
                  text-sm
                  leading-6
                  text-white/60
                "
              >
                {t(partner.descriptionKey)}
              </p>

              <div
                className="
                  mt-3
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-white/60
                "
              >
                <MapPin
                  size={15}
                  aria-hidden="true"
                  className="text-[var(--color-primary)]"
                />

                <span>
                  {partner.city}, {t(`countries.${partner.country}`)}
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div
            className="
              grid
              grid-cols-3
              gap-6
              sm:gap-10
            "
          >
            <PartnerStat
              value={partner.employeesCount ?? '—'}
              label={t('partnerPage.employees')}
            />

            <PartnerStat
              value={partner.foundedYear ? String(partner.foundedYear) : '—'}
              label={t('partnerPage.founded')}
            />

            <PartnerStat
              value={partner.rating ? partner.rating.toFixed(1) : '—'}
              label={t('partnerPage.rating')}
              icon={<Star size={14} aria-hidden="true" />}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
