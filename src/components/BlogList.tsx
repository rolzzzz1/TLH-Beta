import React from 'react';
import { BlogCard } from './BlogCard';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useTopics } from '../contexts/TopicsContext';
import { useCategories } from '../hooks/useCategories';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Badge } from './Badge';
import { useTranslation } from 'react-i18next';
import { BlogPost } from '../types/blog';

const FeaturedPostContent: React.FC<{ post: BlogPost }> = ({ post }) => {
  const { categories } = useCategories();
  const { i18n } = useTranslation();
  const currentLang = i18n.language as 'en' | 'hi';

  // Get the correct translation or fallback to English
  const getTranslation = (field: { en: string; hi: string }) => {
    return field[currentLang] || field.en || '';
  };

  // Format date to be more concise
  const formattedDate = new Date(post.createdAt).toLocaleDateString(currentLang === 'hi' ? 'hi-IN' : 'en-US', {
    month: 'short',
    day: 'numeric'
  });

  // Get first category
  const firstCategoryId = post.categories?.[0];
  const firstCategory = firstCategoryId ? categories.find(c => c.id === firstCategoryId) : null;

  return (
    <motion.div 
      className="p-6 md:p-8 flex flex-col justify-between h-full bg-gradient-to-b from-white to-[#F8F5F2]/20"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="space-y-6">
        {/* Reading time and date */}
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{Math.ceil(getTranslation(post.excerpt).split(' ').length / 200)} min read</span>
          </div>
          <span>•</span>
          <span>{formattedDate}</span>
        </div>

        {/* Title */}
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-[#2D2D2B] leading-tight group-hover:text-[#F7A69D] transition-colors"
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          {getTranslation(post.title)}
        </motion.h2>

        {/* Excerpt - shorter and more focused */}
        <p className="text-base text-gray-600 leading-relaxed line-clamp-2 md:text-lg">
          {getTranslation(post.excerpt).split('.')[0]}...
        </p>

        {/* Single Category Badge */}
        {firstCategory && (
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Badge>
              {getTranslation(firstCategory.name)}
            </Badge>
          </div>
        )}
      </div>

      <div className="mt-6">
        {/* Author info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F7A69D] to-[#F7A69D]/80 flex items-center justify-center text-white font-medium text-lg shadow-md">
            {getTranslation(post.author).charAt(0)}
          </div>
          <div>
            <div className="font-medium text-[#2D2D2B]">{getTranslation(post.author)}</div>
          </div>
        </div>

        {/* Read More button */}
        <motion.button 
          className="w-full group/button bg-[#F7A69D]/5 hover:bg-[#F7A69D]/10 text-[#F7A69D] py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Read Full Article
          <svg 
            className="w-4 h-4 transform group-hover/button:translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

export const BlogList: React.FC = () => {
  // Move all hooks to the top
  const navigate = useNavigate();
  const { selectedTopics } = useTopics();
  const { posts, loading: postsLoading, error: postsError } = useBlogPosts();
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const { i18n } = useTranslation();
  const currentLang = i18n.language as 'en' | 'hi';

  console.log('Current posts from Firebase:', posts);
  console.log('Current language:', currentLang);
  console.log('Loading state:', { postsLoading, categoriesLoading });
  console.log('Error state:', { postsError, categoriesError });

  // Helper function to get translated content
  const getTranslation = (field: { en: string; hi: string }) => {
    if (!field) {
      console.log('Translation field is undefined:', field);
      return '';
    }
    const translation = field[currentLang] || field.en || '';
    console.log('Translation result:', { field, currentLang, translation });
    return translation;
  };

  // Derived state
  const loading = postsLoading || categoriesLoading;
  const error = postsError || categoriesError;

  const handlePostClick = (postId: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/post/${postId}`);
  };

  // Early returns for loading and error states
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F7A69D]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        {error}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center text-gray-600 py-8">
        No blog posts available yet. Check back soon!
      </div>
    );
  }

  // Filter posts based on selected topics
  const filteredPosts = selectedTopics.length > 0
    ? posts.filter(post => 
        post.categories?.some(category => selectedTopics.includes(category)) ||
        selectedTopics.includes(post.category)
      )
    : posts;

  // Find the specific post to be featured
  const targetPost = filteredPosts.find(post => 
    getTranslation(post.title).toLowerCase() === "helping families hear: what truly matters"
  );

  // Use the target post as featured if found, otherwise use first post
  const featuredPost = targetPost || filteredPosts[0];
  // Get all posts except the featured one for regular posts display
  const regularPosts = filteredPosts.filter(post => post.id !== featuredPost.id);

  if (filteredPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-[#2D2D2B] mb-4">No posts found for selected topics</h2>
        <p className="text-gray-600 mb-8">Try selecting different topics or view all posts</p>
      </div>
    );
  }

  return (
    <div className="pt-8">
      {selectedTopics.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#2D2D2B] mb-4">
            Posts about{' '}
            {selectedTopics.map((topicId, index) => {
              const category = categories.find(cat => cat.id === topicId);
              return category ? (
                <React.Fragment key={topicId}>
                  {index > 0 && ', '}
                  <Badge>{getTranslation(category.name)}</Badge>
                </React.Fragment>
              ) : null;
            })}
          </h2>
          <div className="flex items-center gap-2">
            <Link 
              to="/posts"
              className="text-[#F7A69D] hover:text-[#F7A69D]/80 transition-colors font-medium"
            >
              Change Topics
            </Link>
            <span className="text-gray-400">•</span>
            <button 
              onClick={() => window.location.href = '/'}
              className="text-gray-500 hover:text-[#F7A69D] transition-colors"
            >
              View All Posts
            </button>
          </div>
        </div>
      )}

      {/* Featured Post */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 mb-8 cursor-pointer group relative"
        onClick={() => handlePostClick(featuredPost.id)}
      >
        <div className="relative h-[400px] overflow-hidden">
          <motion.img 
            src={featuredPost.imageUrl} 
            alt={getTranslation(featuredPost.title)}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-opacity duration-300"></div>
          <div className="absolute inset-x-0 bottom-0 p-8">
            {/* Category badge */}
            <div className="mb-3">
              {featuredPost.categories?.[0] && (
                <Badge featured>
                  {getTranslation(categories.find(c => c.id === featuredPost.categories[0])?.name || { en: '', hi: '' })}
                </Badge>
              )}
            </div>

            {/* Title */}
            <motion.h2 
              className="text-2xl md:text-3xl font-bold text-white leading-tight group-hover:text-[#F7A69D] transition-colors mb-2"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              {getTranslation(featuredPost.title)}
            </motion.h2>

            {/* Excerpt */}
            <div 
              className="text-base md:text-lg text-gray-200 leading-relaxed line-clamp-2 mb-3 max-w-3xl"
            >
              {getTranslation(featuredPost.excerpt).split('.')[0]}...
            </div>

            {/* Author info */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F7A69D] to-[#F7A69D]/80 flex items-center justify-center text-white font-medium text-base shadow-md">
                {getTranslation(featuredPost.author).charAt(0)}
              </div>
              <div>
                <div className="font-medium text-white text-sm">{getTranslation(featuredPost.author)}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Regular Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regularPosts.map(post => (
          <BlogCard
            key={post.id}
            post={post}
            onClick={() => handlePostClick(post.id)}
          />
        ))}
      </div>
    </div>
  );
}; 