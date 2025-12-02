import React from 'react';
import GlassFolder from './components/GlassFolder';
import GlassFolderDrag from './components/GlassFolderDrag';
import AppleGraphic from './components/AppleGraphic';

interface FolderWithAppleProps {
  isDragging: boolean;
  hasDropped: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  setSourceRef?: (ref: HTMLDivElement | null) => void;
  style?: React.CSSProperties;
}

export function FolderWithApple({ isDragging, hasDropped, onMouseDown, setSourceRef, style }: FolderWithAppleProps) {
  const isHidden = isDragging || hasDropped;

  return (
    <div
      ref={setSourceRef}
      className={`flex-shrink-0 relative mb-0 2xl:mb-8 cursor-grab active:cursor-grabbing transition-opacity duration-300 ${hasDropped ? 'pointer-events-none' : ''}`}
      style={{
        width: 'clamp(40px, 8vw, 120px)',
        zIndex: 20,
        opacity: isHidden ? 0 : 1
      }}
      onMouseDown={!hasDropped ? onMouseDown : undefined}
    >
      <GlassFolder label="training_data" animStyle={style}>
        <div className="w-full h-full" style={{ filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))' }}>
          <AppleGraphic />
        </div>
      </GlassFolder>
    </div>
  );
}

export function DragPreview({ x, y }: { x: number, y: number }) {
    return (
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
            left: x,
            top: y,
            transform: 'translate(-50%, -50%) rotate(-5deg)',
            width: 'clamp(45px, 12vw, 100px)',
            height: 'clamp(34px, 9vw, 75px)'
        }}
      >
        <GlassFolderDrag
          width="100%"
          height="100%"
          borderColor="rgba(0, 255, 209, 0.5)"
          glowColor="rgba(0, 255, 209, 0.3)"
          hoverEffect={false}
        >
            <AppleGraphic simplified scale={0.8} />
        </GlassFolderDrag>
      </div>
    );
}

