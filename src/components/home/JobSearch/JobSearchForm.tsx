import { ChevronDown, MapPin, Search } from 'lucide-react';
import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/Button';

import type { SearchMode } from './JobSearch';

type JobSearchFormProps = {
  mode: SearchMode;
  query: string;
  country: string;
  isLoading: boolean;
  onModeChange: (mode: SearchMode) => void;
  onQueryChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export const JobSearchForm = ({
  mode,
  query,
  country,
  isLoading,
  onModeChange,
  onQueryChange,
  onCountryChange,
  onSubmit,
}: JobSearchFormProps) => {
  const { t } = useTranslation();

  return (
    <>
      <div
        role="tablist"
        aria-label={t('home.search.tabsLabel')}
        className="flex w-fit items-end"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'job'}
          onClick={() => onModeChange('job')}
          className={`
            relative min-w-[155px]
            rounded-t-[16px]
            px-5 py-3
            text-[13px] font-semibold
            transition-all duration-200
            ${
              mode === 'job'
                ? 'bg-[rgba(17,39,29,0.82)] text-white'
                : 'text-white/55 hover:text-white'
            }
          `}
        >
          {t('home.search.findJob')}

          {mode === 'job' && (
            <span
              aria-hidden="true"
              className="
                absolute inset-x-5 bottom-0
                h-[2px] rounded-full
                bg-[var(--color-primary)]
                shadow-[0_0_12px_rgba(34,204,86,0.55)]
              "
            />
          )}
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={mode === 'employee'}
          onClick={() => onModeChange('employee')}
          className={`
            relative min-w-[175px]
            rounded-t-[16px]
            px-5 py-3
            text-[13px] font-semibold
            transition-all duration-200
            ${
              mode === 'employee'
                ? 'bg-[rgba(17,39,29,0.82)] text-white'
                : 'text-white/55 hover:text-white'
            }
          `}
        >
          {t('home.search.findEmployee')}

          {mode === 'employee' && (
            <span
              aria-hidden="true"
              className="
                absolute inset-x-5 bottom-0
                h-[2px] rounded-full
                bg-[var(--color-primary)]
                shadow-[0_0_12px_rgba(34,204,86,0.55)]
              "
            />
          )}
        </button>
      </div>

      <form
        onSubmit={onSubmit}
        className="
          rounded-[20px] rounded-tl-none
          border border-white/10
          bg-[rgba(16,35,27,0.78)]
          p-3
          shadow-[0_18px_50px_rgba(0,0,0,0.22)]
          backdrop-blur-[18px]
        "
      >
        <div className="grid grid-cols-[1.5fr_1fr_auto] gap-2 max-md:grid-cols-1">
          <label
            className="
              flex min-h-[54px] items-center gap-3
              rounded-[13px]
              bg-[#f5f7f6]
              px-4
              transition
              focus-within:ring-2
              focus-within:ring-[var(--color-primary)]/40
            "
          >
            <Search
              size={19}
              strokeWidth={2}
              className="shrink-0 text-[#87928c]"
              aria-hidden="true"
            />

            <span className="sr-only">
              {mode === 'job'
                ? t('home.search.jobPlaceholder')
                : t('home.search.employeePlaceholder')}
            </span>

            <input
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder={
                mode === 'job'
                  ? t('home.search.jobPlaceholder')
                  : t('home.search.employeePlaceholder')
              }
              className="
                w-full
                border-0 bg-transparent
                p-0
                text-[14px] font-medium
                text-[#101512]
                outline-none
                placeholder:text-[#98a29d]
              "
            />
          </label>

          <label
            className="
              relative
              flex min-h-[54px] items-center gap-3
              rounded-[13px]
              bg-[#f5f7f6]
              px-4
              transition
              focus-within:ring-2
              focus-within:ring-[var(--color-primary)]/40
            "
          >
            <MapPin
              size={19}
              strokeWidth={2}
              className="shrink-0 text-[#87928c]"
              aria-hidden="true"
            />

            <span className="sr-only">{t('home.search.countryLabel')}</span>

            <select
              value={country}
              onChange={(event) => onCountryChange(event.target.value)}
              aria-label={t('home.search.countryLabel')}
              className="
                w-full
                appearance-none
                border-0 bg-transparent
                pr-7
                text-[14px] font-medium
                text-[#101512]
                outline-none
              "
            >
              <option value="">{t('home.search.country')}</option>

              <option value="poland">{t('countries.poland')}</option>

              <option value="germany">{t('countries.germany')}</option>

              <option value="netherlands">{t('countries.netherlands')}</option>

              <option value="austria">{t('countries.austria')}</option>

              <option value="czech-republic">
                {t('countries.czechRepublic')}
              </option>
            </select>

            <ChevronDown
              size={16}
              strokeWidth={2}
              aria-hidden="true"
              className="
                pointer-events-none
                absolute right-4
                text-[#87928c]
              "
            />
          </label>

          <Button
            type="submit"
            size="lg"
            loading={isLoading}
            leftIcon={
              !isLoading ? (
                <Search size={19} strokeWidth={2.2} aria-hidden="true" />
              ) : undefined
            }
            className="
              min-w-[130px]
              rounded-[13px]
              max-md:w-full
            "
          >
            {t('home.search.submit')}
          </Button>
        </div>
      </form>
    </>
  );
};
