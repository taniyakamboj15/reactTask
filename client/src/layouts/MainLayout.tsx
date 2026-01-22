import { TaskSidebar } from '../components/Sidebar/TaskSidebar';
import { LayoutDashboard, MessageSquare, Sparkles } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type MainLayoutProps = {
  children: ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-background via-background to-surface/10 overflow-hidden font-sans text-text-primary selection:bg-primary/30">
        <div className="w-16 glass border-r border-white/10 flex flex-col items-center py-6 gap-6 z-40 backdrop-blur-xl">
            <motion.div 
              className="w-11 h-11 bg-gradient-to-br from-primary via-accent to-primary rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center font-bold text-white text-base relative overflow-hidden group cursor-pointer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">Dev</div>
                <Sparkles className="absolute top-1 right-1 w-3 h-3 text-white/50 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
            
            <nav className="flex-1 flex flex-col gap-3 w-full px-2">
                <NavItem to="/" icon={<MessageSquare size={22} />} label="Chat" />
                <NavItem to="/dashboard" icon={<LayoutDashboard size={22} />} label="Dashboard" />
            </nav>

            <div className="flex flex-col items-center gap-2">
                <motion.div 
                  className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.6)]"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
            </div>
        </div>

      <div className="flex-1 flex flex-col relative">
         {children}
      </div>
      
      <TaskSidebar />
    </div>
  );
};

type NavItemProps = {
  to: string;
  icon: ReactNode;
  label: string;
};

const NavItem = ({ to, icon, label }: NavItemProps) => (
    <NavLink 
        to={to} 
        title={label}
        className={({ isActive }) => clsx(
            "p-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-all group relative overflow-hidden",
            isActive 
              ? "bg-gradient-to-br from-primary/20 to-accent/20 text-primary shadow-lg shadow-primary/20" 
              : "text-text-muted hover:bg-white/5 hover:text-text-primary hover:scale-105 active:scale-95"
        )}
    >
        {({ isActive }) => (
            <>
                {isActive && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 blur-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                )}
                <div className="relative z-10">{icon}</div>
                <div className="absolute left-full ml-2 px-2 py-1 bg-surface-highlight text-text-primary text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap border border-white/10 shadow-lg">
                    {label}
                </div>
            </>
        )}
    </NavLink>
);
