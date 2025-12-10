import React, { useState, useEffect, useRef, memo } from "react";
import DataGrid from "./DataGrid";
import { useDelayedUnmount } from '../hooks/useDelayedUnmount';

interface CameraStationProps {
  isActive: boolean;
  onDataFull?: () => void;
  showCelebration?: boolean;
  allowCustomUpload?: boolean;
  onDataDropped?: () => void;
}

const CAMERA_X = 60;
const CAMERA_Y = 200;
const STACK_X = 140;
const STACK_Y = 100;
const DATA_BOX_X = 320;
const DATA_BOX_Y = 180;

const ICON_DELAYS = [
    800,
    1100,
    1400,
    1700,
    2000,
    2300,
    2600,
    2900,
    3200,
    3500,
    3800,
    4100,
    4300,
    4500,
    4700,
    4900,
    5100,
    5300,
    5500,
];

export default memo(function CameraStation({ isActive, onDataFull, showCelebration = false, allowCustomUpload = false, onDataDropped }: CameraStationProps) {
    const isVisible = isActive;
    const shouldRender = useDelayedUnmount(isVisible, 800);
    const [collectedCount, setCollectedCount] = useState(0);

    const [isDragging, setIsDragging] = useState(false);
    const [dragPos, setDragPos] = useState({ x: STACK_X, y: STACK_Y });
    const [isDropped, setIsDropped] = useState(false);
    const [animationKey, setAnimationKey] = useState(0);


    const [visibleIconCount, setVisibleIconCount] = useState(0);

    const [showArrow, setShowArrow] = useState(false);
    const [arrowProgress, setArrowProgress] = useState(0);
    const arrowAnimRef = useRef<number | undefined>(undefined);
    const arrowStartTimeRef = useRef<number | undefined>(undefined);

    const dragStartOffset = useRef({ x: 0, y: 0 });
    const svgRef = useRef<SVGSVGElement>(null);
    const pulseScaleRef = useRef<SVGAnimateTransformElement>(null);
    const rippleRadiusRef = useRef<SVGAnimateElement>(null);
    const rippleOpacityRef = useRef<SVGAnimateElement>(null);

    useEffect(() => {
        if (isActive) {
            setCollectedCount(0);
            setIsDropped(false);
            setIsDragging(false);
            setDragPos({ x: STACK_X, y: STACK_Y });
            setAnimationKey(prev => prev + 1);
            setVisibleIconCount(0);
            setShowArrow(false);
            arrowStartTimeRef.current = undefined;

            const timers = ICON_DELAYS.map((delay, index) =>
                setTimeout(() => {
                    setVisibleIconCount(index + 1);
                }, delay)
            );

            return () => timers.forEach(t => clearTimeout(t));
        } else {
            setVisibleIconCount(0);
        }
    }, [isActive]);

    useEffect(() => {
        const pulseTimeout = setTimeout(() => {
            try {
                pulseScaleRef.current?.beginElement();
                rippleRadiusRef.current?.beginElement();
                rippleOpacityRef.current?.beginElement();
                setShowArrow(true);
            } catch (e) {
                console.warn("Animation trigger failed", e);
            }
        }, 5800);
        return () => clearTimeout(pulseTimeout);
    }, [animationKey]);

    useEffect(() => {
        if (isDropped || !isActive) {
            if (arrowAnimRef.current) cancelAnimationFrame(arrowAnimRef.current);
            setShowArrow(false);
            setArrowProgress(0);
            return;
        }

        if (isDragging) {
            if (arrowAnimRef.current) cancelAnimationFrame(arrowAnimRef.current);
            arrowStartTimeRef.current = undefined;
            setArrowProgress(0);
            return;
        }

        if (!showArrow) {
            if (arrowAnimRef.current) cancelAnimationFrame(arrowAnimRef.current);
            return;
        }

        const startDelay = setTimeout(() => {
            const animate = (time: number) => {
                if (!arrowStartTimeRef.current) arrowStartTimeRef.current = time;
                const duration = 2000;
                const elapsed = time - arrowStartTimeRef.current;
                let t = (elapsed % duration) / duration;

                let moveT = t / 0.7;
                if (moveT > 1) moveT = 1;

                const easedT = moveT < 0.5
                    ? 4 * moveT * moveT * moveT
                    : 1 - Math.pow(-2 * moveT + 2, 3) / 2;

                setArrowProgress(easedT);
                arrowAnimRef.current = requestAnimationFrame(animate);
            };

            arrowAnimRef.current = requestAnimationFrame(animate);
        }, 150);

        return () => {
            clearTimeout(startDelay);
            if (arrowAnimRef.current) cancelAnimationFrame(arrowAnimRef.current);
        };
    }, [showArrow, isDropped, isDragging, isActive]);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (isDropped || !isActive) return;

        setIsDragging(true);
        if (svgRef.current) {
            const CTM = svgRef.current.getScreenCTM();
            if (CTM) {
                const svgX = (e.clientX - CTM.e) / CTM.a;
                const svgY = (e.clientY - CTM.f) / CTM.d;
                dragStartOffset.current = { x: svgX - dragPos.x, y: svgY - dragPos.y };
            }
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        if (isDropped || !isActive) return;

        const touch = e.touches[0];
        setIsDragging(true);
        if (svgRef.current) {
            const CTM = svgRef.current.getScreenCTM();
            if (CTM) {
                const svgX = (touch.clientX - CTM.e) / CTM.a;
                const svgY = (touch.clientY - CTM.f) / CTM.d;
                dragStartOffset.current = { x: svgX - dragPos.x, y: svgY - dragPos.y };
            }
        }
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || !svgRef.current) return;

            const CTM = svgRef.current.getScreenCTM();
            if (CTM) {
                const svgX = (e.clientX - CTM.e) / CTM.a;
                const svgY = (e.clientY - CTM.f) / CTM.d;
                setDragPos({
                    x: svgX - dragStartOffset.current.x,
                    y: svgY - dragStartOffset.current.y
                });
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!isDragging || !svgRef.current) return;
            e.preventDefault();

            const touch = e.touches[0];
            const CTM = svgRef.current.getScreenCTM();
            if (CTM) {
                const svgX = (touch.clientX - CTM.e) / CTM.a;
                const svgY = (touch.clientY - CTM.f) / CTM.d;
                setDragPos({
                    x: svgX - dragStartOffset.current.x,
                    y: svgY - dragStartOffset.current.y
                });
            }
        };

        const handleDragEnd = () => {
            if (!isDragging) return;
            setIsDragging(false);

            const dist = Math.sqrt(Math.pow(dragPos.x - DATA_BOX_X, 2) + Math.pow(dragPos.y - DATA_BOX_Y, 2));

            if (dist < 80) {
                setIsDropped(true);
                setDragPos({ x: DATA_BOX_X, y: DATA_BOX_Y });

                let count = 0;
                const fillInterval = setInterval(() => {
                    count += 2;
                    setCollectedCount(count);
                    if (count >= 16) {
                        clearInterval(fillInterval);
                        if (allowCustomUpload && onDataDropped) {
                            setTimeout(onDataDropped, 300);
                        } else if (onDataFull) {
                            setTimeout(onDataFull, 300);
                        }
                    }
                }, 50);
            }
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleDragEnd);
            window.addEventListener('touchmove', handleTouchMove, { passive: false });
            window.addEventListener('touchend', handleDragEnd);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleDragEnd);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleDragEnd);
        };
    }, [isDragging, dragPos, onDataFull, allowCustomUpload, onDataDropped]);

    return (
        <div
            className="w-full h-full relative select-none"
        >

             <svg ref={svgRef} viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMinYMid meet" style={{ overflow: 'visible' }}>
                <defs>
                    <filter id="cs-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <symbol id="icon-placeholder" viewBox="0 0 12 12">
                        <rect width="12" height="12" rx="1.5" fill="currentColor" fillOpacity="0.15" />
                        <rect x="0.5" y="0.5" width="11" height="11" rx="1.5" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
                        <path d="M2 9 L5 5 L8 9" fill="currentColor" fillOpacity="0.6" />
                        <path d="M6 9 L9 4 L12 9" fill="currentColor" fillOpacity="0.4" />
                        <circle cx="9" cy="3" r="1.2" fill="currentColor" fillOpacity="0.8" />
                    </symbol>
                </defs>

                {shouldRender && (
                <g style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'scale(1)' : 'scale(0.9)',
                    transformOrigin: 'center center',
                    transition: 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}>

                    <g style={{ opacity: isDropped ? 0 : 1, transition: 'opacity 0.3s' }}>
                        <path
                            d={`M${CAMERA_X},${CAMERA_Y - 50} Q${CAMERA_X},${dragPos.y + 40} ${dragPos.x - 10},${dragPos.y}`}
                            fill="none"
                            stroke="#444"
                            strokeWidth="3"
                            opacity="0.5"
                        />
                        <path
                            d={`M${CAMERA_X},${CAMERA_Y - 50} Q${CAMERA_X},${dragPos.y + 40} ${dragPos.x - 10},${dragPos.y}`}
                            fill="none"
                            stroke="var(--ifm-color-primary)"
                            strokeWidth="1.5"
                            strokeDasharray="5 10"
                            filter="url(#cs-glow)"
                            opacity="0.8"
                        >
                            <animate attributeName="stroke-dashoffset" from="15" to="0" dur="0.5s" repeatCount="indefinite" />
                        </path>
                    </g>


                    <g transform={`translate(${CAMERA_X}, ${CAMERA_Y}) scale(1.2)`}>
                        <rect x="-15" y="-60" width="30" height="20" fill="#222" />
                        <path d="M-5,-40 L-5,-20 L-20,10 L-10,15 L5,-15 L5,-40 Z" fill="#333" />
                        <g transform="rotate(25) translate(-10, 10)">
                            <rect x="-40" y="-15" width="80" height="30" rx="5" fill="#1a1a1a" stroke="#000" strokeWidth="1" />
                            <path d="M-42,-18 L45,-18 L40,-5 L-42,-5 Z" fill="#222" />
                            <g transform="translate(40, 0)">
                                <rect x="0" y="-12" width="5" height="24" fill="#111" />
                                <rect x="5" y="-10" width="2" height="20" fill="#444" />
                                <ellipse cx="8" cy="0" rx="3" ry="8" fill="#000" stroke="#222" />
                                <circle cx="8" cy="-2" r="2" fill="white" opacity="0.3" />
                            </g>
                            <circle cx="-30" cy="5" r="2" fill="#ef4444">
                                <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
                            </circle>
                        </g>
                    </g>

                    {!isDropped && (
                        <g
                            transform={`translate(${DATA_BOX_X}, ${DATA_BOX_Y})`}
                            opacity={isDragging ? 1 : 0.6}
                            style={{ transition: 'all 0.3s ease' }}
                        >
                            <rect
                                x="-60" y="-60" width="120" height="120" rx="14"
                                fill="rgba(0,0,0,0.2)"
                                stroke="var(--ifm-color-primary)"
                                strokeWidth={isDragging ? "2.5" : "1.5"}
                                strokeDasharray="6 6"
                                style={{ transition: 'all 0.3s' }}
                            />

                            <g stroke="var(--ifm-color-primary)" strokeWidth="2" fill="none">
                                <path d="M-60,-40 L-60,-46 A14,14 0 0,1 -46,-60 L-40,-60" />
                                <path d="M40,-60 L46,-60 A14,14 0 0,1 60,-46 L60,-40" />
                                <path d="M-60,40 L-60,46 A14,14 0 0,0 -46,60 L-40,60" />
                                <path d="M60,40 L60,46 A14,14 0 0,1 46,60 L40,60" />
                            </g>

                            <g stroke="var(--ifm-color-primary)" strokeWidth="1.5" strokeLinecap="round">
                                <line x1="0" y1="-15" x2="0" y2="15" />
                                <line x1="-15" y1="0" x2="15" y2="0" />
                            </g>
                        </g>
                    )}

                    {isDropped && (
                        <DataGrid filledCount={collectedCount} x={DATA_BOX_X} y={DATA_BOX_Y} showCelebration={false} />
                    )}

                    {collectedCount >= 16 && (
                        <circle cx={DATA_BOX_X} cy={DATA_BOX_Y} r="40" fill="none" stroke="var(--ifm-color-primary)" strokeWidth="2">
                            <animate attributeName="r" from="45" to="80" dur="0.6s" fill="freeze" />
                            <animate attributeName="opacity" from="0.8" to="0" dur="0.6s" fill="freeze" />
                            <animate attributeName="stroke-width" from="2" to="0" dur="0.6s" fill="freeze" />
                        </circle>
                    )}

                    <circle
                        cx={DATA_BOX_X} cy={DATA_BOX_Y} r="60"
                        fill="none" stroke="var(--ifm-color-primary)" strokeWidth="2" strokeDasharray="8 4"
                        opacity={isDragging ? 0.4 : 0}
                        style={{ transition: 'opacity 0.3s' }}
                    />

                    {showArrow && !isDropped && !isDragging && isActive && (() => {
                        const startX = dragPos.x;
                        const startY = dragPos.y;
                        const endX = DATA_BOX_X;
                        const endY = DATA_BOX_Y;
                        const controlX = (startX + endX) / 2;
                        const controlY = Math.min(startY, endY) - 60;

                        const t = arrowProgress;
                        const mt = 1 - t;
                        const x = mt * mt * startX + 2 * mt * t * controlX + t * t * endX;
                        const y = mt * mt * startY + 2 * mt * t * controlY + t * t * endY;

                        const tx = 2 * mt * (controlX - startX) + 2 * t * (endX - controlX);
                        const ty = 2 * mt * (controlY - startY) + 2 * t * (endY - controlY);
                        const angle = Math.atan2(ty, tx) * (180 / Math.PI);

                        const rawT = arrowProgress;
                        let opacity = 1;
                        if (rawT < 0.15) {
                            opacity = rawT / 0.15;
                        } else if (rawT > 0.85) {
                            opacity = (1 - rawT) / 0.15;
                        }

                        const dist1 = Math.sqrt(Math.pow(controlX - startX, 2) + Math.pow(controlY - startY, 2));
                        const dist2 = Math.sqrt(Math.pow(endX - controlX, 2) + Math.pow(endY - controlY, 2));
                        const directDist = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
                        const pathLen = (dist1 + dist2 + directDist) / 2;

                        const visibleLen = arrowProgress * pathLen;

                        return (
                            <g style={{ opacity }}>
                                <path
                                    d={`M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`}
                                    fill="none"
                                    stroke="rgba(0, 255, 209, 0.25)"
                                    strokeWidth="1.5"
                                    strokeDasharray={`${visibleLen} ${pathLen}`}
                                />
                                <g transform={`translate(${x}, ${y}) rotate(${angle + 90}) scale(0.7)`}>
                                    <path
                                        d="M 0 -35 L 6 -20 L 0 -24 L -6 -20 Z"
                                        fill="var(--ifm-color-primary)"
                                        filter="url(#cs-glow)"
                                    />
                                </g>
                            </g>
                        );
                    })()}

                    {!isDropped && (
                        <g
                            transform={`translate(${dragPos.x}, ${dragPos.y}) scale(1.4)`}
                            onMouseDown={handleMouseDown}
                            onTouchStart={handleTouchStart}
                            style={{ cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'none' }}
                        >
                            <g key={animationKey}>
                                <g>
                                    <animateTransform
                                        ref={pulseScaleRef}
                                        attributeName="transform"
                                        type="scale"
                                        values="1;1.08;1"
                                        dur="1.5s"
                                        begin="indefinite"
                                        repeatCount="indefinite"
                                    />

                                    <circle r="35" fill="none" stroke="var(--ifm-color-primary)" strokeWidth="2" opacity="0">
                                        <animate ref={rippleRadiusRef} attributeName="r" values="35; 65" dur="1.5s" begin="indefinite" repeatCount="indefinite" />
                                        <animate ref={rippleOpacityRef} attributeName="opacity" values="0.4; 0" dur="1.5s" begin="indefinite" repeatCount="indefinite" />
                                    </circle>

                                    <circle r="35" fill="var(--ifm-color-primary)" opacity={isDragging ? 0.2 : 0.05} filter="url(#cs-glow)" />

                                    <g className="icon-stack">
                                        <g transform="translate(0, 0) rotate(0)" opacity={visibleIconCount >= 1 ? 1 : 0} className="icon-fade">
                                            <use href="#icon-placeholder" x="-6" y="-6" width="12" height="12" style={{ color: 'var(--ifm-color-primary)' }} />
                                        </g>
                                        <g transform="translate(-10, -8) rotate(-12)" opacity={visibleIconCount >= 2 ? 0.9 : 0} className="icon-fade">
                                            <use href="#icon-placeholder" x="-5" y="-5" width="10" height="10" style={{ color: 'var(--ifm-color-primary)' }} />
                                        </g>
                                        <g transform="translate(8, -10) rotate(8)" opacity={visibleIconCount >= 3 ? 0.9 : 0} className="icon-fade">
                                            <use href="#icon-placeholder" x="-5" y="-5" width="10" height="10" style={{ color: 'var(--ifm-color-primary)' }} />
                                        </g>
                                        <g transform="translate(-12, 6) rotate(15)" opacity={visibleIconCount >= 4 ? 0.85 : 0} className="icon-fade">
                                            <use href="#icon-placeholder" x="-5" y="-5" width="10" height="10" style={{ color: 'var(--ifm-color-primary)' }} />
                                        </g>
                                        <g transform="translate(10, 8) rotate(-8)" opacity={visibleIconCount >= 5 ? 0.85 : 0} className="icon-fade">
                                            <use href="#icon-placeholder" x="-5" y="-5" width="10" height="10" style={{ color: 'var(--ifm-color-primary)' }} />
                                        </g>
                                        <g transform="translate(-2, -16) rotate(20)" opacity={visibleIconCount >= 6 ? 0.75 : 0} className="icon-fade">
                                            <use href="#icon-placeholder" x="-4" y="-4" width="8" height="8" style={{ color: 'var(--ifm-color-primary)' }} />
                                        </g>
                                        <g transform="translate(-16, -4) rotate(-15)" opacity={visibleIconCount >= 7 ? 0.75 : 0} className="icon-fade">
                                            <use href="#icon-placeholder" x="-4" y="-4" width="8" height="8" style={{ color: 'var(--ifm-color-primary)' }} />
                                        </g>
                                        <g transform="translate(16, -4) rotate(12)" opacity={visibleIconCount >= 8 ? 0.7 : 0} className="icon-fade">
                                            <use href="#icon-placeholder" x="-4" y="-4" width="8" height="8" style={{ color: 'var(--ifm-color-primary)' }} />
                                        </g>
                                        <g transform="translate(-6, 14) rotate(-18)" opacity={visibleIconCount >= 9 ? 0.7 : 0} className="icon-fade">
                                            <use href="#icon-placeholder" x="-4" y="-4" width="8" height="8" style={{ color: 'var(--ifm-color-primary)' }} />
                                        </g>
                                        <g transform="translate(6, 14) rotate(5)" opacity={visibleIconCount >= 10 ? 0.65 : 0} className="icon-fade">
                                            <use href="#icon-placeholder" x="-4" y="-4" width="8" height="8" style={{ color: 'var(--ifm-color-primary)' }} />
                                        </g>
                                        <g transform="translate(14, 10) rotate(-10)" opacity={visibleIconCount >= 11 ? 0.65 : 0} className="icon-fade">
                                            <use href="#icon-placeholder" x="-4" y="-4" width="8" height="8" style={{ color: 'var(--ifm-color-primary)' }} />
                                        </g>
                                        <g transform="translate(-18, -12) rotate(25)" opacity={visibleIconCount >= 12 ? 0.55 : 0} className="icon-fade">
                                            <use href="#icon-placeholder" x="-3" y="-3" width="6" height="6" style={{ color: 'var(--ifm-color-primary)' }} />
                                        </g>
                                        <g transform="translate(18, -12) rotate(-22)" opacity={visibleIconCount >= 13 ? 0.55 : 0} className="icon-fade">
                                            <use href="#icon-placeholder" x="-3" y="-3" width="6" height="6" style={{ color: 'var(--ifm-color-primary)' }} />
                                        </g>
                                        <g transform="translate(-20, 4) rotate(8)" opacity={visibleIconCount >= 14 ? 0.5 : 0} className="icon-fade">
                                            <use href="#icon-placeholder" x="-3" y="-3" width="6" height="6" style={{ color: 'var(--ifm-color-primary)' }} />
                                        </g>
                                        <g transform="translate(20, 4) rotate(-5)" opacity={visibleIconCount >= 15 ? 0.5 : 0} className="icon-fade">
                                            <use href="#icon-placeholder" x="-3" y="-3" width="6" height="6" style={{ color: 'var(--ifm-color-primary)' }} />
                                        </g>
                                        <g transform="translate(-14, 18) rotate(-12)" opacity={visibleIconCount >= 16 ? 0.45 : 0} className="icon-fade">
                                            <use href="#icon-placeholder" x="-3" y="-3" width="6" height="6" style={{ color: 'var(--ifm-color-primary)' }} />
                                        </g>
                                        <g transform="translate(14, 18) rotate(15)" opacity={visibleIconCount >= 17 ? 0.45 : 0} className="icon-fade">
                                            <use href="#icon-placeholder" x="-3" y="-3" width="6" height="6" style={{ color: 'var(--ifm-color-primary)' }} />
                                        </g>
                                        <g transform="translate(0, -20) rotate(0)" opacity={visibleIconCount >= 18 ? 0.4 : 0} className="icon-fade">
                                            <use href="#icon-placeholder" x="-3" y="-3" width="6" height="6" style={{ color: 'var(--ifm-color-primary)' }} />
                                        </g>
                                        <g transform="translate(0, 20) rotate(0)" opacity={visibleIconCount >= 19 ? 0.4 : 0} className="icon-fade">
                                            <use href="#icon-placeholder" x="-3" y="-3" width="6" height="6" style={{ color: 'var(--ifm-color-primary)' }} />
                                        </g>
                                    </g>

                                    <circle r="30" fill="none" stroke="var(--ifm-color-primary)" strokeWidth="1" strokeDasharray="4 4" opacity={isDragging ? 0.8 : 0.3}>
                                        <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="10s" repeatCount="indefinite" />
                                    </circle>
                                </g>
                            </g>
                        </g>
                    )}

                </g>
                )}
            </svg>
            <style>{`
                .icon-fade {
                    transition: opacity 0.4s ease-out;
                }
            `}</style>
        </div>
    )
});