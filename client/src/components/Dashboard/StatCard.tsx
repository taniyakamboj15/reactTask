import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import clsx from 'clsx';

type StatCardProps = {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  color: string;
  subtitle?: string;
  isText?: boolean;
};

export const StatCard = ({ icon, label, value, color, subtitle, isText = false }: StatCardProps) => (
  <motion.div 
    className="glass-card p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all group relative overflow-hidden"
    whileHover={{ y: -4 }}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity`} />
    
    <div className="relative z-10">
      <div className={`mb-4 text-transparent bg-gradient-to-br ${color} bg-clip-text`}>
        {icon}
      </div>
      <div className={clsx(
        "text-3xl font-bold mb-2",
        isText ? "text-text-primary" : "text-text-primary"
      )}>
        {value}
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-xs text-text-muted uppercase tracking-wider font-semibold">
          {label}
        </div>
        {subtitle && (
          <span className="text-xs text-text-muted/70">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  </motion.div>
);

