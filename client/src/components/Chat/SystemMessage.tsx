import { motion } from 'framer-motion';
import { Hash } from 'lucide-react';

type SystemMessageProps = {
  content: string;
  index: number;
};

export const SystemMessage = ({ content, index }: SystemMessageProps) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex justify-center"
    >
      <div className="bg-surface/50 border border-white/10 rounded-full px-4 py-2 text-xs text-text-muted flex items-center gap-2">
        <Hash size={12} />
        {content}
      </div>
    </motion.div>
  );
};

