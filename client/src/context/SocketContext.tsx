import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import type { ReactNode } from 'react';
import { useToast } from './ToastContext';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  joinRoom: (roomId: string) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = (): SocketContextType => {
  const ctx = useContext(SocketContext);
  if (!ctx) {
    throw new Error('useSocket must be used within <SocketProvider>');
  }
  return ctx;
};

type SocketProviderProps = {
  children: ReactNode;
};

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    const socketUrl =
      import.meta.env.VITE_SOCKET_URL ??
      'http://localhost:5000';

    const debugSocket = import.meta.env.VITE_DEBUG_SOCKET === 'true';

    const socketInstance = io(socketUrl, {
      transports: ['websocket'],
    });

    socketInstance.on('connect', () => {
      if (debugSocket) console.log('Connected to socket server');
      setIsConnected(true);
      addToast('Connected to server', 'success');
    });

    socketInstance.on('disconnect', (reason) => {
      if (debugSocket) console.log('Disconnected from socket server:', reason);
      setIsConnected(false);
      addToast('Connection lost: ' + reason, 'error');
    });

    socketInstance.on('connect_error', (error) => {
      if (debugSocket) console.error('Connection error:', error);
      setIsConnected(false);
      // Debounce or limit this in production to avoid spam
      // addToast('Connection failed', 'error'); 
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const joinRoom = useCallback(
    (roomId: string) => {
      socket?.emit('join:room', roomId);
    },
    [socket]
  );

  const value = useMemo(
    () => ({ socket, isConnected, joinRoom }),
    [socket, isConnected, joinRoom]
  );

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};
