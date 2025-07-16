import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';
import { BlogPost, TranslatedContent } from '../types/blog';
import { useTranslation } from 'react-i18next';

const FEATURED_POST_TITLE = "Helping families hear: what truly matters";

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('Starting to fetch posts from Firebase...');
        const q = query(
          collection(db, 'posts'),
          orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        console.log('Number of documents:', querySnapshot.size);
        
        const fetchedPosts = querySnapshot.docs.map(doc => {
          const data = doc.data();
          console.log('\n--- Post Document ---');
          console.log('Document ID:', doc.id);
          console.log('Content structure:', {
            title: typeof data.title === 'object' ? 'TranslatedContent' : typeof data.title,
            excerpt: typeof data.excerpt === 'object' ? 'TranslatedContent' : typeof data.excerpt,
            content: typeof data.content === 'object' ? 'TranslatedContent' : typeof data.content
          });
          
          // Ensure content is in the correct format
          const ensureTranslatedContent = (field: any): TranslatedContent => {
            if (typeof field === 'string') {
              console.warn(`Field is string instead of TranslatedContent object`);
              return { en: field, hi: field };
            }
            if (!field || typeof field !== 'object') {
              console.warn(`Field is missing or invalid`);
              return { en: '', hi: '' };
            }
            return field;
          };

          const post = {
            id: doc.id,
            title: ensureTranslatedContent(data.title),
            excerpt: ensureTranslatedContent(data.excerpt),
            content: ensureTranslatedContent(data.content),
            author: ensureTranslatedContent(data.author),
            category: data.category || '',
            categories: data.categories || [],
            imageUrl: data.imageUrl || '',
            createdAt: data.createdAt?.toDate() || new Date(),
          } as BlogPost;

          return post;
        });

        // Sort posts to ensure the featured post is always first
        const sortedPosts = fetchedPosts.sort((a, b) => {
          const isAFeatured = a.title.en === FEATURED_POST_TITLE;
          const isBFeatured = b.title.en === FEATURED_POST_TITLE;
          
          if (isAFeatured) return -1;
          if (isBFeatured) return 1;
          
          // For all other posts, maintain the original date-based sorting
          return b.createdAt.getTime() - a.createdAt.getTime();
        });

        setPosts(sortedPosts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to fetch posts. Please try again later.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
}; 