import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { NeuralNode } from './types';

export const Node = React.memo(function Node({
  node,
  performanceTier = 'high'
}: {
  node: NeuralNode;
  performanceTier?: 'high' | 'low';
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  const currentScaleRef = useRef(0);

  const segments = performanceTier === 'low' ? 6 : 12;
  const outerSegments = performanceTier === 'low' ? 4 : 8;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.copy(node.currentPosition);

      const targetScale = node.scale !== undefined ? node.scale : 1;
      const diff = targetScale - currentScaleRef.current;

      if (Math.abs(diff) > 0.001) {
        currentScaleRef.current += diff * 0.1;
      } else {
        currentScaleRef.current = targetScale;
      }

      groupRef.current.scale.setScalar(currentScaleRef.current);
    }

    if (meshRef.current && performanceTier === 'high') {
      const time = state.clock.getElapsedTime();
      const glow = 0.5 + Math.sin(time * node.glowSpeed) * 0.5;

      if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
        meshRef.current.material.emissiveIntensity = 0.8 + glow * 0.4;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {performanceTier === 'high' && (
        <Sphere args={[node.size * 1.5, outerSegments, outerSegments]}>
          <meshBasicMaterial color={node.color} transparent opacity={0.15} />
        </Sphere>
      )}
      <Sphere ref={meshRef} args={[node.size, segments, segments]}>
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={1}
          metalness={0.6}
          roughness={0.2}
        />
      </Sphere>
    </group>
  );
});
Node.displayName = 'Node';
