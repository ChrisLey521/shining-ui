import * as THREE from 'three';
import type { EarthConfig } from './types';

export const createPulseLayers = (scene: THREE.Scene, config: EarthConfig) => {
  const pulseLayers: THREE.Mesh[] = [];
  const pulseColors = [
    new THREE.Color(config.pulseColor),
    new THREE.Color(0xba68c8),
    new THREE.Color(0xce93d8),
    new THREE.Color(0xe1bee7),
    new THREE.Color(0xf3e5f5)
  ];
  const pulseRadii = [2.15, 2.2, 2.25, 2.3, 2.35];
  
  pulseColors.forEach((color, index) => {
    const pulseGeometry = new THREE.SphereGeometry(pulseRadii[index], 128, 128);
    const pulseMaterial = new THREE.MeshPhongMaterial({
      color: color,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide,
      emissive: color,
      emissiveIntensity: 0.1
    });
    const pulseField = new THREE.Mesh(pulseGeometry, pulseMaterial);
    scene.add(pulseField);
    pulseLayers.push(pulseField);
  });

  return pulseLayers;
};

export const createPulsePoints = (scene: THREE.Scene, config: EarthConfig) => {
  const pulsePointsLayers: THREE.Points[] = [];
  const pulseColors = [
    new THREE.Color(config.pulseColor),
    new THREE.Color(0xba68c8),
    new THREE.Color(0xce93d8),
    new THREE.Color(0xe1bee7),
    new THREE.Color(0xf3e5f5)
  ];

  pulseColors.forEach((color, index) => {
    const pulsePointsGeometry = new THREE.BufferGeometry();
    const pulsePointsMaterial = new THREE.PointsMaterial({
      color: color,
      size: 0.1,
      transparent: true
    });
    const pulsePointsVertices = [];
    for (let i = 0; i < 50; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = 2.2 + index * 0.1;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      pulsePointsVertices.push(x, y, z);
    }
    pulsePointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(pulsePointsVertices, 3));
    const pulsePoints = new THREE.Points(pulsePointsGeometry, pulsePointsMaterial);
    scene.add(pulsePoints);
    pulsePointsLayers.push(pulsePoints);
  });

  return pulsePointsLayers;
};

export const createStars = (scene: THREE.Scene, config: EarthConfig) => {
  const starsGeometry = new THREE.BufferGeometry();
  const starsMaterial = new THREE.PointsMaterial({
    color: config.starColor,
    size: 0.1,
    transparent: true
  });
  const starsVertices = [];
  for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starsVertices.push(x, y, z);
  }
  starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
  const stars = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(stars);

  return stars;
}; 