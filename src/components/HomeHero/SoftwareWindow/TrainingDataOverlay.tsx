import React, { useState, useEffect, useRef, memo } from "react";

interface TrainingDataOverlayProps {
  isDragging: boolean;
  onDrop: () => void;
  hasData: boolean;
  isActive: boolean;
  showExtraDb?: boolean;
  isGhostHovering?: boolean;
  isGlobalDragHover?: boolean;
  onComplete?: () => void;
  onScanComplete?: () => void;
  startCables?: boolean;
  isTrainingActive?: boolean;
  showDeployButton?: boolean;
  isFinalLayout?: boolean;
  isRetrainingPhase?: boolean;
  startAnalysis?: boolean;
}

export default memo(function TrainingDataOverlay({
  isDragging,
  onDrop,
  hasData,
  isActive,
  showExtraDb,
  isGhostHovering,
  isGlobalDragHover = false,
  onComplete,
  onScanComplete,
  startCables = false,
  isTrainingActive = false,
  showDeployButton = false,
  isFinalLayout = false,
  isRetrainingPhase = false,
  startAnalysis = false,
}: TrainingDataOverlayProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importState, setImportState] = useState<
    "idle" | "importing" | "success" | "content"
  >("idle");
  const [cablesConnected, setCablesConnected] = useState(false);
  const [completedCables, setCompletedCables] = useState<number[]>([]);
  const [scansCompleted, setScansCompleted] = useState(false);
  const [showCables, setShowCables] = useState(false);
  const [hasTriggeredTraining, setHasTriggeredTraining] = useState(false);
  const [hasStartedRetrainingScan, setHasStartedRetrainingScan] =
    useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [skipEntryAnimation, setSkipEntryAnimation] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const cableCompleteCountRef = useRef(0);
  const scanTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseUp = () => {
    if (isDragging && (isHovered || isGlobalDragHover)) {
      onDrop();
    }
  };

  useEffect(() => {
    if (startCables && (scansCompleted || isRetrainingPhase)) {
      if (!showCables) {
        setShowCables(true);
        setCompletedCables([]);
        setCablesConnected(false);
        setHasTriggeredTraining(false);
      }
    } else if (!startCables) {
      if (showCables) setShowCables(false);
    }
  }, [startCables, scansCompleted, showCables, isRetrainingPhase]);

  useEffect(() => {
    if (hasData && importState === "idle") {
      setImportState("importing");
      setImportProgress(0);
      setCablesConnected(false);
      setCompletedCables([]);
      setScansCompleted(false);
      setShowCables(false);
      setHasTriggeredTraining(false);
      setIsScanning(false);
      setSkipEntryAnimation(false);
    } else if (!hasData) {
      setImportState("idle");
      setImportProgress(0);
      setCablesConnected(false);
      setCompletedCables([]);
      setScansCompleted(false);
      setShowCables(false);
      setHasTriggeredTraining(false);
      setIsScanning(false);
      cableCompleteCountRef.current = 0;
      if (scanTimerRef.current) {
        clearTimeout(scanTimerRef.current);
        scanTimerRef.current = null;
      }
    }
  }, [hasData]);

  useEffect(() => {
    if (startAnalysis && hasData && !scansCompleted && !isScanning) {
      setIsScanning(true);
    }
  }, [startAnalysis, hasData, scansCompleted, isScanning]);

  useEffect(() => {
    if (isScanning && !scansCompleted) {
      scanTimerRef.current = setTimeout(() => {
        setScansCompleted(true);
        if (onScanComplete) onScanComplete();
      }, 1600);
    }
    return () => {
      if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
    };
  }, [isScanning, scansCompleted, onScanComplete]);

  useEffect(() => {
    if (
      isRetrainingPhase &&
      hasData &&
      !isFinalLayout &&
      !hasStartedRetrainingScan
    ) {
      setHasStartedRetrainingScan(true);
      setScansCompleted(false);
      setShowCables(false);
      setCablesConnected(false);
      setCompletedCables([]);
      setIsScanning(false);
      setHasTriggeredTraining(false);
      setSkipEntryAnimation(true);

      setImportState("importing");
    }
    if (!isRetrainingPhase && hasStartedRetrainingScan) {
      setHasStartedRetrainingScan(false);
    }
  }, [isRetrainingPhase, hasData, isFinalLayout, hasStartedRetrainingScan]);

  const handleCableComplete = (cableIndex: number) => {
    setCompletedCables((prev) => {
      if (prev.includes(cableIndex)) return prev;

      const newCompleted = [...prev, cableIndex];
      if (newCompleted.length === 4) {
        setCablesConnected(true);
      }
      return newCompleted;
    });
  };

  useEffect(() => {
    if (showCables && cablesConnected && onComplete && !hasTriggeredTraining) {
      setHasTriggeredTraining(true);
      onComplete();
    }
  }, [
    showCables,
    cablesConnected,
    onComplete,
    hasTriggeredTraining,
    isRetrainingPhase,
  ]);

  return (
    <div
      ref={panelRef}
      className="absolute inset-0 z-20 flex flex-col items-center justify-center transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseUp={handleMouseUp}
    >
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: "visible" }}
      >
        <defs>
          <filter id="flat-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="strong-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="lens-shine" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
            <stop offset="60%" stopColor="rgba(200, 255, 255, 0.1)" />
            <stop offset="100%" stopColor="rgba(0, 255, 209, 0.2)" />
          </radialGradient>
          <clipPath id="square-clip">
            <rect x="-60" y="-60" width="120" height="120" rx="14" />
          </clipPath>
          <symbol id="icon-placeholder" viewBox="0 0 26 26">
            <rect
              width="26"
              height="26"
              rx="3"
              fill="currentColor"
              fillOpacity="0.15"
            />
            <rect
              x="1"
              y="1"
              width="24"
              height="24"
              rx="3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeOpacity="0.3"
            />
            <path
              d="M4 20 L11 11 L17 20"
              fill="currentColor"
              fillOpacity="0.6"
            />
            <path
              d="M13 20 L19 9 L26 20"
              fill="currentColor"
              fillOpacity="0.4"
            />
            <circle
              cx="19"
              cy="7"
              r="2.5"
              fill="currentColor"
              fillOpacity="0.8"
            />
          </symbol>

          <path id="neural-cable-0" d="M 400 0 C 250 0, 150 -36, 56 -36" />
          <path id="neural-cable-1" d="M 400 0 C 250 0, 150 -12, 56 -12" />
          <path id="neural-cable-2" d="M 400 0 C 250 0, 150 12, 56 12" />
          <path id="neural-cable-3" d="M 400 0 C 250 0, 150 36, 56 36" />
        </defs>

        <g transform="translate(200, 150)">
          {importState === "idle" && (
            <g
              style={{
                animation:
                  "input-entry 0.8s 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both",
              }}
            >
              <g
                opacity={
                  (isDragging && (isHovered || isGlobalDragHover)) ||
                  isGhostHovering
                    ? 1
                    : 0.5
                }
                style={{
                  transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
                transform={`scale(${
                  (isDragging && (isHovered || isGlobalDragHover)) ||
                  isGhostHovering
                    ? 1.1
                    : 1
                })`}
              >
                <rect
                  x="-60"
                  y="-60"
                  width="120"
                  height="120"
                  rx="14"
                  fill="rgba(0,0,0,0.2)"
                  stroke="var(--ifm-color-primary)"
                  strokeWidth={
                    (isDragging && (isHovered || isGlobalDragHover)) ||
                    isGhostHovering
                      ? "2"
                      : "1.5"
                  }
                  strokeDasharray="6 6"
                  style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                />

                <g
                  stroke="var(--ifm-color-primary)"
                  strokeWidth="2"
                  fill="none"
                >
                  <path d="M-60,-40 L-60,-46 A14,14 0 0,1 -46,-60 L-40,-60" />
                  <path d="M40,-60 L46,-60 A14,14 0 0,1 60,-46 L60,-40" />
                  <path d="M-60,40 L-60,46 A14,14 0 0,0 -46,60 L-40,60" />
                  <path d="M60,40 L60,46 A14,14 0 0,1 46,60 L40,60" />
                </g>

                <g
                  stroke="var(--ifm-color-primary)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <line x1="0" y1="-15" x2="0" y2="15" />
                  <line x1="-15" y1="0" x2="15" y2="0" />
                </g>
              </g>
            </g>
          )}

          {(importState === "importing" || importState === "success") && (
            <g>
              <rect
                x="-60"
                y="-60"
                width="120"
                height="120"
                rx="14"
                fill="rgba(0, 255, 209, 0.02)"
                stroke="var(--ifm-color-primary)"
                strokeWidth="0.5"
                style={{
                  transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
                  opacity: showDeployButton || isFinalLayout ? 0 : 0.3,
                  transform:
                    showDeployButton || isFinalLayout
                      ? "translateX(-30px)"
                      : "translateX(0)",
                }}
              />

              {showCables && (
                <g>
                  {[-36, -12, 12, 36].map((y, i) => {
                    const pathId = `neural-cable-${i}`;
                    const pathD = `M 400 0 C 250 0, 150 ${y}, 56 ${y}`;
                    const delay = i * 0.1;
                    const isRetracting = showDeployButton || isFinalLayout;
                    const animName = isRetracting
                      ? "cable-retract"
                      : "cable-grow";
                    const animDur = isRetracting ? 0.8 : 1;
                    const animDelay = isRetracting ? i * 0.05 : delay;

                    return (
                      <g key={i}>
                        <path
                          d={pathD}
                          fill="none"
                          stroke="#222"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeDasharray="500"
                          strokeDashoffset={isRetracting ? 0 : 500}
                          style={{
                            animation: `${animName} ${animDur}s ${animDelay}s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
                          }}
                          opacity="0.6"
                          onAnimationEnd={() => {
                            if (!isRetracting) handleCableComplete(i);
                          }}
                        />

                        {cablesConnected && isTrainingActive && (
                          <path
                            key={`data-flow-${i}`}
                            d={pathD}
                            fill="none"
                            stroke="var(--ifm-color-primary)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray="10 40"
                            filter="url(#flat-glow)"
                            opacity="0.9"
                            style={{
                              animation: "data-transfer 1s linear infinite",
                            }}
                          />
                        )}

                        {!isRetracting && (
                          <>
                            <circle
                              r="3"
                              fill="var(--ifm-color-primary)"
                              filter="url(#flat-glow)"
                              opacity="0"
                            >
                              <animate
                                attributeName="opacity"
                                values="0;1;1;0"
                                keyTimes="0;0.05;0.9;1"
                                dur="1s"
                                fill="freeze"
                                begin={`${delay}s`}
                              />
                              <animateMotion
                                dur="1s"
                                fill="freeze"
                                calcMode="spline"
                                keySplines="0.4 0 0.2 1"
                                begin={`${delay}s`}
                              >
                                <mpath href={`#${pathId}`} />
                              </animateMotion>
                            </circle>
                            <circle
                              cx="56"
                              cy={y}
                              r="4"
                              stroke="var(--ifm-color-primary)"
                              strokeWidth="1.5"
                              fill="none"
                              opacity="0"
                              style={{
                                animation: `terminal-appear 0.5s ${delay}s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
                              }}
                            />
                          </>
                        )}
                      </g>
                    );
                  })}
                </g>
              )}

              {importState === "importing" || importState === "success" ? (
                <g
                  clipPath="url(#square-clip)"
                  style={{
                    transition:
                      "opacity 0.4s ease-out, transform 0.4s ease-out",
                    opacity: showDeployButton || isFinalLayout ? 0 : 1,
                    transform:
                      showDeployButton || isFinalLayout
                        ? "translateX(-30px)"
                        : "translateX(0)",
                  }}
                >
                  <g transform="translate(-56, -56)">
                    {Array.from({ length: 4 }).map((_, row) => (
                      <g
                        key={`row-${row}`}
                        transform={`translate(0, ${row * 28})`}
                      >
                        {Array.from({ length: 4 }).map((_, col) => {
                          const baseDelay = row * 0.05 + col * 0.05;
                          const isEvenRow = row % 2 === 0;
                          const snakeIndex = isEvenRow
                            ? row * 4 + col
                            : row * 4 + (3 - col);

                          const scanDelay = snakeIndex * 0.1;
                          return (
                            <g
                              key={col}
                              transform={`translate(${col * 28}, 0)`}
                            >
                              <use
                                href="#icon-placeholder"
                                x="0"
                                y="0"
                                width="26"
                                height="26"
                                style={{
                                  color: "#4A5A6A",
                                  animation: skipEntryAnimation
                                    ? "none"
                                    : `grid-cell-enter 0.6s ${baseDelay}s ease-out forwards`,
                                  opacity: skipEntryAnimation ? 1 : 0,
                                }}
                              />
                              {isScanning && (
                                <use
                                  href="#icon-placeholder"
                                  x="0"
                                  y="0"
                                  width="26"
                                  height="26"
                                  style={{
                                    animation: `cell-magnify-vector 0.6s ${scanDelay}s ease-out forwards`,
                                    opacity: 0,
                                  }}
                                />
                              )}
                            </g>
                          );
                        })}
                      </g>
                    ))}
                  </g>
                </g>
              ) : null}

              {importState === "importing" && isScanning && !scansCompleted && (
                <g
                  transform="translate(-56, -56)"
                  style={{
                    transition: "opacity 1s ease-in-out",
                    opacity: scansCompleted ? 0 : 1,
                  }}
                >
                  <g
                    style={{
                      animation: "lupe-snake-move 1.6s linear forwards",
                    }}
                  >
                    <g filter="url(#strong-glow)">
                      <line
                        x1="14"
                        y1="14"
                        x2="26"
                        y2="26"
                        stroke="var(--ifm-color-primary)"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <circle
                        r="16"
                        fill="none"
                        stroke="var(--ifm-color-primary)"
                        strokeWidth="2"
                      />
                      <circle r="16" fill="url(#lens-shine)" opacity="0.9" />
                      <path
                        d="M -10 -10 A 12 12 0 0 1 6 -12"
                        fill="none"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        opacity="0.8"
                      />
                    </g>
                  </g>
                </g>
              )}
            </g>
          )}
        </g>

        <style>{`
                @keyframes cable-grow {
                    from { opacity: 0; }
                    to { stroke-dashoffset: 0; opacity: 1; }
                }
                @keyframes cable-retract {
                    from { stroke-dashoffset: 0; opacity: 1; }
                    to { stroke-dashoffset: 500; opacity: 0; }
                }

                @keyframes terminal-appear {
                    0% { opacity: 0; r: 0px; stroke-width: 4; }
                    50% { opacity: 0.6; r: 6px; stroke-width: 1; }
                    100% { opacity: 0.8; r: 4px; stroke-width: 1.5; }
                }

                @keyframes input-entry {
                    from { opacity: 0; transform: scale(0.8); }
                    to { opacity: 1; transform: scale(1); }
                }

                @keyframes grid-cell-enter {
                    from { opacity: 0; transform: scale(0.5); }
                    to { opacity: 1; transform: scale(1); }
                }

                @keyframes cell-magnify-vector {
                    0% { opacity: 0; transform: scale(1); color: var(--ifm-color-primary); }
                    10% { opacity: 1; transform: scale(1.8); color: #FFFFFF; z-index: 10; filter: drop-shadow(0 0 4px rgba(0,255,209,0.8)); }
                    40% { opacity: 1; transform: scale(1.2); color: var(--ifm-color-primary); filter: none; }
                    100% { opacity: 0.5; transform: scale(1); color: var(--ifm-color-primary); } 
                }

                @keyframes data-transfer {
                    from { stroke-dashoffset: 0; }
                    to { stroke-dashoffset: 50; }
                }

                @keyframes lupe-snake-move {
                    0% { transform: translate(13px, 13px); }
                    23% { transform: translate(97px, 13px); }
                    25% { transform: translate(97px, 41px); }
                    48% { transform: translate(13px, 41px); }
                    50% { transform: translate(13px, 69px); }
                    73% { transform: translate(97px, 69px); }
                    75% { transform: translate(97px, 97px); }
                    100% { transform: translate(13px, 97px); }
                }
            `}</style>
      </svg>
    </div>
  );
});
