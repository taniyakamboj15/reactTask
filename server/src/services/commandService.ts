import { Server } from 'socket.io';
import { startTask } from './taskService';

export const handleCommand = async (commandStr: string, roomId: string, io: Server) => {
  const parts = commandStr.split(' ');
  const command = parts[0].toLowerCase();
  const arg = parts[1] || 'generic_file';

  const validCommands = ['/upload', '/download', '/process'];

  if (validCommands.includes(command)) {
    const taskType = command.substring(1) as 'upload' | 'download' | 'process';
    startTask(taskType, arg, roomId, io);
  }
};
