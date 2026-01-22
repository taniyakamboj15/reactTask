import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export const EmptyTaskState = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center justify-center h-48 text-text-muted gap-3"
    >
      <div className="relative">
        <FileText size={40} className="opacity-10" />
        <motion.div
          className="absolute inset-0 bg-primary/5 blur-xl"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      <p className="text-xs text-center max-w-[200px]">
        System idle. Processes will appear here when active.
      </p>
    </motion.div>
  );
};

