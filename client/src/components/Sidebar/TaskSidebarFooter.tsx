import { Activity } from 'lucide-react';

type TaskSidebarFooterProps = {
  taskCount: number;
};

export const TaskSidebarFooter = ({ taskCount }: TaskSidebarFooterProps) => {
  return (
    <div className="p-3 border-t border-white/10 glass backdrop-blur-xl">
      <div className="flex items-center justify-between text-[10px] text-text-muted mb-2">
        <span className="flex items-center gap-2">
          <Activity size={12} className="text-primary" />
          <span className="font-semibold">{taskCount} Process{taskCount !== 1 ? 'es' : ''}</span>
        </span>
        <span className="font-mono text-text-muted/50">v1.2.0β</span>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </div>
  );
};

