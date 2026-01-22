import { useTasks } from '../../hooks/useTasks';
import { useSocket } from '../../context/SocketContext';
import { TaskSidebarHeader } from './TaskSidebarHeader';
import { TaskList } from './TaskList';
import { TaskSidebarFooter } from './TaskSidebarFooter';

export const TaskSidebar = () => {
  const { tasks, clearCompleted, removeTask } = useTasks();
  const { isConnected } = useSocket();

  return (
    <div className="w-80 glass border-l border-white/10 flex flex-col h-full shadow-2xl z-30 relative backdrop-blur-xl">
      <TaskSidebarHeader 
        isConnected={isConnected}
        hasCompletedTasks={tasks.some((t) => t.status === 'completed')}
        onClearCompleted={clearCompleted}
      />

      <TaskList tasks={tasks} onRemoveTask={removeTask} />
      
      <TaskSidebarFooter taskCount={tasks.length} />
    </div>
  );
};
