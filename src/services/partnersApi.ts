import { partners } from '@/data/partners';
import type { Partner } from '@/types/partner';

import { mockFetch } from './mockFetch';

export const getPartners = async (): Promise<Partner[]> => {
  return mockFetch(partners);
};

export const getPartnerBySlug = async (slug: string): Promise<Partner> => {
  const partner = partners.find((item) => item.slug === slug);

  if (!partner) {
    throw new Error('Partner not found');
  }

  return mockFetch(partner);
};
