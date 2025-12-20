import React, { useState, useEffect, useRef } from "react";
import Translate from "@docusaurus/Translate";
import VideoShowcaseCard from "./VideoShowcaseCard";

const demos = [
  
  {
    title: "High Speed Quality Control",
    video: "/img/demos/chip.webm",
    image: "/img/ai/one_ai_plugin/use_cases/chip/defect.png",
    link: "/docs/one-ai/tutorials/potato-chip-demo",
    metrics: {
      left: { value: 24, unit: " x", label: "Less Errors vs Universal AI" },
      center: { value: "Efficient" as const, label: "AI Model" },
      right: { value: 72, unit: " x", label: "Faster vs Universal AI" },
    },
  },
  {
    title: "Object Detection with Comparison",
    video: "/img/demos/drone.webm",
    image: "/img/demos/compare.jpg",
    link: "/docs/one-ai/use-cases/difference-detection",
    metrics: {
      left: { value: 10, unit: " x", label: "Less Errors vs YOLOv8" },
      center: { value: "Balanced" as const, label: "AI Model" },
      right: { value: 8, unit: " x", label: "More Efficient vs YOLOv8" },
    },
  },
  {
    title: "High Precision Object Detection",
    image: "/img/ai/one_ai_plugin/use_cases/pcb/pcb.png",
    link: "/docs/one-ai/use-cases/pcb",
    metrics: {
      left: { value: 6.4, unit: " x", label: "Less Errors vs Image Processing" },
      center: { value: "Advanced" as const, label: "AI Model" },
      right: { value: 7.5, unit: " x", label: "Faster vs AI from Scientists" },
    },
  },
  {
    title: "Simple Object Detection",
    video: "/img/demos/cup.webm",
    image: "/img/ai/one_ai_plugin/demos/tea_cup_print/demo.png",
    link: "/docs/one-ai/tutorials/teacup-print-detection",
    metrics: {
      left: { value: 100, unit: " %", label: "Accuracy"},
      center: { value: "Efficient" as const, label: "AI Model" },
      right: { value: 16, unit: "", label: "Images for Training" , startValue: 20000 },
    },
  },
  {
    title: "Simple Classification",
    video: "/img/demos/number.webm",
    image: "/img/ai/one_ai_plugin/demos/handwritten-digits/nist_sd19_examples.jpg",
    link: "/docs/one-ai/tutorials/handwritten-digits-demo",
    metrics: {
      left: { value: 99, unit: " %", label: "Accuracy" },
      center: { value: "Efficient" as const, label: "AI Model" },
      right: { value: 100, unit: " x", label: " Faster vs ResNet18", prefix: ">"},
    },
  },
  {
    title: "All-in-ONE Quality Control",
    image: "/img/ai/one_ai_plugin/use_cases/capture/preview.png",
    link: "/docs/one-ai/use-cases/camera-tool",
    metrics: {
      left: { value: 1, unit: "-Click", label: "Deployment", startValue: 50 },
      center: { value: "Any" as const, label: "AI Model" },
      right: { value: 1, unit: " Day", label: "Development Time", startValue: 300, prefix: "<" },
    },
  },
  
];

export default function VideoShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const currentActive = hoveredIndex !== null ? hoveredIndex : activeIndex;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = Number(entry.target.getAttribute('data-index'));
              setActiveIndex(index);
            }
          });
        },
        {
          threshold: 0.6,
          rootMargin: "-10% 0px -10% 0px"
        }
      );

      observerRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });

      return () => observer.disconnect();
    }

    if (hoveredIndex !== null) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
      return;
    }

    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % demos.length);
    }, 2000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [hoveredIndex, isMobile]);

  return (
    <section className="py-6 md:py-8">
      <div className="container mx-auto px-4">
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center font-bold mb-8 md:mb-12">
          <Translate id="homepage.usecase.title">Showcase</Translate>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((demo, idx) => (
            <div 
              key={idx}
              ref={el => { observerRefs.current[idx] = el }}
              data-index={idx}
            >
              <VideoShowcaseCard
                video={demo.video}
                image={demo.image}
                title={demo.title}
                metrics={demo.metrics}
                link={demo.link}
                isActive={currentActive === idx}
                onMouseEnter={() => !isMobile && setHoveredIndex(idx)}
                onMouseLeave={() => !isMobile && setHoveredIndex(null)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
