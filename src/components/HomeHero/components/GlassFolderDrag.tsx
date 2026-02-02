import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';

interface GlassFolderDragProps {
  children?: React.ReactNode;
  label?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  borderColor?: string;
  glowColor?: string;
  hoverEffect?: boolean;
  backgroundColor?: string;
  blur?: string;
}

export default function GlassFolderDrag({
  children,
  label,
  width = '120px',
  height = '90px',
  className = '',
  style,
  borderColor = 'rgba(255, 255, 255, 0.15)',
  glowColor,
  hoverEffect = true,
  backgroundColor,
  blur = '12px',
}: GlassFolderDragProps) {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  const folderBg = backgroundColor ?? (isDarkMode ? 'rgba(20, 20, 20, 0.3)' : 'rgba(15, 15, 15, 0.5)');

  return (
    <div
      className={`relative ${className}`}
      style={{
        perspective: '1000px',
        width,
        height,
        ...style,
      }}
    >
      <div
        className={`relative w-full h-full ${hoverEffect ? 'group hover:scale-105' : ''} transition-transform duration-300`}
        style={{
          background: folderBg,
          backdropFilter: `blur(${blur})`,
          WebkitBackdropFilter: `blur(${blur})`,
          border: `1px solid ${borderColor}`,
          borderRadius: '8px',
          boxShadow: glowColor ? `0 0 20px ${glowColor}` : '0 20px 40px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div
          className="absolute"
          style={{
            top: '-14px',
            left: '0',
            width: '40%',
            height: '14px',
            background: folderBg,
            border: `1px solid ${borderColor}`,
            borderBottom: 'none',
            backdropFilter: `blur(${blur})`,
            WebkitBackdropFilter: `blur(${blur})`,
            borderRadius: '8px 8px 0 0',
          }}
        />

        <div
          className="absolute flex items-center justify-center pointer-events-none"
          style={{
            bottom: '15px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            width: '60%',
            height: '60%',
          }}
        >
          {children}
        </div>

        {label && (
          <div
            className="absolute pointer-events-none"
            style={{
              bottom: '-40px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '11px',
              fontFamily: 'monospace',
              color: 'rgba(255, 255, 255, 0.8)',
              background: 'rgba(0, 0, 0, 0.4)',
              padding: '4px 12px',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
            }}
          >
            {label}
          </div>
        )}
      </div>
    </div>
  );
}
