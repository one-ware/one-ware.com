import { TRACKING_CONFIG } from "./config";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
    rdt: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export type TrackingEvent =
  | "contact_form_submit"
  | "schedule_meeting"
  | "linkedin_click"
  | "email_click"
  | "event_registration"
  | "download_start";

interface EventData {
  label?: string;
  value?: number;
}

export function trackEvent(eventType: TrackingEvent, data?: EventData): void {
  if (!hasTrackingConsent()) return;
  if (typeof window === "undefined") return;

  trackGoogleAds(eventType, data);
  trackFacebook(eventType, data);
  trackReddit(eventType, data);
}

function trackGoogleAds(eventType: TrackingEvent, data?: EventData): void {
  if (!window.gtag) return;

  window.gtag("event", "conversion", {
    send_to: TRACKING_CONFIG.googleAds.conversionId,
    event_category: "conversion",
    event_label: data?.label || eventType,
  });
}

function trackFacebook(eventType: TrackingEvent, data?: EventData): void {
  if (!window.fbq) return;

  const fbEventMap: Record<TrackingEvent, string> = {
    contact_form_submit: "Lead",
    schedule_meeting: "Schedule",
    linkedin_click: "Contact",
    email_click: "Contact",
    event_registration: "Lead",
    download_start: "Download",
  };

  window.fbq("track", fbEventMap[eventType], {
    content_name: data?.label || eventType,
  });
}

function trackReddit(eventType: TrackingEvent, data?: EventData): void {
  if (!window.rdt) return;

  const rdtEventMap: Record<TrackingEvent, string> = {
    contact_form_submit: "Lead",
    schedule_meeting: "Lead",
    linkedin_click: "Lead",
    email_click: "Lead",
    event_registration: "SignUp",
    download_start: "Lead",
  };

  window.rdt("track", rdtEventMap[eventType], {
    customEventName: data?.label || eventType,
  });
}

function hasTrackingConsent(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("cookie-consent") === "all";
}
