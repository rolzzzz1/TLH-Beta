import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BlogList } from './components/BlogList';
import { About } from './components/About';
import { PostsPage } from './components/PostsPage';
import { BlogPostDetail } from './components/BlogPostDetail';
import { Footer } from './components/Footer';
import { TopicsProvider } from './contexts/TopicsContext';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Accessibility from './pages/Accessibility';

// Create router configuration with future flags
const routerConfig = {
  future: {
    v7_relativeSplatPath: true,
    v7_startTransition: true
  }
};

export default function App() {
  const { i18n } = useTranslation();

  // Initialize language from localStorage or default to 'en'
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return (
    <TopicsProvider>
      <Router {...routerConfig}>
        <div className="min-h-screen bg-[#F8F5F2] flex flex-col">
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow">
              <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<BlogList />} />
              <Route path="/posts" element={<PostsPage />} />
              <Route path="/post/:postId" element={<BlogPostDetail />} />
              <Route path="/about" element={<About />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/accessibility" element={<Accessibility />} />
            </Routes>
          </main>
            </div>
          <Footer />
          </div>
        </div>
      </Router>
    </TopicsProvider>
  );
} 