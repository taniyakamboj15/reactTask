import { Server, Socket } from 'socket.io';
import { handleCommand } from '../services/commandService';

interface ServerToClientEvents {
  'chat:message': (message: any) => void;
  'task:progress': (task: any) => void;
  'task:completed': (task: any) => void;
  'task:start': (task: any) => void;
}

interface ClientToServerEvents {
  'chat:message': (data: { roomId: string; content: string; sender: string }) => void;
  'join:room': (roomId: string) => void;
}

export const setupSocket = (io: Server<ClientToServerEvents, ServerToClientEvents>) => {
  io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('join:room', (roomId: string) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });

    socket.on('chat:message', async (data) => {
      const { roomId, content, sender } = data;

      const message = {
        id: Date.now().toString(),
        roomId,
        sender,
        content,
        timestamp: new Date(),
        type: 'text'
      };
      
      io.to(roomId).emit('chat:message', message);

      if (content.startsWith('/')) {
        await handleCommand(content, roomId, io);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};
