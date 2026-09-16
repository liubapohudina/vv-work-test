import euroTransportCover from '@/assets/images/partners/euro-transport/cover.webp';
import euroTransportLogo from '@/assets/images/partners/euro-transport/logo.webp';

import techProductionCover from '@/assets/images/partners/tech-production/cover.webp';
import techProductionLogo from '@/assets/images/partners/tech-production/logo.webp';

import buildEuropeCover from '@/assets/images/partners/build-europe/cover.webp';
import buildEuropeLogo from '@/assets/images/partners/build-europe/logo.webp';

import digitalEuropeCover from '@/assets/images/partners/digital-europe/cover.webp';
import digitalEuropeLogo from '@/assets/images/partners/digital-europe/logo.webp';

import hotelGroupCover from '@/assets/images/partners/hotel-group/cover.webp';
import hotelGroupLogo from '@/assets/images/partners/hotel-group/logo.webp';

import logisticsGroupCover from '@/assets/images/partners/logistics-group/cover.webp';
import logisticsGroupLogo from '@/assets/images/partners/logistics-group/logo.webp';

import type { Partner } from '@/types/partner';

export const partners: Partner[] = [
  {
    id: 'partner-1',
    slug: 'euro-transport',
    name: 'Euro Transport',
    descriptionKey: 'partners.euroTransport.description',
    country: 'poland',
    city: 'Warsaw',

    verified: true,

    employeesCount: '500+',
    jobsCount: 1,
    foundedYear: 2015,
    rating: 4.7,

    logo: euroTransportLogo,
    coverImage: euroTransportCover,

    categories: ['drivers'],
  },

  {
    id: 'partner-2',
    slug: 'tech-production',
    name: 'Tech Production',
    descriptionKey: 'partners.techProduction.description',
    country: 'germany',
    city: 'Berlin',

    verified: true,

    employeesCount: '1000+',
    jobsCount: 1,
    foundedYear: 2012,
    rating: 4.8,

    logo: techProductionLogo,
    coverImage: techProductionCover,

    categories: ['manufacturing'],
  },

  {
    id: 'partner-3',
    slug: 'build-europe',
    name: 'Build Europe',
    descriptionKey: 'partners.buildEurope.description',
    country: 'poland',
    city: 'Krakow',

    verified: true,

    employeesCount: '300+',
    jobsCount: 1,
    foundedYear: 2018,
    rating: 4.8,

    logo: buildEuropeLogo,
    coverImage: buildEuropeCover,

    categories: ['construction'],
  },

  {
    id: 'partner-4',
    slug: 'digital-europe',
    name: 'Digital Europe',
    descriptionKey: 'partners.digitalEurope.description',
    country: 'netherlands',
    city: 'Amsterdam',

    verified: true,

    employeesCount: '200+',
    jobsCount: 1,
    foundedYear: 2020,
    rating: 4.9,

    logo: digitalEuropeLogo,
    coverImage: digitalEuropeCover,

    categories: ['it'],
  },

  {
    id: 'partner-5',
    slug: 'hotel-group',
    name: 'Hotel Group',
    descriptionKey: 'partners.hotelGroup.description',
    country: 'austria',
    city: 'Vienna',

    verified: true,

    employeesCount: '700+',
    jobsCount: 1,
    foundedYear: 2014,
    rating: 4.7,

    logo: hotelGroupLogo,
    coverImage: hotelGroupCover,

    categories: ['hospitality'],
  },

  {
    id: 'partner-6',
    slug: 'logistics-group',
    name: 'Logistics Group',
    descriptionKey: 'partners.logisticsGroup.description',
    country: 'czech-republic',
    city: 'Prague',

    verified: true,

    employeesCount: '600+',
    jobsCount: 1,
    foundedYear: 2016,
    rating: 4.8,

    logo: logisticsGroupLogo,
    coverImage: logisticsGroupCover,

    categories: ['logistics'],
  },
];
