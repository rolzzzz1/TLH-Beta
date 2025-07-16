import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories';
import { useTranslation } from 'react-i18next';
import { Category } from '../types/blog';
import { useTopics } from '../contexts/TopicsContext';

export const Categories: React.FC = () => {
  const { i18n } = useTranslation();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const navigate = useNavigate();
  const { setSelectedTopics } = useTopics();
  const { categories, loading, error } = useCategories();
  const currentLanguage = i18n.language as 'en' | 'hi';

  // Helper function to get translated content
  const getTranslation = (field: { en: string; hi: string }) => {
    return field[currentLanguage] || field.en || '';
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handleViewPosts = () => {
    setSelectedTopics(selectedCategories);
    navigate('/');
  };

  if (loading) {
    return (
      <div className="py-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#F7A69D] border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-[#F7A69D] text-white px-6 py-2 rounded-full font-medium hover:bg-[#F7A69D]/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div 
            key={category.id}
            onClick={() => toggleCategory(category.id)}
            className={`bg-white rounded-xl p-6 shadow-sm transition-all duration-300 cursor-pointer border
              ${selectedCategories.includes(category.id) 
                ? 'border-[#F7A69D] shadow-md bg-[#F7A69D]/5' 
                : 'border-[#F7A69D]/10 hover:shadow-md'}`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-[#2D2D2B] hover:text-[#F7A69D] transition-colors">
                {getTranslation(category.name)}
              </h3>
              {selectedCategories.includes(category.id) && (
                <span className="text-[#F7A69D] text-xl">✓</span>
              )}
            </div>
            <p className="text-gray-600 text-sm">
              {getTranslation(category.description)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleViewPosts}
          className="bg-[#F7A69D] text-white px-8 py-3 rounded-full font-medium hover:bg-[#F7A69D]/90 transition-colors"
        >
          View Posts ({selectedCategories.length} {selectedCategories.length === 1 ? 'topic' : 'topics'} selected)
        </button>
      </div>
    </div>
  );
}; 