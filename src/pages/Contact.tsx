import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      // TODO: Implement form submission logic
      console.log('Form data:', data);
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-2xl mx-auto"
    >
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-4xl md:text-5xl font-serif text-text text-center mb-8"
      >
        {t('contact.title')}
      </motion.h1>

      <div className="bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-text mb-2">
              {t('contact.name')}
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              id="name"
              {...register('name', { required: true })}
              className={`w-full px-4 py-2 rounded-md border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-primary/50`}
            />
            {errors.name && (
              <p className="mt-1 text-red-500 text-sm">This field is required</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-text mb-2">
              {t('contact.email')}
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="email"
              id="email"
              {...register('email', {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
              className={`w-full px-4 py-2 rounded-md border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-primary/50`}
            />
            {errors.email && (
              <p className="mt-1 text-red-500 text-sm">
                Please enter a valid email address
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-text mb-2">
              {t('contact.message')}
            </label>
            <motion.textarea
              whileFocus={{ scale: 1.01 }}
              id="message"
              rows={5}
              {...register('message', { required: true })}
              className={`w-full px-4 py-2 rounded-md border ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-primary/50`}
            />
            {errors.message && (
              <p className="mt-1 text-red-500 text-sm">This field is required</p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition-colors"
          >
            {t('contact.submit')}
          </motion.button>
        </form>

        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 p-4 bg-green-100 text-green-700 rounded-md text-center"
            >
              {t('contact.success')}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Contact; 