import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-8 py-2">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-4">
            <img 
              src="/logo.png" 
              alt={t('home.title')} 
              className="h-24 w-auto"
            />
          </Link>

          <div className="flex items-center gap-8">
            <nav>
              <ul className="flex gap-8 text-lg">
                <li>
                  <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                      `text-gray-600 hover:text-[#F7A69D] transition-colors ${isActive ? 'text-[#F7A69D] font-medium' : ''}`
                    }
                  >
                    {t('common.home')}
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/about" 
                    className={({ isActive }) => 
                      `text-gray-600 hover:text-[#F7A69D] transition-colors ${isActive ? 'text-[#F7A69D] font-medium' : ''}`
                    }
                  >
                    {t('common.about')}
                  </NavLink>
                </li>
              </ul>
            </nav>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 