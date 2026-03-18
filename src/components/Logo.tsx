import React from 'react';
import { Atom } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = 32 }) => {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute inset-0 bg-blue-500/20 blur-xl group-hover:bg-blue-500/40 transition-all rounded-full" />
      <div className="relative flex items-center justify-center p-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 shadow-sm group-hover:scale-110 transition-transform">
        <Atom 
          size={size * 0.7} 
          className="text-blue-500 animate-[spin_10s_linear_infinite]" 
        />
      </div>
    </div>
  );
};

export default Logo;
