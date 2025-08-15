import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, CheckCircle, TrendingUp, Users } from 'lucide-react';

const LandingPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {t('landingTitle')}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t('landingSubtitle')}
            </p>
            <p className="text-gray-700 mb-8 leading-relaxed">
              {t('landingDescription')}
            </p>
            <Link
              to="/prediction"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
            >
              {t('getStarted')}
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white mb-6">
                <TrendingUp size={48} className="mb-4" />
                <h3 className="text-2xl font-bold mb-2">Success Rate</h3>
                <div className="text-4xl font-bold">85%</div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-gray-700">AI-Powered Analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-gray-700">Real-time Predictions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-gray-700">Market Insights</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('howItWorks')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <Users className="text-blue-600" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Step 1</h3>
              <p className="text-gray-600">{t('step1')}</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                <TrendingUp className="text-purple-600" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Step 2</h3>
              <p className="text-gray-600">{t('step2')}</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                <CheckCircle className="text-green-600" size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-4">Step 3</h3>
              <p className="text-gray-600">{t('step3')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;