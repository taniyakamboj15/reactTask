import { motion } from 'framer-motion';
import { Wifi, WifiOff } from 'lucide-react';
import clsx from 'clsx';

type ConnectionStatusProps = {
  isConnected: boolean;
};

export const ConnectionStatus = ({ isConnected }: ConnectionStatusProps) => {
  return (
    <motion.div 
      className={clsx(
        "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold",
        isConnected 
          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
          : "bg-red-500/10 text-red-400 border border-red-500/20"
      )}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
    >
      {isConnected ? (
        <>
          <Wifi size={14} className="animate-pulse" />
          <span>Connected</span>
        </>
      ) : (
        <>
          <WifiOff size={14} />
          <span>Offline</span>
        </>
      )}
    </motion.div>
  );
};

