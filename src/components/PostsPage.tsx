import React from 'react';
import { Categories } from './Categories';

export const PostsPage: React.FC = () => {
  return (
    <div className="py-4">
      {/* <h1 className="text-3xl font-bold text-[#2D2D2B] mb-6">Explore Topics</h1>
      <p className="text-gray-600 text-lg mb-8 max-w-3xl">
        Discover resources, stories, and support across different aspects of mental health. 
        Choose a topic to explore articles and experiences shared by our community.
      </p> */}
      <Categories />
    </div>
  );
}; 