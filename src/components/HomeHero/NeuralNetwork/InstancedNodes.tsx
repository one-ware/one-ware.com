import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { NeuralNode } from './types';

const MAX_NODES = 100;
const MAX_CONNECTIONS = 200;

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
uniform vec3 uLineColor;

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

interface InstancedNodesProps {
  nodesRef: React.MutableRefObject<NeuralNode[]>;
  connectionPairsRef: React.MutableRefObject<Array<{ id: number; start: NeuralNode; end: NeuralNode; animationOffset: number }>>;
  performanceTier: 'high' | 'low';
}

export const InstancedNodes = React.memo(function InstancedNodes({
  nodesRef,
  connectionPairsRef,
  performanceTier
}: InstancedNodesProps) {
  const innerMeshRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const currentScalesRef = useRef<Float32Array>(new Float32Array(MAX_NODES));

  const segments = performanceTier === 'low' ? 8 : 16;

  const innerGeometry = useMemo(() => new THREE.SphereGeometry(1, segments, segments), [segments]);

  const innerMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPulseIntensity: { value: 0.03 },
        uFresnelPower: { value: 2.5 },
        uGlowIntensity: { value: 2.0 },
        uCoreIntensity: { value: 1.2 },
      },
      vertexShader: NODE_VERTEX_SHADER,
      fragmentShader: NODE_FRAGMENT_SHADER,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
  }, []);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(MAX_CONNECTIONS * 6);
    const progress = new Float32Array(MAX_CONNECTIONS * 2);
    const animOffset = new Float32Array(MAX_CONNECTIONS * 2);
    const opacity = new Float32Array(MAX_CONNECTIONS * 2);

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('progress', new THREE.BufferAttribute(progress, 1));
    geo.setAttribute('animOffset', new THREE.BufferAttribute(animOffset, 1));
    geo.setAttribute('opacity', new THREE.BufferAttribute(opacity, 1));
    geo.setDrawRange(0, 0);
    return geo;
  }, []);

  const lineMaterial = useMemo(() => {
    _color.set('#00FFD1');
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uLineColor: { value: new THREE.Vector3(_color.r, _color.g, _color.b) },
      },
      vertexShader: LINE_VERTEX_SHADER,
      fragmentShader: LINE_FRAGMENT_SHADER,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
  }, []);

  const lastPairsLengthRef = useRef(0);
  const lastPairsIdRef = useRef(-1);

  useEffect(() => {
    return () => {
      innerGeometry.dispose();
      innerMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
    };
  }, [innerGeometry, innerMaterial, lineGeometry, lineMaterial]);

  useFrame((state) => {
    const nodes = nodesRef.current;
    const pairs = connectionPairsRef.current;
    const innerMesh = innerMeshRef.current;
    const lines = linesRef.current;
    const currentScales = currentScalesRef.current;

    if (!innerMesh || !lines) return;

    const time = state.clock.getElapsedTime();
    innerMaterial.uniforms.uTime.value = time;
    lineMaterial.uniforms.uTime.value = time;

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
      innerMesh.setMatrixAt(i, _matrix);

      _color.set(node.color);
      innerMesh.setColorAt(i, _color);
    }

    for (let i = nodes.length; i < MAX_NODES; i++) {
      _scale.setScalar(0);
      _matrix.compose(_position, _quaternion, _scale);
      innerMesh.setMatrixAt(i, _matrix);
    }

    innerMesh.instanceMatrix.needsUpdate = true;
    if (innerMesh.instanceColor) innerMesh.instanceColor.needsUpdate = true;

    const posAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
    const progressAttr = lineGeometry.attributes.progress as THREE.BufferAttribute;
    const animOffsetAttr = lineGeometry.attributes.animOffset as THREE.BufferAttribute;
    const opacityAttr = lineGeometry.attributes.opacity as THREE.BufferAttribute;

    const positions = posAttr.array as Float32Array;
    const progressArr = progressAttr.array as Float32Array;
    const animOffsetArr = animOffsetAttr.array as Float32Array;
    const opacityArr = opacityAttr.array as Float32Array;

    const lastPairId = pairs.length > 0 ? pairs[pairs.length - 1].id : -1;
    const pairsChanged = pairs.length !== lastPairsLengthRef.current || lastPairId !== lastPairsIdRef.current;

    let lineIndex = 0;
    for (let i = 0; i < pairs.length && lineIndex < MAX_CONNECTIONS; i++) {
      const pair = pairs[i];
      const startScale = pair.start.scale ?? 0;
      const endScale = pair.end.scale ?? 0;
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
        ref={innerMeshRef}
        args={[innerGeometry, innerMaterial, MAX_NODES]}
        frustumCulled={false}
      />
      <lineSegments ref={linesRef} geometry={lineGeometry} material={lineMaterial} />
    </>
  );
});

InstancedNodes.displayName = 'InstancedNodes';
