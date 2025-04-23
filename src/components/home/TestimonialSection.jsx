import { useState } from "react";
import {
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
} from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Aditya Sharma",
    location: "Jaipur",
    image:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 5,
    text: "I had been searching for a flat in Jaipur for weeks with no luck. FlatFinder connected me with a verified owner in just 2 days. The transparent badging system helped me trust the listing immediately.",
  },
  {
    id: 2,
    name: "Priya Patel",
    location: "Udaipur",
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 4,
    text: "As a working professional, I needed a reliable PG accommodation in Udaipur. The green badge listings responded quickly, and I found a perfect place near my workplace. Highly recommend!",
  },
  {
    id: 3,
    name: "Rajesh Kumar",
    location: "Kota",
    image:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600",
    rating: 5,
    text: "Finding a good rental property in smaller cities is tough, but FlatFinder made it simple. The interface is clean, properties are well-described, and the owner contact was hassle-free.",
  },
];

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <FaStar
          key={i}
          className={i < rating ? "text-yellow-400" : "text-neutral-300"}
        />
      ));
  };

  return (
    <section ref={ref} className="py-16 bg-primary-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-secondary-800 mb-4">
            What Our Users Say
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Hear from renters who found their perfect homes through FlatFinder
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-8 md:p-10"
            >
              <div className="flex flex-col md:flex-row items-center">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <div className="relative">
                    <FaQuoteLeft className="absolute -top-4 -left-4 text-primary-200 text-4xl opacity-50" />
                    <img
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-primary-100"
                    />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-2">
                    {renderStars(testimonials[activeIndex].rating)}
                  </div>
                  <p className="text-neutral-700 italic mb-4">
                    "{testimonials[activeIndex].text}"
                  </p>
                  <div>
                    <h4 className="font-semibold text-lg text-secondary-700">
                      {testimonials[activeIndex].name}
                    </h4>
                    <p className="text-neutral-500">
                      {testimonials[activeIndex].location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-center mt-8 space-x-4">
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === activeIndex
                        ? "bg-primary-500"
                        : "bg-primary-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
