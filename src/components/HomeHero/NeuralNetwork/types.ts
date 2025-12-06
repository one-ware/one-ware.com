import * as THREE from 'three';

export interface NeuralNode {
  id: number;
  basePosition: THREE.Vector3;
  currentPosition: THREE.Vector3;
  size: number;
  connections: NeuralNode[];
  glowSpeed: number;
  moveOffset: THREE.Vector3;
  moveSpeed: number;
  color: string;
  scale?: number;
}
