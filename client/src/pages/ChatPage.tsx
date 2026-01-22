import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useChat } from '../hooks/useChat';
import { useSocket } from '../context/SocketContext';
import { BackgroundGradients } from '../components/Chat/BackgroundGradients';
import { ChatHeader } from '../components/Chat/ChatHeader';
import { MessageList } from '../components/Chat/MessageList';
import { MessageInput } from '../components/Chat/MessageInput';
import { ROOMS, type RoomId } from '../constants/rooms';
import type { SingleValue } from 'react-select';

export const ChatPage = () => {
  const [activeRoom, setActiveRoom] = useState<RoomId>('general');
  const { messages, sendMessage, clearMessages } = useChat(activeRoom);
  const { isConnected, joinRoom } = useSocket();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (isConnected) {
      joinRoom(activeRoom);
      clearMessages();
    }
  }, [activeRoom, isConnected, joinRoom, clearMessages]);

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
    setInputValue('');
  };

  const handleRoomChange = (option: SingleValue<typeof ROOMS[0]>) => {
    if (!option) return;
    setActiveRoom(option.value);
  };

  const currentRoom = ROOMS.find((r) => r.value === activeRoom);

  return (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-gradient-to-br from-background via-background to-surface/20">
      <BackgroundGradients />
      
      <ChatHeader 
        isConnected={isConnected}
        rooms={ROOMS}
        currentRoom={currentRoom}
        onRoomChange={handleRoomChange}
      />

      <MessageList 
        messages={messages}
        roomIcon={currentRoom?.icon}
        roomLabel={currentRoom?.label}
      />

      <MessageInput
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSend}
        placeholder={`Message ${currentRoom?.label}...`}
        disabled={!isConnected}
      />
    </div>
  );
};
