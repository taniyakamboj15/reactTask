import { Loader, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import type { Task } from '../../context/TasksContext';

type TaskSidebarHeaderProps = {
  isConnected: boolean;
  hasCompletedTasks: boolean;
  onClearCompleted: () => void;
};

export const TaskSidebarHeader = ({ isConnected, hasCompletedTasks, onClearCompleted }: TaskSidebarHeaderProps) => {
  return (
    <div className="p-5 border-b border-white/10 bg-gradient-to-br from-surface/60 to-surface-highlight/40 backdrop-blur-xl sticky top-0 z-10">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h2 className="text-sm font-bold text-text-primary flex items-center gap-3 uppercase tracking-wide">
          <div className="relative">
            <Loader className="animate-spin-slow text-primary" size={18} />
            <div className="absolute inset-0 bg-primary blur-md opacity-30 animate-pulse" />
          </div>
          Active Processes
        </h2>

        <button
          type="button"
          onClick={onClearCompleted}
          disabled={!hasCompletedTasks}
          className="text-[10px] px-2 py-1 rounded-lg border border-white/10 bg-surface/40 hover:bg-surface/60 text-text-muted hover:text-text-primary transition disabled:opacity-40 disabled:cursor-not-allowed"
          title="Clear completed"
        >
          <span className="inline-flex items-center gap-1">
            <Trash2 size={12} />
            Clear
          </span>
        </button>
      </div>
      <div className="flex items-center gap-2 text-xs">
        <div className={clsx(
          "w-2 h-2 rounded-full animate-pulse",
          isConnected ? "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" : "bg-red-400"
        )} />
        <span className="text-text-muted font-medium">
          {isConnected ? 'System Online' : 'Offline'}
        </span>
      </div>
    </div>
  );
};

