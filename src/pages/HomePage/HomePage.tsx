import { Hero } from '@/components/home/Hero/Hero';
import { PopularCategories } from '@/components/home/PopularCategories';
import { PartnersSection } from '@/components/home/PartnersSection';
import { AboutSection } from '@/components/home/AboutSection/AboutSection';
import { EmployerSection } from '@/components/home/EmployerSection';

export const HomePage = () => {
  return (
    <>
      <Hero />
      <PopularCategories />
      <PartnersSection />
      <AboutSection />
      <EmployerSection />
    </>
  );
};
