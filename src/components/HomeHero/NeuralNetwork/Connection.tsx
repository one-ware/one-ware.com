import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { NeuralNode } from './types';

export const Connection = React.memo(({ startNode, endNode, animationOffset }: {
  startNode: NeuralNode;
  endNode: NeuralNode;
  animationOffset: number;
}) => {
  const lineRef = useRef<THREE.Line>(null);
  const glowSegments = useRef<THREE.Line[]>([]);

  useFrame((state) => {
    const startScale = startNode.scale ?? 0;
    const endScale = endNode.scale ?? 0;
    const connectionOpacity = Math.min(startScale, endScale);

    if (lineRef.current) {
      const positions = lineRef.current.geometry.attributes.position;
      positions.setXYZ(0, startNode.currentPosition.x, startNode.currentPosition.y, startNode.currentPosition.z);
      positions.setXYZ(1, endNode.currentPosition.x, endNode.currentPosition.y, endNode.currentPosition.z);
      positions.needsUpdate = true;

      if (lineRef.current.material instanceof THREE.LineBasicMaterial) {
        lineRef.current.material.opacity = 0.25 * connectionOpacity;
      }
    }

    const time = state.clock.getElapsedTime();
    const progress = ((time * 0.4 + animationOffset) % 1);

    const fadeIn = Math.min(progress * 5, 1);
    const fadeOut = Math.min((1 - progress) * 5, 1);
    const baseFade = Math.min(fadeIn, fadeOut);

    glowSegments.current.forEach((segment, idx) => {
      if (segment) {
        const centerIdx = 5;
        const layerOffset = (idx - centerIdx) * 0.015;
        const segmentProgress = progress + layerOffset;

        const segmentHalfLength = 0.025;

        const startX = startNode.currentPosition.x + (endNode.currentPosition.x - startNode.currentPosition.x) * Math.max(0, Math.min(1, segmentProgress - segmentHalfLength));
        const startY = startNode.currentPosition.y + (endNode.currentPosition.y - startNode.currentPosition.y) * Math.max(0, Math.min(1, segmentProgress - segmentHalfLength));
        const startZ = startNode.currentPosition.z + (endNode.currentPosition.z - startNode.currentPosition.z) * Math.max(0, Math.min(1, segmentProgress - segmentHalfLength));

        const endX = startNode.currentPosition.x + (endNode.currentPosition.x - startNode.currentPosition.x) * Math.max(0, Math.min(1, segmentProgress + segmentHalfLength));
        const endY = startNode.currentPosition.y + (endNode.currentPosition.y - startNode.currentPosition.y) * Math.max(0, Math.min(1, segmentProgress + segmentHalfLength));
        const endZ = startNode.currentPosition.z + (endNode.currentPosition.z - startNode.currentPosition.z) * Math.max(0, Math.min(1, segmentProgress + segmentHalfLength));

        const positions = segment.geometry.attributes.position;
        positions.setXYZ(0, startX, startY, startZ);
        positions.setXYZ(1, endX, endY, endZ);
        positions.needsUpdate = true;

        const distanceFromCenter = Math.abs(idx - centerIdx);
        const normalizedDistance = distanceFromCenter / centerIdx;
        const opacityMultiplier = Math.pow(1 - normalizedDistance, 2.5);

        if (segment.material instanceof THREE.LineBasicMaterial) {
          segment.material.opacity = baseFade * opacityMultiplier * 0.8 * connectionOpacity;
        }
      }
    });
  });

  const lineColor = '#00FFD1';

  const [baseLine] = useState(() => {
    const points = [startNode.currentPosition.clone(), endNode.currentPosition.clone()];
    const baseGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const baseMaterial = new THREE.LineBasicMaterial({ color: lineColor, transparent: true, opacity: 0.25 });
    return new THREE.Line(baseGeometry, baseMaterial);
  });

  const [glowLines] = useState(() => {
    const points = [startNode.currentPosition.clone(), endNode.currentPosition.clone()];
    return Array.from({ length: 11 }, () => {
      const glowGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const glowMaterial = new THREE.LineBasicMaterial({ color: lineColor, transparent: true, opacity: 0 });
      return new THREE.Line(glowGeometry, glowMaterial);
    });
  });

  useEffect(() => {
    return () => {
      if (baseLine.geometry) baseLine.geometry.dispose();
      if (baseLine.material instanceof THREE.Material) baseLine.material.dispose();

      glowLines.forEach(line => {
        if (line.geometry) line.geometry.dispose();
        if (line.material instanceof THREE.Material) line.material.dispose();
      });
    };
  }, [baseLine, glowLines]);

  return (
    <group>
      <primitive object={baseLine} ref={lineRef} />
      {glowLines.map((glowLine, i) => (
        <primitive
          key={`glow-${i}`}
          object={glowLine}
          ref={(el: THREE.Line) => {
            if (el) glowSegments.current[i] = el;
          }}
        />
      ))}
    </group>
  );
});
Connection.displayName = 'Connection';
