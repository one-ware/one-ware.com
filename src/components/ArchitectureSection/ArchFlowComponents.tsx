import React from "react";
import type { LayerBlock, MainPathSegment, ResidualBlock } from "./types";
import { isResidualBlock } from "./types";

export function LayerCard({ block }: { block: LayerBlock }) {
  return (
    <div
      className="w-full rounded-lg overflow-hidden"
      style={{
        border: block.trainable
          ? "1px solid color-mix(in srgb, var(--ifm-color-primary) 30%, transparent)"
          : "1px solid var(--arch-card-border)",
        background: block.trainable
          ? "color-mix(in srgb, var(--ifm-color-primary) 6%, transparent)"
          : "var(--arch-card-bg)",
      }}
    >
      <div className="flex items-center justify-between px-4 py-2 gap-3">
        <code className="text-[10px] sm:text-xs font-mono dark:text-gray-300 text-gray-700 truncate">
          {block.name}
        </code>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[9px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-semibold">Input</span>
          <code className="text-[10px] sm:text-xs font-mono text-gray-500 dark:text-gray-400 whitespace-nowrap">
            {block.inputShape}
          </code>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-2 gap-3" style={{ borderTop: "1px solid var(--arch-card-border)" }}>
        <code className="text-[10px] sm:text-xs font-mono font-semibold dark:text-white text-gray-800 truncate">
          {block.type}
        </code>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[9px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-semibold">Output</span>
          <code className="text-[10px] sm:text-xs font-mono text-[var(--ifm-color-primary)] whitespace-nowrap">
            {block.outputShape}
          </code>
        </div>
      </div>
    </div>
  );
}

export function CompactLayerCard({ block }: { block: LayerBlock }) {
  return (
    <div
      className="w-full rounded-lg overflow-hidden"
      style={{
        border: block.trainable
          ? "1px solid color-mix(in srgb, var(--ifm-color-primary) 30%, transparent)"
          : "1px solid var(--arch-card-border)",
        background: block.trainable
          ? "color-mix(in srgb, var(--ifm-color-primary) 6%, transparent)"
          : "var(--arch-card-bg)",
      }}
    >
      <div className="px-4 py-2">
        <code className="text-[10px] sm:text-xs font-mono dark:text-gray-300 text-gray-700 block truncate">
          {block.name}
        </code>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[9px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-semibold">Input</span>
          <code className="text-[10px] sm:text-xs font-mono text-gray-500 dark:text-gray-400 truncate">
            {block.inputShape}
          </code>
        </div>
      </div>
      <div className="px-4 py-2" style={{ borderTop: "1px solid var(--arch-card-border)" }}>
        <code className="text-[10px] sm:text-xs font-mono font-semibold dark:text-white text-gray-800 block truncate">
          {block.type}
        </code>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[9px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-semibold">Output</span>
          <code className="text-[10px] sm:text-xs font-mono text-[var(--ifm-color-primary)] truncate">
            {block.outputShape}
          </code>
        </div>
      </div>
    </div>
  );
}

export function ArrowDown() {
  return (
    <div className="flex flex-col items-center py-1">
      <div className="w-px h-5" style={{ background: "color-mix(in srgb, var(--ifm-color-primary) 30%, transparent)" }} />
      <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
        <path d="M1 1l3 3 3-3" stroke="var(--ifm-color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      </svg>
    </div>
  );
}

export function MiniMergeIndicator() {
  return (
    <div className="flex items-center justify-center w-full my-1">
      <div className="flex-1 h-px" style={{ background: "color-mix(in srgb, var(--ifm-color-primary) 30%, transparent)" }} />
      <div className="flex flex-col items-center mx-2">
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
          <path d="M1 1l3 3 3-3" stroke="var(--ifm-color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
        </svg>
      </div>
      <div className="flex-1 h-px" style={{ background: "color-mix(in srgb, var(--ifm-color-primary) 30%, transparent)" }} />
    </div>
  );
}

export function MiniForkIndicator() {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-px h-3" style={{ background: "color-mix(in srgb, var(--ifm-color-primary) 30%, transparent)" }} />
      <div className="flex items-center w-full">
        <div className="flex-1 h-px" style={{ background: "color-mix(in srgb, var(--ifm-color-primary) 30%, transparent)" }} />
        <div className="mx-2">
          <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
            <path d="M1 1l3 3 3-3" stroke="var(--ifm-color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
          </svg>
        </div>
        <div className="flex-1 h-px" style={{ background: "color-mix(in srgb, var(--ifm-color-primary) 30%, transparent)" }} />
      </div>
    </div>
  );
}

export function LinearArchFlow({ layers }: { layers: LayerBlock[] }) {
  return (
    <div className="flex flex-col items-center w-full" style={{ maxWidth: 520 }}>
      {layers.map((block, idx) => (
        <React.Fragment key={idx}>
          <LayerCard block={block} />
          {idx < layers.length - 1 && <ArrowDown />}
        </React.Fragment>
      ))}
    </div>
  );
}

export function SequentialFlow({ layers }: { layers: LayerBlock[] }) {
  return (
    <>
      {layers.map((block, idx) => (
        <React.Fragment key={idx}>
          <div className="w-full"><LayerCard block={block} /></div>
          {idx < layers.length - 1 && <ArrowDown />}
        </React.Fragment>
      ))}
    </>
  );
}

export function CompactSequentialFlow({ layers }: { layers: LayerBlock[] }) {
  return (
    <>
      {layers.map((block, idx) => (
        <React.Fragment key={idx}>
          <div className="w-full"><CompactLayerCard block={block} /></div>
          {idx < layers.length - 1 && <ArrowDown />}
        </React.Fragment>
      ))}
    </>
  );
}

export function ResidualBlockFlow({ block }: { block: ResidualBlock }) {
  const isIdentitySkip = block.skipBranch.length === 0;

  return (
    <div className="flex flex-col items-center w-full">
      <MiniForkIndicator />

      <div className="grid grid-cols-2 gap-2 items-stretch w-full">
        <div className="flex flex-col items-center">
          <CompactSequentialFlow layers={block.mainBranch} />
        </div>
        <div className="flex flex-col items-center">
          {isIdentitySkip ? (
            <div className="flex flex-col items-center flex-1 w-full">
              <span className="text-[8px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-semibold mb-1">identity</span>
              <div className="w-px flex-1 min-h-[40px]" style={{ background: "color-mix(in srgb, var(--ifm-color-primary) 30%, transparent)" }} />
            </div>
          ) : (
            <>
              <CompactSequentialFlow layers={block.skipBranch} />
              <div className="flex-1 flex flex-col items-center pt-1 min-h-[8px]">
                <div className="w-px flex-1" style={{ background: "color-mix(in srgb, var(--ifm-color-primary) 30%, transparent)" }} />
              </div>
            </>
          )}
        </div>
      </div>

      <MiniMergeIndicator />

      <div className="w-full"><LayerCard block={block.merge} /></div>
    </div>
  );
}

export function MainPathFlow({ segments }: { segments: MainPathSegment[] }) {
  return (
    <div className="flex flex-col items-center w-full">
      {segments.map((segment, segIdx) => (
        <React.Fragment key={segIdx}>
          {segIdx > 0 && <ArrowDown />}
          {isResidualBlock(segment) ? (
            <ResidualBlockFlow block={segment} />
          ) : (
            <SequentialFlow layers={segment} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
