import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import clsx from 'clsx';
import type { IMessage } from '../../hooks/useChat';

type MessageItemProps = {
  message: IMessage;
  index: number;
};

export const MessageItem = ({ message, index }: MessageItemProps) => {
  const isCommand = message.content.startsWith('/');
  const isMe = message.sender === 'Me';

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={clsx(
        "flex flex-col max-w-2xl",
        isMe ? "ml-auto items-end" : "mr-auto items-start"
      )}
    >
      <div className="flex items-end gap-3">
        {!isMe && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent via-primary to-accent flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-accent/30 ring-2 ring-white/10">
            {message.sender[0].toUpperCase()}
          </div>
        )}
        
        <div className={clsx(
          "px-5 py-3 rounded-2xl text-sm leading-relaxed backdrop-blur-sm border transition-all hover:scale-[1.02]",
          isCommand 
            ? "bg-gradient-to-br from-green-500/10 to-emerald-500/10 font-mono text-green-400 border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.1)]" 
            : isMe 
                ? "bg-gradient-to-br from-primary to-primary/80 text-white border-primary/50 shadow-lg shadow-primary/20 rounded-tr-sm" 
                : "bg-gradient-to-br from-surface to-surface-highlight text-text-primary border-white/10 shadow-xl rounded-tl-sm"
        )}>
          {isCommand && <Terminal size={14} className="inline mr-2 mb-0.5 text-green-400" />}
          {message.content}
        </div>
      </div>
      <span className="text-[10px] text-text-muted mt-1.5 px-2 opacity-70">
        {isMe ? 'You' : message.sender} • {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </motion.div>
  );
};

