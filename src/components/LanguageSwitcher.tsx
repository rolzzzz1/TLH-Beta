import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const toggleLanguage = async () => {
    const newLang = currentLang === 'en' ? 'hi' : 'en';
    try {
      await i18n.changeLanguage(newLang);
      setCurrentLang(newLang);
      localStorage.setItem('preferredLanguage', newLang);
      // Force a re-render by updating the HTML lang attribute
      document.documentElement.lang = newLang;
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F7A69D]/10 hover:bg-[#F7A69D]/20 text-[#F7A69D] transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-sm font-medium">
        {currentLang === 'en' ? 'हिंदी' : 'English'}
      </span>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    </motion.button>
  );
}; 