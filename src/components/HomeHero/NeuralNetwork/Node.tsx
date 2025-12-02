import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { NeuralNode } from './types';

export const Node = React.memo(function Node({ node }: { node: NeuralNode }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  const currentScaleRef = useRef(0);

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

    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const glow = 0.5 + Math.sin(time * node.glowSpeed) * 0.5;

      if (meshRef.current.material instanceof THREE.MeshStandardMaterial) {
        meshRef.current.material.emissiveIntensity = 0.8 + glow * 0.4;
      }
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[node.size * 1.5, 16, 16]}>
        <meshBasicMaterial color={node.color} transparent opacity={0.15} />
      </Sphere>
      <Sphere ref={meshRef} args={[node.size, 32, 32]}>
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
