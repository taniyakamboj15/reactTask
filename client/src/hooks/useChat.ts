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

  const currentUserId = useMemo(() => {
    return socket?.id ? `User-${socket.id.slice(0, 4)}` : undefined;
  }, [socket?.id]);

  const sendMessage = useCallback(
    (content: string) => {
      const senderId = currentUserId ?? 'Anonymous';
      socket?.emit('chat:message', {
        roomId,
        content,
        sender: senderId,
      });
    },
    [socket, roomId, currentUserId]
  );

  const clearMessages = useCallback(() => setMessages([]), []);

  return useMemo(
    () => ({ messages, sendMessage, clearMessages, currentUserId }),
    [messages, sendMessage, clearMessages, currentUserId]
  );
};
