import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Search,
  UsersRound,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const PlatformFlow = () => {
  const { t } = useTranslation();

  return (
    <div
      className="
        relative
        mx-auto
        w-full
        max-w-[650px]
      "
      aria-label={t('home.about.flow.ariaLabel')}
    >
      {/* Outer panel */}
      <div
        className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-[var(--color-border)]
          bg-[var(--color-surface)]
          p-5
          shadow-[var(--shadow-card)]
          sm:p-7
          lg:p-8
        "
      >
        {/* Grid */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.035]
            [background-image:linear-gradient(var(--color-text-primary)_1px,transparent_1px),linear-gradient(90deg,var(--color-text-primary)_1px,transparent_1px)]
            [background-size:32px_32px]
          "
        />

        {/* Glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[280px]
            w-[280px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[var(--color-primary)]
            opacity-[0.06]
            blur-[80px]
          "
        />

        <div className="relative z-10">
          {/* Top label */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.08em]
                  text-[var(--color-primary)]
                "
              >
                {t('home.about.flow.label')}
              </p>

              <h3
                className="
                  mt-1
                  text-[18px]
                  font-extrabold
                  tracking-[-0.03em]
                  text-[var(--color-text-primary)]
                  sm:text-[20px]
                "
              >
                {t('home.about.flow.title')}
              </h3>
            </div>

            <div
              aria-hidden="true"
              className="
                flex
                items-center
                gap-1.5
                rounded-full
                border
                border-[var(--color-border)]
                bg-[var(--color-card)]
                px-2.5
                py-1.5
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  animate-pulse
                  rounded-full
                  bg-[var(--color-primary)]
                "
              />

              <span
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.08em]
                  text-[var(--color-text-secondary)]
                "
              >
                Live
              </span>
            </div>
          </div>

          {/* Flow */}
          <div
            className="
              mt-8
              grid
              grid-cols-[1fr_auto_1fr]
              items-center
              gap-3
              sm:gap-5
            "
          >
            {/* Candidates */}
            <div
              className="
                rounded-[20px]
                border
                border-[var(--color-border)]
                bg-[var(--color-card)]
                p-4
                sm:p-5
              "
            >
              <div
                className="
                  grid
                  h-10
                  w-10
                  place-items-center
                  rounded-[12px]
                  bg-[rgba(34,204,86,0.09)]
                  text-[var(--color-primary)]
                "
              >
                <UsersRound size={20} aria-hidden="true" />
              </div>

              <p
                className="
                  mt-4
                  text-[13px]
                  font-bold
                  text-[var(--color-text-primary)]
                "
              >
                {t('home.about.flow.candidates')}
              </p>

              <p
                className="
                  mt-1
                  text-[10px]
                  leading-[1.45]
                  text-[var(--color-text-secondary)]
                "
              >
                {t('home.about.flow.candidatesText')}
              </p>
            </div>

            {/* Animated connection */}
            <div
              aria-hidden="true"
              className="
                relative
                flex
                w-10
                items-center
                justify-center
                sm:w-16
              "
            >
              <div
                className="
                  absolute
                  left-0
                  right-0
                  top-1/2
                  h-px
                  -translate-y-1/2
                  overflow-hidden
                  bg-[var(--color-border-strong)]
                "
              >
                <span
                  className="
                    about-flow-dot
                    absolute
                    top-1/2
                    h-1.5
                    w-1.5
                    -translate-y-1/2
                    rounded-full
                    bg-[var(--color-primary)]
                    shadow-[0_0_10px_var(--color-primary)]
                  "
                />
              </div>

              <ArrowRight
                size={15}
                className="
                  absolute
                  right-[-3px]
                  text-[var(--color-primary)]
                "
              />
            </div>

            {/* Business */}
            <div
              className="
                rounded-[20px]
                border
                border-[var(--color-border)]
                bg-[var(--color-card)]
                p-4
                sm:p-5
              "
            >
              <div
                className="
                  grid
                  h-10
                  w-10
                  place-items-center
                  rounded-[12px]
                  bg-[rgba(34,204,86,0.09)]
                  text-[var(--color-primary)]
                "
              >
                <BriefcaseBusiness size={20} aria-hidden="true" />
              </div>

              <p
                className="
                  mt-4
                  text-[13px]
                  font-bold
                  text-[var(--color-text-primary)]
                "
              >
                {t('home.about.flow.business')}
              </p>

              <p
                className="
                  mt-1
                  text-[10px]
                  leading-[1.45]
                  text-[var(--color-text-secondary)]
                "
              >
                {t('home.about.flow.businessText')}
              </p>
            </div>
          </div>

          {/* VV Work center */}
          <div className="relative my-5 flex justify-center">
            <div
              aria-hidden="true"
              className="
                absolute
                left-1/2
                top-0
                h-5
                w-px
                -translate-x-1/2
                bg-gradient-to-b
                from-[var(--color-primary)]
                to-transparent
                opacity-40
              "
            />

            <div
              className="
                relative
                mt-5
                inline-flex
                items-center
                gap-3
                rounded-[16px]
                border
                border-[rgba(34,204,86,0.25)]
                bg-[rgba(34,204,86,0.07)]
                px-4
                py-3
              "
            >
              <div
                className="
                  grid
                  h-8
                  w-8
                  place-items-center
                  rounded-[10px]
                  bg-[var(--color-primary)]
                  text-[#07110d]
                "
              >
                <Search size={16} strokeWidth={2.5} aria-hidden="true" />
              </div>

              <div>
                <strong
                  className="
                    block
                    text-[13px]
                    font-extrabold
                    text-[var(--color-text-primary)]
                  "
                >
                  VV Work
                </strong>

                <span
                  className="
                    text-[9px]
                    font-medium
                    text-[var(--color-text-secondary)]
                  "
                >
                  {t('home.about.flow.matching')}
                </span>
              </div>
            </div>
          </div>

          {/* Result */}
          <div
            className="
              flex
              items-center
              gap-3
              rounded-[16px]
              border
              border-[rgba(34,204,86,0.18)]
              bg-[rgba(34,204,86,0.055)]
              px-4
              py-3
            "
          >
            <div
              className="
                grid
                h-8
                w-8
                shrink-0
                place-items-center
                rounded-full
                bg-[var(--color-primary)]
                text-[#07110d]
              "
            >
              <Check size={16} strokeWidth={3} aria-hidden="true" />
            </div>

            <div>
              <p
                className="
                  text-[12px]
                  font-bold
                  text-[var(--color-text-primary)]
                "
              >
                {t('home.about.flow.result')}
              </p>

              <p
                className="
                  mt-0.5
                  text-[10px]
                  text-[var(--color-text-secondary)]
                "
              >
                {t('home.about.flow.resultText')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
