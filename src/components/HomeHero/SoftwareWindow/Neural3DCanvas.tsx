import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Neural3DNetwork from "../NeuralNetwork";
import type { PerformanceTier } from "../index";

interface Neural3DCanvasProps {
  style: React.CSSProperties;
  isTraining: boolean;
  isBuildingBase: boolean;
  isRebuilding: boolean;
  isResetting: boolean;
  onTrainingComplete: () => void;
  isCollapsingToCore: boolean;
  isRebuildingBase: boolean;
  trainingColor: 'orange' | 'purple' | 'red';
  onCollapseComplete: () => void;
  onRebuildComplete: () => void;
  currentFps: number;
  isSmallScreen: boolean;
  performanceTier: PerformanceTier;
  maxNodes?: number;
  maxTrainingNodes?: number;
  skipTrainingCleanup?: boolean;
  enableRotation?: boolean;
}

export default function Neural3DCanvas({
  style,
  isTraining,
  isBuildingBase,
  isRebuilding,
  isResetting,
  onTrainingComplete,
  isCollapsingToCore,
  isRebuildingBase,
  trainingColor,
  onCollapseComplete,
  onRebuildComplete,
  currentFps,
  isSmallScreen,
  performanceTier,
  maxNodes,
  maxTrainingNodes,
  skipTrainingCleanup,
  enableRotation,
}: Neural3DCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 40], fov: 20 }}
      style={style}
      resize={{ scroll: false, debounce: 0 }}
    >
      <Neural3DNetwork
        isTraining={isTraining}
        isBuildingBase={isBuildingBase}
        isRebuilding={isRebuilding}
        isResetting={isResetting}
        onTrainingComplete={onTrainingComplete}
        isExpanded={false}
        shouldReset={false}
        startDelay={0}
        isCollapsingToCore={isCollapsingToCore}
        isRebuildingBase={isRebuildingBase}
        trainingColor={trainingColor}
        onCollapseComplete={onCollapseComplete}
        onRebuildComplete={onRebuildComplete}
        currentFps={currentFps}
        isSmallScreen={isSmallScreen}
        performanceTier={performanceTier}
        maxNodes={maxNodes}
        maxTrainingNodes={maxTrainingNodes}
        skipTrainingCleanup={skipTrainingCleanup}
        enableRotation={enableRotation}
      />
      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
    </Canvas>
  );
}
