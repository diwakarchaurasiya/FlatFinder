import { Link } from "react-router-dom";
import { FaHome, FaArrowRight } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const CallToAction = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="py-16 bg-neutral-100 text-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <FaHome className="text-4xl mx-auto mb-6 text-primary-600" />
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Ready to Find Your Perfect Home?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of happy renters who found their ideal space
              through FlatFinder.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/properties"
                className="px-6 py-3 rounded-md bg-primary-600 text-white hover:bg-primary-700 transition-colors flex items-center justify-center"
              >
                Browse Properties <FaArrowRight className="ml-2 text-sm" />
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-md border border-primary-600 text-primary-600 hover:bg-primary-50 transition-colors flex items-center justify-center"
              >
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
