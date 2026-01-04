import React, { type ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay = 0 }) => {
  return (
    <div 
      className="glass-card p-8 rounded-2xl hover:scale-105 transition-transform duration-300 group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-6 p-3 bg-primary/10 rounded-xl inline-block group-hover:bg-primary/20 transition-colors">
        <div className="text-primary group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-3 font-mono">{title}</h3>
      <p className="text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
