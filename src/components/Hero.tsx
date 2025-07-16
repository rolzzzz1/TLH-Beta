import React from 'react';

const Hero = () => {
  return (
    <section className="py-16 md:py-24 bg-[#F8F5F2]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#2D2D2B] mb-6">
              Helping families{' '}
              <span className="text-[#F7A69D]">hear what truly matters</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Creating spaces for meaningful conversations and deeper connections within families.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-[#F7A69D] text-white rounded-xl hover:bg-[#F7A69D]/90 transition-colors">
                Start Your Journey
              </button>
              <button className="px-6 py-3 bg-white text-[#2D2D2B] border border-gray-200 rounded-xl hover:border-[#F7A69D] hover:text-[#F7A69D] transition-colors">
                Learn More
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#FFB5A8] rounded-full opacity-20" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#A6D1CD] rounded-full opacity-20" />
            
            <div className="relative bg-white rounded-2xl shadow-lg p-6">
              <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden bg-[#F7A69D]/10">
                <div className="w-full h-full flex items-center justify-center">
                  <svg
                    viewBox="0 0 400 400"
                    className="w-32 h-32 text-[#F7A69D]"
                    fill="currentColor"
                  >
                    <path d="M100 200 L200 100 L300 200 L300 320 L100 320 Z" />
                    <path d="M180 220 Q200 180 220 220 L200 250 Z" fill="white" />
                    <path d="M160 200 Q160 180 180 180 L220 180 Q240 180 240 200 L240 240 Q240 260 220 260 L200 260 L180 280 L180 260 L180 260 Q160 260 160 240 Z" fill="white" />
                  </svg>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-md p-4 max-w-xs">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#A6D1CD]/20 rounded-full flex items-center justify-center">
                    <svg
                      viewBox="0 0 400 400"
                      className="w-6 h-6 text-[#A6D1CD]"
                      fill="currentColor"
                    >
                      <path d="M100 200 L200 100 L300 200 L300 320 L100 320 Z" />
                      <path d="M180 220 Q200 180 220 220 L200 250 Z" fill="white" />
                      <path d="M160 200 Q160 180 180 180 L220 180 Q240 180 240 200 L240 240 Q240 260 220 260 L200 260 L180 280 L180 260 L180 260 Q160 260 160 240 Z" fill="white" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">
                    Building stronger family bonds through active listening
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 