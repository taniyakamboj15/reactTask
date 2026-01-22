import type { FormEvent } from 'react';
import { Send } from 'lucide-react';
import { CommandHints } from './CommandHints';

type MessageInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  placeholder: string;
  disabled: boolean;
};

export const MessageInput = ({ value, onChange, onSubmit, placeholder, disabled }: MessageInputProps) => {
  return (
    <div className="p-4 glass border-t border-white/5 z-20 backdrop-blur-xl">
      <form onSubmit={onSubmit} className="relative max-w-4xl mx-auto">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full bg-surface-highlight/50 hover:bg-surface-highlight transition-all text-text-primary rounded-2xl py-4 pl-6 pr-14 border border-white/10 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:outline-none shadow-xl placeholder-text-muted/50 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={!value.trim() || disabled}
          className="absolute right-2 top-2 p-2.5 bg-gradient-to-br from-primary to-primary/80 rounded-xl text-white hover:from-primary/90 hover:to-primary/70 transition-all disabled:opacity-0 disabled:scale-95 active:scale-95 shadow-lg shadow-primary/30 disabled:pointer-events-none"
        >
          <Send size={18} />
        </button>
      </form>
      <CommandHints />
    </div>
  );
};

