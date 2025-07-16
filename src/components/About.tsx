import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-[#2D2D2B] mb-8">
          About The Listening Home
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            The Listening Home is a safe space dedicated to families navigating the complex journey of mental health. 
            We share real experiences, insights, and support for both those experiencing mental health challenges and their loved ones.
          </p>

          <div className="bg-white rounded-xl p-8 shadow-sm mb-12">
            <h2 className="text-2xl font-semibold text-[#2D2D2B] mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              To bridge the understanding gap between individuals experiencing depression and mental health challenges 
              and their families, creating a supportive environment where both sides feel heard, understood, and empowered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-[#2D2D2B] mb-3">For Those Experiencing</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Share your journey and feelings</li>
                <li>• Connect with others who understand</li>
                <li>• Find resources for support</li>
                <li>• Learn how to communicate your needs</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-[#2D2D2B] mb-3">For Families</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Understand your loved one's experience</li>
                <li>• Learn how to provide effective support</li>
                <li>• Connect with other supporting families</li>
                <li>• Access helpful resources and guidance</li>
              </ul>
            </div>
          </div>

          <div className="bg-[#F8F5F2] rounded-xl p-8 border border-[#F7A69D]/20">
            <h2 className="text-2xl font-semibold text-[#2D2D2B] mb-4">Our Approach</h2>
            <div className="text-gray-600 space-y-4">
              <p>
                We believe in the power of shared experiences. Our blog features real stories, expert insights, 
                and practical advice drawn from both personal journeys and professional expertise.
              </p>
              <p>
                Every article is written with empathy and understanding, acknowledging that mental health 
                challenges affect not just individuals but entire family systems.
              </p>
              <p>
                Through open dialogue and shared experiences, we aim to reduce stigma, increase understanding, 
                and provide practical tools for both those experiencing mental health challenges and their support networks.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 italic">
              "When we listen with understanding, we build bridges of connection and healing."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 