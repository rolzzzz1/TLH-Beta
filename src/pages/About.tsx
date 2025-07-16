import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const About = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-3xl mx-auto"
    >
      <motion.h1
        variants={itemVariants}
        className="text-4xl md:text-5xl font-serif text-text text-center mb-8"
      >
        {t('about.title')}
      </motion.h1>

      <motion.div
        variants={itemVariants}
        className="prose prose-lg mx-auto"
      >
        <div className="bg-white rounded-lg shadow-md p-8">
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 mb-6 leading-relaxed"
          >
            {t('about.mission')}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-serif text-text">Our Vision</h3>
              <p className="text-gray-600">
                To create a world where deep listening fosters understanding,
                empathy, and meaningful connections between people.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-serif text-text">Our Approach</h3>
              <p className="text-gray-600">
                Through storytelling, reflection, and practical guidance,
                we explore the art of mindful listening and its transformative power.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-12 p-6 bg-background rounded-lg"
          >
            <blockquote className="text-xl italic text-gray-600 text-center">
              "The most basic of all human needs is the need to understand and be understood."
              <footer className="text-sm mt-2">— Ralph G. Nichols</footer>
            </blockquote>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About; 