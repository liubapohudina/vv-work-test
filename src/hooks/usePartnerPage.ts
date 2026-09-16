import { useMemo, useState } from 'react';
import type { TFunction } from 'i18next';

import { jobs } from '@/data/jobs';
import { partners } from '@/data/partners';

export const usePartnerPage = (slug: string | undefined, t: TFunction) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const partner = useMemo(() => {
    if (!slug) {
      return undefined;
    }

    return partners.find((item) => item.slug === slug);
  }, [slug]);

  const allPartnerJobs = useMemo(() => {
    if (!partner) {
      return [];
    }

    return jobs.filter((job) => job.partnerId === partner.id);
  }, [partner]);

  const availableCategories = useMemo(() => {
    return Array.from(new Set(allPartnerJobs.map((job) => job.category)));
  }, [allPartnerJobs]);

  const partnerJobs = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return allPartnerJobs.filter((job) => {
      const matchesCategory = category === 'all' || job.category === category;

      const translatedTitle = t(job.titleKey).toLowerCase();

      const translatedCountry = t(`countries.${job.country}`).toLowerCase();

      const matchesSearch =
        normalizedSearch.length === 0 ||
        translatedTitle.includes(normalizedSearch) ||
        job.company.toLowerCase().includes(normalizedSearch) ||
        job.city.toLowerCase().includes(normalizedSearch) ||
        translatedCountry.includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [allPartnerJobs, search, category, t]);

  return {
    partner,
    partnerJobs,
    availableCategories,
    search,
    category,
    setSearch,
    setCategory,
  };
};
