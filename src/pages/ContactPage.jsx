import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
} from "react-icons/fa";
import { motion } from "framer-motion";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // In a real app, this would send the form data to a backend
      setSubmitStatus("success");

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-secondary-800 mb-4">
            Contact Us
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Have questions about a property or need assistance? Get in touch
            with our team and we'll be happy to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl shadow-xl p-8 bg-white/10 backdrop-blur-lg text-white"
          >
            <h2 className="text-3xl font-bold mb-8 text-primary-500">
              Contact Information
            </h2>

            <div className="space-y-6">
              {/* Location */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-primary-500/10">
                  <FaMapMarkerAlt className="text-primary-500 text-xl" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-500">
                    Our Location
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    123 Main Street, Jaipur, Rajasthan 302001
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-primary-500/10">
                  <FaPhone className="text-primary-500 text-xl" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-500">
                    Phone Number
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">+91 98765 43210</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-primary-500/10">
                  <FaEnvelope className="text-primary-500 text-xl" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-500">
                    Email Address
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    info@flatfinder.com
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-primary-500/10">
                  <FaClock className="text-primary-500 text-xl" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-500">
                    Working Hours
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">
                    Monday - Saturday: 9:00 AM - 7:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl font-semibold text-secondary-800 mb-6">
              Send Us a Message
            </h2>

            {submitStatus === "success" && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-center">
                <FaPaperPlane className="mr-2" />
                <span>Thank you! Your message has been sent successfully.</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    className="block text-sm font-medium text-neutral-700 mb-1"
                    htmlFor="name"
                  >
                    Your Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input ${
                      errors.name ? "border-red-500" : ""
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-neutral-700 mb-1"
                    htmlFor="email"
                  >
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    className="block text-sm font-medium text-neutral-700 mb-1"
                    htmlFor="phone"
                  >
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-input ${
                      errors.phone ? "border-red-500" : ""
                    }`}
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-neutral-700 mb-1"
                    htmlFor="subject"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Property Inquiry"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  className="block text-sm font-medium text-neutral-700 mb-1"
                  htmlFor="message"
                >
                  Message*
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={`form-input ${
                    errors.message ? "border-red-500" : ""
                  }`}
                  placeholder="Write your message here..."
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <button type="submit" className="btn btn-primary px-8 py-3">
                <FaPaperPlane className="mr-2" /> Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
