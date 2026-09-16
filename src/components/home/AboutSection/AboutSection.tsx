import {
  BadgeCheck,
  BriefcaseBusiness,
  Globe2,
  ShieldCheck,
  UsersRound,
  Zap,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { PlatformFlow } from './PlatformFlow';

const benefits = [
  {
    id: 'europe',
    icon: Globe2,
    titleKey: 'home.about.benefits.europe.title',
    descriptionKey: 'home.about.benefits.europe.description',
  },
  {
    id: 'verified',
    icon: ShieldCheck,
    titleKey: 'home.about.benefits.verified.title',
    descriptionKey: 'home.about.benefits.verified.description',
  },
  {
    id: 'fast',
    icon: Zap,
    titleKey: 'home.about.benefits.fast.title',
    descriptionKey: 'home.about.benefits.fast.description',
  },
  {
    id: 'direct',
    icon: BadgeCheck,
    titleKey: 'home.about.benefits.direct.title',
    descriptionKey: 'home.about.benefits.direct.description',
  },
] as const;

export const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="
        relative
        scroll-mt-24
        overflow-hidden
        bg-[var(--color-bg)]
        py-16
        sm:py-20
        lg:py-24
      "
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[600px]
          w-[600px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[var(--color-primary)]
          opacity-[0.035]
          blur-[140px]
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1440px]
          px-4
          sm:px-6
          lg:px-12
        "
      >
        <div
          className="
            grid
            items-center
            gap-12
            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-16
            xl:gap-24
          "
        >
          {/* LEFT */}
          <div className="max-w-[620px]">
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[rgba(34,204,86,0.22)]
                bg-[rgba(34,204,86,0.07)]
                px-3
                py-1.5
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[var(--color-primary)]
                  shadow-[0_0_10px_var(--color-primary)]
                "
              />

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.08em]
                  text-[var(--color-primary)]
                "
              >
                {t('home.about.eyebrow')}
              </span>
            </div>

            <h2
              id="about-heading"
              className="
                mt-5
                max-w-[580px]
                text-[32px]
                font-extrabold
                leading-[1.08]
                tracking-[-0.045em]
                text-[var(--color-text-primary)]
                sm:text-[40px]
                lg:text-[46px]
              "
            >
              {t('home.about.titleBefore')}{' '}
              <span className="text-[var(--color-primary)]">
                {t('home.about.titleAccent')}
              </span>
            </h2>

            <p
              className="
                mt-5
                max-w-[570px]
                text-[15px]
                leading-[1.75]
                text-[var(--color-text-secondary)]
                sm:text-[16px]
              "
            >
              {t('home.about.description')}
            </p>

            {/* Benefits */}
            <div
              className="
                mt-8
                grid
                grid-cols-1
                gap-x-6
                gap-y-5
                sm:grid-cols-2
              "
            >
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <div key={benefit.id} className="flex items-start gap-3">
                    <div
                      className="
                        grid
                        h-9
                        w-9
                        shrink-0
                        place-items-center
                        rounded-[11px]
                        border
                        border-[rgba(34,204,86,0.18)]
                        bg-[rgba(34,204,86,0.07)]
                        text-[var(--color-primary)]
                      "
                    >
                      <Icon size={17} strokeWidth={2} aria-hidden="true" />
                    </div>

                    <div>
                      <h3
                        className="
                          text-[14px]
                          font-bold
                          leading-[1.3]
                          tracking-[-0.02em]
                          text-[var(--color-text-primary)]
                        "
                      >
                        {t(benefit.titleKey)}
                      </h3>

                      <p
                        className="
                          mt-1
                          text-[12px]
                          leading-[1.55]
                          text-[var(--color-text-secondary)]
                        "
                      >
                        {t(benefit.descriptionKey)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Audience */}
            <div
              className="
                mt-9
                flex
                flex-wrap
                items-center
                gap-3
                border-t
                border-[var(--color-border)]
                pt-6
              "
            >
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-[12px]
                  font-semibold
                  text-[var(--color-text-secondary)]
                "
              >
                <UsersRound
                  size={16}
                  className="text-[var(--color-primary)]"
                  aria-hidden="true"
                />

                {t('home.about.forCandidates')}
              </div>

              <span
                aria-hidden="true"
                className="
                  hidden
                  h-1
                  w-1
                  rounded-full
                  bg-[var(--color-text-muted)]
                  sm:block
                "
              />

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-[12px]
                  font-semibold
                  text-[var(--color-text-secondary)]
                "
              >
                <BriefcaseBusiness
                  size={16}
                  className="text-[var(--color-primary)]"
                  aria-hidden="true"
                />

                {t('home.about.forBusiness')}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <PlatformFlow />
        </div>
      </div>
    </section>
  );
};
