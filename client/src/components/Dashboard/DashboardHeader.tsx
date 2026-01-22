import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type DashboardHeaderProps = {
  currentTime: Date;
};

export const DashboardHeader = ({ currentTime }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  return (
    <motion.header 
      className="mb-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-text-primary via-primary to-accent bg-clip-text text-transparent mb-2">
            System Dashboard
          </h1>
          <p className="text-text-muted text-lg flex items-center gap-2">
            <Clock size={18} className="animate-pulse" />
            {currentTime.toLocaleTimeString()} • {currentTime.toLocaleDateString()}
          </p>
        </div>
        <motion.button 
          onClick={() => navigate('/')} 
          className="px-5 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-glow transition-all active:scale-95"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Back to Chat
        </motion.button>
      </div>
    </motion.header>
  );
};

