export type Partner = {
  id: string;
  slug: string;
  name: string;

  descriptionKey: string;

  country: string;
  city: string;

  logo?: string;
  verified: boolean;
  employeesCount?: string;
  jobsCount: number;
};
