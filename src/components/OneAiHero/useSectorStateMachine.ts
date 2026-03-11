import { useState, useRef, useCallback, useEffect } from "react";
import type { IconType } from "react-icons";
import { FaHeartPulse, FaClipboardCheck, FaStethoscope, FaHelicopter, FaSeedling } from "react-icons/fa6";

export type SectorId =
  | "healthcare"
  | "qualityControl"
  | "medicalEngineering"
  | "drone"
  | "agriculture";

export interface Sector {
  id: SectorId;
  label: string;
  labelId: string;
  trainingColor: "purple" | "orange" | "red";
  icon: IconType;
  maxNodes: number;
}

export const SECTORS: Sector[] = [
  { id: "healthcare", label: "Healthcare", labelId: "oneai.hero.sector.healthcare", trainingColor: "purple", icon: FaHeartPulse, maxNodes: 24 },
  { id: "qualityControl", label: "Quality Control", labelId: "oneai.hero.sector.qc", trainingColor: "orange", icon: FaClipboardCheck, maxNodes: 6 },
  { id: "medicalEngineering", label: "Medical Engineering", labelId: "oneai.hero.sector.medical", trainingColor: "red", icon: FaStethoscope, maxNodes: 16 },
  { id: "drone", label: "Drone", labelId: "oneai.hero.sector.drone", trainingColor: "orange", icon: FaHelicopter, maxNodes: 4 },
  { id: "agriculture", label: "Agriculture", labelId: "oneai.hero.sector.agriculture", trainingColor: "purple", icon: FaSeedling, maxNodes: 10 },
];

const BUILD_DURATION = 1500;

export type Phase =
  | "building"
  | "training"
  | "idle"
  | "collapsing"
  | "rebuilding"
  | "retraining";

export interface SectorState {
  activeSectorIndex: number;
  phase: Phase;
  isBuildingBase: boolean;
  isCollapsingToCore: boolean;
  isRebuildingBase: boolean;
  isTraining: boolean;
  trainingColor: "purple" | "orange" | "red";
  maxNodes: number;
}

export function useSectorStateMachine(canvasReady: boolean) {
  const [activeSectorIndex, setActiveSectorIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("building");
  const pendingSectorRef = useRef<number | null>(null);

  useEffect(() => {
    if (phase !== "building" || !canvasReady) return;
    const timer = setTimeout(() => {
      setPhase("training");
    }, BUILD_DURATION);
    return () => clearTimeout(timer);
  }, [phase, canvasReady]);

  const state: SectorState = {
    activeSectorIndex,
    phase,
    isBuildingBase: phase === "building",
    isCollapsingToCore: phase === "collapsing",
    isRebuildingBase: phase === "rebuilding",
    isTraining: phase === "training" || phase === "retraining",
    trainingColor: SECTORS[activeSectorIndex].trainingColor,
    maxNodes: SECTORS[activeSectorIndex].maxNodes,
  };

  const onCollapseComplete = useCallback(() => {
    const nextIndex = pendingSectorRef.current ?? 0;
    setActiveSectorIndex(nextIndex);
    pendingSectorRef.current = null;
    setPhase("rebuilding");
  }, []);

  const onRebuildComplete = useCallback(() => {
    setPhase((prev) => (prev === "rebuilding" ? "retraining" : prev));
  }, []);

  const onTrainingComplete = useCallback(() => {
    setPhase((prev) => (prev === "retraining" || prev === "training" ? "idle" : prev));
  }, []);

  const selectSector = useCallback(
    (index: number) => {
      if (index === activeSectorIndex && phase === "idle") return;
      // Already heading to this sector during animation
      if (pendingSectorRef.current === index && phase !== "idle") return;

      pendingSectorRef.current = index;

      // During collapse, just update the pending target — collapse continues
      if (phase === "collapsing") return;

      // During rebuilding/retraining, restart from collapse
      setPhase("collapsing");
    },
    [phase, activeSectorIndex]
  );

  return {
    state,
    selectSector,
    onCollapseComplete,
    onRebuildComplete,
    onTrainingComplete,
  };
}
