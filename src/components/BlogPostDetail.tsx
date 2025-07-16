import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useCategories } from '../hooks/useCategories';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import type { Components } from 'react-markdown';
import { Badge } from './Badge';
import { useTranslation } from 'react-i18next';

export const BlogPostDetail: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { postId } = useParams();
  const navigate = useNavigate();
  const { posts, loading: postsLoading, error: postsError } = useBlogPosts();
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();

  const loading = postsLoading || categoriesLoading;
  const error = postsError || categoriesError;
  const post = posts.find(p => p.id === postId);
  const currentLanguage = i18n.language as 'en' | 'hi';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const markdownComponents: Components = {
    h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-8 mb-4 text-[#2D2D2B]" {...props} />,
    h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-6 mb-3 text-[#2D2D2B]" {...props} />,
    h3: ({ node, ...props }) => <h3 className="text-lg font-bold mt-5 mb-3 text-[#2D2D2B]" {...props} />,
    p: ({ node, ...props }) => <p className="mb-4 text-gray-700 leading-relaxed" {...props} />,
    ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 text-gray-700" {...props} />,
    ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 text-gray-700" {...props} />,
    li: ({ node, ...props }) => <li className="mb-2" {...props} />,
    blockquote: ({ node, ...props }) => (
      <blockquote className="border-l-4 border-[#F7A69D] pl-4 italic my-4 text-gray-600" {...props} />
    ),
    a: ({ node, href, ...props }) => {
      // Don't create links for practo.com references
      if (href?.includes('practo.com')) {
        return <span className="text-gray-700" {...props} />;
      }
      return (
        <a className="text-[#F7A69D] hover:text-[#2D2D2B] transition-colors" href={href} {...props} />
      );
    },
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      return inline ? (
        <code className="bg-[#F8F5F2] px-1.5 py-0.5 rounded text-sm" {...props}>
          {children}
        </code>
      ) : (
        <code className="block bg-[#F8F5F2] p-4 rounded-lg my-4 overflow-x-auto" {...props}>
          {children}
        </code>
      );
    },
    img: ({ node, ...props }) => (
      <img className="rounded-lg shadow-md my-6 max-w-full" {...props} alt={props.alt || ''} />
    ),
    hr: ({ node, ...props }) => <hr className="my-8 border-t-2 border-[#F8F5F2]" {...props} />,
  };

  const excerptComponents: Components = {
    p: ({ node, ...props }) => <p className="text-lg text-gray-600 leading-relaxed italic" {...props} />,
  };

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
        {t('blog.error')}
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-[#2D2D2B] mb-4">{t('blog.postNotFound.title')}</h2>
        <p className="text-gray-600 mb-8">{t('blog.postNotFound.description')}</p>
        <Link 
          to="/"
          className="inline-block bg-[#F7A69D] text-white px-6 py-3 rounded-full font-medium hover:bg-[#F7A69D]/90 transition-colors"
        >
          {t('blog.postNotFound.backToHome')}
        </Link>
      </div>
    );
  }

  return (
    <article className="py-8 max-w-4xl mx-auto px-4 prose lg:prose-xl" lang={currentLanguage}>
      {/* Back button */}
      <div className="flex items-center justify-between mb-6 not-prose">
        <Link 
          to="/"
          className="inline-flex items-center text-[#F7A69D] hover:text-[#F7A69D]/80 transition-colors group"
        >
          <svg 
            className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t('common.backToPosts')}
        </Link>
        <time 
          dateTime={post.createdAt.toISOString()}
          className="text-sm text-gray-500 font-medium"
        >
          {t('common.publishedOn', { 
            date: post.createdAt.toLocaleDateString(i18n.language === 'hi' ? 'hi-IN' : 'en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })
          })}
        </time>
      </div>

      {/* Post Header */}
      <header className="mb-8 not-prose">
        <h1 className={`text-4xl md:text-5xl font-bold text-[#2D2D2B] mb-6 leading-tight ${currentLanguage === 'hi' ? 'font-devanagari' : ''}`}>
          {post.title[currentLanguage]}
        </h1>
        
        <div className="flex items-center flex-wrap gap-3 mb-6">
          <div className="flex items-center mr-6">
            <span className="w-8 h-8 rounded-full bg-[#F8F5F2] flex items-center justify-center mr-2">
              <svg className="w-4 h-4 text-[#F7A69D]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
              </svg>
            </span>
            <span className={`font-medium text-[#2D2D2B] ${currentLanguage === 'hi' ? 'font-devanagari' : ''}`}>
              {post.author[currentLanguage]}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {post.categories.map(categoryId => {
              const category = categories.find(c => c.id === categoryId);
              return category ? (
                <Badge key={categoryId} withDot transparent>
                  <span className={currentLanguage === 'hi' ? 'font-devanagari' : ''}>
                    {category.name[currentLanguage]}
                  </span>
                </Badge>
              ) : null;
            })}
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative h-[400px] rounded-xl overflow-hidden mb-8 shadow-lg not-prose">
        <img 
          src={post.imageUrl} 
          alt={post.title[currentLanguage]}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Post Content */}
      <div className={`${currentLanguage === 'hi' ? 'font-devanagari' : ''}`}>
        <div className="mb-8 text-xl text-gray-600">
          <ReactMarkdown
            components={excerptComponents}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {post.excerpt[currentLanguage]}
          </ReactMarkdown>
        </div>
        <ReactMarkdown
          components={markdownComponents}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        >
          {post.content[currentLanguage]}
        </ReactMarkdown>
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200 not-prose">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-medium">{t('common.sharePost')}:</span>
            <a 
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title[currentLanguage])}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#1DA1F2] transition-colors"
              aria-label={t('blog.shareOn.twitter')}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#1877F2] transition-colors"
              aria-label={t('blog.shareOn.facebook')}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
              </svg>
            </a>
            <a 
              href={`https://www.instagram.com/`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#E4405F] transition-colors"
              aria-label={t('blog.shareOn.instagram')}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-[#F7A69D] text-white p-3 rounded-full shadow-lg hover:bg-[#F7A69D]/90 transition-all hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#F7A69D]/20 md:hidden"
        aria-label={t('blog.scrollToTop')}
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </article>
  );
}; 