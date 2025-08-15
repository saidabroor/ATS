import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('company')}</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Globe size={16} />
                <a href="https://nexustech.it.com" className="hover:text-blue-400 transition-colors">
                  nexustech.it.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <a href="mailto:info@nexustech.it.com" className="hover:text-blue-400 transition-colors">
                  info@nexustech.it.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>010 5644 0728</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('developer')}</h3>
            <p className="text-gray-300">Shavkatbekov Saidabrorkhon</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contact')}</h3>
            <p className="text-gray-300">
              Professional job application success prediction platform powered by advanced AI algorithms.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 NexusTech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;