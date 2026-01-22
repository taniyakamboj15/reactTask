import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

type EmptyStateProps = {
  roomIcon?: string;
  roomLabel?: string;
};

export const EmptyState = ({ roomIcon, roomLabel }: EmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center justify-center h-full text-center"
    >
      <div className="relative mb-6">
        <motion.div
          className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 p-8 rounded-3xl border border-white/10">
          <Sparkles size={48} className="text-primary" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-text-primary mb-2">
        Welcome to {roomIcon} {roomLabel}
      </h2>
      <p className="text-text-muted max-w-md">
        Start a conversation or use commands like <code className="bg-surface px-2 py-1 rounded text-green-400">/upload</code> and <code className="bg-surface px-2 py-1 rounded text-green-400">/process</code> to simulate work.
      </p>
    </motion.div>
  );
};

