import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useColorMode } from "@docusaurus/theme-common";

type PerformanceTier = "high" | "low";

function detectPerformanceTier(): PerformanceTier {
  if (typeof window === "undefined") return "high";
  const isMobileOrTablet =
    window.innerWidth < 1024 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  return isMobileOrTablet ? "low" : "high";
}

const NODE_COUNTS = {
  high: 24,
  low: 12,
};

const MAX_NODES = 50;
const MAX_CONNECTIONS = 100;

interface SimpleNode {
  id: number;
  basePosition: THREE.Vector3;
  currentPosition: THREE.Vector3;
  size: number;
  connections: SimpleNode[];
  glowSpeed: number;
  scale: number;
}

interface ConnectionPair {
  id: number;
  start: SimpleNode;
  end: SimpleNode;
  animationOffset: number;
}

const _diff = new THREE.Vector3();
const _centerPull = new THREE.Vector3();
const _noise = new THREE.Vector3();
const _matrix = new THREE.Matrix4();
const _position = new THREE.Vector3();
const _quaternion = new THREE.Quaternion();
const _scale = new THREE.Vector3();
const _color = new THREE.Color();

const NODE_VERTEX_SHADER = `
uniform float uTime;
uniform float uPulseIntensity;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vInstanceColor;

void main() {
  #ifdef USE_INSTANCING_COLOR
    vInstanceColor = instanceColor;
  #else
    vInstanceColor = vec3(0.0, 1.0, 0.82);
  #endif

  vNormal = normalize(normalMatrix * normal);

  float pulse = 1.0 + sin(uTime * 2.0 + float(gl_InstanceID) * 0.5) * uPulseIntensity;
  vec3 transformed = position * pulse;

  vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(transformed, 1.0);
  vViewPosition = -mvPosition.xyz;

  gl_Position = projectionMatrix * mvPosition;
}
`;

const NODE_FRAGMENT_SHADER = `
uniform float uFresnelPower;
uniform float uGlowIntensity;
uniform float uCoreIntensity;
uniform float uTime;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vInstanceColor;

void main() {
  vec3 viewDir = normalize(vViewPosition);
  vec3 normal = normalize(vNormal);

  float fresnel = pow(1.0 - abs(dot(viewDir, normal)), uFresnelPower);
  float core = pow(1.0 - fresnel, 2.0);
  float pulse = 0.9 + sin(uTime * 3.0) * 0.1;

  vec3 coreColor = vInstanceColor * uCoreIntensity * core;
  vec3 rimColor = vInstanceColor * uGlowIntensity * fresnel * pulse;
  vec3 finalColor = coreColor + rimColor;

  float alpha = core * 0.9 + fresnel * 0.6;

  gl_FragColor = vec4(finalColor, alpha);
}
`;

const LINE_VERTEX_SHADER = `
attribute float progress;
attribute float animOffset;
attribute float opacity;

uniform float uTime;

varying float vProgress;
varying float vAnimOffset;
varying float vOpacity;

void main() {
  vProgress = progress;
  vAnimOffset = animOffset;
  vOpacity = opacity;

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const LINE_FRAGMENT_SHADER = `
uniform float uTime;
uniform vec3 uLineColor;

varying float vProgress;
varying float vAnimOffset;
varying float vOpacity;

