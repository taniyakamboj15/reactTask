import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSocket } from '../context/SocketContext';

export interface IMessage {
  id: string;
  roomId: string;
  sender: string;
  content: string;
  timestamp: string;
  type: 'text' | 'system';
}

export const useChat = (roomId: string) => {
  const { socket } = useSocket();
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (message: IMessage) => {
      if (message.roomId === roomId) {
         setMessages((prev) => [...prev, message]);
      }
    };

    socket.on('chat:message', handleMessage);

    return () => {
      socket.off('chat:message', handleMessage);
    };
  }, [socket, roomId]);

  const sendMessage = useCallback(
    (content: string) => {
      socket?.emit('chat:message', {
        roomId,
        content,
        sender: 'Me',
      });
    },
    [socket, roomId]
  );

  const clearMessages = useCallback(() => setMessages([]), []);

  return useMemo(
    () => ({ messages, sendMessage, clearMessages }),
    [messages, sendMessage, clearMessages]
  );
};
