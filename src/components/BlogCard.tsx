import React from 'react';
import { BlogPost } from '../types/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useTranslation } from 'react-i18next';
import { Badge } from './Badge';
import { useCategories } from '../hooks/useCategories';

interface BlogCardProps {
  post: BlogPost;
  onClick: () => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, onClick }) => {
  const { i18n } = useTranslation();
  const { categories: allCategories } = useCategories();
  const currentLang = i18n.language as 'en' | 'hi';

  // Get the correct translation or fallback to English
  const getTranslation = (field: { en: string; hi: string }) => {
    return field[currentLang] || field.en || '';
  };

  // Get first category
  const firstCategoryId = post.categories?.[0];
  const firstCategory = firstCategoryId ? allCategories.find(c => c.id === firstCategoryId) : null;

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      lang={currentLang}
    >
      {post.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={post.imageUrl} 
            alt={getTranslation(post.title)} 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        {/* Single Category Badge */}
        {firstCategory && (
          <div className="mb-3">
            <Badge transparent>
              <span className={currentLang === 'hi' ? 'font-devanagari' : ''}>
                {getTranslation(firstCategory.name)}
              </span>
            </Badge>
          </div>
        )}
        <h2 className={`text-xl font-semibold text-[#2D2D2B] mb-3 line-clamp-2 hover:text-[#F7A69D] transition-colors ${currentLang === 'hi' ? 'font-devanagari' : ''}`}>
          {getTranslation(post.title)}
        </h2>
        <div className={`text-gray-600 mb-4 line-clamp-2 text-sm markdown-preview ${currentLang === 'hi' ? 'font-devanagari' : ''}`}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {getTranslation(post.excerpt)}
          </ReactMarkdown>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4 mt-4">
          <span className={`font-medium ${currentLang === 'hi' ? 'font-devanagari' : ''}`}>
            {getTranslation(post.author)}
          </span>
          <span>{new Date(post.createdAt).toLocaleDateString(currentLang === 'hi' ? 'hi-IN' : 'en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}</span>
        </div>
      </div>
    </div>
  );
}; 