import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

const Header: React.FC = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              JobPredict
            </Link>
          </div>
          
          <nav className="flex items-center space-x-8">
            <Link 
              to="/"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {t('landing')}
            </Link>
            <Link 
              to="/prediction"
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/prediction') 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {t('prediction')}
            </Link>
            
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Globe size={16} />
              <span>{language === 'en' ? '한국어' : 'English'}</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;