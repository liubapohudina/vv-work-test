import type { JobCategory } from '@/types/job';

export type Category = {
  id: JobCategory;
  labelKey: string;
};

export const categories: Category[] = [
  {
    id: 'construction',
    labelKey: 'categories.construction',
  },
  {
    id: 'manufacturing',
    labelKey: 'categories.manufacturing',
  },
  {
    id: 'logistics',
    labelKey: 'categories.logistics',
  },
  {
    id: 'hospitality',
    labelKey: 'categories.hospitality',
  },
  {
    id: 'it',
    labelKey: 'categories.it',
  },
  {
    id: 'drivers',
    labelKey: 'categories.drivers',
  },
  {
    id: 'other',
    labelKey: 'categories.other',
  },
];
