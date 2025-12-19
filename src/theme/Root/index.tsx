import React from "react";
import { CookieProvider } from "@site/src/context/CookieContext";
import CookieConsent from "@site/src/components/CookieConsent";

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <CookieProvider>
      {children}
      <CookieConsent />
    </CookieProvider>
  );
}
