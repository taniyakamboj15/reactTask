import { motion } from 'framer-motion';
import { PieChart } from 'lucide-react';
import clsx from 'clsx';
import type { TaskType } from '../../context/TasksContext';

type TaskTypeBreakdownProps = {
  breakdown: Array<{
    type: TaskType;
    count: number;
    percentage: number;
  }>;
};

export const TaskTypeBreakdown = ({ breakdown }: TaskTypeBreakdownProps) => {
  if (breakdown.length === 0) return null;

  return (
    <motion.div 
      className="glass-card rounded-3xl p-7 border border-white/10 shadow-2xl mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
    >
      <h3 className="text-xl font-bold text-text-primary flex items-center gap-3 mb-5">
        <div className="p-2 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl">
          <PieChart size={20} className="text-accent" />
        </div>
        Task Distribution
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {breakdown.map((item) => (
          <div key={item.type} className="bg-surface/30 rounded-xl p-4 border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-text-primary capitalize">{item.type}</span>
              <span className="text-xs font-mono text-text-muted">{item.count} tasks</span>
            </div>
            <div className="w-full bg-surface-highlight rounded-full h-2 overflow-hidden">
              <motion.div 
                className={clsx(
                  "h-full rounded-full",
                  item.type === 'upload' && "bg-gradient-to-r from-blue-400 to-cyan-500",
                  item.type === 'download' && "bg-gradient-to-r from-emerald-400 to-green-500",
                  item.type === 'process' && "bg-gradient-to-r from-violet-400 to-purple-500",
                )}
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <div className="mt-1 text-xs text-text-muted">{item.percentage}% of total</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

