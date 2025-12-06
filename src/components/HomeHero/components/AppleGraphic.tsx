import React from 'react';

interface AppleGraphicProps {
  className?: string;
  scale?: number;
  simplified?: boolean;
}

export default function AppleGraphic({ className = '', scale = 1, simplified = false }: AppleGraphicProps) {
  return (
    <svg width="100%" height="100%" viewBox="-20 -35 40 55" className={className} style={{ overflow: 'visible' }}>
      <g transform={`scale(${scale})`}>
        <circle cx="0" cy="0" r="15" fill="#dc2626" stroke={simplified ? "none" : "#7f1d1d"} strokeWidth="1" />
        {!simplified && (
          <>
            <circle cx="-5" cy="-5" r="10" fill="white" opacity="0.1" />
            <circle cx="8" cy="8" r="7" fill="black" opacity="0.2" />
            <ellipse cx="-6" cy="-8" rx="5" ry="3" fill="white" opacity="0.4" transform="rotate(-45)" />
            <path d="M0,-15 Q2,-25 8,-28" stroke="#3f2c08" strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        )}
        <path d="M0,-16 Q-12,-22 0,-28 Q12,-22 0,-16" fill="#22c55e" />
      </g>
    </svg>
  );
}
