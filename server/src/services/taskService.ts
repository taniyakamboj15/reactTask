import { Server } from 'socket.io';
import { ITask } from '../models/Task';

const tasks: Map<string, ITask> = new Map();

export const startTask = (type: ITask['type'], name: string, roomId: string, io: Server) => {
  const taskId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
  
  const newTask: ITask = {
    id: taskId,
    type,
    name,
    progress: 0,
    status: 'running',
    roomId
  };

  tasks.set(taskId, newTask);

  io.emit('task:start', newTask);
  
  simulateProgress(taskId, io);
};

const simulateProgress = (taskId: string, io: Server) => {
  const interval = setInterval(() => {
    const task = tasks.get(taskId);
    if (!task) {
      clearInterval(interval);
      return;
    }

    task.progress += Math.floor(Math.random() * 10) + 5;
    if (task.progress > 100) task.progress = 100;

    io.emit('task:progress', { taskId, progress: task.progress, roomId: task.roomId, name: task.name, type: task.type });

    if (task.progress >= 100) {
      task.status = 'completed';
      io.emit('task:completed', task);
      clearInterval(interval);
    }
  }, 1000);
};
