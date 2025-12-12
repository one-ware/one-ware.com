import React, { useState, useEffect, useRef, memo } from 'react';
import { useDelayedUnmount } from '../hooks/useDelayedUnmount';

function useZoomScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const zoomLevel = Math.round(window.devicePixelRatio * 100);

      if (zoomLevel > 120) {
        setScale(100 / zoomLevel);
      } else {
        setScale(1);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);

    const visualViewport = window.visualViewport;
    if (visualViewport) {
      visualViewport.addEventListener('resize', updateScale);
    }

    return () => {
      window.removeEventListener('resize', updateScale);
      if (visualViewport) {
        visualViewport.removeEventListener('resize', updateScale);
      }
    };
  }, []);

  return scale;
}

interface TopMetricsProps {
  isActive: boolean;
  animateSetup?: boolean;
  animatePrecision?: boolean;
  isImproved?: boolean;
  animateHardwareSwitch?: boolean;
  retrainedPrecision?: boolean;
  isInteractive?: boolean;
  onUserChange?: () => void;
  onBusyChange?: (busy: boolean) => void;
  onFpsChange?: (fps: number) => void;
  targetAccuracy?: number;
}

export default memo(function TopMetrics({ isActive, animateSetup = false, animatePrecision = false, isImproved = false, animateHardwareSwitch = false, retrainedPrecision = false, isInteractive = false, onUserChange, onBusyChange, onFpsChange, targetAccuracy }: TopMetricsProps) {
  const zoomScale = useZoomScale();
  const [displayedFps, setDisplayedFps] = useState(25);
  const [displayedAccuracy, setDisplayedAccuracy] = useState(0.0);
  const [selectedHardware, setSelectedHardware] = useState<string | null>(null);

  const [cursorPos, setCursorPos] = useState({ x: 110, y: 150 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorTransition, setCursorTransition] = useState('all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)');

  const [isReady, setIsReady] = useState(false);
  const [isUserDraggingFps, setIsUserDraggingFps] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const fpsSliderRef = useRef<HTMLDivElement>(null);

  const setupIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hwSwitchIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const accuracyAnimationRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive) {
        const timer = setTimeout(() => setIsReady(true), 100);
        return () => clearTimeout(timer);
    } else {
        setIsReady(false);
        setCursorVisible(false);
        setSelectedHardware(null);
        setDisplayedFps(25);
        setDisplayedAccuracy(0.0);
    }
  }, [isActive]);

  const getTargetPos = (id: string, anchor: 'center' | 'left' = 'center') => {
      if (!containerRef.current) return { x: 50, y: 50 };
      const el = document.getElementById(id);
      if (!el) return { x: 50, y: 50 };

      const rect = el.getBoundingClientRect();
      const contRect = containerRef.current.getBoundingClientRect();

      let targetX = rect.left;
      if (anchor === 'center') targetX += rect.width / 2;
      
      const targetY = rect.top + rect.height / 2;

      const xPercent = ((targetX - contRect.left) / contRect.width) * 100;
      const yPercent = ((targetY - contRect.top) / contRect.height) * 100;

      return { x: xPercent, y: yPercent, width: rect.width, contWidth: contRect.width };
  };

  useEffect(() => {
    if (setupIntervalRef.current) {
      clearInterval(setupIntervalRef.current);
      setupIntervalRef.current = null;
    }

    if (animateSetup && !isInteractive) {
        const sequence = async () => {
            setCursorTransition('all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)');
            setCursorVisible(true);
            setCursorPos({ x: 105, y: 150 });

            await new Promise(r => setTimeout(r, 50));
            const pcPos = getTargetPos('hw-btn-PC', 'center');
            setCursorPos({ x: pcPos.x, y: pcPos.y });

            await new Promise(r => setTimeout(r, 400));
            setIsClicking(true);
            await new Promise(r => setTimeout(r, 200));
            setSelectedHardware('PC');
            await new Promise(r => setTimeout(r, 200));
            setIsClicking(false);

            await new Promise(r => setTimeout(r, 200));
            const sliderStart = getTargetPos('fps-slider-track', 'left');
            const sliderWidthPercentInit = (sliderStart.width / sliderStart.contWidth) * 100;
            const startPosX = sliderStart.x + (25 / 100) * sliderWidthPercentInit;
            setCursorPos({ x: startPosX, y: sliderStart.y });

            await new Promise(r => setTimeout(r, 300));
            setIsClicking(true);
            setCursorTransition('left 0s linear, top 0s linear');

            await new Promise(r => setTimeout(r, 50));

            const dragDuration = 600;
            const sliderTrackLeft = sliderStart.x;
            const sliderWidthPercent = (sliderStart.width / sliderStart.contWidth) * 100;
            const startFps = 25;
            const targetFps = 52;

            const startTime = Date.now();

            const interval = setInterval(() => {
                const now = Date.now();
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / dragDuration, 1);

                const fps = Math.round(startFps + (targetFps - startFps) * progress);
                const cursorX = sliderTrackLeft + (fps / 100) * sliderWidthPercent;

                setDisplayedFps(fps);
                setCursorPos({
                    x: cursorX,
                    y: sliderStart.y
                });

                if (progress >= 1) {
                    clearInterval(interval);
                    setupIntervalRef.current = null;
                    finishSequence();
                }
            }, 32);

            setupIntervalRef.current = interval;

            const finishSequence = async () => {
                setIsClicking(false);

                await new Promise(r => setTimeout(r, 200));
                setCursorTransition('all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)');
                setCursorPos({ x: 105, y: 150 });

                await new Promise(r => setTimeout(r, 800));
                setCursorVisible(false);
            };
        };

        sequence();
    } else if (!isInteractive) {
        setSelectedHardware(null);
        setDisplayedFps(25);
        setCursorVisible(false);
    }

    return () => {
      if (setupIntervalRef.current) {
        clearInterval(setupIntervalRef.current);
        setupIntervalRef.current = null;
      }
    };
  }, [animateSetup, isInteractive]);

  const displayedAccuracyRef = useRef(92.4);
  useEffect(() => {
      displayedAccuracyRef.current = displayedAccuracy;
  }, [displayedAccuracy]);

  useEffect(() => {
      if (accuracyAnimationRef.current) {
        cancelAnimationFrame(accuracyAnimationRef.current);
        accuracyAnimationRef.current = null;
      }

      if (animatePrecision) {
        const startAcc = displayedAccuracyRef.current;
        const targetAcc = targetAccuracy ?? (retrainedPrecision ? 99.6 : (isImproved ? 99.6 : 92.4));

        if (Math.abs(startAcc - targetAcc) < 0.1) return;

        const duration = retrainedPrecision ? 2200 : (isImproved ? 2000 : 1800);
        const startTime = performance.now();
        const animateAcc = (time: number) => {
             const elapsed = time - startTime;
             const progress = Math.min(elapsed / duration, 1);
             const ease = 1 - Math.pow(1 - progress, 5);
             setDisplayedAccuracy(startAcc + (targetAcc - startAcc) * ease);
             if (progress < 1) {
               accuracyAnimationRef.current = requestAnimationFrame(animateAcc);
             } else {
               accuracyAnimationRef.current = null;
             }
        };
        accuracyAnimationRef.current = requestAnimationFrame(animateAcc);
      } else if (!isInteractive) {
          setDisplayedAccuracy(0.0);
      }

      return () => {
        if (accuracyAnimationRef.current) {
          cancelAnimationFrame(accuracyAnimationRef.current);
          accuracyAnimationRef.current = null;
        }
      };
  }, [animatePrecision, isImproved, retrainedPrecision, isInteractive, targetAccuracy]);

  useEffect(() => {
      if (hwSwitchIntervalRef.current) {
        clearInterval(hwSwitchIntervalRef.current);
        hwSwitchIntervalRef.current = null;
      }

      if (animateHardwareSwitch && selectedHardware === 'PC' && !isInteractive) {
        const sequence = async () => {
            setCursorVisible(true);
            setCursorTransition('all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)');
            setCursorPos({ x: 105, y: 150 });

            await new Promise(r => setTimeout(r, 300));
            const fpgaPos = getTargetPos('hw-btn-FPGA', 'center');
            setCursorPos({ x: fpgaPos.x, y: fpgaPos.y });

            await new Promise(r => setTimeout(r, 800));
            setIsClicking(true);
            await new Promise(r => setTimeout(r, 200));
            setSelectedHardware('FPGA');
            await new Promise(r => setTimeout(r, 200));
            setIsClicking(false);

            await new Promise(r => setTimeout(r, 400));
            const sliderStart = getTargetPos('fps-slider-track', 'left');
            const sliderWidthPercent = (sliderStart.width / sliderStart.contWidth) * 100;
            const currentFpsPos = sliderStart.x + (52 / 100) * sliderWidthPercent;
            setCursorPos({ x: currentFpsPos, y: sliderStart.y });

            await new Promise(r => setTimeout(r, 900));
            setIsClicking(true);
            setCursorTransition('left 0s linear, top 0s linear');

            await new Promise(r => setTimeout(r, 50));

            const dragDuration = 500;
            const startFps = 52;
            const targetFps = 81;
            const startTime = Date.now();

            const interval = setInterval(() => {
                const now = Date.now();
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / dragDuration, 1);

                const fps = Math.round(startFps + (targetFps - startFps) * progress);
                const cursorX = sliderStart.x + (fps / 100) * sliderWidthPercent;

                setDisplayedFps(fps);
                setCursorPos({
                    x: cursorX,
                    y: sliderStart.y
                });

                if (progress >= 1) {
                    clearInterval(interval);
                    hwSwitchIntervalRef.current = null;
                    finishSequence();
                }
            }, 32);

            hwSwitchIntervalRef.current = interval;

            const finishSequence = async () => {
                setIsClicking(false);

                await new Promise(r => setTimeout(r, 200));
                setCursorTransition('all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)');
                setCursorPos({ x: 105, y: 150 });

                await new Promise(r => setTimeout(r, 800));
                setCursorVisible(false);
            };
        };
        sequence();
      }

      return () => {
        if (hwSwitchIntervalRef.current) {
          clearInterval(hwSwitchIntervalRef.current);
          hwSwitchIntervalRef.current = null;
        }
      };
  }, [animateHardwareSwitch, selectedHardware, isInteractive]);

  const MIN_FPS = 25;
  const MAX_FPS = 100;

  const handleFpsSliderInteraction = (e: React.MouseEvent | MouseEvent | React.TouchEvent | TouchEvent) => {
    if (!isInteractive || !fpsSliderRef.current) return;
    const rect = fpsSliderRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0]?.clientX ?? e.changedTouches[0]?.clientX : e.clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    const clampedFps = Math.max(MIN_FPS, Math.min(MAX_FPS, Math.round(percent)));
    setDisplayedFps(clampedFps);
  };

  const onUserChangeRef = useRef(onUserChange);
  const onFpsChangeRef = useRef(onFpsChange);
  const onBusyChangeRef = useRef(onBusyChange);
  const displayedFpsRef = useRef(displayedFps);

  useEffect(() => { onUserChangeRef.current = onUserChange; }, [onUserChange]);
  useEffect(() => { onFpsChangeRef.current = onFpsChange; }, [onFpsChange]);
  useEffect(() => { onBusyChangeRef.current = onBusyChange; }, [onBusyChange]);
  useEffect(() => { displayedFpsRef.current = displayedFps; }, [displayedFps]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isInteractive) return;
    setIsUserDraggingFps(true);
    if (onBusyChangeRef.current) onBusyChangeRef.current(true);
    handleFpsSliderInteraction(e);

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!fpsSliderRef.current) return;
      const rect = fpsSliderRef.current.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0]?.clientX ?? 0 : e.clientX;
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percent = (x / rect.width) * 100;
      const clampedFps = Math.max(MIN_FPS, Math.min(MAX_FPS, Math.round(percent)));
      setDisplayedFps(clampedFps);
    };

    const handleEnd = () => {
      setIsUserDraggingFps(false);
      if (onBusyChangeRef.current) onBusyChangeRef.current(false);
      if (onUserChangeRef.current) onUserChangeRef.current();
      if (onFpsChangeRef.current) onFpsChangeRef.current(displayedFpsRef.current);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleEnd);
  };

  const formatFps = (val: number) => Math.round(val).toString();
  const formatAcc = (val: number) => val.toFixed(1);

  const shouldRenderCursor = useDelayedUnmount(cursorVisible, 300);
  const shouldRenderPanels = useDelayedUnmount(isActive && isReady, 1200);

  const getPanelStyle = (delayIndex: number): React.CSSProperties => {
      const isVisible = isActive && isReady;
      return {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(10px)',
          filter: isVisible ? 'blur(0px)' : 'blur(12px)',
          transition: `
            opacity 0.8s ease-out ${delayIndex * 150}ms, 
            transform 1s cubic-bezier(0.19, 1, 0.22, 1) ${delayIndex * 150}ms, 
            filter 1.2s ease-out ${delayIndex * 150}ms
          `,
          willChange: 'transform, opacity, filter'
      };
  };

  const glassPanelClass = "oneware-glass-panel relative overflow-hidden flex-1 min-w-0 flex flex-col px-3 py-2 sm:px-4 sm:py-2.5 lg:px-6 lg:py-3";

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ flex: 1, minHeight: 0 }}
    >
      {shouldRenderCursor && (
        <div
          className="pointer-events-none absolute z-50"
          style={{
              left: `${cursorPos.x}%`,
              top: `${cursorPos.y}%`,
              opacity: cursorVisible ? 1 : 0,
              transform: `translate(-20%, -20%) scale(${isClicking ? 0.85 : 1})`,
              transition: cursorTransition === 'none'
                  ? 'transform 0.15s ease-out, opacity 0.3s ease'
                  : `${cursorTransition}, transform 0.15s ease-out, opacity 0.3s ease`
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}>
              <path d="M5.5 3.5L19 10L11.5 12.5L9 20L5.5 3.5Z" fill="var(--ifm-color-primary)" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </div>
      )}

      {shouldRenderPanels && (
        <div
          className="overflow-visible scrollbar-thin h-full w-full"
          style={{
            transform: `scale(${zoomScale})`,
            transformOrigin: 'top left',
            width: zoomScale < 1 ? `${100 / zoomScale}%` : '100%',
            height: zoomScale < 1 ? `${100 / zoomScale}%` : '100%',
          }}
        >
          <div
            className="flex flex-nowrap h-full w-full"
            style={{ gap: 'clamp(8px, 1.5vw, 16px)' }}
          >

        <div className={glassPanelClass} style={{ ...getPanelStyle(0), minWidth: '120px' }}>
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
          <div className="oneware-section-header flex-shrink-0" style={{ margin: 0, padding: 0, fontSize: 'clamp(0.4rem, 1vw, 0.7rem)' }}>
              HARDWARE
          </div>
          <div className="flex-1 flex flex-col justify-center">
          <div className="flex p-[1px] bg-black/20 rounded-md border border-white/5 w-full">
                  {['PC', 'FPGA', 'MCU'].map((hw, i) => (
                      <div
                        key={hw}
                        id={`hw-btn-${hw}`}
                        onClick={() => {
                          if (isInteractive) {
                            setSelectedHardware(hw);
                            if (onUserChange) onUserChange();
                          }
                        }}
                        className={`
                          flex-1 flex items-center justify-center py-1 rounded-[4px] transition-all duration-300 ease-out relative overflow-hidden
                          ${isInteractive ? 'cursor-pointer pointer-events-auto hover:bg-white/5' : 'cursor-default pointer-events-none'}
                          ${selectedHardware === hw
                              ? 'text-[var(--ifm-color-primary)] font-bold bg-white/5 border border-[var(--ifm-color-primary)]/20 shadow-[inset_0_0_15px_rgba(0,255,209,0.05)]'
                              : 'text-white/30 border border-transparent'}
                        `}
                      >
                          <span className="relative z-10 tracking-wider" style={{ fontSize: 'clamp(0.4rem, 1vw, 0.65rem)' }}>
                              {hw}
                          </span>
                          <div
                            className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-[var(--ifm-color-primary)] shadow-[0_0_8px_var(--ifm-color-primary)] transition-opacity duration-300"
                            style={{ opacity: selectedHardware === hw ? 1 : 0 }}
                          />
                      </div>
                  ))}
          </div>
          </div>
      </div>

      <div className={glassPanelClass} style={{ ...getPanelStyle(1), minWidth: '150px' }}>
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />

          <div className="oneware-section-header flex-shrink-0" style={{ margin: 0, padding: 0, fontSize: 'clamp(0.45rem, 1.2vw, 0.75rem)' }}>
              FRAMERATE
          </div>

          <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-end gap-4">
              <div className="flex items-end gap-2 min-w-[40%]">
                  <span
                      className={`font-light tracking-tight text-white drop-shadow-lg transition-all duration-300 ${displayedFps > 0 ? 'scale-105 text-[var(--ifm-color-primary)]' : ''}`}
                      style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.5rem)', lineHeight: 1 }}
                  >
                      {formatFps(displayedFps)}
                  </span>
                  <span className="font-medium text-white/40 uppercase tracking-widest pb-[2px]" style={{ fontSize: 'clamp(7px, 1.8vw, 14px)' }}>FPS</span>
              </div>

              <div
                ref={fpsSliderRef}
                id="fps-slider-track"
                className={`relative h-[16px] flex-1 flex items-center mb-1 ${isInteractive ? 'cursor-pointer' : ''} touch-none`}
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart}
              >
                 <div className="absolute left-0 right-0 h-[2px] bg-white/10 rounded-full overflow-hidden">
                      <div
                          className="h-full bg-[var(--ifm-color-primary)] shadow-[0_0_10px_var(--ifm-color-primary)]"
                          style={{
                              width: `${displayedFps}%`,
                              transition: `width ${isClicking || isUserDraggingFps ? '0s' : '0.2s'} linear`
                          }}
                      />
                 </div>
                 <div
                    className="absolute h-[12px] w-[4px] bg-[var(--ifm-color-primary)] rounded-[1px] shadow-[0_0_10px_var(--ifm-color-primary)] z-10 top-1/2 -translate-y-1/2"
                    style={{
                        left: `${displayedFps}%`,
                        transform: 'translate(-50%, -50%)',
                        transition: `left ${isClicking || isUserDraggingFps ? '0s' : '0.2s'} linear`
                    }}
                 />
             </div>
          </div>
          </div>
      </div>

      <div className={glassPanelClass} style={{ ...getPanelStyle(2), minWidth: '150px' }}>
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />

          <div
              className="absolute inset-0 pointer-events-none"
              style={{
                  background: 'radial-gradient(circle at center, rgba(0, 255, 209, 0.4) 0%, transparent 70%)',
                  opacity: isImproved ? 0.6 : 0,
                  transition: 'opacity 0.8s ease-out',
                  zIndex: 5
              }}
          />

          <div className="oneware-section-header flex-shrink-0" style={{ margin: 0, padding: 0, fontSize: 'clamp(0.45rem, 1.2vw, 0.75rem)' }}>
              ACCURACY
          </div>

          <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-end gap-2">
              <span
                  className={`font-light tracking-tight drop-shadow-lg transition-colors duration-1000 ${isImproved ? 'text-[var(--ifm-color-primary)] drop-shadow-[0_0_15px_rgba(0,255,209,0.6)]' : 'text-white'}`}
                  style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.5rem)', lineHeight: 1 }}
              >
                  {formatAcc(displayedAccuracy)}
              </span>
              <span className="font-medium text-white/40 uppercase tracking-widest pb-[2px]" style={{ fontSize: 'clamp(7px, 1.8vw, 14px)' }}>%</span>
          </div>
          </div>

          <div
            className="absolute right-2 sm:right-3 lg:right-4 top-1/2 -translate-y-1/2 opacity-30 rotate-180 pointer-events-none"
            style={{ width: 'clamp(24px, 5vw, 48px)', height: 'clamp(24px, 5vw, 48px)' }}
          >
               <svg width="100%" height="100%" viewBox="0 0 40 40">
                  <circle cx="20" cy="20" r="18" fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.1" />
                  <circle
                      cx="20" cy="20" r="18"
                      fill="none"
                      stroke="var(--ifm-color-primary)"
                      strokeWidth="2"
                      strokeDasharray="113"
                      strokeDashoffset={isActive ? 113 - (113 * (displayedAccuracy/100)) : 113}
                      transform="rotate(-90 20 20)"
                      style={{ transition: 'stroke 1s ease' }}
                  />
               </svg>
          </div>
      </div>
          </div>
        </div>
      )}
    </div>
  );
});
