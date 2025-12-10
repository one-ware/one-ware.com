import React from 'react';

interface RobotHeadGraphicProps {
  isActive?: boolean;
  showGears?: boolean;
}

export default function RobotHeadGraphic({ isActive = false, showGears = true }: RobotHeadGraphicProps) {
  const phase = showGears ? 'building' : 'processing';

  return (
    <div className="w-full h-full relative">
      <svg viewBox="15 0 70 70" className="w-full h-full">

        <g>
             <line x1="50" y1="25" x2="50" y2="18" stroke="var(--ifm-color-primary)" strokeWidth="2" />
            <rect x="28" y="25" width="44" height="30" fillOpacity="0" stroke="var(--ifm-color-primary)" strokeWidth="2" />
            <polyline points="28,33 23,33 23,43 28,43" fill="none" stroke="var(--ifm-color-primary)" strokeWidth="2" />
            <polyline points="72,33 77,33 77,43 72,43" fill="none" stroke="var(--ifm-color-primary)" strokeWidth="2" />
        </g>

        <g className={`transition-all duration-1000 ease-in-out ${phase === 'building' ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} style={{ transformOrigin: '50px 40px' }}>

            <g transform="translate(39, 42.5) scale(0.14)">
                <g className={phase === 'building' ? 'animate-spin-slow' : ''} style={{ transformOrigin: '0 0' }}>
                    <g transform="translate(-50, -50)">
                        <g fill="none" stroke="var(--ifm-color-primary)" strokeWidth="10" strokeLinejoin="round" strokeLinecap="round">
                            <path d="M 80.168,39.328 L 94.273,41.944 L 94.273,58.056 L 80.168,60.672 L 78.878,63.786 L 87.002,75.609 L 75.609,87.002 L 63.786,78.878 L 60.672,80.168 L 58.056,94.273 L 41.944,94.273 L 39.328,80.168 L 36.214,78.878 L 24.391,87.002 L 12.998,75.609 L 21.122,63.786 L 19.832,60.672 L 5.727,58.056 L 5.727,41.944 L 19.832,39.328 L 21.122,36.214 L 12.998,24.391 L 24.391,12.998 L 36.214,21.122 L 39.328,19.832 L 41.944,5.727 L 58.056,5.727 L 60.672,19.832 L 63.786,21.122 L 75.609,12.998 L 87.002,24.391 L 78.878,36.214 Z" />
                            <circle cx="50" cy="50" r="18" />
                        </g>
                    </g>
                </g>
            </g>

            <g transform="translate(56, 40) scale(0.19)">
                <g className={phase === 'building' ? 'animate-spin-reverse' : ''} style={{ transformOrigin: '0 0' }}>
                     <g transform="translate(-50, -50)">
                        <g fill="none" stroke="var(--ifm-color-primary)" strokeWidth="10" strokeLinejoin="round" strokeLinecap="round">
                            <path d="M 80.168,39.328 L 94.273,41.944 L 94.273,58.056 L 80.168,60.672 L 78.878,63.786 L 87.002,75.609 L 75.609,87.002 L 63.786,78.878 L 60.672,80.168 L 58.056,94.273 L 41.944,94.273 L 39.328,80.168 L 36.214,78.878 L 24.391,87.002 L 12.998,75.609 L 21.122,63.786 L 19.832,60.672 L 5.727,58.056 L 5.727,41.944 L 19.832,39.328 L 21.122,36.214 L 12.998,24.391 L 24.391,12.998 L 36.214,21.122 L 39.328,19.832 L 41.944,5.727 L 58.056,5.727 L 60.672,19.832 L 63.786,21.122 L 75.609,12.998 L 87.002,24.391 L 78.878,36.214 Z" />
                            <circle cx="50" cy="50" r="18" />
                        </g>
                     </g>
                </g>
            </g>
        </g>

        <g className={`transition-all duration-1000 ease-in-out ${phase === 'processing' ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} style={{ transformOrigin: '50px 40px' }}>
            <g className="animate-sparkle-slow">
                <line x1="50" y1="15" x2="50" y2="11" stroke="var(--ifm-color-primary)" strokeWidth="2" />
                <line x1="46" y1="19" x2="42" y2="19" stroke="var(--ifm-color-primary)" strokeWidth="2" />
                <line x1="54" y1="19" x2="58" y2="19" stroke="var(--ifm-color-primary)" strokeWidth="2" />
                <line x1="46.5" y1="16" x2="43.5" y2="13" stroke="var(--ifm-color-primary)" strokeWidth="2" />
                <line x1="53.5" y1="16" x2="56.5" y2="13" stroke="var(--ifm-color-primary)" strokeWidth="2" />
            </g>
            <rect x="36" y="34" width="6" height="6" fill="var(--ifm-color-primary)" stroke="var(--ifm-color-primary)" strokeWidth="1" className="animate-glow-breathe" />
            <rect x="58" y="34" width="6" height="6" fill="var(--ifm-color-primary)" stroke="var(--ifm-color-primary)" strokeWidth="1" className="animate-glow-breathe" />
        </g>

        <g className={`transition-opacity duration-1000 delay-200 ${phase !== 'building' ? 'opacity-100' : 'opacity-0'}`}>
            <path d="M 44 44 A 6 4 0 0 0 56 44 Z" fill="var(--ifm-color-primary)" stroke="var(--ifm-color-primary)" strokeWidth="2" />
        </g>

      </svg>
      
      <style>{`
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
        }
        .animate-spin-slow {
            animation: spin 4s linear infinite;
        }
        .animate-spin-reverse {
            animation: spin-reverse 4s linear infinite;
        }
        
        @keyframes glow-breathe {
            0%, 100% { opacity: 1; filter: drop-shadow(0 0 2px var(--ifm-color-primary)); }
            50% { opacity: 0.7; filter: drop-shadow(0 0 0px var(--ifm-color-primary)); }
        }
        .animate-glow-breathe {
            animation: glow-breathe 3s ease-in-out infinite;
        }

        @keyframes sparkle-slow {
            0%, 100% { opacity: 0.3; transform: scale(0.95); }
            50% { opacity: 1; transform: scale(1.05); }
        }
        .animate-sparkle-slow {
            animation: sparkle-slow 3s ease-in-out infinite;
            transform-origin: 50px 15px;
        }
      `}</style>
    </div>
  );
}