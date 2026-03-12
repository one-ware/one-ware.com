import React, { useRef, useEffect, useState } from "react";
import Translate from "@docusaurus/Translate";
import { SECTORS } from "./useSectorStateMachine";

interface SectorSelectorProps {
  activeSectorIndex: number;
  onSelect: (index: number) => void;
}

export default function SectorSelector({
  activeSectorIndex,
  onSelect,
}: SectorSelectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ top: 0, left: 0, width: 0, height: 0 });

  useEffect(() => {
    const btn = buttonRefs.current[activeSectorIndex];
    const container = containerRef.current;
    if (btn && container) {
      const containerRect = container.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setIndicator({
        top: btnRect.top - containerRect.top,
        left: btnRect.left - containerRect.left,
        width: btnRect.width,
        height: btnRect.height,
      });
    }
  }, [activeSectorIndex]);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-row lg:flex-col justify-between lg:h-full p-1.5 rounded-2xl bg-gray-50/80 dark:bg-white/[0.03] border backdrop-blur-sm"
      style={{ borderColor: "color-mix(in srgb, var(--ifm-color-primary) 30%, transparent)" }}
    >
      <div
        className="absolute rounded-xl border transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          top: indicator.top,
          left: indicator.left,
          width: indicator.width,
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
            onClick={() => onSelect(index)}
            className={`relative z-10 flex flex-col items-center justify-center gap-1 lg:gap-1.5 flex-1 px-2 py-2 lg:px-4 lg:py-4 rounded-xl transition-all duration-300 border-0 bg-transparent cursor-pointer ${
              isActive
                ? "text-[var(--ifm-color-primary)]"
                : "text-gray-400 dark:text-gray-500 hover:text-[var(--ifm-color-primary)]"
            }`}
          >
            <Icon className="w-4 h-4 lg:w-6 lg:h-6 shrink-0" />
            <span className="text-[8px] lg:text-[10px] font-semibold uppercase tracking-wider leading-tight text-center">
              <Translate id={sector.labelId}>{sector.label}</Translate>
            </span>
          </button>
        );
      })}
    </div>
  );
}
