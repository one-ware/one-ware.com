import React from "react";
import { useCookieConsent } from "../../context/CookieContext";
import Translate from "@docusaurus/Translate";

export default function CookieConsent() {
  const { consentStatus, isLoaded, acceptAll, acceptNecessary } = useCookieConsent();

  if (!isLoaded || consentStatus !== "pending") return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] w-[calc(100%-2rem)] max-w-3xl">
      <div
        className="px-5 py-4 shadow-2xl backdrop-blur-xl"
        style={{
          background: "linear-gradient(135deg, rgba(20, 20, 20, 0.95), rgba(30, 30, 30, 0.95))",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)"
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-8 h-8 bg-[var(--ifm-color-primary)]/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-[var(--ifm-color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <p className="text-white/80 text-sm m-0">
              <Translate id="cookies.message">
                We use cookies for marketing and analytics to improve our services and measure the success of our campaigns.
              </Translate>
            </p>
          </div>

          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={acceptNecessary}
              className="group relative px-4 py-2 font-medium text-sm overflow-hidden transition-all duration-300"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}
            >
              <span className="relative z-10 text-white/80 group-hover:text-white transition-colors whitespace-nowrap">
                <Translate id="cookies.necessary">Necessary only</Translate>
              </span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(255, 255, 255, 0.05)" }}
              />
            </button>
            <button
              onClick={acceptAll}
              className="group relative px-4 py-2 font-medium text-sm overflow-hidden transition-all duration-300"
              style={{
                background: "rgba(0, 255, 209, 0.05)",
                border: "1px solid rgba(0, 255, 209, 0.3)"
              }}
            >
              <span className="relative z-10 text-[var(--ifm-color-primary)] group-hover:text-[var(--ifm-color-primary-lighter)] transition-colors whitespace-nowrap">
                <Translate id="cookies.accept">Accept all</Translate>
              </span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(0, 255, 209, 0.08)" }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
