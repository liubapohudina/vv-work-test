import {
  ArrowRight,
  Headphones,
  UserRoundCheck,
  UsersRound,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import employerBg from '@/assets/images/employer-bg.webp';
import { Button } from '@/components/ui/Button';

const benefits = [
  {
    id: 'candidates',
    icon: UsersRound,
    titleKey: 'home.employer.benefits.candidates.title',
    descriptionKey: 'home.employer.benefits.candidates.description',
  },
  {
    id: 'fast',
    icon: UserRoundCheck,
    titleKey: 'home.employer.benefits.fast.title',
    descriptionKey: 'home.employer.benefits.fast.description',
  },
  {
    id: 'support',
    icon: Headphones,
    titleKey: 'home.employer.benefits.support.title',
    descriptionKey: 'home.employer.benefits.support.description',
  },
] as const;

export const EmployerSection = () => {
  const { t } = useTranslation();

  const handleFindEmployee = () => {
    const search = document.getElementById('job-search');

    if (!search) {
      return;
    }

    search.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}#employees`,
    );
  };

  return (
    <section
      id="employees"
      aria-labelledby="employer-heading"
      className="
        relative
        scroll-mt-24
        bg-[var(--color-bg)]
        px-4
        py-12
        sm:px-6
        sm:py-16
        lg:px-12
        lg:py-20
      "
    >
      <div
        className="
          relative
          mx-auto
          min-h-[310px]
          w-full
          max-w-[1440px]
          overflow-hidden
          rounded-[26px]
          border
          border-[var(--color-border-strong)]
          bg-[#0b1711]
          shadow-[var(--shadow-card)]
          sm:min-h-[330px]
          lg:min-h-[300px]
          lg:rounded-[30px]
        "
      >
        <img
          src={employerBg}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
          "
        />

        {/* Dark overlay */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[linear-gradient(90deg,rgba(6,20,13,0.97)_0%,rgba(8,27,18,0.88)_35%,rgba(6,18,12,0.72)_67%,rgba(5,14,9,0.90)_100%)]
          "
        />

        {/* Bottom shadow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            h-1/2
            bg-gradient-to-t
            from-black/25
            to-transparent
          "
        />

        {/* Green glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -left-20
            top-1/2
            h-[300px]
            w-[300px]
            -translate-y-1/2
            rounded-full
            bg-[var(--color-primary)]
            opacity-[0.07]
            blur-[110px]
          "
        />

        {/* Content */}
        <div
          className="
            relative
            z-10
            grid
            min-h-[310px]
            items-center
            gap-10
            px-5
            py-8

            sm:min-h-[330px]
            sm:px-8
            sm:py-10

            lg:min-h-[300px]
            lg:grid-cols-[1fr_1.15fr]
            lg:gap-14
            lg:px-12
            lg:py-10

            xl:grid-cols-[0.95fr_1.05fr]
            xl:px-14
          "
        >
          {/* LEFT */}
          <div className="max-w-[600px]">
            <div
              className="
                inline-flex
                items-center
                rounded-full
                border
                border-white/15
                bg-black/10
                px-3.5
                py-1.5
                backdrop-blur-md
              "
            >
              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.07em]
                  text-white/75
                "
              >
                {t('home.employer.badge')}
              </span>
            </div>

            <h2
              id="employer-heading"
              className="
                mt-5
                text-[30px]
                font-extrabold
                leading-[1.08]
                tracking-[-0.04em]
                text-white

                sm:text-[38px]
                lg:text-[42px]
                xl:text-[46px]
              "
            >
              {t('home.employer.title')}
            </h2>

            <p
              className="
                mt-4
                max-w-[570px]
                text-[14px]
                font-medium
                leading-[1.65]
                text-white/70

                sm:text-[16px]
                lg:text-[17px]
              "
            >
              {t('home.employer.description')}
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex min-w-0 flex-col">
            {/* Benefits */}
            <div
              className="
                grid
                grid-cols-1
                gap-5

                sm:grid-cols-3
                sm:gap-4

                lg:gap-5
              "
            >
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.id}
                    className="
                      flex
                      items-center
                      gap-4

                      sm:block
                    "
                  >
                    <div
                      className="
                        grid
                        h-12
                        w-12
                        shrink-0
                        place-items-center
                        rounded-[15px]
                        border
                        border-[rgba(34,204,86,0.22)]
                        bg-[rgba(34,204,86,0.12)]
                        text-[var(--color-primary)]
                        shadow-[inset_0_0_18px_rgba(34,204,86,0.05)]

                        sm:h-13
                        sm:w-13
                      "
                    >
                      <Icon size={23} strokeWidth={2} aria-hidden="true" />
                    </div>

                    <div>
                      <h3
                        className="
                          text-[14px]
                          font-bold
                          leading-[1.25]
                          tracking-[-0.02em]
                          text-white

                          sm:mt-3
                          sm:text-[15px]
                        "
                      >
                        {t(benefit.titleKey)}
                      </h3>

                      <p
                        className="
                          mt-1
                          max-w-[160px]
                          text-[11px]
                          font-medium
                          leading-[1.45]
                          text-white/60

                          sm:text-[12px]
                        "
                      >
                        {t(benefit.descriptionKey)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-7 sm:mt-8">
              <Button
                type="button"
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleFindEmployee}
                rightIcon={
                  <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
                }
                className="
                  min-h-[54px]
                  rounded-[14px]
                  text-[14px]
                  font-bold

                  sm:text-[15px]
                "
              >
                {t('home.employer.button')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
