import React from "react";

export default function BackgroundGridSimple() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <img
        src="/img/background.webp"
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute left-0 top-0 w-full h-full object-cover md:object-center"
        style={{ objectPosition: '70% center' }}
      />
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}
