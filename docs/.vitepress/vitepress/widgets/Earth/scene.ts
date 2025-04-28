import { Scene, PerspectiveCamera, WebGLRenderer, Color, BufferGeometry, PointsMaterial, Points, BufferAttribute } from 'three';
import type { EarthConfig } from './types';

export const setupScene = (config: EarthConfig) => {
  const scene = new Scene();
  scene.background = new Color(0x000000); // 深色背景
  
  // 添加星星
  const starsGeometry = new BufferGeometry();
  const starsMaterial = new PointsMaterial({
    color: 0xFFFFFF,
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

  starsGeometry.setAttribute('position', new BufferAttribute(new Float32Array(starsVertices), 3));
  const stars = new Points(starsGeometry, starsMaterial);
  scene.add(stars);

  const camera = new PerspectiveCamera(75, config.width / config.height, 0.1, 1000);
  camera.position.z = 15;

  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(config.width, config.height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = 2;

  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';

  return { scene, camera, renderer };
}; 