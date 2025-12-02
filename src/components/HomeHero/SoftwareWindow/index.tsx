import React, { useState, useRef, useEffect, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "../glass-design.css";
import TrainingDataOverlay from "./TrainingDataOverlay";
import ConveyorBelt from "./ConveyorBelt";
import CameraStation from "./CameraStation";
import TopMetrics from "./TopMetrics";
import Neural3DNetwork from "../NeuralNetwork";
import TrainingProgressOverlay from "./TrainingProgressOverlay";
import DeployView from "./DeployView";

interface SoftwareWindowProps {
  isDragging: boolean;
  onDropTrainingData: () => void;
  hasTrainingData: boolean;
  setTrainingPanelRef?: (ref: HTMLDivElement | null) => void;
  style?: React.CSSProperties;
  isGhostHovering?: boolean;
}

const ROW_1_HEIGHT = "55%";
const ROW_2_HEIGHT = "45%";

const SCAN_DURATION = 1600;
const SPLIT_TRANSITION = 1000;
const NETWORK_BUILD_DURATION = 2500;
const CABLES_DURATION = 1300;
const COLLAPSE_DURATION = 1700;
const TRAINING_ORANGE_DURATION = 4400;
const TRAINING_PURPLE_DURATION = 5200;

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
  isGhostHovering
}: SoftwareWindowProps) {
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

  const [windowPos, setWindowPos] = useState({ x: 0, y: 0 });
  const [isWindowDragging, setIsWindowDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const windowStartPosRef = useRef({ x: 0, y: 0 });

  const [titleSuffix, setTitleSuffix] = useState("");

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const isFinalLayout = isCollapsed || isMovingToCorner;

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


  useEffect(() => {
    if (hasTrainingData) {
      const targetText = isSmallScreen ? " - CONVEYOR BELT" : " - CONVEYOR BELT DETECTION";
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-=+<>/";
      let cycles = 0;
      const startDelay = setTimeout(() => {
        const interval = setInterval(() => {
          let output = "";
          const fixedCount = Math.floor(cycles / 2);
          const visibleCount = Math.min(targetText.length, fixedCount + 3);
          for (let i = 0; i < visibleCount; i++) {
            if (i < fixedCount) output += targetText[i];
            else if (targetText[i] === " ") output += " ";
            else output += chars[Math.floor(Math.random() * chars.length)];
          }
          setTitleSuffix(output);
          if (fixedCount >= targetText.length) {
            clearInterval(interval);
            setTitleSuffix(targetText);
          }
          cycles++;
        }, 20);
        return () => clearInterval(interval);
      }, 500);
      return () => clearTimeout(startDelay);
    } else {
      setTitleSuffix("");
    }
  }, [hasTrainingData, isSmallScreen]);

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
      height: "60vh",
      aspectRatio: "4/3",
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
          onMouseDown={handleHeaderMouseDown}
          style={{ 
              cursor: isWindowDragging ? 'grabbing' : 'grab',
              position: 'relative',
              zIndex: 50
          }}
      >
        <div className="oneware-window-controls">
          <div className="oneware-control-dot oneware-dot-red"></div>
          <div className="oneware-control-dot oneware-dot-yellow"></div>
          <div className="oneware-control-dot oneware-dot-green"></div>
        </div>
        <div className="oneware-window-title">ONEWARE{titleSuffix}</div>
      </div>

      <div
        style={{
          flex: 1,
          padding: "clamp(12px, 2vw, 24px)",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(8px, 1.5vw, 16px)",
          transition: "gap 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)"
        }}
      >
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "flex",
            opacity: 1,
            overflow: "hidden",
            transition: "all 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)"
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
               targetAccuracy={targetAccuracy}
             />
        </div>

        <div
             className="oneware-glass-panel"
             onMouseEnter={() => isDragging && setIsHoveringPanel(true)}
             onMouseLeave={() => setIsHoveringPanel(false)}
             onMouseUp={() => {
                 if (isDragging && isHoveringPanel) {
                     onDropTrainingData();
                     setIsHoveringPanel(false);
                 }
             }}
             style={{
               flex: 5,
               minHeight: 0,
               position: "relative",
               overflow: "hidden",
               transition: "all 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)"
             }}
        >
             <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: isFinalLayout ? COL_1_WIDTH : "100%",
                    height: ROW_1_HEIGHT,
                    zIndex: 20,
                    opacity: (isRetraining || isResettingModel || isRetrainingAnalysis || isCollapsingToCore || isRebuildingBase || isRetrainingPurple) ? 0 : (isFinalLayout ? 1 : 0),
                    pointerEvents: isFinalLayout && !isCollapsingToCore && !isRebuildingBase && !isRetrainingPurple ? 'auto' : 'none',
                    transition: 'opacity 0.25s ease-out'
                }}
             >
                 <CameraStation
                   isActive={isFinalLayout && !isRetraining && !isResettingModel && !isRetrainingAnalysis && !isCollapsingToCore && !isRebuildingBase && !isRetrainingPurple}
                   onDataFull={handleDataFull}
                   showCelebration={showDataCelebration}
                   allowCustomUpload={isImprovementPhase}
                   onDataDropped={handleDataDropped}
                 />
             </div>

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
                                 opacity: ((isFinalLayout && !isRetrainingAnalysis) || isResettingModel || isCollapsingToCore) ? 0 : 1,
                                 transform: ((isFinalLayout && !isRetrainingAnalysis) || isResettingModel || isCollapsingToCore) ? "translateX(-50px)" : "translateX(0)",
                                 pointerEvents: "none",
                                 transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                             }}
                          >
                              <div style={{ width: '100%', height: '100%', position: 'relative', pointerEvents: ((isFinalLayout && !isRetrainingAnalysis) || isResettingModel || isCollapsingToCore) ? 'none' : 'auto' }}>
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

                          <Canvas
                            camera={{ position: [0, 0, 40], fov: 20 }}
                            style={{
                              position: "absolute",
                              top: 0,
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
                              opacity: (showNetwork || isCollapsingToCore || isRebuildingBase || isRetrainingPurple) ? 1 : 0,
                            }}
                            resize={{ scroll: false, debounce: 0 }}
                          >
                            <ambientLight intensity={0.3} />
                            <pointLight position={[10, 10, 10]} intensity={0.8} />
                                                          <Neural3DNetwork
                                                            isTraining={(isTraining && !hasClickedConveyor && !isRetraining) || isRetrainingPurple}
                                                            isBuildingBase={isProgressBarVisible && showNetwork && !isRebuildingBase && !isRetrainingAnalysis && !showDeployButton && !hasRetrained}
                                                            isRebuilding={(isTraining && hasClickedConveyor) || isRetraining}
                                                            isResetting={isResettingModel}
                                                            onTrainingComplete={handleNeuralAnimationComplete}
                                                            isExpanded={false}
                              shouldReset={false}
                              startDelay={0}
                              isCollapsingToCore={isCollapsingToCore}
                              isRebuildingBase={isRebuildingBase}
                              trainingColor={trainingColor}
                              onCollapseComplete={handleCollapseComplete}
                              onRebuildComplete={handleRebuildProgressComplete}
                              currentFps={currentFps}
                            />
                            <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
                          </Canvas>
                          <div
                            style={{
                              position: "absolute",
                              top: isFinalLayout ? ROW_1_HEIGHT : 0,
                              left: 0,
                              width: "100%",
                              height: isFinalLayout ? ROW_2_HEIGHT : "100%",
                              opacity: (isRetraining || isResettingModel || isRetrainingAnalysis || isCollapsingToCore || isRebuildingBase || isRetrainingPurple) ? 0 : 1,
                              zIndex: isFinalLayout ? 10 : 0,
                              transition: "opacity 0.25s ease-out",
                            }}
                          >
                            <ConveyorBelt
                              isActive={isFinalLayout && !isRetraining && !isResettingModel && !isRetrainingAnalysis && !isCollapsingToCore && !isRebuildingBase && !isRetrainingPurple}
                              showStation={!isFinalLayout}
                              speedMultiplier={Math.max(0.8, Math.min(1.2, currentFps / 50))}
                            />
                          </div>

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
