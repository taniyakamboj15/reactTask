import { Command } from 'lucide-react';
import type { SingleValue } from 'react-select';
import type { RoomOption } from '../../constants/rooms';
import { ConnectionStatus } from './ConnectionStatus';
import { RoomSelector } from './RoomSelector';

type ChatHeaderProps = {
  isConnected: boolean;
  rooms: RoomOption[];
  currentRoom: RoomOption | undefined;
  onRoomChange: (option: SingleValue<RoomOption>) => void;
};

export const ChatHeader = ({ isConnected, rooms, currentRoom, onRoomChange }: ChatHeaderProps) => {
  return (
    <div className="glass border-b border-white/5 p-4 flex items-center justify-between z-20 sticky top-0 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <ConnectionStatus isConnected={isConnected} />
        <RoomSelector rooms={rooms} currentRoom={currentRoom} onChange={onRoomChange} />
      </div>
      
      <div className="text-right">
        <h1 className="text-text-primary font-bold text-xl tracking-tight flex items-center gap-2 justify-end">
          <Command size={20} className="text-primary" /> 
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Antigravity
          </span>
        </h1>
        <p className="text-[10px] text-text-muted uppercase tracking-widest font-semibold">Command Center</p>
      </div>
    </div>
  );
};

