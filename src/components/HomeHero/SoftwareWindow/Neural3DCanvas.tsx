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
}: Neural3DCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 40], fov: 20 }}
      style={style}
      resize={{ scroll: false, debounce: 0 }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
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
      />
      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} />
    </Canvas>
  );
}