void main() {
  float pulsePos = fract(uTime * 0.3 + vAnimOffset);

  float distToPulse = abs(vProgress - pulsePos);
  if (distToPulse > 0.5) distToPulse = 1.0 - distToPulse;

  float glowWidth = 0.04;
  float glow = exp(-distToPulse * distToPulse / (glowWidth * glowWidth));

  float fadeIn = smoothstep(0.0, 0.2, pulsePos);
  float fadeOut = smoothstep(1.0, 0.8, pulsePos);
  float fade = min(fadeIn, fadeOut);

  float baseOpacity = 0.18;
  float glowOpacity = glow * fade * 0.35;

  float finalOpacity = (baseOpacity + glowOpacity) * vOpacity;

  vec3 glowColor = uLineColor * (1.0 + glow * fade * 0.4);

  gl_FragColor = vec4(glowColor, finalOpacity);
}
`;

interface InstancedNetworkProps {
  nodesRef: React.MutableRefObject<SimpleNode[]>;
  connectionPairsRef: React.MutableRefObject<ConnectionPair[]>;
  color: string;
  performanceTier: PerformanceTier;
  isDarkMode: boolean;
}

const InstancedNetwork = React.memo(function InstancedNetwork({
  nodesRef,
  connectionPairsRef,
  color,
  performanceTier,
  isDarkMode,
}: InstancedNetworkProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const currentScalesRef = useRef<Float32Array>(new Float32Array(MAX_NODES));

  const segments = performanceTier === "low" ? 8 : 16;

  const sphereGeometry = useMemo(
    () => new THREE.SphereGeometry(1, segments, segments),
    [segments]
  );

  const nodeMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPulseIntensity: { value: 0.03 },
        uFresnelPower: { value: 2.5 },
        uGlowIntensity: { value: isDarkMode ? 2.0 : 1.5 },
        uCoreIntensity: { value: isDarkMode ? 1.2 : 1.8 },
      },
      vertexShader: NODE_VERTEX_SHADER,
      fragmentShader: NODE_FRAGMENT_SHADER,
      transparent: true,
      blending: isDarkMode ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
      toneMapped: false,
    });
  }, [isDarkMode]);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(MAX_CONNECTIONS * 6);
    const progress = new Float32Array(MAX_CONNECTIONS * 2);
    const animOffset = new Float32Array(MAX_CONNECTIONS * 2);
    const opacity = new Float32Array(MAX_CONNECTIONS * 2);

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("progress", new THREE.BufferAttribute(progress, 1));
    geo.setAttribute("animOffset", new THREE.BufferAttribute(animOffset, 1));
    geo.setAttribute("opacity", new THREE.BufferAttribute(opacity, 1));
    geo.setDrawRange(0, 0);
    return geo;
  }, []);

  const lineMaterial = useMemo(() => {
    _color.set(color);
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uLineColor: { value: new THREE.Vector3(_color.r, _color.g, _color.b) },
      },
      vertexShader: LINE_VERTEX_SHADER,
      fragmentShader: LINE_FRAGMENT_SHADER,
      transparent: true,
      blending: isDarkMode ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
      toneMapped: false,
    });
  }, [color, isDarkMode]);

  useEffect(() => {
    _color.set(color);
    lineMaterial.uniforms.uLineColor.value.set(_color.r, _color.g, _color.b);
  }, [color, lineMaterial]);

  useEffect(() => {
    return () => {
      sphereGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
    };
  }, [sphereGeometry, nodeMaterial, lineGeometry, lineMaterial]);

  const lastPairsLengthRef = useRef(0);
  const lastPairsIdRef = useRef(-1);

  useFrame((state) => {
    const nodes = nodesRef.current;
    const pairs = connectionPairsRef.current;
    const mesh = meshRef.current;
    const lines = linesRef.current;
    const currentScales = currentScalesRef.current;

    if (!mesh || !lines) return;

    const time = state.clock.getElapsedTime();
    nodeMaterial.uniforms.uTime.value = time;
    lineMaterial.uniforms.uTime.value = time;

    // Update node instances
    _color.set(color);
    for (let i = 0; i < nodes.length && i < MAX_NODES; i++) {
      const node = nodes[i];
      const targetScale = node.scale !== undefined ? node.scale : 1;
      const diff = targetScale - currentScales[i];

      if (Math.abs(diff) > 0.001) {
        currentScales[i] += diff * 0.1;
      } else {
        currentScales[i] = targetScale;
      }

      const finalScale = currentScales[i] * node.size;

      _position.copy(node.currentPosition);
      _scale.setScalar(finalScale);
      _matrix.compose(_position, _quaternion, _scale);
      mesh.setMatrixAt(i, _matrix);
      mesh.setColorAt(i, _color);
    }

    for (let i = nodes.length; i < MAX_NODES; i++) {
      _scale.setScalar(0);
      _matrix.compose(_position, _quaternion, _scale);
      mesh.setMatrixAt(i, _matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    const posAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
    const progressAttr = lineGeometry.attributes
      .progress as THREE.BufferAttribute;
    const animOffsetAttr = lineGeometry.attributes
      .animOffset as THREE.BufferAttribute;
    const opacityAttr = lineGeometry.attributes
      .opacity as THREE.BufferAttribute;

    const positions = posAttr.array as Float32Array;
    const progressArr = progressAttr.array as Float32Array;
    const animOffsetArr = animOffsetAttr.array as Float32Array;
    const opacityArr = opacityAttr.array as Float32Array;

    const lastPairId = pairs.length > 0 ? pairs[pairs.length - 1].id : -1;
    const pairsChanged =
      pairs.length !== lastPairsLengthRef.current ||
      lastPairId !== lastPairsIdRef.current;

    let lineIndex = 0;
    for (let i = 0; i < pairs.length && lineIndex < MAX_CONNECTIONS; i++) {
      const pair = pairs[i];
      const startScale = pair.start.scale ?? 1;
      const endScale = pair.end.scale ?? 1;
      const connectionOpacity = Math.min(startScale, endScale);

      if (connectionOpacity < 0.01) continue;

      const sp = pair.start.currentPosition;
      const ep = pair.end.currentPosition;
      const posIdx = lineIndex * 6;
      const vertIdx = lineIndex * 2;

      positions[posIdx] = sp.x;
      positions[posIdx + 1] = sp.y;
      positions[posIdx + 2] = sp.z;
      positions[posIdx + 3] = ep.x;
      positions[posIdx + 4] = ep.y;
      positions[posIdx + 5] = ep.z;

      if (pairsChanged) {
        progressArr[vertIdx] = 0.0;
        progressArr[vertIdx + 1] = 1.0;
        animOffsetArr[vertIdx] = pair.animationOffset;
        animOffsetArr[vertIdx + 1] = pair.animationOffset;
      }

      opacityArr[vertIdx] = connectionOpacity;
      opacityArr[vertIdx + 1] = connectionOpacity;

      lineIndex++;
    }

    if (pairsChanged) {
      lastPairsLengthRef.current = pairs.length;
      lastPairsIdRef.current = lastPairId;
      progressAttr.needsUpdate = true;
      animOffsetAttr.needsUpdate = true;
    }

    lineGeometry.setDrawRange(0, lineIndex * 2);
    posAttr.needsUpdate = true;
    opacityAttr.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh
        ref={meshRef}
        args={[sphereGeometry, nodeMaterial, MAX_NODES]}
        frustumCulled={false}
      />
      <lineSegments
        ref={linesRef}
        geometry={lineGeometry}
        material={lineMaterial}
      />
    </>
  );
});

function NetworkScene({
  color = "#00FFD1",
  nodeCount = 12,
  autoRotate = false,
  rotationSpeed = 0.15,
  performanceTier = "high",
  isDarkMode = true,
}: {
  color?: string;
  nodeCount?: number;
  autoRotate?: boolean;
  rotationSpeed?: number;
  performanceTier?: PerformanceTier;
  isDarkMode?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<SimpleNode[]>([]);
  const connectionPairsRef = useRef<ConnectionPair[]>([]);
  const velocitiesRef = useRef<Map<number, THREE.Vector3>>(new Map());
  const [initialized, setInitialized] = useState(false);

  const isHighTier = performanceTier === "high";

  useEffect(() => {
    const generated: SimpleNode[] = [];
    const radius = 2.0;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    generated.push({
      id: 0,
      basePosition: new THREE.Vector3(0, 0, 0),
      currentPosition: new THREE.Vector3(0, 0, 0),
      size: 0.12 + Math.random() * 0.06,
      connections: [],
      glowSpeed: 1 + Math.random() * 1.5,
      scale: 1,
    });

    for (let i = 0; i < nodeCount; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / nodeCount);

      const r = radius * (0.95 + Math.random() * 0.1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      generated.push({
        id: i + 1,
        basePosition: new THREE.Vector3(x, y, z),
        currentPosition: new THREE.Vector3(x, y, z),
        size: 0.06 + Math.random() * 0.06,
        connections: [],
        glowSpeed: 1.5 + Math.random() * 2.5,
        scale: 1,
      });
    }

    const pairs: ConnectionPair[] = [];
    let connId = 0;

    for (let i = 1; i < generated.length; i++) {
      const node = generated[i];
      const sorted = generated
        .slice(0, i)
        .map((n) => ({
          node: n,
          dist: node.basePosition.distanceTo(n.basePosition),
        }))
        .sort((a, b) => a.dist - b.dist);

      const targets = sorted
        .slice(0, Math.min(sorted.length, 2))
        .map((item) => item.node);

      targets.forEach((target) => {
        node.connections.push(target);
        target.connections.push(node);
        pairs.push({
          id: connId++,
          start: node,
          end: target,
          animationOffset: Math.random() * 10,
        });
      });
    }

    nodesRef.current = generated;
    connectionPairsRef.current = pairs;
    setInitialized(true);

    return () => {
      nodesRef.current = [];
      connectionPairsRef.current = [];
      velocitiesRef.current.clear();
    };
  }, [nodeCount]);

  const getVelocity = useCallback((id: number) => {
    if (!velocitiesRef.current.has(id)) {
      velocitiesRef.current.set(id, new THREE.Vector3(0, 0, 0));
    }
    return velocitiesRef.current.get(id)!;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const delta = Math.min(state.clock.getDelta(), 0.1);

    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y = time * rotationSpeed;
    }

    if (!isHighTier) return;

    const REPULSION = 0.6;
    const SPRING_STRENGTH = 0.04;
    const CENTERING = 0.015;
    const DAMPING = 0.94;
    const NOISE_STRENGTH = 0.025;

    const nodes = nodesRef.current;
    const visibleNodes = nodes.filter((n) => n.scale > 0.01);

    visibleNodes.forEach((node) => {
      const vel = getVelocity(node.id);
      const pos = node.currentPosition;

      visibleNodes.forEach((other) => {
        if (node === other) return;
        _diff.subVectors(pos, other.currentPosition);
        let dist = _diff.length();
        if (dist < 0.1) dist = 0.1;
        if (dist < 2.5) {
          _diff.normalize().multiplyScalar((REPULSION / (dist * dist)) * delta);
          vel.add(_diff);
        }
      });

      // Spring forces from connections
      node.connections.forEach((neighbor) => {
        if (neighbor.scale > 0.01) {
          _diff.subVectors(neighbor.currentPosition, pos);
          const dist = _diff.length();
          const restLength = 1.2;
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

    visibleNodes.forEach((node) => {
      const vel = getVelocity(node.id);
      vel.multiplyScalar(DAMPING);
      node.currentPosition.add(vel.clone().multiplyScalar(delta * 10));
    });
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color={color} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color={color} />

      {initialized && (
        <InstancedNetwork
          nodesRef={nodesRef}
          connectionPairsRef={connectionPairsRef}
          color={color}
          performanceTier={performanceTier}
          isDarkMode={isDarkMode}
        />
      )}
    </group>
  );
}

// ===== MAIN COMPONENT =====

interface NeuralNetworkSimpleProps {
  width?: number;
  height?: number;
  color?: string;
  nodeCount?: number;
  className?: string;
  autoRotate?: boolean;
  rotationSpeed?: number;
  performanceTier?: PerformanceTier;
}

export default function NeuralNetworkSimple({
  width = 200,
  height = 200,
  color,
  nodeCount,
  className = "",
  autoRotate = false,
  rotationSpeed = 0.15,
  performanceTier,
}: NeuralNetworkSimpleProps) {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const [detectedTier, setDetectedTier] = useState<PerformanceTier>("high");

  useEffect(() => {
    setDetectedTier(detectPerformanceTier());
  }, []);

  const tier = performanceTier ?? detectedTier;
  const effectiveNodeCount = nodeCount ?? NODE_COUNTS[tier];
  const effectiveColor = color ?? (isDarkMode ? "#00FFD1" : "#00a88a");

  return (
    <div style={{ width, height }} className={className}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <OrbitControls enableZoom={false} enablePan={false} />
        <NetworkScene
          color={effectiveColor}
          nodeCount={effectiveNodeCount}
          autoRotate={autoRotate}
          rotationSpeed={rotationSpeed}
          performanceTier={tier}
          isDarkMode={isDarkMode}
        />
      </Canvas>
    </div>
  );
}
