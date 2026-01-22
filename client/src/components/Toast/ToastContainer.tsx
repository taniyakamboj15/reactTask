import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useToast, type ToastType } from '../../context/ToastContext';

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle size={20} className="text-green-500" />,
  error: <AlertCircle size={20} className="text-red-500" />,
  info: <Info size={20} className="text-blue-500" />,
};

type ToastItemProps = {
  id: string;
  message: string;
  type: ToastType;
  onDismiss: (id: string) => void;
};

const ToastItem = ({ id, message, type, onDismiss }: ToastItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className="flex items-center gap-3 w-80 p-4 rounded-xl glass shadow-2xl border-l-4 border-white/10 backdrop-blur-md bg-surface/90"
      style={{
        borderLeftColor: type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'
      }}
    >
      <div className="shrink-0">{icons[type]}</div>
      <p className="flex-1 text-sm font-medium text-text-primary leading-tight">{message}</p>
      <button 
        onClick={() => onDismiss(id)}
        className="p-1 rounded-full hover:bg-white/10 text-text-muted transition-colors"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
};

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem {...toast} onDismiss={removeToast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};
