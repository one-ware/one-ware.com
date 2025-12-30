import React from 'react';

interface HeroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function HeroButton({ children, className = '', style, ...props }: HeroButtonProps) {
  return (
    <button
      className={`group relative px-8 py-3 font-light text-base uppercase tracking-wider overflow-hidden ${className}`}
      style={{
        background: 'rgba(20, 20, 20, 0.3)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: 0,
        color: 'rgba(255, 255, 255, 0.7)',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)';
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.95)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.03)';
        e.currentTarget.style.background = 'rgba(20, 20, 20, 0.3)';
        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
      }}
      {...props}
    >
      {children}
    </button>
  );
}