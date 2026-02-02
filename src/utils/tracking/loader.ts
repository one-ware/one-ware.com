import { TRACKING_CONFIG } from "./config";

let scriptsLoaded = false;

export function loadTrackingScripts(): void {
  if (scriptsLoaded || typeof window === "undefined") return;
  scriptsLoaded = true;

  loadGoogleAds();
  loadFacebookPixel();
  loadRedditPixel();
}

function loadGoogleAds(): void {
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${TRACKING_CONFIG.googleAds.id}`;
  script.async = true;
  document.head.appendChild(script);

  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).gtag = function () {
    (window as any).dataLayer.push(arguments);
  };
  (window as any).gtag("js", new Date());
  (window as any).gtag("config", TRACKING_CONFIG.googleAds.id);
}

function loadFacebookPixel(): void {
  const script = document.createElement("script");
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${TRACKING_CONFIG.facebook.pixelId}');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(script);
}

function loadRedditPixel(): void {
  const script = document.createElement("script");
  script.innerHTML = `
    !function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?
    p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};
    p.callQueue=[];var t=d.createElement("script");t.src=
    "https://www.redditstatic.com/ads/pixel.js";t.async=!0;
    d.head.appendChild(t)}}(window,document);
    rdt('init','${TRACKING_CONFIG.reddit.pixelId}');
    rdt('track', 'PageVisit');
  `;
  document.head.appendChild(script);
}
