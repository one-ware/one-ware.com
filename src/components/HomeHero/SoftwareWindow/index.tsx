import React, { useState, useRef, useEffect, useCallback, memo, lazy, Suspense } from "react";
import "../glass-design.css";
import TrainingDataOverlay from "./TrainingDataOverlay";
import ConveyorBelt from "./ConveyorBelt";
import CameraStation from "./CameraStation";
import TopMetrics from "./TopMetrics";
import TrainingProgressOverlay from "./TrainingProgressOverlay";
import DeployView from "./DeployView";
import ChatInterface from "./ChatInterface";
import { usePerformance } from "../index";
import { useDelayedUnmount } from '../hooks/useDelayedUnmount';

const Neural3DCanvas = lazy(() => import('./Neural3DCanvas'));

const TitleAnimation = memo(function TitleAnimation({
  isActive,
  isSmallScreen
}: {
  isActive: boolean;
  isSmallScreen: boolean;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<{ timeout?: NodeJS.Timeout; frame?: number }>({});

  useEffect(() => {
    if (!isActive) {
      if (spanRef.current) spanRef.current.textContent = "";
      return;
    }

    const targetText = isSmallScreen ? " - CONVEYOR BELT" : " - CONVEYOR BELT DETECTION";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-=+<>/";
    let cycles = 0;
    let lastTime = 0;
    const interval = 20;

    const animate = (time: number) => {
      if (time - lastTime < interval) {
        animationRef.current.frame = requestAnimationFrame(animate);
        return;
      }
      lastTime = time;

      const fixedCount = Math.floor(cycles / 2);
      const visibleCount = Math.min(targetText.length, fixedCount + 3);
      let output = "";

      for (let i = 0; i < visibleCount; i++) {
        if (i < fixedCount) output += targetText[i];
        else if (targetText[i] === " ") output += " ";
        else output += chars[Math.floor(Math.random() * chars.length)];
      }

      if (spanRef.current) spanRef.current.textContent = output;

      if (fixedCount >= targetText.length) {
        if (spanRef.current) spanRef.current.textContent = targetText;
        return;
      }

      cycles++;
      animationRef.current.frame = requestAnimationFrame(animate);
    };

    animationRef.current.timeout = setTimeout(() => {
      animationRef.current.frame = requestAnimationFrame(animate);
    }, 500);

    return () => {
      if (animationRef.current.timeout) clearTimeout(animationRef.current.timeout);
      if (animationRef.current.frame) cancelAnimationFrame(animationRef.current.frame);
    };
  }, [isActive, isSmallScreen]);

  return <span ref={spanRef} />;
});

interface SoftwareWindowProps {
  isDragging: boolean;
  onDropTrainingData: () => void;
  hasTrainingData: boolean;
  setTrainingPanelRef?: (ref: HTMLDivElement | null) => void;
  style?: React.CSSProperties;
  isGhostHovering?: boolean;
  mode?: 'demo' | 'chat';
  onChatComplete?: () => void;
}

const ROW_1_HEIGHT = "55%";
const ROW_2_HEIGHT = "45%";
const COMPACT_ROW_1_HEIGHT = "75%";
const COMPACT_ROW_2_HEIGHT = "25%";

const SCAN_DURATION = 1600;
const SPLIT_TRANSITION = 1000;
const NETWORK_BUILD_DURATION = 3750;
const CABLES_DURATION = 1300;
const COLLAPSE_DURATION = 3750;
const TRAINING_ORANGE_DURATION = 3750;
const TRAINING_PURPLE_DURATION = 3750;

const ORANGE_PROGRESS_DURATION = NETWORK_BUILD_DURATION + CABLES_DURATION + TRAINING_ORANGE_DURATION;
const PURPLE_PROGRESS_DURATION = SCAN_DURATION + COLLAPSE_DURATION + NETWORK_BUILD_DURATION + CABLES_DURATION + TRAINING_PURPLE_DURATION;

const COL_1_WIDTH = "66%";
const COL_3_WIDTH = "34%";

export default function SoftwareWindow({
  isDragging,
  onDropTrainingData,
  hasTrainingData,
  setTrainingPanelRef,
  style,
  isGhostHovering,
  mode = 'demo',
  onChatComplete
}: SoftwareWindowProps) {
  const [chatCompleted, setChatCompleted] = useState(false);
  const isChatMode = mode === 'chat' && !chatCompleted;

  const handleChatComplete = useCallback(() => {
    setChatCompleted(true);
    onChatComplete?.();
  }, [onChatComplete]);
  const [isTraining, setIsTraining] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hasClickedConveyor, setHasClickedConveyor] = useState(false);
  const [isImprovementPhase, setIsImprovementPhase] = useState(false);
  const [isShrinkingInPlace, setIsShrinkingInPlace] = useState(false);
  const [isMovingToCorner, setIsMovingToCorner] = useState(false);
  const [disableCanvasTransitions, setDisableCanvasTransitions] = useState(false);
  const [showDeployButton, setShowDeployButton] = useState(false);
  const [isRetraining, setIsRetraining] = useState(false);
  const [hasRetrained, setHasRetrained] = useState(false);
  const [showDataCelebration, setShowDataCelebration] = useState(false);
  const [isResettingModel, setIsResettingModel] = useState(false);
  const [isRetrainingAnalysis, setIsRetrainingAnalysis] = useState(false);
  const [isRetrainingDeploy, setIsRetrainingDeploy] = useState(false);

  const [isHoveringPanel, setIsHoveringPanel] = useState(false);

  const [showNetwork, setShowNetwork] = useState(false);
  const [animateSetup, setAnimateSetup] = useState(false);
  const [animatePrecision, setAnimatePrecision] = useState(false);
  const [startAnalysis, setStartAnalysis] = useState(false);
  const [isProgressBarVisible, setIsProgressBarVisible] = useState(false);
  const [hasProgressBarStarted, setHasProgressBarStarted] = useState(false);
  const [startCables, setStartCables] = useState(false);

  const [isCollapsingToCore, setIsCollapsingToCore] = useState(false);
  const [isRetrainingScan, setIsRetrainingScan] = useState(false);
  const [animateHardwareSwitch, setAnimateHardwareSwitch] = useState(false);
  const [isRebuildingBase, setIsRebuildingBase] = useState(false);
  const [isRetrainingPurple, setIsRetrainingPurple] = useState(false);
  const [retrainedPrecision, setRetrainedPrecision] = useState(false);
  const [trainingColor, setTrainingColor] = useState<'orange' | 'purple' | 'red'>('orange');

  const [pendingRetrainTimer, setPendingRetrainTimer] = useState<NodeJS.Timeout | null>(null);
  const [isGreenLoop, setIsGreenLoop] = useState(false);
  const [isUserBusy, setIsUserBusy] = useState(false);
  const isUserBusyRef = useRef(false);

  const [currentFps, setCurrentFps] = useState(50);
  const [lastDeployedFps, setLastDeployedFps] = useState(81);
  const [targetAccuracy, setTargetAccuracy] = useState<number | undefined>(undefined);
  const [displayedAccuracy, setDisplayedAccuracy] = useState(0);

  const [windowPos, setWindowPos] = useState({ x: 0, y: 0 });
  const [isWindowDragging, setIsWindowDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const windowStartPosRef = useRef({ x: 0, y: 0 });

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const { tier: performanceTier } = usePerformance();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (!panelRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setIsCompact(entry.contentRect.width < 475);
      }
    });
    observer.observe(panelRef.current);
    return () => observer.disconnect();
  }, []);

  const isFinalLayout = isCollapsed || isMovingToCorner;

  const cameraStationVisible = isFinalLayout && !(isRetraining || isResettingModel || isRetrainingAnalysis || isCollapsingToCore || isRebuildingBase || isRetrainingPurple);
  const shouldRenderCameraStation = useDelayedUnmount(cameraStationVisible, 300);

  const trainingPanelVisible = !((isFinalLayout && !isRetrainingAnalysis) || isResettingModel || isCollapsingToCore);
  const shouldRenderTrainingPanel = useDelayedUnmount(trainingPanelVisible, 800);

  const handleHeaderMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    
    setIsWindowDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    windowStartPosRef.current = { ...windowPos };
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        if (!isWindowDragging) return;
        const dx = e.clientX - dragStartRef.current.x;
        const dy = e.clientY - dragStartRef.current.y;
        setWindowPos({
            x: windowStartPosRef.current.x + dx,
            y: windowStartPosRef.current.y + dy
        });
    };

    const handleMouseUp = () => {
        setIsWindowDragging(false);
    };

    if (isWindowDragging) {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = 'grabbing';
    } else {
        document.body.style.cursor = '';
    }

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
    };
  }, [isWindowDragging]);

  const handleCablesComplete = () => {
    if (isRetrainingAnalysis && !isRetrainingPurple) {
      if (!isGreenLoop) {
        setTrainingColor('purple');
      }
      setIsRetrainingPurple(true);
      setIsTraining(true);
    } else {
      setIsTraining(true);
    }
  };

  const handleNeuralAnimationComplete = () => {
      if (isRetrainingPurple) {
        handlePurpleTrainingComplete();
        return;
      }
      setStartCables(false);
      setIsProgressBarVisible(false);
      setShowDeployButton(true);
  };

  const handleProgressComplete = () => {};

  useEffect(() => {
    if (isProgressBarVisible && !startCables && !isRetrainingAnalysis) {
      const delay = NETWORK_BUILD_DURATION;
      const timeout = setTimeout(() => {
        setStartCables(true);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [isProgressBarVisible, startCables, isRetrainingAnalysis]);

  const handleDeploy = () => {
    setShowDeployButton(false);
    setAnimatePrecision(true);

    if (isRetrainingDeploy && trainingColor === 'red') {
      const fpsDelta = currentFps - lastDeployedFps;
      const accuracyChange = -fpsDelta * 0.006;
      const currentAccuracy = targetAccuracy ?? 99.6;
      const newAccuracy = Math.min(99.9, Math.max(90, currentAccuracy + accuracyChange));
      setTargetAccuracy(newAccuracy);
      setLastDeployedFps(currentFps);
      setIsCollapsed(true);
      setIsRetrainingDeploy(false);
      return;
    }

    if (isRetrainingDeploy && trainingColor === 'purple') {
      setIsCollapsed(true);
      setIsRetrainingDeploy(false);
      setRetrainedPrecision(true);
      setTimeout(() => {
        setIsImprovementPhase(true);
      }, 800);
      return;
    }

    if (isRetrainingDeploy) {
      setIsCollapsed(true);
      setIsRetrainingDeploy(false);
      if (!isImprovementPhase) {
        setTimeout(() => setIsImprovementPhase(true), 800);
      }
    } else {
      setIsRetraining(false);
      setIsMovingToCorner(true);
      setIsTraining(false);
      setTimeout(() => {
        setIsMovingToCorner(false);
        setDisableCanvasTransitions(true);
        setIsCollapsed(true);
        requestAnimationFrame(() => {
          setTimeout(() => {
            setDisableCanvasTransitions(false);
          }, 50);
        });
      }, 900);
      if (hasClickedConveyor) {
        setTimeout(() => setIsImprovementPhase(true), 1000);
      }
    }
  };

  const handleScanComplete = useCallback(() => {
    if (isRetrainingAnalysis) {
      setIsCollapsingToCore(true);
    } else {
      setShowNetwork(true);
    }
  }, [isRetrainingAnalysis]);

  const handleDataFull = useCallback(() => {
    if (hasRetrained) return;
    setHasRetrained(true);
    setIsCollapsed(false);
    setShowDeployButton(false);
    setStartCables(false);
    setStartAnalysis(false);
    setIsProgressBarVisible(false);
    setHasProgressBarStarted(false);
    setIsTraining(false);
    setIsRetrainingAnalysis(true);
    setTrainingColor('purple');
    setAnimateHardwareSwitch(true);
    setTimeout(() => {
      setHasProgressBarStarted(true);
      setIsProgressBarVisible(true);
      setStartAnalysis(true);
    }, 4200);
  }, [hasRetrained]);

  const [scanCompleted, setScanCompleted] = useState(false);
  const [collapseCompleted, setCollapseCompleted] = useState(false);

  const handleCollapseComplete = useCallback(() => {
    setIsCollapsingToCore(false);
    setShowNetwork(true);
    setIsRebuildingBase(true);
  }, []);

  const handleRebuildProgressComplete = useCallback(() => {
    setIsRebuildingBase(false);
    setStartCables(true);
  }, []);

  const handlePurpleTrainingComplete = useCallback(() => {
    setIsProgressBarVisible(false);
    setStartCables(false);
    setIsRetrainingPurple(false);
    setIsRetrainingAnalysis(false);
    setShowDeployButton(true);
    setIsRetrainingDeploy(true);
  }, []);

  const startGreenRetraining = useCallback(() => {
    if (pendingRetrainTimer) {
      clearTimeout(pendingRetrainTimer);
      setPendingRetrainTimer(null);
    }
    setIsGreenLoop(true);
    setTrainingColor('red');
    setIsCollapsed(false);
    setShowDeployButton(false);
    setStartCables(false);
    setIsProgressBarVisible(false);
    setHasProgressBarStarted(false);
    setIsTraining(false);
    setStartAnalysis(false);
    setIsRetrainingAnalysis(true);
    setTimeout(() => {
      setHasProgressBarStarted(true);
      setIsProgressBarVisible(true);
      setStartAnalysis(true);
    }, 100);
  }, [pendingRetrainTimer]);

  const triggerRetrainTimer = useCallback(() => {
    if (!isImprovementPhase || isRetrainingAnalysis || isCollapsingToCore || isRebuildingBase || isRetrainingPurple) {
      return;
    }
    if (pendingRetrainTimer) {
      clearTimeout(pendingRetrainTimer);
    }
    const timer = setTimeout(() => {
      if (!isUserBusyRef.current) {
        startGreenRetraining();
      }
    }, 3000);
    setPendingRetrainTimer(timer);
  }, [isImprovementPhase, pendingRetrainTimer, isRetrainingAnalysis, isCollapsingToCore, isRebuildingBase, isRetrainingPurple, startGreenRetraining]);

  const handleUserChange = useCallback(() => {
    triggerRetrainTimer();
  }, [triggerRetrainTimer]);

  const handleBusyChange = useCallback((busy: boolean) => {
    setIsUserBusy(busy);
    isUserBusyRef.current = busy;
  }, []);

  const handleDataDropped = useCallback(() => {
    triggerRetrainTimer();
  }, [triggerRetrainTimer]);

  const handleFpsChange = useCallback((fps: number) => {
    setCurrentFps(fps);
  }, []);

  const handleAccuracyChange = useCallback((accuracy: number) => {
    setDisplayedAccuracy(accuracy);
  }, []);

  useEffect(() => {
    return () => {
      if (pendingRetrainTimer) {
        clearTimeout(pendingRetrainTimer);
      }
    };
  }, [pendingRetrainTimer]);

  useEffect(() => {
    if (!hasTrainingData) {
      setIsCollapsed(false);
      setIsTraining(false);
      setHasClickedConveyor(false);
      setIsImprovementPhase(false);
      setIsShrinkingInPlace(false);
      setIsMovingToCorner(false);
      setDisableCanvasTransitions(false);
      setShowDeployButton(false);
      setIsRetraining(false);
      setHasRetrained(false);
      setShowDataCelebration(false);
      setIsResettingModel(false);
      setIsRetrainingAnalysis(false);
      setIsRetrainingDeploy(false);
      setShowNetwork(false);
      setAnimateSetup(false);
      setAnimatePrecision(false);
      setStartAnalysis(false);
      setIsProgressBarVisible(false);
      setHasProgressBarStarted(false);
      setStartCables(false);
      setIsCollapsingToCore(false);
      setIsRetrainingScan(false);
      setAnimateHardwareSwitch(false);
      setIsRebuildingBase(false);
      setIsRetrainingPurple(false);
      setRetrainedPrecision(false);
      setTrainingColor('orange');
      setScanCompleted(false);
      setCollapseCompleted(false);
      if (pendingRetrainTimer) {
        clearTimeout(pendingRetrainTimer);
      }
      setPendingRetrainTimer(null);
      setIsGreenLoop(false);
      setIsUserBusy(false);
    }
  }, [hasTrainingData]);

  useEffect(() => {
    if (hasTrainingData && !hasRetrained && !isRetrainingAnalysis) {
        const setupTimer = setTimeout(() => {
            setAnimateSetup(true);
        }, 500);
        const analysisTimer = setTimeout(() => {
            setStartAnalysis(true);
        }, 2800);
        return () => {
            clearTimeout(setupTimer);
            clearTimeout(analysisTimer);
        };
    }
  }, [hasTrainingData, hasRetrained, isRetrainingAnalysis]);

  useEffect(() => {
    if (startAnalysis && !hasProgressBarStarted && !isRetrainingAnalysis) {
      setHasProgressBarStarted(true);
      setIsProgressBarVisible(true);
    }
  }, [startAnalysis, hasProgressBarStarted, isRetrainingAnalysis]);

  useEffect(() => {
    if (hasClickedConveyor && !hasRetrained) {
      const recenterTimer = setTimeout(() => {
        setIsCollapsed(false);
        setIsTraining(true);
        setIsShrinkingInPlace(false);
        setIsMovingToCorner(false);
        setDisableCanvasTransitions(false);
      }, 1200);
      return () => clearTimeout(recenterTimer);
    }
  }, [hasClickedConveyor, hasRetrained]);

  const isMoved = windowPos.x !== 0 || windowPos.y !== 0;
  const rootStyle = {
      ...style,
      ...( (isWindowDragging || isMoved) ? { animation: 'none', opacity: 1 } : {} ),
      transform: isMoved
          ? `translate3d(${windowPos.x}px, ${windowPos.y}px, 0) scale(1)`
          : style?.transform
  };

  return (
    <div
      className="oneware-dashboard-container"
      style={rootStyle}
    >
      <div className="oneware-refraction-shine"></div>

      <div
          className="oneware-window-header"
          style={{
              position: 'relative',
              zIndex: 50
          }}
      >
        <div className="oneware-window-controls">
          <div className="oneware-control-dot oneware-dot-red"></div>
          <div className="oneware-control-dot oneware-dot-yellow"></div>
          <div className="oneware-control-dot oneware-dot-green"></div>
        </div>
        <div className="oneware-window-title">ONEWARE<TitleAnimation isActive={hasTrainingData} isSmallScreen={isSmallScreen} /></div>
      </div>

      <div
        style={{
          padding: "clamp(12px, 2vw, 24px)",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(8px, 1.5vw, 16px)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "clamp(12px, 2vw, 24px)",
            left: "clamp(12px, 2vw, 24px)",
            right: "clamp(12px, 2vw, 24px)",
            bottom: "clamp(12px, 2vw, 24px)",
            zIndex: 100,
            display: "flex",
            opacity: isChatMode ? 1 : 0,
            transform: isChatMode ? "scale(1)" : "scale(0.98)",
            pointerEvents: isChatMode ? "auto" : "none",
            transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
          }}
        >
          <ChatInterface isActive={isChatMode} onComplete={handleChatComplete} />
        </div>
        <div
          style={{
            flex: 1,
            minHeight: isSmallScreen ? 'clamp(32px, 7vh, 70px)' : 'clamp(40px, 11vh, 120px)',
            display: "flex",
            opacity: isChatMode ? 0 : 1,
            transform: isChatMode ? "translateY(-10px)" : "translateY(0)",
            overflow: "hidden",
            transition: "opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s"
          }}
        >
             <TopMetrics
               isActive={true}
               animateSetup={animateSetup}
               animatePrecision={animatePrecision}
               isImproved={isImprovementPhase}
               animateHardwareSwitch={animateHardwareSwitch}
               retrainedPrecision={retrainedPrecision}
               isInteractive={isImprovementPhase}
               onUserChange={handleUserChange}
               onBusyChange={handleBusyChange}
               onFpsChange={handleFpsChange}
               onAccuracyChange={handleAccuracyChange}
               targetAccuracy={targetAccuracy}
             />
        </div>

        <div
             ref={panelRef}
             className="oneware-glass-panel"
             onMouseEnter={() => !isChatMode && isDragging && setIsHoveringPanel(true)}
             onMouseLeave={() => setIsHoveringPanel(false)}
             onMouseUp={() => {
                 if (!isChatMode && isDragging && isHoveringPanel) {
                     onDropTrainingData();
                     setIsHoveringPanel(false);
                 }
             }}
             style={{
               flex: isSmallScreen ? 4 : 5,
               minHeight: isSmallScreen ? 'clamp(150px, 30vh, 320px)' : 'clamp(180px, 40vh, 600px)',
               position: "relative",
               overflow: "hidden",
               opacity: isChatMode ? 0 : 1,
               transform: isChatMode ? "translateY(10px)" : "translateY(0)",
               transition: "opacity 0.6s ease-out 0.3s, transform 0.6s ease-out 0.3s"
             }}
        >
             {shouldRenderCameraStation && (
             <div
                style={{
                    position: "absolute",
                    top: isCompact ? "10%" : 0,
                    left: 0,
                    width: isFinalLayout ? COL_1_WIDTH : "100%",
                    height: ROW_1_HEIGHT,
                    zIndex: 20,
                    opacity: cameraStationVisible ? 1 : 0,
                    pointerEvents: cameraStationVisible ? 'auto' : 'none',
                    transition: 'opacity 0.25s ease-out'
                }}
             >
                 <CameraStation
                   isActive={cameraStationVisible}
                   onDataFull={handleDataFull}
                   showCelebration={showDataCelebration}
                   allowCustomUpload={isImprovementPhase}
                   onDataDropped={handleDataDropped}
                   accuracy={isCompact ? displayedAccuracy : 0}
                 />
             </div>
             )}

                          {shouldRenderTrainingPanel && (
                          <div
                             ref={setTrainingPanelRef}
                             style={{
                                 position: "absolute",
                                 top: 0,
                                 left: showNetwork ? 0 : "15%",
                                 width: showNetwork ? "50%" : "70%",
                                 height: isProgressBarVisible || (showDeployButton && !isFinalLayout)
                                    ? "75%"
                                    : "100%",
                                 zIndex: 15,
                                 opacity: trainingPanelVisible ? 1 : 0,
                                 transform: trainingPanelVisible ? "translateX(0)" : "translateX(-50px)",
                                 pointerEvents: "none",
                                 transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                             }}
                          >
                              <div style={{ width: '100%', height: '100%', position: 'relative', pointerEvents: trainingPanelVisible ? 'auto' : 'none' }}>
                                  <TrainingDataOverlay
                                     isDragging={isDragging}
                                     isGhostHovering={isGhostHovering}
                                     isGlobalDragHover={isHoveringPanel}
                                     onDrop={onDropTrainingData}
                                     hasData={hasTrainingData}
                                     isActive={isCollapsed}
                                     showExtraDb={hasClickedConveyor}
                                     onComplete={handleCablesComplete}
                                     onScanComplete={handleScanComplete}
                                     startCables={startCables}
                                     isTrainingActive={(isTraining && !showDeployButton && !hasClickedConveyor) || isRetrainingPurple}
                                     showDeployButton={showDeployButton}
                                     isFinalLayout={(isFinalLayout && !isRetrainingAnalysis) || isResettingModel}
                                     isRetrainingPhase={isRetrainingAnalysis}
                                     startAnalysis={startAnalysis}
                                  />
                              </div>
                          </div>
                          )}

                          {(showNetwork || isCollapsingToCore || isRebuildingBase || isRetrainingPurple) && (
                          <Suspense fallback={null}>
                            <Neural3DCanvas
                              style={{
                                position: "absolute",
                                top: (isFinalLayout && isCompact) ? "10%" : 0,
                                right: (showDeployButton && !isFinalLayout) || isResettingModel || isCollapsingToCore
                                  ? "50%"
                                  : (isFinalLayout ? 0 : 0),
                                width: (showDeployButton && !isFinalLayout) || isResettingModel || isCollapsingToCore
                                   ? "75%"
                                   : (isFinalLayout ? COL_3_WIDTH : "50%"),
                                height: isProgressBarVisible || (showDeployButton && !isFinalLayout)
                                    ? "75%"
                                    : (isFinalLayout ? ROW_1_HEIGHT : "100%"),
                                transform: (showDeployButton && !isFinalLayout) || isResettingModel || isCollapsingToCore
                                  ? "translate3d(50%, 0, 0)"
                                  : "translate3d(0, 0, 0)",
                                transition: disableCanvasTransitions ? "none" : "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                                zIndex: 20,
                              }}
                              isTraining={(isTraining && !hasClickedConveyor && !isRetraining) || isRetrainingPurple}
                              isBuildingBase={isProgressBarVisible && showNetwork && !isRebuildingBase && !isRetrainingAnalysis && !showDeployButton && !hasRetrained}
                              isRebuilding={(isTraining && hasClickedConveyor) || isRetraining}
                              isResetting={isResettingModel}
                              onTrainingComplete={handleNeuralAnimationComplete}
                              isCollapsingToCore={isCollapsingToCore}
                              isRebuildingBase={isRebuildingBase}
                              trainingColor={trainingColor}
                              onCollapseComplete={handleCollapseComplete}
                              onRebuildComplete={handleRebuildProgressComplete}
                              currentFps={currentFps}
                              isSmallScreen={isSmallScreen}
                              performanceTier={performanceTier}
                            />
                          </Suspense>
                          )}
                          {!(isRetraining || isResettingModel || isRetrainingAnalysis || isCollapsingToCore || isRebuildingBase || isRetrainingPurple) && (
                          <div
                            style={{
                              position: "absolute",
                              top: isFinalLayout ? (isCompact ? COMPACT_ROW_1_HEIGHT : ROW_1_HEIGHT) : 0,
                              left: 0,
                              width: "100%",
                              height: isFinalLayout ? (isCompact ? COMPACT_ROW_2_HEIGHT : ROW_2_HEIGHT) : "100%",
                              zIndex: isFinalLayout ? 10 : 0,
                            }}
                          >
                            <ConveyorBelt
                              isActive={isFinalLayout && !isRetraining && !isResettingModel && !isRetrainingAnalysis && !isCollapsingToCore && !isRebuildingBase && !isRetrainingPurple}
                              showStation={!isFinalLayout}
                              speedMultiplier={Math.max(0.8, Math.min(1.2, currentFps / 50))}
                              performanceTier={performanceTier}
                            />
                          </div>
                          )}

                          <TrainingProgressOverlay
                            isActive={isProgressBarVisible}
                            isRebuilding={hasClickedConveyor || isRetraining}
                            isResetting={isResettingModel}
                            isRebuildingBase={isRebuildingBase}
                            isPurpleFlow={isRetrainingAnalysis}
                            onComplete={handleProgressComplete}
                            duration={isRetrainingAnalysis ? PURPLE_PROGRESS_DURATION : ORANGE_PROGRESS_DURATION}
                          />

                          {showDeployButton && <DeployView onDeploy={handleDeploy} />}
        </div>
      </div>
    </div>
  );
}
