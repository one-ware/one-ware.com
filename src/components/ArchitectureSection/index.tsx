import React, { useState } from "react";
import Translate from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import HeroBackground from "../HeroBackground";
import { LayerCard, ArrowDown, LinearArchFlow, MainPathFlow } from "./ArchFlowComponents";
import { ArchitectureViewer, ArchitectureModal } from "./ArchitectureViewer";
import { ArchModelSelector } from "./ArchModelSelector";
import {
  archModels,
  linearArch,
  multiInputShared,
  multiInputMainSegments,
  multiInputBranch,
  multiInputMerged,
} from "./data";

export default function ArchitectureSection() {
  const [activeModel, setActiveModel] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState(false);

  const models = archModels;

  const currentModel = models[activeModel];

  const viewerContent = (
    <div className="flex flex-col items-center">
      {activeModel === 0 ? (
        <LinearArchFlow layers={linearArch} />
      ) : (
        <>
          <div className="w-full" style={{ maxWidth: 520 }}>
            <LayerCard block={multiInputShared} />
          </div>
          <div className="flex flex-col items-center w-full" style={{ maxWidth: 1060 }}>
            <div className="w-px h-5" style={{ background: "color-mix(in srgb, var(--ifm-color-primary) 30%, transparent)" }} />
            <div className="flex items-center w-full">
              <div className="flex-1 h-px" style={{ background: "color-mix(in srgb, var(--ifm-color-primary) 30%, transparent)" }} />
              <div className="mx-4">
                <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
                  <path d="M1 1l3 3 3-3" stroke="var(--ifm-color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
                </svg>
              </div>
              <div className="flex-1 h-px" style={{ background: "color-mix(in srgb, var(--ifm-color-primary) 30%, transparent)" }} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch w-full" style={{ maxWidth: 1060 }}>
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-wider text-[var(--ifm-color-primary)] font-semibold mb-3">Main Path</span>
              <MainPathFlow segments={multiInputMainSegments} />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-wider text-[var(--ifm-color-primary)] font-semibold mb-3">In-Connect Branch</span>
              {multiInputBranch.map((block, idx) => (
                <React.Fragment key={idx}>
                  <div className="w-full" style={{ maxWidth: 520 }}><LayerCard block={block} /></div>
                  {idx < multiInputBranch.length - 1 && <ArrowDown />}
                </React.Fragment>
              ))}
              <div className="flex-1 flex flex-col items-center pt-1 min-h-[20px]">
                <div className="w-px flex-1" style={{ background: "color-mix(in srgb, var(--ifm-color-primary) 30%, transparent)" }} />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full my-3" style={{ maxWidth: 1060 }}>
            <div className="flex-1 h-px" style={{ background: "color-mix(in srgb, var(--ifm-color-primary) 30%, transparent)" }} />
            <div className="flex flex-col items-center mx-4">
              <svg width="8" height="5" viewBox="0 0 8 5" fill="none">
                <path d="M1 1l3 3 3-3" stroke="var(--ifm-color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
              </svg>
            </div>
            <div className="flex-1 h-px" style={{ background: "color-mix(in srgb, var(--ifm-color-primary) 30%, transparent)" }} />
          </div>
          <div className="w-full" style={{ maxWidth: 520 }}>
            {multiInputMerged.map((block, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center">
                  <LayerCard block={block} />
                  {idx < multiInputMerged.length - 1 && <ArrowDown />}
                </div>
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );

  return (
    <HeroBackground
      className="flex flex-col"
      style={{ height: "calc(100vh - var(--ifm-navbar-height))", maxHeight: "calc(100vh - var(--ifm-navbar-height))", overflow: "hidden" }}
      enableParallax={false}
    >
      <div className="container mx-auto px-6 pt-6 pb-2 flex-shrink-0">
        <div className="max-w-6xl mx-auto">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-left mb-1">
            <Translate id="oneai.architecture.title">
              Example AI Architectures
            </Translate>
          </p>
          <p className="text-sm sm:text-base lg:text-lg font-normal text-gray-500 dark:text-gray-400 mb-0">
            <Translate id="oneai.architecture.subtitle">
              Custom neural networks generated by ONE AI — optimized for your specific application
            </Translate>
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 flex-1 min-h-0 overflow-hidden pb-6">
        <div className="max-w-6xl mx-auto h-full min-h-0">
          <div className="grid grid-cols-[2fr_3fr] gap-8 h-full min-h-0">
            <div className="flex flex-col min-h-0 overflow-hidden">
              <ArchModelSelector
                models={models}
                activeModel={activeModel}
                onSelect={setActiveModel}
              />
              <div className="flex-1 min-h-0 flex items-center justify-center overflow-hidden mt-4">
                <img
                  src={useBaseUrl(currentModel.image)}
                  alt={currentModel.label}
                  className="w-full max-h-full object-contain rounded-lg"
                />
              </div>
            </div>
            <ArchitectureViewer onExpand={() => setModalOpen(true)}>
              {viewerContent}
            </ArchitectureViewer>
          </div>
        </div>
      </div>

      {modalOpen && (
        <ArchitectureModal onClose={() => setModalOpen(false)}>
          {viewerContent}
        </ArchitectureModal>
      )}

      <style>{`
        :root {
          --arch-card-bg: rgba(0, 0, 0, 0.03);
          --arch-card-border: rgba(0, 0, 0, 0.08);
        }
        [data-theme='dark'] {
          --arch-card-bg: rgba(255, 255, 255, 0.03);
          --arch-card-border: rgba(255, 255, 255, 0.08);
        }
      `}</style>
    </HeroBackground>
  );
}
