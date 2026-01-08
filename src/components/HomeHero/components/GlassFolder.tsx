import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';

interface GlassFolderProps {
  children?: React.ReactNode;
  label?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  borderColor?: string;
  glowColor?: string;
  hoverEffect?: boolean;
  animStyle?: React.CSSProperties;
}

export default function GlassFolder({
  children,
  label,
  width = 'clamp(70px, 10vw, 120px)',
  height = 'clamp(52px, 7.5vw, 90px)',
  className = '',
  style,
  borderColor = 'rgba(255, 255, 255, 0.15)',
  glowColor,
  hoverEffect = true,
  animStyle,
}: GlassFolderProps) {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  const folderBg = isDarkMode ? 'rgba(20, 20, 20, 0.6)' : 'rgba(15, 15, 15, 0.75)';
  const labelBg = isDarkMode ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.6)';
  const labelBorder = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.15)';

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
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          border: `1px solid ${borderColor}`,
          borderRadius: '8px',
          boxShadow: glowColor ? `0 0 20px ${glowColor}` : '0 20px 40px rgba(0, 0, 0, 0.5)',
          ...animStyle,
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
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
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
              fontSize: 'clamp(10px, 1.8vw, 14px)',
              fontFamily: 'monospace',
              color: 'rgba(255, 255, 255, 0.9)',
              background: labelBg,
              padding: '4px 12px',
              borderRadius: '9999px',
              border: `1px solid ${labelBorder}`,
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