/*
 * @Author: 李世林 shilin.li@qingteng.cn
 * @Date: 2025-04-22 14:10:39
 * @LastEditors: 李世林 shilin.li@qingteng.cn
 * @LastEditTime: 2025-04-22 19:21:43
 * @FilePath: \esop-report\src\components\Earth\ufo-model.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { 
  Mesh, 
  SphereGeometry, 
  Group, 
  Color,
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
  Points,
  CylinderGeometry,
  MeshStandardMaterial,
  DoubleSide,
  TorusGeometry,
  SpotLight
} from 'three';

export const createUFO = (distanceFromEarth: number, coneColor: number = 0x00aaff) => {
  const ufoGroup = new Group();

  // Main body (solid metallic sphere)
  const bodyGeometry = new SphereGeometry(0.8, 256, 256);
  const bodyMaterial = new MeshStandardMaterial({
    metalness: 0.95,
    roughness: 0.02,
    color: new Color(0x0077ff),
    envMapIntensity: 3.0
  });
  const body = new Mesh(bodyGeometry, bodyMaterial);
  ufoGroup.add(body);

  // Add technology nodes
  const nodeGeometry = new SphereGeometry(0.02, 32, 32);
  const nodeMaterial = new MeshStandardMaterial({
    color: 0x00aaff,
    emissive: 0x00aaff,
    emissiveIntensity: 2.0,
    metalness: 0.8,
    roughness: 0.1
  });

  for (let i = 0; i < 12; i++) {
    const node = new Mesh(nodeGeometry, nodeMaterial);
    const phi = Math.acos(-1 + (2 * i) / 12);
    const theta = Math.sqrt(12 * Math.PI) * phi;
    
    node.position.x = 0.8 * Math.cos(theta) * Math.sin(phi);
    node.position.y = 0.8 * Math.sin(theta) * Math.sin(phi);
    node.position.z = 0.8 * Math.cos(phi);
    
    ufoGroup.add(node);
  }

  // Add energy ring
  const ringGeometry = new TorusGeometry(0.9, 0.02, 16, 100);
  const ringMaterial = new MeshStandardMaterial({
    color: 0x00aaff,
    emissive: 0x00aaff,
    emissiveIntensity: 2.0,
    metalness: 0.8,
    roughness: 0.1,
    side: DoubleSide
  });
  const ring = new Mesh(ringGeometry, ringMaterial);
  ring.rotation.x = Math.PI / 2;
  ufoGroup.add(ring);

  // Add thruster ports with yellow spotlights
  const thrusterGeometry = new CylinderGeometry(0.05, 0.05, 0.1, 32);
  const thrusterMaterial = new MeshStandardMaterial({
    color: 0x0077ff,
    metalness: 0.95,
    roughness: 0.02,
    emissive: 0x00aaff,
    emissiveIntensity: 1.0
  });

  for (let i = 0; i < 6; i++) {
    const thruster = new Mesh(thrusterGeometry, thrusterMaterial);
    const angle = (i / 6) * Math.PI * 2;
    thruster.position.x = 0.7 * Math.cos(angle);
    thruster.position.z = 0.7 * Math.sin(angle);
    thruster.position.y = -0.8; // Position at the bottom of the sphere
    thruster.rotation.x = Math.PI / 2;
    ufoGroup.add(thruster);

    // Add spotlight with custom color
    const spotlight = new SpotLight(coneColor, 3, 15, Math.PI / 4, 0.5, 1);
    spotlight.position.copy(thruster.position);
    spotlight.position.y -= 0.1; // Position slightly below the thruster
    spotlight.target.position.set(
      spotlight.position.x,
      spotlight.position.y - 3, // Point light downward
      spotlight.position.z
    );
    ufoGroup.add(spotlight);
    ufoGroup.add(spotlight.target);
  }

  // Add energy field
  const energyFieldGeometry = new BufferGeometry();
  const energyFieldCount = 2000;
  const energyFieldPositions = new Float32Array(energyFieldCount * 3);
  const energyFieldColors = new Float32Array(energyFieldCount * 3);

  for (let i = 0; i < energyFieldCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 0.9 + Math.random() * 0.2;
    energyFieldPositions[i * 3] = Math.cos(angle) * radius;
    energyFieldPositions[i * 3 + 1] = Math.random() * 0.1 - 0.05;
    energyFieldPositions[i * 3 + 2] = Math.sin(angle) * radius;

    // Convert coneColor to RGB values
    const r = ((coneColor >> 16) & 255) / 255;
    const g = ((coneColor >> 8) & 255) / 255;
    const b = (coneColor & 255) / 255;

    energyFieldColors[i * 3] = r;
    energyFieldColors[i * 3 + 1] = g;
    energyFieldColors[i * 3 + 2] = b;
  }

  energyFieldGeometry.setAttribute('position', new BufferAttribute(energyFieldPositions, 3));
  energyFieldGeometry.setAttribute('color', new BufferAttribute(energyFieldColors, 3));

  const energyFieldMaterial = new PointsMaterial({
    size: 0.015,
    vertexColors: true,
    transparent: true,
    opacity: 0.5,
    blending: 2
  });

  const energyField = new Points(energyFieldGeometry, energyFieldMaterial);
  ufoGroup.add(energyField);

  // Create antenna
  const antennaGeometry = new CylinderGeometry(0.03, 0.03, 0.8, 8);
  const antennaMaterial = new MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.95,
    roughness: 0.1,
    envMapIntensity: 1.5
  });
  const antenna = new Mesh(antennaGeometry, antennaMaterial);
  antenna.position.y = 0.8;
  ufoGroup.add(antenna);

  // Add orange lights around antenna base
  const lightCount = 8;
  const lightRadius = 0.25;
  const baseLightGeometry = new SphereGeometry(0.02, 16, 16);
  
  for (let i = 0; i < lightCount; i++) {
    const angle = (i / lightCount) * Math.PI * 2;
    const baseLightMaterial = new MeshStandardMaterial({
      color: 0xff6600,
      emissive: 0xff6600,
      emissiveIntensity: 1.5,
      transparent: true,
      opacity: 0.6
    });
    const baseLight = new Mesh(baseLightGeometry, baseLightMaterial);
    
    baseLight.position.x = Math.cos(angle) * lightRadius;
    baseLight.position.z = Math.sin(angle) * lightRadius;
    baseLight.position.y = 0.8;
    
    ufoGroup.add(baseLight);
  }

  // Create blinking light with halo
  const lightGeometry = new SphereGeometry(0.08, 16, 16);
  const lightMaterial = new MeshStandardMaterial({
    color: 0xff0000,
    emissive: 0xff0000,
    emissiveIntensity: 2.0,
    transparent: true,
    opacity: 0.6
  });
  const light = new Mesh(lightGeometry, lightMaterial);
  light.position.y = 1.2;
  ufoGroup.add(light);

  // Add halo effect with gradient
  const haloGeometry = new SphereGeometry(0.15, 32, 32);
  const haloMaterial = new MeshStandardMaterial({
    color: 0xff0000,
    emissive: 0xff0000,
    emissiveIntensity: 1.0,
    transparent: true,
    opacity: 0.1,
    side: DoubleSide,
    depthWrite: false,
    blending: 2
  });
  const halo = new Mesh(haloGeometry, haloMaterial);
  halo.position.y = 1.2;
  ufoGroup.add(halo);

  // Add multiple layers for gradient effect
  const gradientLayers = 3;
  for (let i = 1; i < gradientLayers; i++) {
    const layerGeometry = new SphereGeometry(0.15 * (1 + i * 0.3), 32, 32);
    const layerMaterial = new MeshStandardMaterial({
      color: 0xff0000,
      emissive: 0xff0000,
      emissiveIntensity: 1.0,
      transparent: true,
      opacity: 0.1 / (i + 1),
      side: DoubleSide,
      depthWrite: false,
      blending: 2
    });
    const layer = new Mesh(layerGeometry, layerMaterial);
    layer.position.y = 1.2;
    ufoGroup.add(layer);
  }

  // Add blinking animation for light and all gradient layers
  const animateLight = () => {
    const time = Date.now() * 0.001;
    const intensity = Math.abs(Math.sin(time * 2)) * 3;
    lightMaterial.emissiveIntensity = intensity;
    haloMaterial.emissiveIntensity = intensity * 0.5;
    haloMaterial.opacity = Math.abs(Math.sin(time * 2)) * 0.1;
    requestAnimationFrame(animateLight);
  };
  animateLight();

  // Add bottom cone light effect with custom color
  const coneGeometry = new CylinderGeometry(0.5, 1.5, 2, 32, 32, true);
  const coneMaterial = new MeshStandardMaterial({
    color: coneColor,
    emissive: coneColor,
    emissiveIntensity: 0.5,
    transparent: true,
    opacity: 0.2,
    side: DoubleSide,
    depthWrite: false,
    blending: 2
  });
  
  // Create gradient effect using vertex colors
  const positions = coneGeometry.attributes.position.array;
  const colors = new Float32Array(positions.length);
  const vertexCount = positions.length / 3;
  
  for (let i = 0; i < vertexCount; i++) {
    // Set color with gradient
    const r = ((coneColor >> 16) & 255) / 255;
    const g = ((coneColor >> 8) & 255) / 255;
    const b = (coneColor & 255) / 255;
    colors[i * 3] = r;
    colors[i * 3 + 1] = g;
    colors[i * 3 + 2] = b;
  }
  
  coneGeometry.setAttribute('color', new BufferAttribute(colors, 3));
  coneMaterial.vertexColors = true;
  
  const coneLight = new Mesh(coneGeometry, coneMaterial);
  coneLight.position.y = -1;
  ufoGroup.add(coneLight);

  // Add cone light animation
  const animateCone = () => {
    const time = Date.now() * 0.001;
    const intensity = Math.abs(Math.sin(time * 0.5)) * 0.5;
    coneMaterial.emissiveIntensity = intensity;
    coneMaterial.opacity = Math.abs(Math.sin(time * 0.5)) * 0.2;
    requestAnimationFrame(animateCone);
  };
  animateCone();

  // Position the UFO at a distance from Earth
  ufoGroup.position.set(distanceFromEarth, 0, 0);

  return ufoGroup;
}; 