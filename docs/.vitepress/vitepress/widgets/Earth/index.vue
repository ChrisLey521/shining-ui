<template>
  <div
    ref="container"
    style="width: 100%; height: 250px; position: relative; overflow: hidden; background: transparent"
  ></div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, watch } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { setupScene } from './scene';
import { setupLights } from './lights';
import { createEarth, createEnergyField } from './earth-model';
import type { EarthConfig, EarthRefs } from './types';

const config: EarthConfig = {
  width: window.innerWidth,
  height: window.innerHeight * 0.6,
  earthRadius: 6,
  networkLayerRadius: 3.05,
  energyFieldRadius: 3.1,
  pulseLayerRadius: 3.2,
  pulsePointRadius: 0.1,
  starCount: 1000,
  starSize: 0.1,
  earthColor: '#1a1a2e',
  networkColor: '#16213e',
  energyColor: '#0f3460',
  pulseColor: '#e94560',
  starColor: '#ffffff',
  borderColor: '#e94560',
  glowColor: '#e94560'
};

const refs = reactive<EarthRefs>({
  container: null,
  renderer: null,
  scene: null,
  camera: null,
  line: null,
  glowLine: null,
  earth: null,
  networkLayer: null,
  energyField: null,
  pulseLayers: null,
  pulsePoints: null,
  stars: null,
  starVelocities: null
});

const dimensions = reactive({
  width: window.innerWidth,
  height: window.innerHeight * 0.6
});

const container = ref<HTMLDivElement | null>(null);

function handleResize() {
  dimensions.width = window.innerWidth;
  dimensions.height = window.innerHeight * 0.6;

  if (refs.renderer && refs.scene && refs.camera) {
    refs.renderer.setSize(dimensions.width, dimensions.height);
    refs.camera.aspect = dimensions.width / dimensions.height;
    refs.camera.updateProjectionMatrix();
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize);
  refs.container = container.value;

  let controls: OrbitControls | null = null;
  let cleanupFns: (() => void)[] = [];

  const setup = () => {
    if (!refs.container) return;

    const { scene, camera, renderer } = setupScene({
      ...config,
      width: dimensions.width,
      height: dimensions.height
    });

    refs.camera = camera;
    refs.container.appendChild(renderer.domElement);
    refs.renderer = renderer;
    refs.scene = scene;

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.minDistance = 3;
    controls.maxDistance = 20;
    controls.enablePan = false;
    controls.target.set(0, 0, 0);
    controls.update();

    const { ambientLight, mainLight, fillLight, rimLight, pointLight } = setupLights(scene);
    const { earth, clouds, pulseNetwork, pulsePoints, ring, glowRing, stars, starVelocities } = createEarth(scene, config, camera);
    const energyField = createEnergyField(scene, config);

    refs.stars = stars;
    refs.starVelocities = starVelocities;

    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls?.update();

      if (earth) earth.rotation.y += 0.001;
      if (clouds) clouds.rotation.y += 0.002;
      if (pulseNetwork) pulseNetwork.rotation.y += 0.002;
      if (pulsePoints) pulsePoints.rotation.y += 0.002;

      if (refs.line && refs.glowLine && earth) {
        const scale = earth.scale.x;
        refs.line.scale.set(scale, scale, scale);
        refs.glowLine.scale.set(scale, scale, scale);
      }

      if (refs.stars && refs.starVelocities) {
        const positions = refs.stars.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          const starIndex = i / 3;
          const velocityX = refs.starVelocities[starIndex * 3];
          const velocityY = refs.starVelocities[starIndex * 3 + 1];
          const velocityZ = refs.starVelocities[starIndex * 3 + 2];

          positions[i] += velocityX;
          positions[i + 1] += velocityY;
          positions[i + 2] += velocityZ;

          const newLength = Math.sqrt(
            positions[i] * positions[i] +
            positions[i + 1] * positions[i + 1] +
            positions[i + 2] * positions[i + 2]
          );

          if (newLength > 45) {
            const radius = 25 + Math.random() * 15;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i + 2] = radius * Math.cos(phi);
          }
        }
        refs.stars.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    cleanupFns = [
      () => {
        cancelAnimationFrame(animationId);
        if (earth) scene.remove(earth);
        if (clouds) scene.remove(clouds);
        if (energyField) scene.remove(energyField);
        if (ring) scene.remove(ring);
        if (glowRing) scene.remove(glowRing);
        if (ambientLight) scene.remove(ambientLight);
        if (mainLight) scene.remove(mainLight);
        if (fillLight) scene.remove(fillLight);
        if (rimLight) scene.remove(rimLight);
        if (pointLight) scene.remove(pointLight);
        renderer.dispose();
        if (refs.container) {
          refs.container.removeChild(renderer.domElement);
        }
      }
    ];
  };

  setup();

  watch(
    () => [dimensions.width, dimensions.height],
    () => {
      cleanupFns.forEach(fn => fn());
      setup();
    }
  );

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    cleanupFns.forEach(fn => fn());
  });
});
</script> 