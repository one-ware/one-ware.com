import React, { useState, useEffect, useRef, useCallback, memo, useMemo } from "react";
import { usePerformance } from "../index";

const APPLE_SPEED_PX_PER_SEC = 250;
const SPAWN_RATE_SEC = 0.45;
const SPAWN_RATE_BY_TIER = {
  high: 0.45,
  low: 1.2,
};
const APPLE_SPEED_BY_TIER = {
  high: 250,
  low: 350,
};
const SCANNER_X = 90;
const END_X = 800;
const APPLE_RADIUS = 18;
const BELT_Y = 320;
const PUSHER_X = 400;

interface Apple {
  id: string;
  x: number;
  y: number;
  isRotten: boolean;
  scanStatus: "unknown" | "scanned_good" | "scanned_bad";
  rejected: boolean;
  rotation: number;
  rejectTime: number;
  rejectVelocityX: number;
  rejectVelocityY: number;
  rejectOpacity: number;
}

interface ConveyorBeltProps {
  isActive: boolean;
  showStation?: boolean;
  onScan?: () => void;
  speedMultiplier?: number;
  performanceTier?: 'high' | 'low';
}

export default memo(function ConveyorBelt({ isActive, showStation = true, onScan, speedMultiplier = 1.0, performanceTier = 'high' }: ConveyorBeltProps) {
  const [apples, setApples] = useState<Apple[]>([]);
  const [animStage, setAnimStage] = useState(0);
  const [pusherExtended, setPusherExtended] = useState(false);

  const applesRef = useRef<Apple[]>([]);
  const lastFrameTime = useRef(0);
  const spawnTimer = useRef(0);
  const reqRef = useRef<number | null>(null);
  const applesSinceBadRef = useRef(2);
  const pusherTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const speedMultiplierRef = useRef(speedMultiplier);
  const onScanRef = useRef(onScan);
  const performanceTierRef = useRef(performanceTier);

  useEffect(() => {
    speedMultiplierRef.current = speedMultiplier;
  }, [speedMultiplier]);

  useEffect(() => {
    onScanRef.current = onScan;
  }, [onScan]);

  useEffect(() => {
    performanceTierRef.current = performanceTier;
  }, [performanceTier]);

  const triggerPusher = useCallback(() => {
    setPusherExtended(true);
    if (pusherTimeoutRef.current) clearTimeout(pusherTimeoutRef.current);
    pusherTimeoutRef.current = setTimeout(() => setPusherExtended(false), 150);
  }, []);

  useEffect(() => {
    if (isActive) {
      setAnimStage(0);
      setApples([]);
      applesRef.current = [];
      setPusherExtended(false);
      lastFrameTime.current = 0;
      spawnTimer.current = 0;

      const startDelay = 600;
      const timers = [
        setTimeout(() => setAnimStage(1), startDelay + 350),
        setTimeout(() => setAnimStage(2), startDelay + 400),
        setTimeout(() => setAnimStage(3), startDelay + 450),
        setTimeout(() => setAnimStage(4), startDelay + 500),
        setTimeout(() => setAnimStage(5), startDelay + 550),
        setTimeout(() => { setAnimStage(6); lastFrameTime.current = 0; }, startDelay + 600)
      ];
      return () => timers.forEach(clearTimeout);
    } else {
      setAnimStage(0);
      setApples([]);
      applesRef.current = [];
    }
  }, [isActive]);

  useEffect(() => {
    if (animStage < 6) return;

    const createApple = (): Apple => {
      let isRotten = false;
      if (applesSinceBadRef.current < 2) {
        isRotten = false;
        applesSinceBadRef.current += 1;
      } else {
        isRotten = Math.random() < 0.25;
        if (isRotten) applesSinceBadRef.current = 0;
        else applesSinceBadRef.current += 1;
      }

      return {
        id: Math.random().toString(36).substr(2, 9),
        x: -50,
        y: BELT_Y - APPLE_RADIUS - 8,
        isRotten,
        scanStatus: "unknown",
        rejected: false,
        rotation: Math.random() * 360,
        rejectTime: 0,
        rejectVelocityX: 0,
        rejectVelocityY: 0,
        rejectOpacity: 1,
      };
    };

    let frameCount = 0;
    const UPDATE_INTERVAL = 1;

    const animate = (time: number) => {
      if (!lastFrameTime.current) lastFrameTime.current = time;
      const deltaMs = time - lastFrameTime.current;
      const safeDelta = Math.min(deltaMs / 1000, 0.1);
      lastFrameTime.current = time;

      const currentSpeed = speedMultiplierRef.current;
      let needsPusher = false;
      let hadScan = false;

      spawnTimer.current += safeDelta;
      const baseSpawnRate = SPAWN_RATE_BY_TIER[performanceTierRef.current];
      const effectiveSpawnRate = baseSpawnRate / currentSpeed;
      while (spawnTimer.current >= effectiveSpawnRate) {
        applesRef.current.push(createApple());
        spawnTimer.current -= effectiveSpawnRate;
      }

      const baseSpeed = APPLE_SPEED_BY_TIER[performanceTierRef.current];
      const effectiveSpeed = baseSpeed * currentSpeed;
      const moveDist = effectiveSpeed * safeDelta;

      for (let i = applesRef.current.length - 1; i >= 0; i--) {
        const apple = applesRef.current[i];

        if (apple.x > SCANNER_X - 20 && apple.x < SCANNER_X + 20) {
          if (apple.scanStatus === "unknown") {
            apple.scanStatus = apple.isRotten ? "scanned_bad" : "scanned_good";
            hadScan = true;
          }
        }

        if (!apple.rejected && apple.scanStatus === "scanned_bad" && apple.x > PUSHER_X) {
          apple.rejected = true;
          needsPusher = true;
          apple.rejectVelocityY = 500;
          apple.rejectTime = 0;
        }

        if (apple.rejected) {
          apple.rejectTime += safeDelta;
          apple.rejectVelocityY += 400 * safeDelta;
          apple.y += apple.rejectVelocityY * safeDelta;
          apple.rotation += 180 * safeDelta;
          apple.rejectOpacity = Math.max(0, apple.rejectOpacity - safeDelta * 4);
        } else {
          apple.x += moveDist;
        }

        if (apple.x >= END_X + 100 || apple.y >= 600 || apple.rejectOpacity <= 0) {
          applesRef.current.splice(i, 1);
        }
      }

      if (needsPusher) triggerPusher();
      if (hadScan && onScanRef.current) onScanRef.current();

      frameCount++;
      if (frameCount >= UPDATE_INTERVAL) {
        frameCount = 0;
        setApples([...applesRef.current]);
      }

      reqRef.current = requestAnimationFrame(animate);
    };

    reqRef.current = requestAnimationFrame(animate);
    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [animStage, triggerPusher]);

  const isRunning = animStage >= 6;
  const viewBox = showStation ? "0 0 800 430" : "0 205 800 225";

  return (
    <div className="w-full h-full relative overflow-hidden select-none">
      <svg
        viewBox={viewBox}
        className="w-full h-full absolute top-0 left-0 transition-all duration-700"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
           <linearGradient id="metal-gradient-vertical" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2a2a2a" />
            <stop offset="50%" stopColor="#555" />
            <stop offset="100%" stopColor="#2a2a2a" />
          </linearGradient>
           <linearGradient id="belt-surface" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#111" />
            <stop offset="50%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#111" />
          </linearGradient>
           <linearGradient id="pusher-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
             <stop offset="0%" stopColor="#333" />
             <stop offset="50%" stopColor="#666" />
             <stop offset="100%" stopColor="#333" />
           </linearGradient>
          <clipPath id="belt-clip"><rect x="0" y={BELT_Y} width="800" height="12" /></clipPath>
        </defs>

        <g
          transform={`translate(${PUSHER_X}, 215)`}
          style={{
             opacity: animStage >= 2 ? 1 : 0,
             transform: animStage >= 2 ? `translate(${PUSHER_X}px, 215px) translateY(0)` : `translate(${PUSHER_X}px, 215px) translateY(-30px)`,
             transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
          }}
        >
           <rect x="-22" y="0" width="44" height="8" rx="2" fill="#2a2a2a" stroke="#444" strokeWidth="1" />

           <rect x="-9" y="8" width="18" height="22" rx="2" fill="#444" stroke="#333" strokeWidth="1" />
           <ellipse cx="0" cy="11" rx="7" ry="2" fill="#555" />
           <ellipse cx="0" cy="27" rx="7" ry="2" fill="#333" />

           <circle cx="0" cy="18" r="2" fill={pusherExtended ? "#ef4444" : "#22c55e"}>
             {isRunning && <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" />}
           </circle>

           <rect
             x="-3"
             y="30"
             width="6"
             height={pusherExtended ? 65 : 18}
             fill="url(#pusher-gradient)"
             stroke="#222"
             strokeWidth="0.5"
             style={{ transition: 'height 0.18s cubic-bezier(0.4, 0, 0.2, 1)' }}
           />

           <g style={{
             transform: pusherExtended ? 'translateY(47px)' : 'translateY(0px)',
             transition: 'transform 0.18s cubic-bezier(0.4, 0, 0.2, 1)'
           }}>
             <rect x="-14" y="48" width="28" height="6" rx="1" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" />
             <rect x="-12" y="49" width="24" height="2" fill="#f87171" opacity="0.6" />
           </g>
        </g>

        <g style={{ opacity: animStage >= 1 ? 1 : 0, transform: animStage >= 1 ? "scaleX(1)" : "scaleX(0)", transformOrigin: "center bottom", transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
          <g fill="url(#metal-gradient-vertical)">
            <path d="M50,320 L70,320 L65,420 L55,420 Z" />
            <path d="M283,320 L303,320 L298,420 L288,420 Z" />
            <path d="M517,320 L537,320 L532,420 L522,420 Z" />
            <path d="M750,320 L770,320 L765,420 L755,420 Z" />
          </g>
          <rect x="-10" y={BELT_Y - 5} width="820" height="25" fill="#222" rx="2" stroke="#333" />
          <g clipPath="url(#belt-clip)">
            <rect x="0" y={BELT_Y} width="800" height="12" fill="url(#belt-surface)" />
            <g opacity="0.3">
              {Array.from({ length: 21 }).map((_, i) => (
                <rect key={i} x={i * 40} y={BELT_Y} width="2" height="12" fill="#444" />
              ))}
            </g>
          </g>
        </g>

        {apples.map((apple) => (
          performanceTier === 'low' ? (
            <g key={apple.id} transform={`translate(${apple.x}, ${apple.y})`} opacity={apple.rejectOpacity}>
              <circle r={APPLE_RADIUS * 0.9} fill={apple.isRotten ? "#4a442a" : "#dc2626"} />
              <path d="M0,-15 Q2,-20 5,-22" stroke="#3f2c08" strokeWidth="2" fill="none" />
              {apple.scanStatus !== "unknown" && (
                <circle r={APPLE_RADIUS + 4} stroke={apple.scanStatus === "scanned_bad" ? "#ef4444" : "var(--ifm-color-primary)"} strokeWidth="1.5" fill="none" />
              )}
            </g>
          ) : (
            <g key={apple.id} transform={`translate(${apple.x}, ${apple.y})`} opacity={apple.rejectOpacity}>
              <g transform={`rotate(${apple.rejected ? apple.rotation : 0})`}>
                {!apple.rejected && <ellipse cx="0" cy={APPLE_RADIUS} rx={APPLE_RADIUS - 2} ry="4" fill="black" opacity="0.4" />}
                <g transform="scale(0.9)">
                  <circle cx="0" cy="0" r={APPLE_RADIUS} fill={apple.isRotten ? "#4a442a" : "#dc2626"} stroke={apple.isRotten ? "#2c281a" : "#7f1d1d"} strokeWidth="1" />
                  <circle cx="-5" cy="-5" r={APPLE_RADIUS - 5} fill="white" opacity="0.1" />
                  {apple.isRotten ? (
                    <path d="M-10,-5 Q0,5 10,-2 Q5,10 -5,8 Z" fill="#2c281a" opacity="0.8" />
                  ) : (
                    <ellipse cx="-6" cy="-8" rx="5" ry="3" fill="white" opacity="0.4" transform="rotate(-45)" />
                  )}
                  <path d="M0,-15 Q2,-25 8,-28" stroke="#3f2c08" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M0,-16 Q-12,-22 0,-28 Q12,-22 0,-16" fill={apple.isRotten ? "#3f6212" : "#22c55e"} />
                </g>
              </g>

              {apple.scanStatus === "scanned_bad" && !apple.rejected && (
                <circle cx="0" cy="0" r={APPLE_RADIUS + 5} stroke="#ef4444" strokeWidth="2" fill="none" strokeDasharray="2 2" opacity="0.9" />
              )}
              {apple.scanStatus === "scanned_good" && <circle cx="0" cy="0" r={APPLE_RADIUS + 5} stroke="var(--ifm-color-primary)" strokeWidth="1.5" fill="none" opacity="0.6" />}

              {apple.rejected && apple.rejectTime < 0.15 && (
                <circle cx="0" cy="0" r={APPLE_RADIUS + 10 + apple.rejectTime * 100} stroke="#ef4444" strokeWidth="2" fill="none" opacity={1 - apple.rejectTime / 0.15} />
              )}
            </g>
          )
        ))}
      </svg>
    </div>
  );
});
