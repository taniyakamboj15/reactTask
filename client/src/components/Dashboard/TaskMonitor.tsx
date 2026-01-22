import { motion, AnimatePresence } from 'framer-motion';
import { Activity } from 'lucide-react';
import { TaskItem } from './TaskItem';
import type { Task } from '../../context/TasksContext';

type TaskMonitorProps = {
  tasks: Task[];
};

export const TaskMonitor = ({ tasks }: TaskMonitorProps) => {
  return (
    <motion.div 
      className="glass-card rounded-3xl p-7 border border-white/10 shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-7">
        <h3 className="text-2xl font-bold text-text-primary flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl">
            <Activity size={24} className="text-primary" />
          </div>
          Live Task Monitor
        </h3>
        <div className="text-sm text-text-muted">
          Showing {Math.min(tasks.length, 10)} of {tasks.length} tasks
        </div>
      </div>
      
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {tasks.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 text-text-muted"
            >
              <Activity size={48} className="mx-auto mb-4 opacity-20" />
              <p className="text-lg">No tasks recorded yet</p>
              <p className="text-sm mt-2">Go to Chat and run <code className="bg-surface px-2 py-1 rounded text-green-400">/upload</code> or <code className="bg-surface px-2 py-1 rounded text-green-400">/process</code> to start</p>
            </motion.div>
          ) : (
            tasks.slice(0, 10).map((task, idx) => (
              <TaskItem key={task.id} task={task} index={idx} />
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

