import { Cpu, Download, Loader, Upload } from 'lucide-react';
import type { TaskType } from '../context/TasksContext';

export const useTaskIcon = () => {
  const getIcon = (type: TaskType) => {
    switch (type) {
      case 'upload':
        return <Upload size={16} />;
      case 'download':
        return <Download size={16} />;
      case 'process':
        return <Cpu size={16} />;
      default:
        return <Loader size={16} />;
    }
  };

  return { getIcon };
};


