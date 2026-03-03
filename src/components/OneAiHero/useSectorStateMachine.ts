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
}

export const SECTORS: Sector[] = [
  { id: "healthcare", label: "Healthcare", labelId: "oneai.hero.sector.healthcare", trainingColor: "purple", icon: FaHeartPulse },
  { id: "qualityControl", label: "Quality Control", labelId: "oneai.hero.sector.qc", trainingColor: "orange", icon: FaClipboardCheck },
  { id: "medicalEngineering", label: "Medical Engineering", labelId: "oneai.hero.sector.medical", trainingColor: "red", icon: FaStethoscope },
  { id: "drone", label: "Drone", labelId: "oneai.hero.sector.drone", trainingColor: "orange", icon: FaHelicopter },
  { id: "agriculture", label: "Agriculture", labelId: "oneai.hero.sector.agriculture", trainingColor: "purple", icon: FaSeedling },
];

const BUILD_DURATION = 4000;

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
  };

  const onCollapseComplete = useCallback(() => {
    const nextIndex = pendingSectorRef.current ?? 0;
    setActiveSectorIndex(nextIndex);
    pendingSectorRef.current = null;
    setPhase("rebuilding");
  }, []);

  const onRebuildComplete = useCallback(() => {
    setPhase("retraining");
  }, []);

  const onTrainingComplete = useCallback(() => {
    setPhase("idle");
  }, []);

  const selectSector = useCallback(
    (index: number) => {
      if (phase !== "idle") return;
      if (index === activeSectorIndex) return;
      pendingSectorRef.current = index;
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
