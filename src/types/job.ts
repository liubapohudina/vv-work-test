export type JobCategory =
  | 'construction'
  | 'manufacturing'
  | 'logistics'
  | 'hospitality'
  | 'it'
  | 'drivers'
  | 'other';

export type Job = {
  id: string;
  partnerId: string;

  titleKey: string;
  descriptionKey: string;

  company: string;
  country: string;
  city: string;
  category: JobCategory;

  salary: {
    from: number;
    to: number;
    currency: 'EUR';
  };
};
export type JobSearchParams = {
  query?: string;
  country?: string;
  category?: JobCategory;
};

export type JobSearchResult = {
  items: Job[];
  total: number;
};
