import React from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  children: React.ReactNode;
  featured?: boolean;
  withDot?: boolean;
  transparent?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({ children, featured, withDot = false, transparent = false }) => {
  return (
    <motion.span 
      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-medium
        ${featured 
          ? 'text-white bg-gradient-to-r from-[#F7A69D] to-[#F7A69D]/80 backdrop-blur-sm shadow-sm hover:shadow-md' 
          : transparent
            ? 'text-[#F7A69D]'
            : 'text-[#F7A69D] bg-[#F7A69D]/5 hover:bg-[#F7A69D]/10 shadow-sm hover:shadow-md'} 
        transition-all duration-300`}
      {...(!transparent && {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.98 },
        transition: { type: "spring", stiffness: 400, damping: 17 }
      })}
    >
      {withDot && (
        <span className={`w-2 h-2 rounded-full ${transparent ? 'bg-[#F7A69D]' : 'bg-[#F7A69D]'} mr-2`}></span>
      )}
      {children}
    </motion.span>
  );
}; 