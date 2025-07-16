import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BlogPost } from '../types/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useTranslation } from 'react-i18next';
import { Badge } from './Badge';
import { useCategories } from '../hooks/useCategories';

type FeaturedPostProps = BlogPost;

const FeaturedPost: React.FC<FeaturedPostProps> = ({ id, title, excerpt, imageUrl, categories, author, createdAt }) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { categories: allCategories } = useCategories();
  const currentLang = i18n.language as 'en' | 'hi';
  
  // Get the correct translation or fallback to English
  const getTranslation = (field: { en: string; hi: string }) => {
    return field[currentLang] || field.en || '';
  };

  // Calculate read time (rough estimate: 200 words per minute)
  const readTime = Math.max(1, Math.ceil(getTranslation(excerpt).split(' ').length / 200));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 cursor-pointer hover:shadow-xl transition-all duration-300 group"
      onClick={() => navigate(`/post/${id}`)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="relative h-48 md:h-64 overflow-hidden">
          <img
            src={imageUrl}
            alt={getTranslation(title)}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-[#F8F5F2] text-[#F7A69D] px-3 py-1 rounded-full text-sm font-medium shadow-sm">
              Featured
            </span>
          </div>
        </div>
        <div className="p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {categories?.map(categoryId => {
                const category = allCategories.find(c => c.id === categoryId);
                return category ? (
                  <Badge key={categoryId} transparent>
                    {getTranslation(category.name)}
                  </Badge>
                ) : null;
              })}
              <span className="text-sm text-gray-500 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {readTime} min read
              </span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D2D2B] mb-4 line-clamp-2 group-hover:text-[#F7A69D] transition-colors">
              {getTranslation(title)}
            </h2>
            
            <div className="text-gray-600 mb-6 line-clamp-3 leading-relaxed markdown-preview">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {getTranslation(excerpt)}
              </ReactMarkdown>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#F8F5F2] flex items-center justify-center mr-2">
                <svg className="w-4 h-4 text-[#F7A69D]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-[#2D2D2B] text-sm">{getTranslation(author)}</span>
                <time className="text-xs text-gray-500">
                  {createdAt.toLocaleDateString(currentLang === 'hi' ? 'hi-IN' : 'en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
              </div>
            </div>
            
            <span className="inline-flex items-center text-[#F7A69D] group-hover:translate-x-1 transition-transform duration-300">
              Read More
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedPost; 