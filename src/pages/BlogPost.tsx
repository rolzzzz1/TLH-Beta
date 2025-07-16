import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

interface BlogPost {
  title: string;
  content: string;
  imageUrl: string;
  date: string;
  author: string;
}

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [post, setPost] = useState(null as BlogPost | null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null as string | null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!id) throw new Error('No post ID provided');
        
        const docRef = doc(db, 'posts', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setPost(docSnap.data() as BlogPost);
        } else {
          setError('Post not found');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(t('common.error'));
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, t]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-lg text-gray-600">{t('common.loading')}</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto"
    >
      <div className="aspect-w-16 aspect-h-9 mb-8">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="rounded-lg object-cover w-full h-full"
          loading="lazy"
        />
      </div>

      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white rounded-lg shadow-md p-8"
      >
        <div className="mb-6">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-3xl md:text-4xl font-serif text-text mb-4"
          >
            {post.title}
          </motion.h1>
          
          <div className="flex items-center text-gray-500 text-sm">
            <span>{post.author}</span>
            <span className="mx-2">•</span>
            <span>{post.date}</span>
          </div>
        </div>

        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </motion.div>
    </motion.article>
  );
};

export default BlogPost; 