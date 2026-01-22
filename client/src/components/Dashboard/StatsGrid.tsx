import { motion } from 'framer-motion';
import { Activity, CheckCircle2, TrendingUp, Wifi } from 'lucide-react';
import clsx from 'clsx';
import { StatCard } from './StatCard';

type StatsGridProps = {
  stats: {
    completed: number;
    active: number;
    avgDuration: number;
    completionRate: number;
  };
  totalTasks: number;
  isConnected: boolean;
};

export const StatsGrid = ({ stats, totalTasks, isConnected }: StatsGridProps) => {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <StatCard 
        icon={<Activity className="animate-pulse" />} 
        label="Active Tasks" 
        value={stats.active} 
        color="from-blue-500 to-cyan-500"
        subtitle={`${totalTasks} total`}
      />
      <StatCard 
        icon={<CheckCircle2 />} 
        label="Completed" 
        value={stats.completed} 
        color="from-green-500 to-emerald-500"
        subtitle={`${stats.completionRate}% rate`}
      />
      <StatCard 
        icon={<Wifi className={clsx(isConnected && "animate-pulse")} />} 
        label="Connection" 
        value={isConnected ? "Online" : "Offline"} 
        color={isConnected ? "from-emerald-500 to-green-500" : "from-red-500 to-orange-500"}
        isText
        subtitle={isConnected ? "Socket.IO active" : "Disconnected"}
      />
      <StatCard 
        icon={<TrendingUp />} 
        label="Avg Progress" 
        value={`${stats.avgDuration}%`} 
        color="from-violet-500 to-purple-500"
        isText
        subtitle="Across all tasks"
      />
    </motion.div>
  );
};

