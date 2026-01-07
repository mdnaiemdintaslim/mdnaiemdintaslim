import React from 'react';
import { motion } from 'framer-motion';

const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0c10]">
      {/* Blob 1: Electric Blue */}
      <motion.div
        className="absolute top-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-blue-600/10 rounded-full mix-blend-screen filter blur-[120px] will-change-transform"
        animate={{
          x: [0, -40, 40, 0],
          y: [0, 40, -40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Blob 2: Dark Blue */}
      <motion.div
        className="absolute bottom-[-10%] left-[-10%] w-[70vw] h-[70vw] bg-blue-900/10 rounded-full mix-blend-screen filter blur-[100px] will-change-transform"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -30, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Static Grain Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>
    </div>
  );
};

export default FluidBackground;