import React, { useRef, useState, useEffect, useMemo, memo, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { NeuralNode } from './types';
import { InstancedNodes } from './InstancedNodes';

const _diff = new THREE.Vector3();
const _centerPull = new THREE.Vector3();
const _noise = new THREE.Vector3();
const _force = new THREE.Vector3();
const _tempVec = new THREE.Vector3();
const _zeroVec = new THREE.Vector3(0, 0, 0);

const PHYSICS_FRAME_SKIP = 2;
const SPATIAL_CELL_SIZE = 4;

const NODE_COUNTS = {
  high: { base: 20, training: 20 },
  low: { base: 10, training: 10 },
};

const TOTAL_ANIMATION_DURATION = 3750;

interface Neural3DNetworkProps {
  isTraining?: boolean;
  isBuildingBase?: boolean;
  isRebuilding?: boolean;
  isResetting?: boolean;
  isExpanded?: boolean;
  shouldReset?: boolean;
  startDelay?: number;
  onTrainingComplete?: () => void;
  isCollapsingToCore?: boolean;
  isRebuildingBase?: boolean;
  trainingColor?: 'orange' | 'purple' | 'red';
  onCollapseComplete?: () => void;
  onRebuildComplete?: () => void;
  currentFps?: number;
  isSmallScreen?: boolean;
  nodeCount?: number;
  trainingNodeCount?: number;
  physicsUpdateInterval?: number;
  performanceTier?: 'high' | 'low';
}

export const Neural3DNetwork = memo(function Neural3DNetwork({
  isTraining = false,
  isBuildingBase = false,
  isRebuilding = false,
  isResetting = false,
  isExpanded = false,
  shouldReset = false,
  startDelay = 0,
  onTrainingComplete,
  isCollapsingToCore = false,
  isRebuildingBase = false,
  trainingColor = 'orange',
  onCollapseComplete,
  onRebuildComplete,
  currentFps = 50,
  isSmallScreen: isSmallScreenProp,
  performanceTier = 'high'
}: Neural3DNetworkProps) {
  const groupRef = useRef<THREE.Group>(null);

  const connectionPairsRef = useRef<Array<{ id: number; start: NeuralNode; end: NeuralNode; animationOffset: number }>>([]);

  const nodesRef = useRef<NeuralNode[]>([]);
  const blueprintRef = useRef<NeuralNode[]>([]);
  const nodeIdCounterRef = useRef(0);
  const connectionIdCounterRef = useRef(0);
  const animationOffsetsRef = useRef<Map<string, number>>(new Map());

  const isBuildingBaseRef = useRef(false);
  const buildBaseStartTimeRef = useRef(0);
  const builtCountRef = useRef(0);

  const isTrainingRef = useRef(false);
  const trainingStartTimeRef = useRef(0);
  const hasTriggeredTrainingComplete = useRef(false);
  const [orangeNodesAdded, setOrangeNodesAdded] = useState(false);

  const isRebuildingRef = useRef(false);
  const rebuildStartTimeRef = useRef(0);
  const [purpleNodesAdded, setPurpleNodesAdded] = useState(false);
  const [redNodesAdded, setRedNodesAdded] = useState(false);
  const [isSmallScreenInternal, setIsSmallScreenInternal] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false
  );

  useEffect(() => {
    if (isSmallScreenProp !== undefined) return;
    const checkScreenSize = () => {
      setIsSmallScreenInternal(window.innerWidth < 1024);
    };
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [isSmallScreenProp]);

  const isSmallScreen = isSmallScreenProp ?? isSmallScreenInternal;

  useEffect(() => {
    if (trainingColor === 'orange') {
      setPurpleNodesAdded(false);
      setRedNodesAdded(false);
    }
  }, [trainingColor]);

  useEffect(() => {
    if (isCollapsingToCore) {
      setRedNodesAdded(false);
    }
  }, [isCollapsingToCore]);

  const isResettingRef = useRef(false);
  const resetStartTimeRef = useRef(0);

  const isCollapsingToCoreRef = useRef(false);
  const collapseStartTimeRef = useRef(0);
  const hasTriggeredCollapseComplete = useRef(false);

  const isRebuildingBaseRef = useRef(false);
  const rebuildBaseStartTimeRef = useRef(0);
  const hasTriggeredRebuildComplete = useRef(false);
  const rebuildBuiltCountRef = useRef(0);

  const onTrainingCompleteRef = useRef(onTrainingComplete);
  onTrainingCompleteRef.current = onTrainingComplete;

  const onCollapseCompleteRef = useRef(onCollapseComplete);
  onCollapseCompleteRef.current = onCollapseComplete;

  const onRebuildCompleteRef = useRef(onRebuildComplete);
  onRebuildCompleteRef.current = onRebuildComplete;

  const trainingColorRef = useRef(trainingColor);
  trainingColorRef.current = trainingColor;

  const performanceTierRef = useRef(performanceTier);
  performanceTierRef.current = performanceTier;

  useEffect(() => {
    if (blueprintRef.current.length > 0) return;

    const generated: NeuralNode[] = [];
    nodeIdCounterRef.current = 0;

    generated.push({
      id: nodeIdCounterRef.current++,
      basePosition: new THREE.Vector3(0, 0, 0),
      currentPosition: new THREE.Vector3(0, 0, 0),
      size: 0.25,
      connections: [],
      glowSpeed: 1.5,
      moveOffset: new THREE.Vector3(0, 0, 0),
      moveSpeed: 0.2,
      color: '#00FFD1',
      scale: 0,
    });

    const totalNodes = NODE_COUNTS[performanceTier].base;
    const radius = 3.5;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    
    for (let i = 0; i < totalNodes; i++) {
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - 2 * (i + 0.5) / totalNodes);
      const r = radius * (0.85 + Math.random() * 0.3);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      generated.push({
        id: nodeIdCounterRef.current++,
        basePosition: new THREE.Vector3(x, y, z),
        currentPosition: new THREE.Vector3(x, y, z),
        size: 0.12 + Math.random() * 0.06,
        connections: [],
        glowSpeed: 2 + Math.random() * 2,
        moveOffset: new THREE.Vector3(Math.random() * 10, Math.random(), Math.random()),
        moveSpeed: 0.4,
        color: '#00FFD1',
        scale: 0,
      });
    }

    blueprintRef.current = generated;
    nodesRef.current = [];
  }, []);

  const connectNodeToExisting = (newNode: NeuralNode, existingNodes: NeuralNode[], pushToPairs = true) => {
      if (existingNodes.length === 0) return [];

      let nearest1: NeuralNode | null = null;
      let nearest2: NeuralNode | null = null;
      let dist1 = Infinity;
      let dist2 = Infinity;

      for (let i = 0; i < existingNodes.length; i++) {
          const n = existingNodes[i];
          const d = newNode.basePosition.distanceToSquared(n.basePosition);
          if (d < dist1) {
              dist2 = dist1;
              nearest2 = nearest1;
              dist1 = d;
              nearest1 = n;
          } else if (d < dist2) {
              dist2 = d;
              nearest2 = n;
          }
      }

      const targets = nearest2 ? [nearest1!, nearest2] : (nearest1 ? [nearest1] : []);
      const newPairs: Array<{ id: number; start: NeuralNode; end: NeuralNode; animationOffset: number }> = [];

      for (let i = 0; i < targets.length; i++) {
          const target = targets[i];
          newNode.connections.push(target);
          target.connections.push(newNode);

          const key = `${Math.min(newNode.id, target.id)}-${Math.max(newNode.id, target.id)}`;
          let offset = animationOffsetsRef.current.get(key);
          if (offset === undefined) {
              offset = Math.random() * 10;
              animationOffsetsRef.current.set(key, offset);
          }
          const pair = { id: connectionIdCounterRef.current++, start: newNode, end: target, animationOffset: offset };
          if (pushToPairs) {
              connectionPairsRef.current.push(pair);
          }
          newPairs.push(pair);
      }
      return newPairs;
  };

  useEffect(() => {
    if (isBuildingBase) {
        isBuildingBaseRef.current = true;
        buildBaseStartTimeRef.current = performance.now();

        if (blueprintRef.current.length > 0) {
            const core = blueprintRef.current[0];
            core.scale = 1;
            nodesRef.current = [core];
            connectionPairsRef.current = [];
            connectionIdCounterRef.current = 0;
            builtCountRef.current = 1;
        }
    } else {
        isBuildingBaseRef.current = false;
        if (builtCountRef.current > 0 && blueprintRef.current.length > 0 && nodesRef.current.length < blueprintRef.current.length) {
             const allBase = blueprintRef.current;

             for (let i = nodesRef.current.length; i < allBase.length; i++) {
                 const node = allBase[i];
                 node.scale = 1;
                 connectNodeToExisting(node, nodesRef.current);
                 nodesRef.current.push(node);
             }

             builtCountRef.current = allBase.length;
        }
    }
  }, [isBuildingBase]);

  useEffect(() => {
    if (isCollapsingToCore) {
      isCollapsingToCoreRef.current = true;
      collapseStartTimeRef.current = performance.now();
      hasTriggeredCollapseComplete.current = false;
    } else {
      isCollapsingToCoreRef.current = false;
    }
  }, [isCollapsingToCore]);

  useEffect(() => {
    if (isRebuildingBase && !isCollapsingToCore) {
      isRebuildingBaseRef.current = true;
      rebuildBaseStartTimeRef.current = performance.now();
      hasTriggeredRebuildComplete.current = false;
      rebuildBuiltCountRef.current = 0;

      const currentNodes = nodesRef.current;
      for (let i = 0; i < currentNodes.length; i++) {
        currentNodes[i].scale = i === 0 ? 1 : 0;
      }

      const baseNodes: NeuralNode[] = [];
      for (let i = 0; i < blueprintRef.current.length; i++) {
        if (blueprintRef.current[i].color === '#00FFD1') {
          baseNodes.push(blueprintRef.current[i]);
        }
      }
      nodesRef.current = baseNodes;

    } else if (!isRebuildingBase) {
      isRebuildingBaseRef.current = false;
    }
  }, [isRebuildingBase, isCollapsingToCore]);

  const velocitiesRef = useRef<Map<number, THREE.Vector3>>(new Map());
  const physicsFrameRef = useRef(0);

  const spatialGridRef = useRef<Map<string, NeuralNode[]>>(new Map());
  const visibleNodesCacheRef = useRef<NeuralNode[]>([]);
  const visibleNodesCacheDirtyRef = useRef(true);
  const lastNodeCountRef = useRef(0);

  const getGridKey = useCallback((pos: THREE.Vector3) => {
    const x = Math.floor(pos.x / SPATIAL_CELL_SIZE);
    const y = Math.floor(pos.y / SPATIAL_CELL_SIZE);
    const z = Math.floor(pos.z / SPATIAL_CELL_SIZE);
    return `${x},${y},${z}`;
  }, []);

  const getNeighborKeys = useCallback((key: string) => {
    const [x, y, z] = key.split(',').map(Number);
    const keys: string[] = [];
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dz = -1; dz <= 1; dz++) {
          keys.push(`${x + dx},${y + dy},${z + dz}`);
        }
      }
    }
    return keys;
  }, []);

  const buildSpatialGrid = useCallback((nodes: NeuralNode[]) => {
    const grid = spatialGridRef.current;
    grid.clear();
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const key = getGridKey(node.currentPosition);
      let cell = grid.get(key);
      if (!cell) {
        cell = [];
        grid.set(key, cell);
      }
      cell.push(node);
    }
  }, [getGridKey]);

  const getVelocity = (id: number) => {
      if (!velocitiesRef.current.has(id)) {
          velocitiesRef.current.set(id, new THREE.Vector3(0, 0, 0));
      }
      return velocitiesRef.current.get(id)!;
  };

  const markVisibleCacheDirty = useCallback(() => {
    visibleNodesCacheDirtyRef.current = true;
  }, []);

  const getVisibleNodes = useCallback(() => {
    if (visibleNodesCacheDirtyRef.current || lastNodeCountRef.current !== nodesRef.current.length) {
      visibleNodesCacheRef.current = nodesRef.current.filter(n => n.scale > 0.01);
      visibleNodesCacheDirtyRef.current = false;
      lastNodeCountRef.current = nodesRef.current.length;
    }
    return visibleNodesCacheRef.current;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const delta = Math.min(state.clock.getDelta(), 0.1);

    if (groupRef.current) {
        if (performanceTierRef.current !== 'low') {
            groupRef.current.rotation.y = time * 0.18;
        }
        let targetY = isExpanded ? 0.8 : 0;
        groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
    }

    physicsFrameRef.current++;
    if (performanceTierRef.current !== 'low' && physicsFrameRef.current % PHYSICS_FRAME_SKIP === 0) {
        const REPULSION = 1.5;
        const SPRING_STRENGTH = 0.05;
        const CENTERING = 0.005;
        const DAMPING = 0.97;
        const NOISE_STRENGTH = 0.05;
        const adjustedDelta = delta * PHYSICS_FRAME_SKIP;

        const visibleNodes = getVisibleNodes();
        buildSpatialGrid(visibleNodes);
        const grid = spatialGridRef.current;

        for (let i = 0; i < visibleNodes.length; i++) {
            const node = visibleNodes[i];
            const vel = getVelocity(node.id);
            const pos = node.currentPosition;
            const nodeKey = getGridKey(pos);
            const neighborKeys = getNeighborKeys(nodeKey);

            for (let k = 0; k < neighborKeys.length; k++) {
                const cell = grid.get(neighborKeys[k]);
                if (!cell) continue;
                for (let j = 0; j < cell.length; j++) {
                    const other = cell[j];
                    if (node === other) continue;
                    _diff.subVectors(pos, other.currentPosition);
                    const distSq = _diff.lengthSq();
                    if (distSq > 16.0) continue;
                    let dist = Math.sqrt(distSq);
                    if (dist < 0.1) dist = 0.1;
                    _diff.normalize().multiplyScalar((REPULSION / (dist * dist)) * adjustedDelta);
                    vel.add(_diff);
                }
            }

            const connections = node.connections;
            for (let c = 0; c < connections.length; c++) {
                const neighbor = connections[c];
                if (neighbor.scale > 0.01) {
                    _diff.subVectors(neighbor.currentPosition, pos);
                    const dist = _diff.length();
                    const restLength = 2.0;
                    const stretch = dist - restLength;
                    _diff.normalize().multiplyScalar(stretch * SPRING_STRENGTH * adjustedDelta);
                    vel.add(_diff);
                }
            }

            _centerPull.subVectors(node.basePosition, pos);
            vel.add(_centerPull.multiplyScalar(CENTERING * adjustedDelta));

            _noise.set(
                Math.sin(time * 2 + node.id) * NOISE_STRENGTH,
                Math.cos(time * 1.5 + node.id) * NOISE_STRENGTH,
                Math.sin(time * 2.5 + node.id) * NOISE_STRENGTH
            );
            vel.add(_noise);
        }

        for (let i = 0; i < visibleNodes.length; i++) {
            const node = visibleNodes[i];
            const vel = getVelocity(node.id);
            vel.multiplyScalar(DAMPING);
            _tempVec.copy(vel).multiplyScalar(adjustedDelta * 10);
            node.currentPosition.add(_tempVec);
        }
    }

    if (isBuildingBaseRef.current) {
        const duration = TOTAL_ANIMATION_DURATION;
        const elapsed = performance.now() - buildBaseStartTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);

        const tierNodeCount = NODE_COUNTS[performanceTierRef.current].base + 1;
        const totalBlueprint = Math.min(tierNodeCount, blueprintRef.current.length);
        const targetCount = Math.max(1, Math.ceil(progress * totalBlueprint));

        if (targetCount > builtCountRef.current) {
            for (let i = builtCountRef.current; i < targetCount; i++) {
                const newNode = blueprintRef.current[i];
                newNode.scale = 0;
                newNode.currentPosition.copy(newNode.basePosition);
                connectNodeToExisting(newNode, nodesRef.current);
                nodesRef.current.push(newNode);
            }
            builtCountRef.current = targetCount;
        }

        const allNodes = nodesRef.current;
        let scaleChanged = false;
        for (let i = 0; i < allNodes.length; i++) {
            const node = allNodes[i];
            if (node.color !== '#00FFD1') continue;
            if (i === 0) {
                if (node.scale !== 1) { node.scale = 1; scaleChanged = true; }
                continue;
            }
            const startP = i / totalBlueprint;
            let newScale = 0;
            if (progress > startP) {
                newScale = Math.min((progress - startP) * 5, 1);
            }
            if (node.scale !== newScale) { node.scale = newScale; scaleChanged = true; }
        }
        if (scaleChanged) markVisibleCacheDirty();
    }

    if (isTrainingRef.current && !isRebuildingRef.current && !isResettingRef.current && !isCollapsingToCoreRef.current) {
        const elapsedTotal = performance.now() - trainingStartTimeRef.current;

        const currentColor = trainingColorRef.current;
        const targetColor = currentColor === 'purple' ? '#A020F0' : (currentColor === 'red' ? '#FF4444' : '#FF9500');
        const trainingNodes: NeuralNode[] = [];
        const allNodes = nodesRef.current;
        for (let i = 0; i < allNodes.length; i++) {
            if (allNodes[i].color === targetColor) trainingNodes.push(allNodes[i]);
        }

        if (trainingNodes.length > 0) {
            const DURATION = 800;
            const STAGGER = Math.floor((TOTAL_ANIMATION_DURATION - DURATION) / trainingNodes.length);
            const totalAnimationTime = (trainingNodes.length * STAGGER) + DURATION;

            let scaleChanged = false;
            for (let i = 0; i < trainingNodes.length; i++) {
                const node = trainingNodes[i];
                const startT = i * STAGGER;
                let newScale = 0;
                if (elapsedTotal > startT) {
                     const localElapsed = elapsedTotal - startT;
                     const localP = Math.min(localElapsed / DURATION, 1);
                     newScale = 1 - Math.pow(1 - localP, 3);
                }
                if (node.scale !== newScale) { node.scale = newScale; scaleChanged = true; }
            }
            if (scaleChanged) markVisibleCacheDirty();

            if (elapsedTotal >= totalAnimationTime && !hasTriggeredTrainingComplete.current) {
                hasTriggeredTrainingComplete.current = true;
                if (onTrainingCompleteRef.current) onTrainingCompleteRef.current();
            }
        }
    }

    if (isCollapsingToCoreRef.current) {
        const duration = TOTAL_ANIMATION_DURATION;
        const elapsed = performance.now() - collapseStartTimeRef.current;

        const allNodes = nodesRef.current;
        const nonCoreNodes: Array<{ node: NeuralNode; distance: number }> = [];
        for (let i = 1; i < allNodes.length; i++) {
            nonCoreNodes.push({ node: allNodes[i], distance: allNodes[i].basePosition.length() });
        }
        nonCoreNodes.sort((a, b) => b.distance - a.distance);

        const FADE_DURATION = 250;
        const CORE_FADE_DURATION_INNER = 200;
        const STAGGER = nonCoreNodes.length > 0
            ? Math.floor((duration - FADE_DURATION - CORE_FADE_DURATION_INNER) / nonCoreNodes.length)
            : 20;

        if (allNodes[0]) {
            allNodes[0].scale = 1;
        }

        let scaleChanged = false;
        for (let i = 0; i < nonCoreNodes.length; i++) {
            const node = nonCoreNodes[i].node;
            const startT = i * STAGGER;
            const elapsedForNode = elapsed - startT;

            if (elapsedForNode > 0) {
                const localP = Math.min(elapsedForNode / FADE_DURATION, 1);
                const easeP = 1 - Math.pow(1 - localP, 2);
                const newScale = Math.max(0, 1 - easeP);
                if (node.scale !== newScale) { node.scale = newScale; scaleChanged = true; }

                if (node.scale > 0.01) {
                    node.currentPosition.lerp(_zeroVec, easeP * 0.5);
                }
            }
        }
        if (scaleChanged) markVisibleCacheDirty();

        const totalAnimationTime = (nonCoreNodes.length * STAGGER) + FADE_DURATION;
        const CORE_FADE_DURATION = 200;

        if (elapsed >= totalAnimationTime && allNodes[0]) {
            const coreElapsed = elapsed - totalAnimationTime;
            const coreProgress = Math.min(coreElapsed / CORE_FADE_DURATION, 1);
            const easeP = 1 - Math.pow(1 - coreProgress, 2);
            allNodes[0].scale = Math.max(0, 1 - easeP);
        }

        const totalWithCore = totalAnimationTime + CORE_FADE_DURATION;
        if (elapsed >= totalWithCore && !hasTriggeredCollapseComplete.current) {
            hasTriggeredCollapseComplete.current = true;
            if (onCollapseCompleteRef.current) onCollapseCompleteRef.current();
        }
    }

    if (isRebuildingBaseRef.current) {
        const duration = TOTAL_ANIMATION_DURATION;
        const elapsed = performance.now() - rebuildBaseStartTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);

        const tierNodeCount = NODE_COUNTS[performanceTierRef.current].base + 1;
        const totalBlueprint = Math.min(tierNodeCount, blueprintRef.current.length);
        const targetCount = Math.max(1, Math.ceil(progress * totalBlueprint));

        if (targetCount > rebuildBuiltCountRef.current) {
            for (let i = rebuildBuiltCountRef.current; i < targetCount; i++) {
                const newNode = blueprintRef.current[i];
                if (newNode.color !== '#00FFD1') continue;
                newNode.scale = 0;
                newNode.currentPosition.copy(newNode.basePosition);
                connectNodeToExisting(newNode, nodesRef.current);
                if (nodesRef.current.indexOf(newNode) === -1) {
                    nodesRef.current.push(newNode);
                }
            }
            rebuildBuiltCountRef.current = targetCount;
            markVisibleCacheDirty();
        }

        const allNodes = nodesRef.current;
        let scaleChanged = false;
        let baseIndex = 0;
        for (let i = 0; i < allNodes.length; i++) {
            const node = allNodes[i];
            if (node.color !== '#00FFD1') continue;
            if (baseIndex === 0) {
                if (node.scale !== 1) { node.scale = 1; scaleChanged = true; }
                baseIndex++;
                continue;
            }
            const startP = baseIndex / totalBlueprint;
            let newScale = 0;
            if (progress > startP) {
                newScale = Math.min((progress - startP) * 5, 1);
            }
            if (node.scale !== newScale) { node.scale = newScale; scaleChanged = true; }
            baseIndex++;
        }
        if (scaleChanged) markVisibleCacheDirty();

        if (progress >= 1 && !hasTriggeredRebuildComplete.current) {
            hasTriggeredRebuildComplete.current = true;
            if (onRebuildCompleteRef.current) onRebuildCompleteRef.current();
        }
    }
  });

  useEffect(() => {
    if (isTraining && trainingColor === 'orange' && !orangeNodesAdded) {
        setOrangeNodesAdded(true);
        isTrainingRef.current = true;
        trainingStartTimeRef.current = performance.now();

        const totalNew = NODE_COUNTS[performanceTier].training;
        const radius = 4.5;

        for (let i = 0; i < totalNew; i++) {
             const u = Math.random();
             const v = Math.random();
             const theta = 2 * Math.PI * u;
             const phi = Math.acos(2 * v - 1);

             const r = radius * (0.6 + 0.5 * Math.random());

             const x = r * Math.sin(phi) * Math.cos(theta);
             const y = r * Math.sin(phi) * Math.sin(theta);
             const z = r * Math.cos(phi);

             const newNode: NeuralNode = {
                id: nodeIdCounterRef.current++,
                basePosition: new THREE.Vector3(x, y, z),
                currentPosition: new THREE.Vector3(x, y, z),
                size: 0.10 + Math.random() * 0.08,
                connections: [],
                glowSpeed: 2 + Math.random() * 3,
                moveOffset: new THREE.Vector3(Math.random(), Math.random(), Math.random()),
                moveSpeed: 0.4 + Math.random() * 0.4,
                color: '#FF9500',
                scale: 0
             };

             connectNodeToExisting(newNode, nodesRef.current);
             nodesRef.current.push(newNode);
        }
        markVisibleCacheDirty();
    }

    if (isTraining && trainingColor === 'purple' && !purpleNodesAdded) {
        setPurpleNodesAdded(true);
        isTrainingRef.current = true;
        trainingStartTimeRef.current = performance.now();
        trainingColorRef.current = 'purple';
        hasTriggeredTrainingComplete.current = false;

        const baseNodeIds = new Set<number>();
        let writeIdx = 0;
        for (let i = 0; i < nodesRef.current.length; i++) {
            const node = nodesRef.current[i];
            if (node.color === '#00FFD1') {
                nodesRef.current[writeIdx++] = node;
                baseNodeIds.add(node.id);
            }
        }
        nodesRef.current.length = writeIdx;

        let pairWriteIdx = 0;
        for (let i = 0; i < connectionPairsRef.current.length; i++) {
            const pair = connectionPairsRef.current[i];
            if (baseNodeIds.has(pair.start.id) && baseNodeIds.has(pair.end.id)) {
                connectionPairsRef.current[pairWriteIdx++] = pair;
            }
        }
        connectionPairsRef.current.length = pairWriteIdx;

        velocitiesRef.current.forEach((_, id) => {
            if (!baseNodeIds.has(id)) {
                velocitiesRef.current.delete(id);
            }
        });

        const validConnectionKeys = new Set<string>();
        for (let i = 0; i < connectionPairsRef.current.length; i++) {
            const p = connectionPairsRef.current[i];
            validConnectionKeys.add(`${Math.min(p.start.id, p.end.id)}-${Math.max(p.start.id, p.end.id)}`);
        }
        animationOffsetsRef.current.forEach((_, key) => {
            if (!validConnectionKeys.has(key)) {
                animationOffsetsRef.current.delete(key);
            }
        });

        for (let i = 0; i < nodesRef.current.length; i++) {
            const node = nodesRef.current[i];
            let connWriteIdx = 0;
            for (let j = 0; j < node.connections.length; j++) {
                if (baseNodeIds.has(node.connections[j].id)) {
                    node.connections[connWriteIdx++] = node.connections[j];
                }
            }
            node.connections.length = connWriteIdx;
        }

        const totalNew = NODE_COUNTS[performanceTier].training;
        const radius = 4.5;

        for (let i = 0; i < totalNew; i++) {
             const u = Math.random();
             const v = Math.random();
             const theta = 2 * Math.PI * u;
             const phi = Math.acos(2 * v - 1);
             const r = radius * (0.6 + 0.5 * Math.random());

             const x = r * Math.sin(phi) * Math.cos(theta);
             const y = r * Math.sin(phi) * Math.sin(theta);
             const z = r * Math.cos(phi);

             const newNode: NeuralNode = {
                id: nodeIdCounterRef.current++,
                basePosition: new THREE.Vector3(x, y, z),
                currentPosition: new THREE.Vector3(x, y, z),
                size: 0.10 + Math.random() * 0.08,
                connections: [],
                glowSpeed: 2 + Math.random() * 3,
                moveOffset: new THREE.Vector3(Math.random(), Math.random(), Math.random()),
                moveSpeed: 0.4 + Math.random() * 0.4,
                color: '#A020F0',
                scale: 0
             };

             connectNodeToExisting(newNode, nodesRef.current);
             nodesRef.current.push(newNode);
        }
        markVisibleCacheDirty();
    }

    if (isTraining && trainingColor === 'red' && !redNodesAdded) {
        setRedNodesAdded(true);
        isTrainingRef.current = true;
        trainingStartTimeRef.current = performance.now();
        trainingColorRef.current = 'red';
        hasTriggeredTrainingComplete.current = false;

        const baseNodeIds = new Set<number>();
        let writeIdx = 0;
        for (let i = 0; i < nodesRef.current.length; i++) {
            const node = nodesRef.current[i];
            if (node.color === '#00FFD1') {
                nodesRef.current[writeIdx++] = node;
                baseNodeIds.add(node.id);
            }
        }
        nodesRef.current.length = writeIdx;

        let pairWriteIdx = 0;
        for (let i = 0; i < connectionPairsRef.current.length; i++) {
            const pair = connectionPairsRef.current[i];
            if (baseNodeIds.has(pair.start.id) && baseNodeIds.has(pair.end.id)) {
                connectionPairsRef.current[pairWriteIdx++] = pair;
            }
        }
        connectionPairsRef.current.length = pairWriteIdx;

        velocitiesRef.current.forEach((_, id) => {
            if (!baseNodeIds.has(id)) {
                velocitiesRef.current.delete(id);
            }
        });

        const validConnectionKeys = new Set<string>();
        for (let i = 0; i < connectionPairsRef.current.length; i++) {
            const p = connectionPairsRef.current[i];
            validConnectionKeys.add(`${Math.min(p.start.id, p.end.id)}-${Math.max(p.start.id, p.end.id)}`);
        }
        animationOffsetsRef.current.forEach((_, key) => {
            if (!validConnectionKeys.has(key)) {
                animationOffsetsRef.current.delete(key);
            }
        });

        for (let i = 0; i < nodesRef.current.length; i++) {
            const node = nodesRef.current[i];
            let connWriteIdx = 0;
            for (let j = 0; j < node.connections.length; j++) {
                if (baseNodeIds.has(node.connections[j].id)) {
                    node.connections[connWriteIdx++] = node.connections[j];
                }
            }
            node.connections.length = connWriteIdx;
        }

        const totalNew = NODE_COUNTS[performanceTier].training;
        const radius = 4.5;

        for (let i = 0; i < totalNew; i++) {
             const u = Math.random();
             const v = Math.random();
             const theta = 2 * Math.PI * u;
             const phi = Math.acos(2 * v - 1);
             const r = radius * (0.6 + 0.5 * Math.random());

             const x = r * Math.sin(phi) * Math.cos(theta);
             const y = r * Math.sin(phi) * Math.sin(theta);
             const z = r * Math.cos(phi);

             const newNode: NeuralNode = {
                id: nodeIdCounterRef.current++,
                basePosition: new THREE.Vector3(x, y, z),
                currentPosition: new THREE.Vector3(x, y, z),
                size: 0.10 + Math.random() * 0.08,
                connections: [],
                glowSpeed: 2 + Math.random() * 3,
                moveOffset: new THREE.Vector3(Math.random(), Math.random(), Math.random()),
                moveSpeed: 0.4 + Math.random() * 0.4,
                color: '#FF4444',
                scale: 0
             };

             connectNodeToExisting(newNode, nodesRef.current);
             nodesRef.current.push(newNode);
        }
        markVisibleCacheDirty();
    }
  }, [isTraining, orangeNodesAdded, purpleNodesAdded, redNodesAdded, trainingColor, isSmallScreen, markVisibleCacheDirty, performanceTier]);

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00FFD1" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00FFD1" />

      {(isTraining && !isRebuilding && trainingColor === 'orange') && <pointLight position={[0, 0, 0]} intensity={2} color="#FF9500" distance={10} />}
      {(isTraining && trainingColor === 'purple') && <pointLight position={[0, 0, 0]} intensity={2} color="#A020F0" distance={12} />}
      {(isTraining && trainingColor === 'red') && <pointLight position={[0, 0, 0]} intensity={2} color="#FF4444" distance={12} />}
      {isRebuilding && <pointLight position={[0, 0, 0]} intensity={2} color="#A020F0" distance={12} />}

      <InstancedNodes
        nodesRef={nodesRef}
        connectionPairsRef={connectionPairsRef}
        performanceTier={performanceTier}
      />
    </group>
  );
});
