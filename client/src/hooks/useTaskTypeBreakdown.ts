import { useMemo } from 'react';
import type { Task, TaskType } from '../context/TasksContext';

type TaskTypeBreakdown = {
  type: TaskType;
  count: number;
  percentage: number;
};

export const useTaskTypeBreakdown = (tasks: Task[]): TaskTypeBreakdown[] => {
  return useMemo(() => {
    if (tasks.length === 0) return [];
    
    const breakdown: Partial<Record<TaskType, number>> = {};
    tasks.forEach((task) => {
      breakdown[task.type] = (breakdown[task.type] ?? 0) + 1;
    });

    return (Object.entries(breakdown) as Array<[TaskType, number]>).map(([type, count]) => ({
      type,
      count,
      percentage: Math.round((count / tasks.length) * 100),
    }));
  }, [tasks]);
};

