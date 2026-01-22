import { motion } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import clsx from 'clsx';
import type { Task } from '../../context/TasksContext';
import { useTaskIcon } from '../../hooks/useTaskIcon';

type TaskItemProps = {
  task: Task;
  index: number;
  onRemove: (taskId: string) => void;
};

export const TaskItem = ({ task, index, onRemove }: TaskItemProps) => {
  const { getIcon } = useTaskIcon();

  return (
    <motion.div
      key={task.id}
      initial={{ opacity: 0, x: 20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -20, scale: 0.95 }}
      transition={{ delay: index * 0.05 }}
      layout
      className="group glass-card rounded-xl p-4 hover:bg-white/5 transition-all cursor-default border border-white/5 hover:border-white/10"
    >
      <div className="flex justify-between items-start mb-3 gap-3">
        <div className="flex items-center gap-3">
          <motion.div 
            className={clsx(
              "p-2 rounded-lg shadow-inner relative overflow-hidden",
              task.type === 'upload' && "bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20",
              task.type === 'download' && "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20",
              task.type === 'process' && "bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/20",
            )}
            whileHover={{ scale: 1.05 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            {getIcon(task.type)}
          </motion.div>
          <div>
            <h4 className="text-xs font-semibold text-text-primary leading-tight truncate max-w-[120px] mb-0.5">
              {task.name}
            </h4>
            <span className="text-[10px] text-text-muted capitalize font-medium">
              {task.type} Task
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onRemove(task.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-text-muted hover:text-text-primary"
            title="Dismiss"
          >
            <X size={14} />
          </button>
          {task.status === 'completed' ? (
            <CheckCircle2 size={18} className="text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.4)]" />
          ) : (
            <span className="text-xs font-mono font-bold px-2 py-1 bg-primary/10 text-primary rounded-md border border-primary/20">
              {task.progress}%
            </span>
          )}
        </div>
      </div>
      
      <div className="h-1.5 w-full bg-surface-highlight/80 rounded-full overflow-hidden shadow-inner border border-white/5">
        <motion.div 
          className={clsx(
            "h-full rounded-full relative overflow-hidden",
            task.status === 'completed' 
              ? "bg-gradient-to-r from-green-400 to-emerald-500" 
              : "bg-gradient-to-r from-primary to-accent"
          )}
          initial={{ width: 0 }}
          animate={{ width: `${task.progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>

      <div className="mt-2 flex items-center justify-between text-[10px] text-text-muted/70 font-mono">
        <span>{task.status === 'completed' ? 'Complete' : task.status === 'failed' ? 'Failed' : 'Processing...'}</span>
        <span className="text-text-muted/50">
          {new Date(task.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </motion.div>
  );
};

