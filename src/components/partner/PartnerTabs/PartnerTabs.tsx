import { useTranslation } from 'react-i18next';

export type PartnerTab = 'about' | 'jobs' | 'reviews';

type PartnerTabsProps = {
  jobsCount: number;
  activeTab: PartnerTab;
  onTabChange: (tab: PartnerTab) => void;
};

const tabs: PartnerTab[] = ['about', 'jobs', 'reviews'];

export const PartnerTabs = ({
  jobsCount,
  activeTab,
  onTabChange,
}: PartnerTabsProps) => {
  const { t } = useTranslation();

  return (
    <div
      className="
        flex
        gap-7
        overflow-x-auto
        border-b
        border-[var(--color-border)]
      "
      role="tablist"
      aria-label={t('partnerPage.tabs')}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab;

        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab)}
            className={`
              whitespace-nowrap
              border-b-2
              pb-4
              text-sm
              transition-colors

              ${
                isActive
                  ? `
                    border-[var(--color-primary)]
                    font-bold
                    text-[var(--color-primary)]
                  `
                  : `
                    border-transparent
                    font-semibold
                    text-[var(--color-text-secondary)]
                    hover:text-[var(--color-text-primary)]
                  `
              }
            `}
          >
            {t(`partnerPage.${tab}`)}

            {tab === 'jobs' && ` (${jobsCount})`}
          </button>
        );
      })}
    </div>
  );
};
