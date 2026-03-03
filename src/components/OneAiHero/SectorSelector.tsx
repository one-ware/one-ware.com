import React, { useRef, useEffect, useState } from "react";
import Translate from "@docusaurus/Translate";
import { SECTORS } from "./useSectorStateMachine";

interface SectorSelectorProps {
  activeSectorIndex: number;
  isAnimating: boolean;
  onSelect: (index: number) => void;
}

export default function SectorSelector({
  activeSectorIndex,
  isAnimating,
  onSelect,
}: SectorSelectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ top: 0, height: 0 });

  useEffect(() => {
    const btn = buttonRefs.current[activeSectorIndex];
    const container = containerRef.current;
    if (btn && container) {
      const containerRect = container.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setIndicator({
        top: btnRect.top - containerRect.top,
        height: btnRect.height,
      });
    }
  }, [activeSectorIndex]);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col justify-between h-full p-1.5 rounded-2xl bg-gray-50/80 dark:bg-white/[0.03] border backdrop-blur-sm"
      style={{ borderColor: "color-mix(in srgb, var(--ifm-color-primary) 30%, transparent)" }}
    >
      <div
        className="absolute left-1.5 right-1.5 rounded-xl border transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          top: indicator.top,
          height: indicator.height,
          opacity: indicator.height > 0 ? 1 : 0,
          backgroundColor: "color-mix(in srgb, var(--ifm-color-primary) 12%, transparent)",
          borderColor: "color-mix(in srgb, var(--ifm-color-primary) 35%, transparent)",
        }}
      />

      {SECTORS.map((sector, index) => {
        const isActive = index === activeSectorIndex;
        const Icon = sector.icon;
        return (
          <button
            key={sector.id}
            ref={(el) => { buttonRefs.current[index] = el; }}
            onClick={() => !isAnimating && onSelect(index)}
            className={`relative z-10 flex flex-col items-center justify-center gap-1.5 flex-1 px-3 py-3 md:px-4 md:py-4 rounded-xl transition-all duration-300 border-0 bg-transparent ${
              isActive
                ? "text-[var(--ifm-color-primary)]"
                : isAnimating
                ? "text-gray-300 dark:text-gray-600 cursor-default"
                : "text-gray-400 dark:text-gray-500 hover:text-[var(--ifm-color-primary)] cursor-pointer"
            }`}
          >
            <Icon className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
            <span className="text-[9px] md:text-[10px] font-semibold uppercase tracking-wider leading-tight text-center">
              <Translate id={sector.labelId}>{sector.label}</Translate>
            </span>
          </button>
        );
      })}
    </div>
  );
}
