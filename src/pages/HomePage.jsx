import { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import PropertyHighlights from '../components/home/PropertyHighlights';
import FeatureSection from '../components/home/FeatureSection';
import TestimonialSection from '../components/home/TestimonialSection';
import CallToAction from '../components/home/CallToAction';

const HomePage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div>
      <HeroSection />
      
      <PropertyHighlights 
        title="Featured Properties"
        description="Handpicked properties with verified owners and complete details"
        limit={6}
      />
      
      <FeatureSection />
      
      <PropertyHighlights 
        title="Top Rated Apartments"
        description="Highly rated apartments with excellent amenities and locations"
        category="apartment"
        limit={4}
      />
      
      <TestimonialSection />
      
      <CallToAction />
    </div>
  );
};

export default HomePage;