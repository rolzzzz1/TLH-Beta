import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../services/firebase';
import { BlogCard } from '../components/BlogCard';
import FeaturedPost from '../components/FeaturedPost';
import { useNavigate } from 'react-router-dom';
import { BlogPost } from '../types/blog';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const fetchedPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate()
        })) as BlogPost[];
        
        if (fetchedPosts.length > 0) {
          setFeaturedPost(fetchedPosts[0]);
          setPosts(fetchedPosts.slice(1));
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(t('common.error'));
        setLoading(false);
      }
    };

    fetchPosts();
  }, [t]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-lg text-gray-600">{t('common.loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-4"
    >
      <section className="text-center mb-6">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl md:text-4xl font-serif text-text mb-2"
        >
          {t('home.title')}
        </motion.h1>
        <motion.p
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="text-lg text-gray-600"
        >
          {t('home.subtitle')}
        </motion.p>
      </section>

      {featuredPost && (
        <FeaturedPost {...featuredPost} />
      )}

      <h2 className="text-xl font-semibold mb-4 text-[#2D2D2B]">Latest Posts</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            post={post}
            onClick={() => navigate(`/post/${post.id}`)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Home; 