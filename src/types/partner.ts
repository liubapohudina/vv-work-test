export type Partner = {
  id: string;
  slug: string;

  name: string;
  description: string;

  country: string;
  city: string;

  logo?: string;

  verified: boolean;

  employeesCount?: string;
  jobsCount: number;
};
