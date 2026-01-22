import { useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { EmptyState } from './EmptyState';
import { SystemMessage } from './SystemMessage';
import { MessageItem } from './MessageItem';
import type { IMessage } from '../../hooks/useChat';

type MessageListProps = {
  messages: IMessage[];
  roomIcon?: string;
  roomLabel?: string;
};

export const MessageList = ({ messages, roomIcon, roomLabel }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 z-10">
      <AnimatePresence mode="popLayout">
        {messages.length === 0 && (
          <EmptyState roomIcon={roomIcon} roomLabel={roomLabel} />
        )}
        
        {messages.map((msg, idx) => {
          if (msg.type === 'system') {
            return <SystemMessage key={idx} content={msg.content} index={idx} />;
          }
          return <MessageItem key={idx} message={msg} index={idx} />;
        })}
      </AnimatePresence>
      <div ref={messagesEndRef} />
    </div>
  );
};

