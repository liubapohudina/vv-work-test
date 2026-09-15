import type { Partner } from '@/types/partner';

export const partners: Partner[] = [
  {
    id: 'partner-1',
    slug: 'euro-build',
    name: 'Euro Build',
    description:
      'Будівельна компанія, що реалізує житлові та комерційні проєкти у Польщі та Німеччині.',
    country: 'Poland',
    city: 'Warsaw',
    verified: true,
    employeesCount: '500+',
    jobsCount: 3,
  },
  {
    id: 'partner-2',
    slug: 'nord-logistics',
    name: 'Nord Logistics',
    description:
      'Європейська логістична компанія з мережею складів і транспортних центрів.',
    country: 'Germany',
    city: 'Berlin',
    verified: true,
    employeesCount: '1 000+',
    jobsCount: 3,
  },
  {
    id: 'partner-3',
    slug: 'work-factory',
    name: 'Work Factory',
    description:
      'Компанія з підбору персоналу для сучасних виробничих підприємств.',
    country: 'Czech Republic',
    city: 'Prague',
    verified: true,
    employeesCount: '300+',
    jobsCount: 2,
  },
  {
    id: 'partner-4',
    slug: 'euro-hotel-group',
    name: 'Euro Hotel Group',
    description: 'Мережа готелів та ресторанів у туристичних містах Європи.',
    country: 'Austria',
    city: 'Vienna',
    verified: true,
    employeesCount: '700+',
    jobsCount: 2,
  },
];
