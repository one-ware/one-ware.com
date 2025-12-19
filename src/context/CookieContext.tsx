import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { loadTrackingScripts } from "../utils/tracking";

type ConsentStatus = "pending" | "all" | "necessary";

interface CookieContextValue {
  consentStatus: ConsentStatus;
  isLoaded: boolean;
  acceptAll: () => void;
  acceptNecessary: () => void;
  resetConsent: () => void;
}

const CookieContext = createContext<CookieContextValue | undefined>(undefined);

const STORAGE_KEY = "cookie-consent";

export function CookieProvider({ children }: { children: ReactNode }) {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>("pending");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "all" || stored === "necessary") {
      setConsentStatus(stored);
      if (stored === "all") {
        loadTrackingScripts();
      }
    }
    setIsLoaded(true);
  }, []);

  const acceptAll = () => {
    localStorage.setItem(STORAGE_KEY, "all");
    setConsentStatus("all");
    loadTrackingScripts();
  };

  const acceptNecessary = () => {
    localStorage.setItem(STORAGE_KEY, "necessary");
    setConsentStatus("necessary");
  };

  const resetConsent = () => {
    localStorage.removeItem(STORAGE_KEY);
    setConsentStatus("pending");
  };

  return (
    <CookieContext.Provider
      value={{
        consentStatus,
        isLoaded,
        acceptAll,
        acceptNecessary,
        resetConsent,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within a CookieProvider");
  }
  return context;
}
