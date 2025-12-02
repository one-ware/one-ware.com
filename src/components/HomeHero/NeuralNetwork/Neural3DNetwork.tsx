import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { NeuralNode } from './types';
import { Node } from './Node';
import { Connection } from './Connection';

const _diff = new THREE.Vector3();
const _centerPull = new THREE.Vector3();
const _noise = new THREE.Vector3();
const _force = new THREE.Vector3();

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
}

export function Neural3DNetwork({
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
  currentFps = 50
}: Neural3DNetworkProps) {
  const groupRef = useRef<THREE.Group>(null);

  const [nodes, setNodes] = useState<NeuralNode[]>([]);
  const [connectionPairs, setConnectionPairs] = useState<Array<{ id: number; start: NeuralNode; end: NeuralNode; animationOffset: number }>>([]);
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
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
    const totalNodes = isMobile ? 15 : 30;
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
    setNodes([]);
  }, []);

  const connectNodeToExisting = (newNode: NeuralNode, existingNodes: NeuralNode[]) => {
      if (existingNodes.length === 0) return [];

      const sorted = existingNodes
          .map(n => ({ node: n, dist: newNode.basePosition.distanceTo(n.basePosition) }))
          .sort((a, b) => a.dist - b.dist);

      const targets = sorted.slice(0, Math.min(sorted.length, 2)).map(item => item.node);

      const newPairs: Array<{ id: number; start: NeuralNode; end: NeuralNode; animationOffset: number }> = [];

      targets.forEach(target => {
          newNode.connections.push(target);
          target.connections.push(newNode);

          const key = `${Math.min(newNode.id, target.id)}-${Math.max(newNode.id, target.id)}`;
          let offset = animationOffsetsRef.current.get(key);
          if (offset === undefined) {
              offset = Math.random() * 10;
              animationOffsetsRef.current.set(key, offset);
          }
          newPairs.push({ id: connectionIdCounterRef.current++, start: newNode, end: target, animationOffset: offset });
      });

      return newPairs;
  };

  useEffect(() => {
    if (isBuildingBase) {
        isBuildingBaseRef.current = true;
        buildBaseStartTimeRef.current = Date.now();

        if (blueprintRef.current.length > 0) {
            const core = blueprintRef.current[0];
            core.scale = 1;
            nodesRef.current = [core];
            setNodes([core]);
            connectionPairsRef.current = [];
            connectionIdCounterRef.current = 0;
            setConnectionPairs([]);
            builtCountRef.current = 1;
        }
    } else {
        isBuildingBaseRef.current = false;
        if (builtCountRef.current > 0 && blueprintRef.current.length > 0 && nodesRef.current.length < blueprintRef.current.length) {
             const allBase = blueprintRef.current;

             const currentList = [...nodesRef.current];
             const currentPairs = [...connectionPairsRef.current];
             
             for (let i = currentList.length; i < allBase.length; i++) {
                 const node = allBase[i];
                 node.scale = 1;
                 const newConns = connectNodeToExisting(node, currentList);
                 currentPairs.push(...newConns);
                 currentList.push(node);
             }
             
             nodesRef.current = currentList;
             connectionPairsRef.current = currentPairs;

             setNodes(currentList);
             setConnectionPairs(currentPairs);
             builtCountRef.current = allBase.length;
        }
    }
  }, [isBuildingBase]);

  useEffect(() => {
    if (isCollapsingToCore) {
      isCollapsingToCoreRef.current = true;
      collapseStartTimeRef.current = Date.now();
      hasTriggeredCollapseComplete.current = false;
    } else {
      isCollapsingToCoreRef.current = false;
    }
  }, [isCollapsingToCore]);

  useEffect(() => {
    if (isRebuildingBase && !isCollapsingToCore) {
      isRebuildingBaseRef.current = true;
      rebuildBaseStartTimeRef.current = Date.now();
      hasTriggeredRebuildComplete.current = false;
      rebuildBuiltCountRef.current = 0;

      const currentNodes = nodesRef.current;
      currentNodes.forEach((node, i) => {
        if (i === 0) {
          node.scale = 1;
        } else {
          node.scale = 0;
        }
      });

      const baseNodes = blueprintRef.current.filter(n => n.color === '#00FFD1');
      nodesRef.current = baseNodes;
      setNodes([...baseNodes]);

    } else if (!isRebuildingBase) {
      isRebuildingBaseRef.current = false;
    }
  }, [isRebuildingBase, isCollapsingToCore]);

  const velocitiesRef = useRef<Map<number, THREE.Vector3>>(new Map());

  const getVelocity = (id: number) => {
      if (!velocitiesRef.current.has(id)) {
          velocitiesRef.current.set(id, new THREE.Vector3(0, 0, 0));
      }
      return velocitiesRef.current.get(id)!;
  };

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const delta = Math.min(state.clock.getDelta(), 0.1);

    if (groupRef.current) {
        groupRef.current.rotation.y = time * 0.05;
        let targetY = isExpanded ? 0.8 : 0;
        groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
    }

    const REPULSION = 1.5;
    const SPRING_STRENGTH = 0.05;
    const CENTERING = 0.005;
    const DAMPING = 0.97;
    const NOISE_STRENGTH = 0.05;

    const visibleNodes = nodesRef.current.filter(n => n.scale > 0.01);

    visibleNodes.forEach(node => {
        const vel = getVelocity(node.id);
        const pos = node.currentPosition;

        visibleNodes.forEach(other => {
            if (node === other) return;
            _diff.subVectors(pos, other.currentPosition);
            let dist = _diff.length();
            if (dist < 0.1) dist = 0.1;
            
            if (dist < 4.0) {
                _diff.normalize().multiplyScalar((REPULSION / (dist * dist)) * delta);
                vel.add(_diff);
            }
        });

        node.connections.forEach(neighbor => {
            if (neighbor.scale > 0.01) {
                _diff.subVectors(neighbor.currentPosition, pos);
                const dist = _diff.length();
                const restLength = 2.0;

                const stretch = dist - restLength;
                _diff.normalize().multiplyScalar(stretch * SPRING_STRENGTH * delta);
                vel.add(_diff);
            }
        });

        _centerPull.subVectors(node.basePosition, pos);
        vel.add(_centerPull.multiplyScalar(CENTERING * delta));

        _noise.set(
            Math.sin(time * 2 + node.id) * NOISE_STRENGTH,
            Math.cos(time * 1.5 + node.id) * NOISE_STRENGTH,
            Math.sin(time * 2.5 + node.id) * NOISE_STRENGTH
        );
        vel.add(_noise);
    });

    visibleNodes.forEach(node => {
        const vel = getVelocity(node.id);
        vel.multiplyScalar(DAMPING);
        node.currentPosition.add(vel.clone().multiplyScalar(delta * 10));
    });

    if (isBuildingBaseRef.current) {
        const duration = 2500;
        const elapsed = Date.now() - buildBaseStartTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);

        const totalBlueprint = blueprintRef.current.length;
        const targetCount = Math.max(1, Math.ceil(progress * totalBlueprint));

        if (targetCount > builtCountRef.current) {
            const startIdx = builtCountRef.current;
            const endIdx = targetCount;
            
            const currentList = [...nodesRef.current];
            const currentPairs = [...connectionPairsRef.current];

            for (let i = startIdx; i < endIdx; i++) {
                const newNode = blueprintRef.current[i];
                newNode.scale = 0;
                newNode.currentPosition.copy(newNode.basePosition);
                
                const conns = connectNodeToExisting(newNode, currentList);
                currentPairs.push(...conns);
                currentList.push(newNode);
            }

            nodesRef.current = currentList;
            connectionPairsRef.current = currentPairs;
            builtCountRef.current = targetCount;
            
            setNodes(currentList);
            setConnectionPairs(currentPairs);
        }

        const baseNodes = nodesRef.current.filter(n => n.color === '#00FFD1');
        baseNodes.forEach((node, i) => {
            if (i === 0) { node.scale = 1; return; }
            const startP = i / totalBlueprint;
            if (progress > startP) {
                const localP = Math.min((progress - startP) * 5, 1);
                node.scale = localP;
            } else {
                node.scale = 0;
            }
        });
    }
  });

  useEffect(() => {
    if (isTraining && trainingColor === 'orange' && !orangeNodesAdded) {
        setOrangeNodesAdded(true);
        isTrainingRef.current = true;
        trainingStartTimeRef.current = Date.now();

        const totalNew = isSmallScreen ? 15 : 30;
        const radius = 4.5;

        const currentList = [...nodesRef.current];
        const newPairsToAdd: Array<{ id: number; start: NeuralNode; end: NeuralNode; animationOffset: number }> = [];

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

             const conns = connectNodeToExisting(newNode, currentList);
             newPairsToAdd.push(...conns);
             currentList.push(newNode);
        }

        nodesRef.current = currentList;

        const updatedPairs = [...connectionPairsRef.current, ...newPairsToAdd];
        connectionPairsRef.current = updatedPairs;

        setNodes(currentList);
        setConnectionPairs(updatedPairs);
    }

    if (isTraining && trainingColor === 'purple' && !purpleNodesAdded) {
        setPurpleNodesAdded(true);
        isTrainingRef.current = true;
        trainingStartTimeRef.current = Date.now();
        trainingColorRef.current = 'purple';
        hasTriggeredTrainingComplete.current = false;

        const baseNodes = nodesRef.current.filter(n => n.color === '#00FFD1');
        nodesRef.current = baseNodes;

        const baseNodeIds = new Set(baseNodes.map(n => n.id));
        connectionPairsRef.current = connectionPairsRef.current.filter(
            pair => baseNodeIds.has(pair.start.id) && baseNodeIds.has(pair.end.id)
        );

        velocitiesRef.current.forEach((_, id) => {
            if (!baseNodeIds.has(id)) {
                velocitiesRef.current.delete(id);
            }
        });

        const validConnectionKeys = new Set(
            connectionPairsRef.current.map(p => `${Math.min(p.start.id, p.end.id)}-${Math.max(p.start.id, p.end.id)}`)
        );
        animationOffsetsRef.current.forEach((_, key) => {
            if (!validConnectionKeys.has(key)) {
                animationOffsetsRef.current.delete(key);
            }
        });

        baseNodes.forEach(node => {
            node.connections = node.connections.filter(conn => baseNodeIds.has(conn.id));
        });

        const totalNew = isSmallScreen ? 15 : 30;
        const radius = 4.5;

        const currentList = [...nodesRef.current];
        const newPairsToAdd: Array<{ id: number; start: NeuralNode; end: NeuralNode; animationOffset: number }> = [];

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

             const conns = connectNodeToExisting(newNode, currentList);
             newPairsToAdd.push(...conns);
             currentList.push(newNode);
        }

        nodesRef.current = currentList;
        const updatedPairs = [...connectionPairsRef.current, ...newPairsToAdd];
        connectionPairsRef.current = updatedPairs;

        setNodes(currentList);
        setConnectionPairs(updatedPairs);
    }

    if (isTraining && trainingColor === 'red' && !redNodesAdded) {
        setRedNodesAdded(true);
        isTrainingRef.current = true;
        trainingStartTimeRef.current = Date.now();
        trainingColorRef.current = 'red';
        hasTriggeredTrainingComplete.current = false;

        const baseNodesOnly = nodesRef.current.filter(n => n.color === '#00FFD1');
        nodesRef.current = baseNodesOnly;

        const baseNodeIds = new Set(baseNodesOnly.map(n => n.id));
        connectionPairsRef.current = connectionPairsRef.current.filter(
            pair => baseNodeIds.has(pair.start.id) && baseNodeIds.has(pair.end.id)
        );

        velocitiesRef.current.forEach((_, id) => {
            if (!baseNodeIds.has(id)) {
                velocitiesRef.current.delete(id);
            }
        });

        const validConnectionKeys = new Set(
            connectionPairsRef.current.map(p => `${Math.min(p.start.id, p.end.id)}-${Math.max(p.start.id, p.end.id)}`)
        );
        animationOffsetsRef.current.forEach((_, key) => {
            if (!validConnectionKeys.has(key)) {
                animationOffsetsRef.current.delete(key);
            }
        });

        baseNodesOnly.forEach(node => {
            node.connections = node.connections.filter(conn => baseNodeIds.has(conn.id));
        });

        const totalNew = isSmallScreen ? 15 : 30;
        const radius = 4.5;

        const currentList = [...nodesRef.current];
        const newPairsToAdd: Array<{ id: number; start: NeuralNode; end: NeuralNode; animationOffset: number }> = [];

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

             const conns = connectNodeToExisting(newNode, currentList);
             newPairsToAdd.push(...conns);
             currentList.push(newNode);
        }

        nodesRef.current = currentList;
        const updatedPairs = [...connectionPairsRef.current, ...newPairsToAdd];
        connectionPairsRef.current = updatedPairs;

        setNodes(currentList);
        setConnectionPairs(updatedPairs);
    }
  }, [isTraining, orangeNodesAdded, purpleNodesAdded, redNodesAdded, trainingColor, isSmallScreen]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
        groupRef.current.rotation.y = time * 0.18;
        let targetY = isExpanded ? 0.8 : 0;
        groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
    }

    if (isBuildingBaseRef.current) {
        const duration = 2500;
        const elapsed = Date.now() - buildBaseStartTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);

        const totalBlueprint = blueprintRef.current.length;
        const targetCount = Math.max(1, Math.ceil(progress * totalBlueprint));

        if (targetCount > builtCountRef.current) {
            const startIdx = builtCountRef.current;
            const endIdx = targetCount;
            
            const currentList = [...nodesRef.current];
            const currentPairs = [...connectionPairsRef.current];

            for (let i = startIdx; i < endIdx; i++) {
                const newNode = blueprintRef.current[i];
                newNode.scale = 0; 
                
                const conns = connectNodeToExisting(newNode, currentList);
                currentPairs.push(...conns);
                currentList.push(newNode);
            }

            nodesRef.current = currentList;
            connectionPairsRef.current = currentPairs;
            builtCountRef.current = targetCount;

            setNodes(currentList);
            setConnectionPairs(currentPairs);
        }

        const baseNodes = nodesRef.current.filter(n => n.color === '#00FFD1');
        baseNodes.forEach((node, i) => {
            if (i === 0) { node.scale = 1; return; }

            const startP = i / totalBlueprint;
            if (progress > startP) {
                const localP = Math.min((progress - startP) * 5, 1);
                node.scale = localP;
            } else {
                node.scale = 0;
            }
        });
    }

    if (isTrainingRef.current && !isRebuildingRef.current && !isResettingRef.current && !isCollapsingToCoreRef.current) {
        const now = Date.now();
        const elapsedTotal = now - trainingStartTimeRef.current;

        const currentColor = trainingColorRef.current;
        const targetColor = currentColor === 'purple' ? '#A020F0' : (currentColor === 'red' ? '#FF4444' : '#FF9500');
        const trainingNodes = nodesRef.current.filter(n => n.color === targetColor);

        if (trainingNodes.length > 0) {
            const STAGGER = isSmallScreen ? 240 : 120;
            const DURATION = 800;
            const totalAnimationTime = (trainingNodes.length * STAGGER) + DURATION;

            trainingNodes.forEach((node, i) => {
                const startT = i * STAGGER;
                if (elapsedTotal > startT) {
                     const localElapsed = elapsedTotal - startT;
                     const localP = Math.min(localElapsed / DURATION, 1);
                     node.scale = 1 - Math.pow(1 - localP, 3);
                } else {
                     node.scale = 0;
                }
            });

            if (elapsedTotal >= totalAnimationTime && !hasTriggeredTrainingComplete.current) {
                hasTriggeredTrainingComplete.current = true;
                if (onTrainingCompleteRef.current) onTrainingCompleteRef.current();
            }
        }
    }

    if (isCollapsingToCoreRef.current) {
        const duration = 2500;
        const elapsed = Date.now() - collapseStartTimeRef.current;

        const nonCoreNodes = nodesRef.current
            .filter((_, i) => i !== 0)
            .map(node => ({
                node,
                distance: node.basePosition.length()
            }))
            .sort((a, b) => b.distance - a.distance)
            .map(item => item.node);

        const STAGGER = isSmallScreen ? 40 : 20;
        const FADE_DURATION = 250;

        if (nodesRef.current[0]) {
            nodesRef.current[0].scale = 1;
        }

        nonCoreNodes.forEach((node, i) => {
            const startT = i * STAGGER;
            const elapsedForNode = elapsed - startT;

            if (elapsedForNode > 0) {
                const localP = Math.min(elapsedForNode / FADE_DURATION, 1);
                const easeP = 1 - Math.pow(1 - localP, 2);
                node.scale = Math.max(0, 1 - easeP);

                if (node.scale > 0.01) {
                    node.currentPosition.lerp(new THREE.Vector3(0, 0, 0), easeP * 0.5);
                }
            }
        });

        const totalAnimationTime = (nonCoreNodes.length * STAGGER) + FADE_DURATION;
        const CORE_FADE_DURATION = 200;

        if (elapsed >= totalAnimationTime && nodesRef.current[0]) {
            const coreElapsed = elapsed - totalAnimationTime;
            const coreProgress = Math.min(coreElapsed / CORE_FADE_DURATION, 1);
            const easeP = 1 - Math.pow(1 - coreProgress, 2);
            nodesRef.current[0].scale = Math.max(0, 1 - easeP);
        }

        const totalWithCore = totalAnimationTime + CORE_FADE_DURATION;
        if (elapsed >= totalWithCore && !hasTriggeredCollapseComplete.current) {
            hasTriggeredCollapseComplete.current = true;
            if (onCollapseCompleteRef.current) onCollapseCompleteRef.current();
        }
    }

    if (isRebuildingBaseRef.current) {
        const duration = 2500;
        const elapsed = Date.now() - rebuildBaseStartTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);

        const totalBlueprint = blueprintRef.current.length;
        const targetCount = Math.max(1, Math.ceil(progress * totalBlueprint));

        if (targetCount > rebuildBuiltCountRef.current) {
            const startIdx = rebuildBuiltCountRef.current;
            const endIdx = targetCount;

            const currentList = [...nodesRef.current];
            const currentPairs = [...connectionPairsRef.current];

            for (let i = startIdx; i < endIdx; i++) {
                const newNode = blueprintRef.current[i];
                if (newNode.color !== '#00FFD1') continue;
                newNode.scale = 0;
                newNode.currentPosition.copy(newNode.basePosition);

                const conns = connectNodeToExisting(newNode, currentList);
                currentPairs.push(...conns);
                if (!currentList.includes(newNode)) {
                    currentList.push(newNode);
                }
            }

            nodesRef.current = currentList;
            connectionPairsRef.current = currentPairs;
            rebuildBuiltCountRef.current = targetCount;

            setNodes(currentList);
            setConnectionPairs(currentPairs);
        }

        const baseNodes = nodesRef.current.filter(n => n.color === '#00FFD1');
        baseNodes.forEach((node, i) => {
            if (i === 0) { node.scale = 1; return; }

            const startP = i / totalBlueprint;
            if (progress > startP) {
                const localP = Math.min((progress - startP) * 5, 1);
                node.scale = localP;
            } else {
                node.scale = 0;
            }
        });

        if (progress >= 1 && !hasTriggeredRebuildComplete.current) {
            hasTriggeredRebuildComplete.current = true;
            if (onRebuildCompleteRef.current) onRebuildCompleteRef.current();
        }
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00FFD1" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00FFD1" />
      
      {(isTraining && !isRebuilding && trainingColor === 'orange') && <pointLight position={[0, 0, 0]} intensity={2} color="#FF9500" distance={10} />}
      {(isTraining && trainingColor === 'purple') && <pointLight position={[0, 0, 0]} intensity={2} color="#A020F0" distance={12} />}
      {(isTraining && trainingColor === 'red') && <pointLight position={[0, 0, 0]} intensity={2} color="#FF4444" distance={12} />}
      {isRebuilding && <pointLight position={[0, 0, 0]} intensity={2} color="#A020F0" distance={12} />}

      {connectionPairs.map((conn) => (
        <Connection
          key={`conn-${conn.id}`}
          startNode={conn.start}
          endNode={conn.end}
          animationOffset={conn.animationOffset}
        />
      ))}

      {nodesRef.current.map((node) => (
        <Node key={`node-${node.id}`} node={node} />
      ))}
    </group>
  );
}
