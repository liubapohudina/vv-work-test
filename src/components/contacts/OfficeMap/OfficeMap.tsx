import { Building2, ExternalLink, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const OFFICE_ADDRESS = 'Aleja Jana Pawła II 82, 00-175 Warszawa, Poland';

const MAP_URL =
  'https://www.openstreetmap.org/export/embed.html?bbox=20.9730%2C52.2520%2C20.9910%2C52.2640&layer=mapnik&marker=52.2579%2C20.9841';

const DIRECTIONS_URL =
  'https://www.openstreetmap.org/?mlat=52.2579&mlon=20.9841#map=17/52.2579/20.9841';

export const OfficeMap = () => {
  const { t } = useTranslation();

  return (
    <section
      aria-labelledby="office-title"
      className="
        relative mt-8
        min-h-[300px]
        overflow-hidden
        rounded-[24px]
        border
        border-[var(--color-border)]
        bg-[var(--color-card)]
        sm:min-h-[340px]
      "
    >
      {/* Map */}
      <iframe
        title={t('contacts.office.mapTitle')}
        src={MAP_URL}
        loading="lazy"
        referrerPolicy="no-referrer"
        className="
          absolute
          inset-0
          h-full
          w-full
          border-0
        "
      />

      {/* Gradient for card readability */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          bg-gradient-to-l
          from-black/25
          via-transparent
          to-transparent
        "
      />

      {/* Office card */}
      <div
        className="
          absolute
          bottom-5
          right-5
          z-10

          w-[calc(100%-40px)]
          max-w-[360px]

          rounded-2xl
          border
          border-white/10

          bg-[#07110d]/95
          p-5

          text-white
          shadow-[0_16px_50px_rgba(0,0,0,0.28)]
          backdrop-blur-xl

          sm:bottom-6
          sm:right-6
          sm:p-6
        "
      >
        <div className="flex items-center gap-2">
          <div
            className="
              grid
              h-9
              w-9
              shrink-0
              place-items-center
              rounded-[10px]
              bg-[rgba(34,204,86,0.12)]
              text-[var(--color-primary)]
            "
          >
            <Building2 size={18} aria-hidden="true" />
          </div>

          <h2
            id="office-title"
            className="
              text-base
              font-bold
              tracking-[-0.02em]
              text-white
            "
          >
            {t('contacts.office.title')}
          </h2>
        </div>

        <div className="mt-5 flex items-start gap-3">
          <MapPin
            size={18}
            aria-hidden="true"
            className="
              mt-0.5
              shrink-0
              text-[var(--color-primary)]
            "
          />

          <div>
            <p className="text-sm font-bold text-white">
              {t('contacts.office.city')}
            </p>

            <address
              className="
                mt-1
                not-italic
                text-xs
                leading-5
                text-white/60
              "
            >
              {OFFICE_ADDRESS}
            </address>
          </div>
        </div>

        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noreferrer"
          className="
            mt-5
            inline-flex
            items-center
            gap-2

            text-xs
            font-bold
            text-[var(--color-primary)]

            transition-opacity
            hover:opacity-75

            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[var(--color-primary)]
          "
        >
          {t('contacts.office.openMap')}

          <ExternalLink size={13} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};
