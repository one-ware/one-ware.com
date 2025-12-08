import React, { useState, useEffect, memo } from 'react';
import '../glass-design.css';

interface DeployViewProps {
    onDeploy: () => void;
}

export default memo(function DeployView({ onDeploy }: DeployViewProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 200);
        return () => clearTimeout(timer);
    }, []);

    const handleClick = () => {
        if (isPressed) return;
        setIsPressed(true);
        setTimeout(() => {
            onDeploy();
        }, 500);
    };

    return (
        <div
            className="absolute left-1/2 -translate-x-1/2 z-50 flex items-center justify-center"
            style={{ perspective: '1000px', bottom: 'clamp(20px, 5vh, 40px)' }}
        >
            <button
                onClick={handleClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="group relative flex items-center justify-center overflow-hidden outline-none"
                style={{
                    width: 'clamp(120px, 25vw, 200px)',
                    height: 'clamp(36px, 6vw, 48px)',
                    borderRadius: 'clamp(8px, 1.5vw, 12px)',

                    background: 'rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',

                    boxShadow: isHovered
                        ? '0 20px 40px -10px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.1)'
                        : '0 4px 12px rgba(0,0,0,0.2)',

                    cursor: isPressed ? 'default' : 'pointer',
                    pointerEvents: isPressed ? 'none' : 'auto',

                    opacity: isVisible && !isPressed ? 1 : 0,
                    transform: isVisible && !isPressed
                        ? (isHovered ? 'translateY(-2px)' : 'translateY(0)')
                        : (isPressed ? 'translateY(10px) scale(0.95)' : 'translateY(20px)'),

                    transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}
            >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />

                <div
                    className="absolute inset-0 flex items-center justify-center transition-all duration-300"
                >
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: 'radial-gradient(circle at center, rgba(0,255,209,0.1) 0%, transparent 70%)' }}
                    />

                    <span
                        className="font-bold tracking-[0.15em] text-white/90 group-hover:text-[var(--ifm-color-primary)] transition-colors duration-300"
                        style={{
                            fontSize: 'clamp(10px, 1.5vw, 13px)',
                            textShadow: isHovered ? '0 0 15px rgba(0,255,209,0.4)' : 'none'
                        }}
                    >
                        DEPLOY
                    </span>

                    <div
                        className="absolute right-3 sm:right-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                    >
                         <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M1 5H9M9 5L5 1M9 5L5 9" stroke={isHovered ? 'var(--ifm-color-primary)' : 'white'} strokeWidth="1.5" strokeLinecap="round"/>
                         </svg>
                    </div>
                </div>
            </button>
        </div>
    );
});