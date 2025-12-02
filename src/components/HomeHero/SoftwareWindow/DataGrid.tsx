import React from 'react';

interface DataGridProps {
  filledCount: number;
  x?: number;
  y?: number;
  showCelebration?: boolean;
}

export default function DataGrid({ filledCount, x = 0, y = 0, showCelebration = false }: DataGridProps) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <style>{`
        @keyframes data-grid-cell-pop {
            0% { opacity: 0; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <g>
          <rect
            x="-60" y="-60" width="120" height="120" rx="14"
            fill="rgba(0, 255, 209, 0.02)"
            stroke="var(--ifm-color-primary)"
            strokeWidth="0.5"
          />

          <g transform="translate(-56, -56)">
            {[...Array(Math.min(filledCount, 16))].map((_, i) => {
              const row = Math.floor(i / 4);
              const col = i % 4;
              const cellColor = 'var(--ifm-color-primary)';

              return (
                <use
                  key={`cell-${i}`}
                  href="#icon-placeholder"
                  x={col * 28} y={row * 28} width="26" height="26"
                  style={{
                    color: cellColor,
                    animation: 'data-grid-cell-pop 0.2s ease-out forwards',
                    opacity: 0,
                    transformBox: 'fill-box',
                    transformOrigin: 'center'
                  }}
                />
              );
            })}
          </g>

          {filledCount === 0 && (
              <g style={{ pointerEvents: 'none', opacity: 0.6 }}>
                  <line x1="0" y1="-15" x2="0" y2="15" stroke="var(--ifm-color-primary)" strokeWidth="2" strokeLinecap="round" />
                  <line x1="-15" y1="0" x2="15" y2="0" stroke="var(--ifm-color-primary)" strokeWidth="2" strokeLinecap="round" />
              </g>
          )}
      </g>

      {showCelebration && (
        <g>
            <rect
                x="-60" y="-60" width="120" height="120" rx="14"
                fill="#050505"
                style={{ animation: 'overlay-fade 0.3s ease-out forwards' }}
            />

            <rect
                x="-60" y="-60" width="120" height="120" rx="14"
                fill="none"
                stroke="var(--ifm-color-primary)"
                strokeWidth="2"
                strokeDasharray="480" 
                strokeDashoffset="480"
                style={{ 
                    animation: 'path-draw 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    filter: 'drop-shadow(0 0 8px rgba(0,255,209,0.3))'
                }}
            />

            <g style={{ animation: 'icon-fade-scale 0.4s ease-out forwards 0.2s', opacity: 0 }}>
                <circle cx="0" cy="0" r="28" fill="#001210" fillOpacity="1" />

                <path 
                    d="M-9 -1 L-2 6 L10 -8" 
                    fill="none" 
                    stroke="var(--ifm-color-primary)" 
                    strokeWidth="3.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    strokeDasharray="35"
                    strokeDashoffset="35"
                    style={{ 
                        animation: 'path-draw 0.4s ease-out forwards 0.4s',
                        filter: 'drop-shadow(0 0 5px rgba(0,255,209,0.5))'
                    }}
                />
            </g>
        </g>
      )}
    </g>
  );
}