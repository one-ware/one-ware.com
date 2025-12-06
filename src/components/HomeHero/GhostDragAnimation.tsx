import React, { useEffect, useState, useRef } from 'react';
import NeonFolderGraphic from './components/NeonFolderGraphic';

interface GhostDragAnimationProps {
  sourceRef: React.RefObject<HTMLDivElement>;
  targetRef: HTMLElement | null;
  show: boolean;
  onHoverChange?: (isHovering: boolean) => void;
}

export default function GhostDragAnimation({ sourceRef, targetRef, show, onHoverChange }: GhostDragAnimationProps) {
  const [coords, setCoords] = useState<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    controlX: number;
    controlY: number;
    pathLen: number;
  } | null>(null);

  const [animState, setAnimState] = useState({ x: 0, y: 0, angle: 0, progress: 0, opacity: 0, scale: 1 });
  const requestRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);
  const lastHoverState = useRef<boolean>(false);

  useEffect(() => {
    const updatePositions = () => {
      if (sourceRef.current && targetRef && show) {
        const sourceRect = sourceRef.current.getBoundingClientRect();
        const targetRect = targetRef.getBoundingClientRect();

        const startX = sourceRect.left + sourceRect.width / 2;
        const startY = sourceRect.top + sourceRect.height / 2;
        const endX = targetRect.left + targetRect.width / 2;
        const endY = targetRect.top + targetRect.height / 2;

        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2;
        const dist = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
        
        const controlX = midX;
        const controlY = midY - Math.min(200, dist * 0.4);

        const dist1 = Math.sqrt(Math.pow(controlX - startX, 2) + Math.pow(controlY - startY, 2));
        const dist2 = Math.sqrt(Math.pow(endX - controlX, 2) + Math.pow(endY - controlY, 2));
        const pathLen = (dist1 + dist2 + dist) / 2;

        setCoords({ startX, startY, endX, endY, controlX, controlY, pathLen });
      }
    };

    if (show) {
        updatePositions();
        window.addEventListener('resize', updatePositions);
        window.addEventListener('scroll', updatePositions);

        const interval = setInterval(updatePositions, 200);
        
        return () => {
          window.removeEventListener('resize', updatePositions);
          window.removeEventListener('scroll', updatePositions);
          clearInterval(interval);
          if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    } else {
        return () => {
             if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }
  }, [show, sourceRef, targetRef]);

  useEffect(() => {
      if (show) {
          startTimeRef.current = undefined;
      }
  }, [show]);

  useEffect(() => {
    if (!show || !coords) {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        if (lastHoverState.current && onHoverChange) {
             onHoverChange(false);
             lastHoverState.current = false;
        }
        return;
    }

    const animate = (time: number) => {
      if (!startTimeRef.current) startTimeRef.current = time;
      const duration = 3000;
      const elapsed = time - startTimeRef.current;
      let t = (elapsed % duration) / duration;

      let moveT = t / 0.8;
      if (moveT > 1) moveT = 1;

      const easedT = moveT < 0.5
        ? 4 * moveT * moveT * moveT
        : 1 - Math.pow(-2 * moveT + 2, 3) / 2;

      const mt = 1 - easedT;
      const x = mt * mt * coords.startX + 2 * mt * easedT * coords.controlX + easedT * easedT * coords.endX;
      const y = mt * mt * coords.startY + 2 * mt * easedT * coords.controlY + easedT * easedT * coords.endY;

      const tx = 2 * mt * (coords.controlX - coords.startX) + 2 * easedT * (coords.endX - coords.controlX);
      const ty = 2 * mt * (coords.controlY - coords.startY) + 2 * easedT * (coords.endY - coords.controlY);
      const angle = Math.atan2(ty, tx) * (180 / Math.PI);

      let opacity = 1;
      let scale = 1;

      if (t < 0.15) {
          const fadeIn = t / 0.15;
          opacity = 1 - Math.pow(1 - fadeIn, 3);
          scale = 0.8 + fadeIn * 0.2;
      } else if (t > 0.8) {
          const fadeOut = (t - 0.8) / 0.2;
          opacity = 1 - fadeOut;
          scale = 1 - fadeOut * 0.1;
      }

      const isHovering = t > 0.45 && t < 0.95;
      if (isHovering !== lastHoverState.current) {
          if (onHoverChange) onHoverChange(isHovering);
          lastHoverState.current = isHovering;
      }
      
      setAnimState({ x, y, angle, progress: easedT, opacity, scale });
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        if (lastHoverState.current && onHoverChange) {
             onHoverChange(false);
             lastHoverState.current = false;
        }
    };
  }, [show, coords, onHoverChange]);

  if (!show || !coords) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[10000] overflow-hidden" style={{ willChange: 'transform' }}>
      <svg className="w-full h-full" style={{ willChange: 'transform' }}>
        <defs>
          <filter id="glow-strong">
             <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
             <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
             </feMerge>
          </filter>
          <mask id="draw-mask">
             <path
                d={`M ${coords.startX} ${coords.startY} Q ${coords.controlX} ${coords.controlY} ${coords.endX} ${coords.endY}`}
                fill="none"
                stroke="white"
                strokeWidth="5"
                strokeDasharray={coords.pathLen}
                strokeDashoffset={coords.pathLen * (1 - animState.progress)}
                strokeLinecap="round"
             />
          </mask>
        </defs>

        <g style={{ opacity: animState.opacity }}>
            <path
              d={`M ${coords.startX} ${coords.startY} Q ${coords.controlX} ${coords.controlY} ${coords.endX} ${coords.endY}`}
              fill="none"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              mask="url(#draw-mask)"
            />
        </g>

        <g transform={`translate(${animState.x}, ${animState.y}) rotate(${animState.angle + 90}) scale(${animState.scale})`} style={{ opacity: animState.opacity, willChange: 'transform, opacity' }}>
             <path
                d="M 0 -35 L 6 -20 L 0 -24 L -6 -20 Z"
                fill="var(--ifm-color-primary)"
                filter="url(#glow-strong)"
             />

             <NeonFolderGraphic />
        </g>

      </svg>
    </div>
  );
}