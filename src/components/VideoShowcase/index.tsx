import React, { useState, useEffect, useRef } from "react";
import Translate from "@docusaurus/Translate";
import VideoShowcaseCard from "./VideoShowcaseCard";

const demos = [
  {
    title: "Lorem Ipsum Dolor",
    video: "/img/demos/drive.webm",
    metrics: { accuracy: 98, complexity: "Low" as const, speedVsYolo: "15x" },
  },
  {
    title: "Consectetur Adipiscing",
    video: "/img/demos/drive.webm",
    metrics: { accuracy: 97, complexity: "Medium" as const, speedVsYolo: "12x" },
  },
  {
    title: "Sed Do Eiusmod",
    video: "/img/demos/drive.webm",
    metrics: { accuracy: 99, complexity: "Low" as const, speedVsYolo: "20x" },
  },
  {
    title: "Tempor Incididunt",
    video: "/img/demos/drive.webm",
    metrics: { accuracy: 96, complexity: "Low" as const, speedVsYolo: "18x" },
  },
  {
    title: "Labore Et Dolore",
    video: "/img/demos/drive.webm",
    metrics: { accuracy: 95, complexity: "Medium" as const, speedVsYolo: "10x" },
  },
  {
    title: "Magna Aliqua Ut",
    video: "/img/demos/drive.webm",
    metrics: { accuracy: 94, complexity: "Low" as const, speedVsYolo: "14x" },
  },
];

export default function VideoShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const currentActive = hoveredIndex !== null ? hoveredIndex : activeIndex;

  useEffect(() => {
    if (hoveredIndex !== null) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
      return;
    }

    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % demos.length);
    }, 5000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [hoveredIndex]);

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center font-bold mb-8 md:mb-12">
          <Translate id="homepage.usecase.title">Example Use-Cases</Translate>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((demo, idx) => (
            <VideoShowcaseCard
              key={idx}
              video={demo.video}
              title={demo.title}
              metrics={demo.metrics}
              isActive={currentActive === idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
