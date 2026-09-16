import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useParams } from 'react-router-dom';

import { PageMeta } from '@/components/seo/PageMeta';
import { PartnerAbout } from '@/components/partner/PartnerAbout';
import { PartnerHero } from '@/components/partner/PartnerHero';
import { PartnerJobFilters } from '@/components/partner/PartnerJobFilters';
import { PartnerJobs } from '@/components/partner/PartnerJobs';
import { PartnerReviews } from '@/components/partner/PartnerReviews';
import { PartnerTabs, type PartnerTab } from '@/components/partner/PartnerTabs';
import { usePartnerPage } from '@/hooks/usePartnerPage';

export const PartnerPage = () => {
  const { t } = useTranslation();
  const { lang = 'uk', slug } = useParams();

  const [activeTab, setActiveTab] = useState<PartnerTab>('jobs');

  const {
    partner,
    partnerJobs,
    availableCategories,
    search,
    category,
    setSearch,
    setCategory,
  } = usePartnerPage(slug, t);

  if (!partner) {
    return <Navigate to={`/${lang}`} replace />;
  }

  return (
    <>
      <PageMeta
        title={`${partner.name} | VV Work`}
        description={t(partner.descriptionKey)}
        canonical={`/${lang}/partners/${partner.slug}`}
        lang={lang}
      />

      <div
        className="
          min-h-screen
          bg-[var(--color-bg)]
          pb-20
          pt-[72px]
        "
      >
        <PartnerHero partner={partner} />

        <main
          className="
            mx-auto
            max-w-[1180px]
            px-4
            pt-8
            sm:px-6
          "
        >
          <PartnerTabs
            jobsCount={partner.jobsCount}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {activeTab === 'about' && <PartnerAbout partner={partner} />}

          {activeTab === 'jobs' && (
            <>
              <PartnerJobFilters
                search={search}
                category={category}
                categories={availableCategories}
                onSearchChange={setSearch}
                onCategoryChange={setCategory}
              />

              <PartnerJobs jobs={partnerJobs} />
            </>
          )}

          {activeTab === 'reviews' && <PartnerReviews />}
        </main>
      </div>
    </>
  );
};
