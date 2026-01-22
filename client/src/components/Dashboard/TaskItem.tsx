import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { Task } from '../../context/TasksContext';

type TaskItemProps = {
  task: Task;
  index: number;
};

export const TaskItem = ({ task, index }: TaskItemProps) => {
  return (
    <motion.div 
      key={task.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: index * 0.05 }}
      className="group flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-surface/40 to-surface-highlight/40 hover:from-surface/60 hover:to-surface-highlight/60 transition-all border border-white/5 hover:border-white/10 cursor-default"
    >
      <div className="flex items-center gap-5">
        <motion.div 
          className={clsx(
            "w-3 h-3 rounded-full shadow-lg",
            task.status === 'completed' 
              ? "bg-green-500 shadow-green-500/50" 
              : "bg-primary shadow-primary/50"
          )}
          animate={task.status !== 'completed' ? {
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div>
          <div className="font-semibold text-text-primary text-base mb-1">
            {task.name}
          </div>
          <div className="text-xs text-text-muted font-mono flex items-center gap-2">
            <span>ID: {task.id.substring(0,8)}</span>
            <span className="text-primary">•</span>
            <span className="capitalize">{task.type}</span>
            <span className="text-primary">•</span>
            <span className="capitalize">{task.status}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="w-40 bg-surface-highlight/80 rounded-full h-2 overflow-hidden border border-white/5">
          <motion.div 
            className={clsx(
              "h-full rounded-full",
              task.status === 'completed' 
                ? "bg-gradient-to-r from-green-500 to-emerald-500" 
                : "bg-gradient-to-r from-primary to-accent"
            )}
            initial={{ width: 0 }}
            animate={{ width: `${task.progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <span className="text-sm font-mono w-12 text-right text-text-primary font-bold">
          {task.progress}%
        </span>
      </div>
    </motion.div>
  );
};

