import React, { useEffect, useRef, useState } from "react";
import Translate from "@docusaurus/Translate";
import { archModels } from "./data";

export function ArchModelSelector({ models, activeModel, onSelect }: {
  models: typeof archModels;
  activeModel: number;
  onSelect: (i: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const btn = buttonRefs.current[activeModel];
    const container = containerRef.current;
    if (btn && container) {
      const containerRect = container.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setIndicator({
        left: btnRect.left - containerRect.left,
        width: btnRect.width,
      });
    }
  }, [activeModel]);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-row w-full p-1.5 rounded-2xl bg-white/[0.03] border backdrop-blur-sm flex-shrink-0"
      style={{ borderColor: "color-mix(in srgb, var(--ifm-color-primary) 30%, transparent)" }}
    >
      <div
        className="absolute top-1.5 bottom-1.5 rounded-xl border transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          left: indicator.left,
          width: indicator.width,
          opacity: indicator.width > 0 ? 1 : 0,
          backgroundColor: "color-mix(in srgb, var(--ifm-color-primary) 12%, transparent)",
          borderColor: "color-mix(in srgb, var(--ifm-color-primary) 35%, transparent)",
        }}
      />

      {models.map((m, index) => {
        const isActive = index === activeModel;
        const Icon = m.icon;
        return (
          <button
            key={index}
            ref={(el) => { buttonRefs.current[index] = el; }}
            onClick={() => onSelect(index)}
            className={`relative z-10 flex flex-row items-center justify-center gap-2 flex-1 px-3 py-2.5 rounded-xl transition-all duration-300 border-0 bg-transparent ${
              isActive
                ? "text-[var(--ifm-color-primary)]"
                : "text-gray-400 dark:text-gray-500 hover:text-[var(--ifm-color-primary)] cursor-pointer"
            }`}
          >
            <Icon className="w-4 h-4 md:w-5 md:h-5 shrink-0" />
            <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider leading-tight">
              <Translate id={m.labelId}>{m.label}</Translate>
            </span>
          </button>
        );
      })}
    </div>
  );
}
