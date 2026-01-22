import { useMemo } from 'react';
import type { Task } from '../context/TasksContext';

type DashboardStats = {
  completed: number;
  active: number;
  avgDuration: number;
  completionRate: number;
};

export const useDashboardStats = (tasks: Task[]): DashboardStats => {
  return useMemo(() => {
    const completed = tasks.filter((t) => t.status === 'completed');
    const active = tasks.filter((t) => t.status === 'pending' || t.status === 'running');

    const avgProgress =
      tasks.length > 0
        ? tasks.reduce((sum, t) => sum + t.progress, 0) / tasks.length
        : 0;

    const completionRate =
      tasks.length > 0
        ? (completed.length / tasks.length) * 100
        : 0;

    return {
      completed: completed.length,
      active: active.length,
      avgDuration: Math.round(avgProgress),
      completionRate: Math.round(completionRate),
    };
  }, [tasks]);
};

