import { useTasks } from '../hooks/useTasks';
import { useSocket } from '../context/SocketContext';
import { useClock } from '../hooks/useClock';
import { useDashboardStats } from '../hooks/useDashboardStats';
import { useTaskTypeBreakdown } from '../hooks/useTaskTypeBreakdown';
import { DashboardHeader } from '../components/Dashboard/DashboardHeader';
import { StatsGrid } from '../components/Dashboard/StatsGrid';
import { TaskTypeBreakdown } from '../components/Dashboard/TaskTypeBreakdown';
import { TaskMonitor } from '../components/Dashboard/TaskMonitor';

export const DashboardPage = () => {
  const { tasks } = useTasks();
  const { isConnected } = useSocket();
  const currentTime = useClock();
  const stats = useDashboardStats(tasks);
  const typeBreakdown = useTaskTypeBreakdown(tasks);

  return (
    <div className="flex-1 p-8 bg-gradient-to-br from-background via-background to-surface/10 overflow-y-auto relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="relative z-10">
        <DashboardHeader currentTime={currentTime} />
        
        <StatsGrid stats={stats} totalTasks={tasks.length} isConnected={isConnected} />
        
        <TaskTypeBreakdown breakdown={typeBreakdown} />
        
        <TaskMonitor tasks={tasks} />
      </div>
    </div>
  );
};
