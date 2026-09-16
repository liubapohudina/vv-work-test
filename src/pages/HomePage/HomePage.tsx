import { Hero } from '@/components/home/Hero/Hero';
import { PopularCategories } from '@/components/home/PopularCategories';
import { PartnersSection } from '@/components/home/PartnersSection';

export const HomePage = () => {
  return (
    <>
      <Hero />
      <PopularCategories />
      <PartnersSection />
    </>
  );
};
