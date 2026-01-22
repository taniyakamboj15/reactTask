import { AnimatePresence } from 'framer-motion';
import { EmptyTaskState } from './EmptyTaskState';
import { TaskItem } from './TaskItem';
import type { Task } from '../../context/TasksContext';

type TaskListProps = {
  tasks: Task[];
  onRemoveTask: (taskId: string) => void;
};

export const TaskList = ({ tasks, onRemoveTask }: TaskListProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      <AnimatePresence mode="popLayout">
        {tasks.length === 0 && <EmptyTaskState />}
        
        {tasks.map((task, idx) => (
          <TaskItem key={task.id} task={task} index={idx} onRemove={onRemoveTask} />
        ))}
      </AnimatePresence>
    </div>
  );
};

