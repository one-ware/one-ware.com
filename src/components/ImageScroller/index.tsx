import React from "react";
import { motion } from "framer-motion";

interface ImageScrollerProps {
  images: string[];
  speed?: number; // Dauer in Sekunden für eine komplette Schleife
}

export const ImageScroller: React.FC<ImageScrollerProps> = ({
  images,
  speed = 20,
}) => {
  const duplicatedImages = [...images, ...images]; // Für Endlos-Loop

  return (
    <div className="overflow-hidden w-full relative h-64">
      <motion.div
        className="flex absolute"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
        style={{ width: `${duplicatedImages.length * 100}px` }}
      >
        {duplicatedImages.map((src, index) => (
          <img
            key={index}
            src={src}
            className="h-64 w-auto mx-4"
            alt={`scroll-img-${index}`}
          />
        ))}
      </motion.div>
    </div>
  );
};