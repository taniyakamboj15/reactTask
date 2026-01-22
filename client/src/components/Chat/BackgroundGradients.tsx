import { motion } from 'framer-motion';

export const BackgroundGradients = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <motion.div 
        className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary opacity-[0.05] blur-[120px] rounded-full"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent opacity-[0.05] blur-[120px] rounded-full"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.08, 0.05, 0.08]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </div>
  );
};

