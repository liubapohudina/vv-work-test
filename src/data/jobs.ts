import type { Job } from '@/types/job';

export const jobs: Job[] = [
  {
    id: '1',
    partnerId: 'partner-1',

    titleKey: 'jobs.driverB.title',
    descriptionKey: 'jobs.driverB.description',

    company: 'Euro Transport',
    country: 'poland',
    city: 'Warsaw',
    category: 'drivers',

    salary: {
      from: 1600,
      to: 2200,
      currency: 'EUR',
    },
  },

  {
    id: '2',
    partnerId: 'partner-2',

    titleKey: 'jobs.productionWorker.title',
    descriptionKey: 'jobs.productionWorker.description',

    company: 'Tech Production',
    country: 'germany',
    city: 'Berlin',
    category: 'manufacturing',

    salary: {
      from: 2000,
      to: 2600,
      currency: 'EUR',
    },
  },

  {
    id: '3',
    partnerId: 'partner-3',

    titleKey: 'jobs.builder.title',
    descriptionKey: 'jobs.builder.description',

    company: 'Build Europe',
    country: 'poland',
    city: 'Krakow',
    category: 'construction',

    salary: {
      from: 1800,
      to: 2400,
      currency: 'EUR',
    },
  },

  {
    id: '4',
    partnerId: 'partner-4',

    titleKey: 'jobs.frontendDeveloper.title',
    descriptionKey: 'jobs.frontendDeveloper.description',

    company: 'Digital Europe',
    country: 'netherlands',
    city: 'Amsterdam',
    category: 'it',

    salary: {
      from: 3200,
      to: 4500,
      currency: 'EUR',
    },
  },

  {
    id: '5',
    partnerId: 'partner-5',

    titleKey: 'jobs.hotelWorker.title',
    descriptionKey: 'jobs.hotelWorker.description',

    company: 'Hotel Group',
    country: 'austria',
    city: 'Vienna',
    category: 'hospitality',

    salary: {
      from: 1700,
      to: 2100,
      currency: 'EUR',
    },
  },

  {
    id: '6',
    partnerId: 'partner-6',

    titleKey: 'jobs.warehouseWorker.title',
    descriptionKey: 'jobs.warehouseWorker.description',

    company: 'Logistics Group',
    country: 'czech-republic',
    city: 'Prague',
    category: 'logistics',

    salary: {
      from: 1500,
      to: 1900,
      currency: 'EUR',
    },
  },
];
