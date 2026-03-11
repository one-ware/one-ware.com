import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function ArchViewerControls({ scale, zoomIn, zoomOut, onExpand }: { scale: number; zoomIn: () => void; zoomOut: () => void; onExpand: () => void }) {
  return (
    <div className="absolute top-4 right-4 flex flex-col gap-1 z-10">
      <button
        onClick={onExpand}
        className="w-8 h-8 flex items-center justify-center rounded text-sm font-bold dark:text-white text-gray-800 hover:bg-gray-200 dark:hover:bg-[#333] transition-colors"
        style={{ background: "var(--arch-card-bg)", border: "1px solid var(--arch-card-border)" }}
        title="Expand"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
        </svg>
      </button>
      <button
        onClick={zoomIn}
        className="w-8 h-8 flex items-center justify-center rounded text-sm font-bold dark:text-white text-gray-800 hover:bg-gray-200 dark:hover:bg-[#333] transition-colors"
        style={{ background: "var(--arch-card-bg)", border: "1px solid var(--arch-card-border)" }}
      >+</button>
      <button
        onClick={zoomOut}
        className="w-8 h-8 flex items-center justify-center rounded text-sm font-bold dark:text-white text-gray-800 hover:bg-gray-200 dark:hover:bg-[#333] transition-colors"
        style={{ background: "var(--arch-card-bg)", border: "1px solid var(--arch-card-border)" }}
      >-</button>
    </div>
  );
}

export function ArchitectureViewer({ children, onExpand }: { children: React.ReactNode; onExpand: () => void }) {
  const [scale, setScale] = useState(0.75);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const zoomIn = () => setScale(s => Math.min(+(s + 0.1).toFixed(1), 2));
  const zoomOut = () => setScale(s => Math.max(+(s - 0.1).toFixed(1), 0.3));

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContentHeight(entry.contentRect.height);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="absolute inset-0 rounded-lg overflow-hidden backdrop-blur-sm bg-white/[0.03] lg:relative lg:h-full lg:min-h-0" style={{ border: "1px solid var(--arch-card-border)" }}>
      <div className="overflow-auto h-full p-6">
        <div style={{ height: contentHeight ? contentHeight * scale : "auto" }}>
          <div ref={contentRef} style={{ transformOrigin: "top center", minWidth: "fit-content", transform: `scale(${scale})` }}>
            {children}
          </div>
        </div>
      </div>
      <ArchViewerControls scale={scale} zoomIn={zoomIn} zoomOut={zoomOut} onExpand={onExpand} />
    </div>
  );
}

export function ArchitectureModal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  const [scale, setScale] = useState(0.75);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const zoomIn = () => setScale(s => Math.min(+(s + 0.1).toFixed(1), 2));
  const zoomOut = () => setScale(s => Math.max(+(s - 0.1).toFixed(1), 0.3));

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContentHeight(entry.contentRect.height);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    const scrollY = window.scrollY;
    document.addEventListener("keydown", handleEsc);
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 9999 }} onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative w-[90vw] h-[90vh] rounded-lg overflow-hidden bg-[#161616]"
        style={{ border: "1px solid var(--arch-card-border)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-auto h-full p-6">
          <div style={{ height: contentHeight ? contentHeight * scale : "auto" }}>
            <div ref={contentRef} style={{ transformOrigin: "top center", minWidth: "fit-content", transform: `scale(${scale})` }}>
              {children}
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4 flex flex-col gap-1 z-10">
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded text-sm font-bold dark:text-white text-gray-800 hover:bg-gray-200 dark:hover:bg-[#333] transition-colors"
            style={{ background: "var(--arch-card-bg)", border: "1px solid var(--arch-card-border)" }}
            title="Close"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <button
            onClick={zoomIn}
            className="w-8 h-8 flex items-center justify-center rounded text-sm font-bold dark:text-white text-gray-800 hover:bg-gray-200 dark:hover:bg-[#333] transition-colors"
            style={{ background: "var(--arch-card-bg)", border: "1px solid var(--arch-card-border)" }}
          >+</button>
          <button
            onClick={zoomOut}
            className="w-8 h-8 flex items-center justify-center rounded text-sm font-bold dark:text-white text-gray-800 hover:bg-gray-200 dark:hover:bg-[#333] transition-colors"
            style={{ background: "var(--arch-card-bg)", border: "1px solid var(--arch-card-border)" }}
          >-</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
