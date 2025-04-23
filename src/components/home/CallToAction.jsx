import { Link } from 'react-router-dom';
import { FaHome, FaArrowRight } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const CallToAction = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="py-16 bg-secondary-700 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <FaHome className="text-5xl mx-auto mb-6 text-primary-300" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Perfect Home?</h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of happy renters who found their ideal living space with FlatFinder's verified listings.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/properties" className="btn bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg flex items-center justify-center">
                Browse Properties <FaArrowRight className="ml-2" />
              </Link>
              <Link to="/contact" className="btn bg-transparent border-2 border-white hover:bg-white hover:text-secondary-700 transition-colors px-8 py-3 rounded-lg flex items-center justify-center">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;