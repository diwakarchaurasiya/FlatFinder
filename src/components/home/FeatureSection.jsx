import { FaShieldAlt, FaHandshake, FaMoneyBillWave, FaMapMarkedAlt } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <FaShieldAlt className="text-4xl text-primary-500" />,
    title: 'Verified Listings',
    description: 'All properties are verified by our team to ensure authentic listings from genuine owners.'
  },
  {
    icon: <FaMapMarkedAlt className="text-4xl text-primary-500" />,
    title: 'Local Expertise',
    description: 'We specialize in tier 3 cities, providing insights and options specific to these growing markets.'
  },
  {
    icon: <FaMoneyBillWave className="text-4xl text-primary-500" />,
    title: 'Transparent Pricing',
    description: 'Clear pricing with no hidden charges. What you see is what you pay.'
  },
  {
    icon: <FaHandshake className="text-4xl text-primary-500" />,
    title: 'Direct Contact',
    description: 'Connect directly with property owners for faster communication and negotiation.'
  }
];

const FeatureSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-secondary-800 mb-4">Why Choose FlatFinder?</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            We simplify the rental process in tier 3 cities with verified listings and transparent communication.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-secondary-700 mb-2">{feature.title}</h3>
              <p className="text-neutral-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;