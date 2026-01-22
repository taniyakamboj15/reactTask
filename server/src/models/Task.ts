export interface ITask {
  id: string;
  type: 'upload' | 'download' | 'process';
  name: string;
  progress: number;
  status: 'pending' | 'running' | 'completed' | 'failed';
  roomId: string;
}

export type TaskType = ITask['type'];
