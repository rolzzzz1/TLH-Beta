import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer 
      className="bg-white mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-12 md:col-span-8 flex flex-col">
            <h3 className="text-xl font-semibold text-[#2D2D2B] mb-6">{t('home.title')}</h3>
            <p className="text-gray-600 leading-relaxed pr-8">
              {t('common.footerDescription')}
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 flex flex-col">
            <h3 className="text-xl font-semibold text-[#2D2D2B] mb-6">{t('common.quickLinks')}</h3>
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-600 hover:text-[#F7A69D] transition-colors inline-block"
                >
                  {t('common.home')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-600 hover:text-[#F7A69D] transition-colors inline-block"
                >
                  {t('common.about')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <motion.div 
          className="mt-16 pt-8 border-t border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.p 
              className="text-gray-600 text-sm"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              © {new Date().getFullYear()} {t('home.title')}. {t('common.allRightsReserved')}
            </motion.p>
            <div className="flex gap-8 text-sm">
              {[
                { text: t('common.privacyPolicy'), path: '/privacy' },
                { text: t('common.termsOfService'), path: '/terms' },
                { text: t('common.accessibility'), path: '/accessibility' }
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 + (index * 0.1) }}
                >
                  <motion.button
                    onClick={() => handleNavigation(item.path)}
                    className="text-gray-600 hover:text-[#F7A69D] transition-colors cursor-pointer"
                  >
                    <motion.span
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                      className="inline-block"
                    >
                      {item.text}
                    </motion.span>
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}; 