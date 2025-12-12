import React, { useEffect, useRef } from 'react';
import NeonFolderGraphic from './components/NeonFolderGraphic';

interface GhostDragAnimationProps {
  sourceRef: React.RefObject<HTMLDivElement>;
  targetRef: HTMLElement | null;
  show: boolean;
  onHoverChange?: (isHovering: boolean) => void;
}

function throttle<T extends (...args: unknown[]) => void>(fn: T, wait: number): T {
  let lastTime = 0;
  return ((...args: unknown[]) => {
    const now = Date.now();
    if (now - lastTime >= wait) {
      lastTime = now;
      fn(...args);
    }
  }) as T;
}

export default function GhostDragAnimation({ sourceRef, targetRef, show, onHoverChange }: GhostDragAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const maskPathRef = useRef<SVGPathElement>(null);
  const folderGroupRef = useRef<SVGGElement>(null);
  const opacityGroupRef = useRef<SVGGElement>(null);

  const coordsRef = useRef<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    controlX: number;
    controlY: number;
    pathLen: number;
  } | null>(null);

  const requestRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);
  const lastHoverState = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isPausedRef = useRef<boolean>(false);

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

        coordsRef.current = { startX, startY, endX, endY, controlX, controlY, pathLen };

        const pathD = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
        if (pathRef.current) {
          pathRef.current.setAttribute('d', pathD);
        }
        if (maskPathRef.current) {
          maskPathRef.current.setAttribute('d', pathD);
          maskPathRef.current.setAttribute('stroke-dasharray', String(pathLen));
        }
      }
    };

    if (show) {
      updatePositions();

      const throttledUpdate = throttle(updatePositions, 100);

      const handleScroll = () => {
        throttledUpdate();

        isPausedRef.current = true;
        startTimeRef.current = undefined;

        if (opacityGroupRef.current) {
          opacityGroupRef.current.style.opacity = '0';
        }
        if (folderGroupRef.current) {
          folderGroupRef.current.style.opacity = '0';
        }

        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() => {
          isPausedRef.current = false;
          startTimeRef.current = undefined;
        }, 1000);
      };

      window.addEventListener('resize', throttledUpdate);
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('resize', throttledUpdate);
        window.removeEventListener('scroll', handleScroll);
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      };
    } else {
      return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      };
    }
  }, [show, sourceRef, targetRef]);

  useEffect(() => {
    if (show) {
      startTimeRef.current = undefined;
    }
  }, [show]);

  useEffect(() => {
    if (!show || !coordsRef.current) {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (lastHoverState.current && onHoverChange) {
        onHoverChange(false);
        lastHoverState.current = false;
      }
      return;
    }

    const animate = (time: number) => {
      if (isPausedRef.current) {
        requestRef.current = requestAnimationFrame(animate);
        return;
      }
      if (!startTimeRef.current) startTimeRef.current = time;
      const coords = coordsRef.current;
      if (!coords) return;

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

      if (maskPathRef.current) {
        maskPathRef.current.setAttribute('stroke-dashoffset', String(coords.pathLen * (1 - easedT)));
      }
      if (opacityGroupRef.current) {
        opacityGroupRef.current.style.opacity = String(opacity);
      }
      if (folderGroupRef.current) {
        folderGroupRef.current.setAttribute('transform', `translate(${x}, ${y}) rotate(${angle + 90}) scale(${scale})`);
        folderGroupRef.current.style.opacity = String(opacity);
      }

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
  }, [show, onHoverChange]);

  if (!show) return null;

  const initialPath = coordsRef.current
    ? `M ${coordsRef.current.startX} ${coordsRef.current.startY} Q ${coordsRef.current.controlX} ${coordsRef.current.controlY} ${coordsRef.current.endX} ${coordsRef.current.endY}`
    : "M 0 0 Q 0 0 0 0";
  const initialPathLen = coordsRef.current?.pathLen || 0;

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[30] overflow-hidden" style={{ willChange: 'transform' }}>
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
              ref={maskPathRef}
              d={initialPath}
              fill="none"
              stroke="white"
              strokeWidth="5"
              strokeDasharray={initialPathLen}
              strokeDashoffset={initialPathLen}
              strokeLinecap="round"
            />
          </mask>
        </defs>

        <g ref={opacityGroupRef} style={{ opacity: 0 }}>
          <path
            ref={pathRef}
            d={initialPath}
            fill="none"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            mask="url(#draw-mask)"
          />
        </g>

        <g ref={folderGroupRef} style={{ opacity: 0, willChange: 'transform, opacity' }}>
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
