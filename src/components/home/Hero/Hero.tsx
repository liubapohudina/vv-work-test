import { Building2, MapPin, Star, UsersRound } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { JobSearch } from '../JobSearch';

import heroBg from '@/assets/images/hero-bg.webp';

const stats = [
  {
    id: 'workers',
    value: '10 000+',
    labelKey: 'home.hero.stats.workers',
    icon: UsersRound,
  },
  {
    id: 'partners',
    value: '500+',
    labelKey: 'home.hero.stats.partners',
    icon: Building2,
  },
  {
    id: 'satisfaction',
    value: '98%',
    labelKey: 'home.hero.stats.satisfaction',
    icon: Star,
  },
] as const;

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#06100b] text-white">
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div
        aria-hidden="true"
        className="absolute pointer-events-none inset-0 bg-[linear-gradient(90deg,rgba(3,12,8,0.98)_0%,rgba(3,12,8,0.92)_25%,rgba(3,12,8,0.65)_50%,rgba(3,12,8,0.2)_75%,rgba(3,12,8,0.08)_100%)] max-lg:bg-[rgba(3,12,8,0.85)]"
      />
      <div
        aria-hidden="true"
        className="absolut pointer-events-nonee inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-[#06100b] via-[#06100b]/55 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute pointer-events-none inset-x-0 top-0 h-44 bg-gradient-to-b from-black/40 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute pointer-events-none left-[36%] top-[16%] h-[520px] w-[520px] rounded-full bg-[var(--color-primary)]/[0.035] blur-[130px] pointer-events-none"
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1440px] items-center px-4 sm:px-6 lg:px-12 pt-28 pb-12">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* LEFT CONTENT */}
          <div className="flex flex-col lg:col-span-7 xl:col-span-8">
            {/* Badge */}
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(34,204,86,0.32)] bg-[rgba(6,28,17,0.56)] px-4 py-2 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.025)] backdrop-blur-md">
              <MapPin
                size={15}
                strokeWidth={2.4}
                className="text-[var(--color-primary)]"
                aria-hidden="true"
              />
              <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.055em] text-[var(--color-primary)]">
                {t('home.hero.badge')}
              </span>
            </div>

            {/* Title */}
            <h1 className="max-w-[720px] text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-extrabold leading-[1.08] tracking-[-0.04em] text-white">
              <span className="block">{t('home.hero.titleLine1')}</span>
              <span className="block">{t('home.hero.titleLine2')}</span>
              <span className="block">
                {t('home.hero.titleLine3Before')}{' '}
                <span className="text-[var(--color-primary)] drop-shadow-[0_0_24px_rgba(34,204,86,0.18)]">
                  {t('home.hero.titleAccent')}
                </span>
              </span>
            </h1>

            <p className="mt-5 max-w-[610px] text-[15px] sm:text-[18px] md:text-[20px] font-normal leading-[1.55] tracking-[-0.02em] text-white/70">
              {t('home.hero.description')}
            </p>

            <div className="mt-8 sm:mt-10 min-h-[140px] w-full max-w-[780px] rounded-[24px] border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md flex items-center justify-center">
              <JobSearch />
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4 lg:col-span-5 xl:col-span-4 lg:pl-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.id}
                    className="group flex items-center gap-4 sm:gap-5 rounded-[20px] sm:rounded-[24px] border border-white/[0.12] bg-[linear-gradient(135deg,rgba(12,31,23,0.80),rgba(9,24,17,0.62))] p-4 sm:p-5 shadow-[0_20px_55px_rgba(0,0,0,0.32)] backdrop-blur-[18px] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(34,204,86,0.30)] hover:shadow-[0_24px_70px_rgba(0,0,0,0.38)]"
                  >
                    <div className="relative grid h-[48px] w-[48px] sm:h-[58px] sm:w-[58px] shrink-0 place-items-center rounded-full border border-[rgba(34,204,86,0.26)] bg-[rgba(7,30,18,0.72)] text-[var(--color-primary)] shadow-[inset_0_0_22px_rgba(34,204,86,0.07)]">
                      <div
                        aria-hidden="true"
                        className="absolute inset-[5px] rounded-full border border-white/[0.04]"
                      />
                      <Icon
                        size={24}
                        strokeWidth={2.1}
                        aria-hidden="true"
                        className="relative z-10 sm:hidden"
                      />
                      <Icon
                        size={27}
                        strokeWidth={2.1}
                        aria-hidden="true"
                        className="relative z-10 hidden sm:block"
                      />
                    </div>

                    <div className="min-w-0">
                      <strong className="block whitespace-nowrap text-[22px] sm:text-[28px] lg:text-[30px] font-extrabold leading-none tracking-[-0.045em] text-white">
                        {stat.value}
                      </strong>
                      <span className="mt-1.5 block text-[11px] sm:text-[12px] font-medium leading-[1.35] text-white/65">
                        {t(stat.labelKey)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
