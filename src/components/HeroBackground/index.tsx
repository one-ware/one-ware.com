import React, { useEffect, useState, useRef } from "react";
import { useColorMode } from "@docusaurus/theme-common";

interface HeroBackgroundProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  enableParallax?: boolean;
}

export default function HeroBackground({
  children,
  className = "",
  style = {},
  enableParallax = true,
}: HeroBackgroundProps) {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!enableParallax) return;

    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();

        if (rect.bottom > 0) {
          const progress = Math.max(0, -rect.top);
          setScrollY(progress);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [enableParallax]);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        background: isDarkMode ? "#161616" : "#ffffff",
        ...style,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          background: `
            radial-gradient(
              ellipse 80% 60% at 90% 10%,
              var(--ifm-color-primary-lighter) 0%,
              transparent 70%
            ),
            radial-gradient(
              ellipse 70% 55% at 10% 105%,
              var(--ifm-color-primary-lighter) 0%,
              transparent 70%
            )
          `,
          opacity: enableParallax
            ? Math.max((isDarkMode ? 0.15 : 0.25) - scrollY * 0.00006, 0)
            : (isDarkMode ? 0.15 : 0.25),
          transform: enableParallax ? `translateY(${scrollY * 0.04}px)` : "none",
          willChange: enableParallax ? "transform, opacity" : "auto",
          zIndex: 0,
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${isDarkMode ? "rgba(0, 200, 170, 0.12)" : "rgba(0, 140, 120, 0.1)"} 1px, transparent 1px),
            linear-gradient(to bottom, ${isDarkMode ? "rgba(0, 200, 170, 0.12)" : "rgba(0, 140, 120, 0.1)"} 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          maskImage: `
            linear-gradient(
              150deg,
              transparent 0%,
              transparent 15%,
              black 33%,
              black 67%,
              transparent 85%,
              transparent 100%
            )
          `,
          WebkitMaskImage: `
            linear-gradient(
              150deg,
              transparent 0%,
              transparent 15%,
              black 33%,
              black 67%,
              transparent 85%,
              transparent 100%
            )
          `,
          transform: enableParallax ? `scale(${1 + scrollY * 0.0002}) rotate(${scrollY * 0.004}deg)` : "none",
          willChange: enableParallax ? "transform" : "auto",
          zIndex: 1,
        }}
      />

      <div className="relative h-full w-full flex-1" style={{ zIndex: 2 }}>
        {children}
      </div>
    </section>
  );
}
