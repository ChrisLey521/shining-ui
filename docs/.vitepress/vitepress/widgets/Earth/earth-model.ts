/*
 * @Author: 李世林 shilin.li@qingteng.cn
 * @Date: 2025-04-21 17:57:59
 * @LastEditors: 李世林 shilin.li@qingteng.cn
 * @LastEditTime: 2025-04-22 19:18:20
 * @FilePath: \esop-report\src\components\Earth\earth-model.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  Scene,
  Mesh,
  MeshPhongMaterial,
  SphereGeometry,
  FrontSide,
  BackSide,
  TextureLoader,
  Vector2,
  Color,
  BoxGeometry,
  PointsMaterial,
  Points,
  BufferGeometry,
  BufferAttribute,
  TorusGeometry,
  MeshBasicMaterial,
  PerspectiveCamera,
  Group,
  Vector3
} from 'three';
import type { EarthConfig, EarthModel } from './types';
import { createUFO } from './ufo-model';

export const createEarth = (scene: Scene, config: EarthConfig, camera: PerspectiveCamera): EarthModel => {
  // 创建地球组
  const earthGroup = new Group();
  scene.add(earthGroup);

  const geometry = new SphereGeometry(config.earthRadius, 128, 128);
  const textureLoader = new TextureLoader();
  
  // 加载更高清的纹理
  const baseTexture = textureLoader.load('/textures/imgs/earth-at-night.jpg');
  const normalMap = textureLoader.load('/textures/imgs/earth_normal_2048.jpg');
  const specularMap = textureLoader.load('/textures/imgs/earth_specular_2048.jpg');
  const cloudsTexture = textureLoader.load('/textures/imgs/earth_clouds_1024.png');
  
  const material = new MeshPhongMaterial({
    map: baseTexture,
    normalMap: normalMap,
    specularMap: specularMap,
    normalScale: new Vector2(0.5, 0.5),
    shininess: 10,
    specular: new Color(0x111111),
    side: FrontSide,
    emissive: new Color(0x000000),
    emissiveIntensity: 0.1
  });
  
  const earth = new Mesh(geometry, material);
  earth.castShadow = true;
  earth.receiveShadow = true;
  earthGroup.add(earth);

  // 调整云层效果
  const cloudsGeometry = new SphereGeometry(config.earthRadius + 0.05, 128, 128);
  const cloudsMaterial = new MeshPhongMaterial({
    map: cloudsTexture,
    transparent: true,
    opacity: 0.6,
    side: FrontSide,
    emissive: new Color(0xffffff),
    emissiveIntensity: 0.1
  });
  const clouds = new Mesh(cloudsGeometry, cloudsMaterial);
  earthGroup.add(clouds);

  // 创建脉冲网络
  const pulseNetworkGeometry = new SphereGeometry(config.earthRadius + 0.2, 128, 128);
  const pulseNetworkMaterial = new MeshPhongMaterial({
    color: 0x9b51e0,
    transparent: true,
    opacity: 0.1,
    wireframe: true,
    side: FrontSide,
    emissive: new Color(0x9b51e0),
    emissiveIntensity: 0.5
  });
  const pulseNetwork = new Mesh(pulseNetworkGeometry, pulseNetworkMaterial);
  earthGroup.add(pulseNetwork);

  // 创建脉冲点阵
  const pulsePointsGeometry = new BufferGeometry();
  const pulsePointsMaterial = new PointsMaterial({
    color: 0xffffff,
    size: 0.4,
    transparent: true,
    opacity: 0.4,
    sizeAttenuation: true,
    vertexColors: true
  });

  const pulsePointsVertices = [];
  const pulsePointsColors = [];
  const colors = [
    0xff0000, // 红色
    0xff4000, // 橙红色
    0xff8000, // 橙色
    0xffbf00, // 橙黄色
    0xffff00, // 黄色
    0xbfff00, // 黄绿色
    0x80ff00, // 绿色
    0x40ff00, // 青绿色
    0x00ff00, // 青色
    0x00ff40, // 青蓝色
    0x00ff80, // 蓝色
    0x00ffbf, // 蓝紫色
    0x00ffff, // 紫色
    0x00bfff, // 紫红色
    0x0080ff  // 红色
  ];

  for (let i = 0; i < 66; i++) {  // 200 / 3 ≈ 66
    const radius = config.earthRadius + 0.5 + Math.random() * 0.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    
    pulsePointsVertices.push(x, y, z);
    
    const color = colors[Math.floor(Math.random() * colors.length)];
    const r = ((color >> 16) & 255) / 255;
    const g = ((color >> 8) & 255) / 255;
    const b = (color & 255) / 255;
    pulsePointsColors.push(r, g, b);
  }

  pulsePointsGeometry.setAttribute('position', new BufferAttribute(new Float32Array(pulsePointsVertices), 3));
  pulsePointsGeometry.setAttribute('color', new BufferAttribute(new Float32Array(pulsePointsColors), 3));
  const pulsePoints = new Points(pulsePointsGeometry, pulsePointsMaterial);
  earthGroup.add(pulsePoints);

  // 添加光照环
  const ringGeometry = new TorusGeometry(
    config.earthRadius + 2.5,  // 环的半径
    0.5,  // 环的粗细
    32,   // 径向分段
    100   // 环向分段
  );
  const ringMaterial = new MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.2,
    side: FrontSide,
    depthWrite: false
  });
  const ring = new Mesh(ringGeometry, ringMaterial);
  scene.add(ring);

  // 添加发光效果
  const glowRingGeometry = new TorusGeometry(
    config.earthRadius + 2.5,
    0.6,
    32,
    100
  );
  const glowRingMaterial = new MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.1,
    side: FrontSide,
    depthWrite: false
  });
  const glowRing = new Mesh(glowRingGeometry, glowRingMaterial);
  scene.add(glowRing);

  // 添加更大的橙色光环
  const blueRingGeometry = new TorusGeometry(
    config.earthRadius + 5.0,  // 更大的半径
    0.8,  // 更宽的宽度
    32,
    100
  );
  const blueRingMaterial = new MeshBasicMaterial({
    color: 0xffa500,
    transparent: true,
    opacity: 0.1,
    side: FrontSide,
    depthWrite: false
  });
  const blueRing = new Mesh(blueRingGeometry, blueRingMaterial);
  scene.add(blueRing);

  // 添加颜色渐变动画
  const animateRings = () => {
    const time = Date.now() * 0.001;  // 转换为秒
    
    // 紫色光环动画
    const purpleOpacity = Math.abs(Math.sin(time * 0.6)) * 0.08;  // 使用绝对值实现连续淡入淡出
    const color = new Color(0xd8b4fe);
    ringMaterial.color = color;
    glowRingMaterial.color = color;
    ringMaterial.opacity = purpleOpacity;
    glowRingMaterial.opacity = purpleOpacity * 0.5;
    
    // 蓝色光环动画（相位差π/2）
    const blueOpacity = Math.abs(Math.sin(time * 0.6 + Math.PI/2)) * 0.08;  // 交错动画
    
    // 更新蓝色光环的透明度
    blueRingMaterial.opacity = blueOpacity;
    
    // 保持光环始终面向相机
    ring.quaternion.copy(camera.quaternion);
    glowRing.quaternion.copy(camera.quaternion);
    blueRing.quaternion.copy(camera.quaternion);
    
    requestAnimationFrame(animateRings);
  };
  
  animateRings();

  const { stars, starVelocities } = createStars(scene);

  // Helper functions for UFO movement
  const isMovingTowardsEarth = (position: Vector3, direction: Vector3): boolean => {
    const toEarth = new Vector3().subVectors(new Vector3(0, 0, 0), position).normalize();
    return direction.dot(toEarth) > 0.5; // If angle is less than 60 degrees
  };

  const getNewDirection = (position: Vector3): Vector3 => {
    const toEarth = new Vector3().subVectors(new Vector3(0, 0, 0), position).normalize();
    const newDirection = new Vector3(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    ).normalize();
    
    // Ensure new direction is away from Earth
    while (newDirection.dot(toEarth) > 0) {
      newDirection.set(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      ).normalize();
    }
    return newDirection;
  };

  // Add UFOs
  const ufoCount = 3;
  const ufos: Group[] = [];
  const ufoSpeeds = [0.025, 0.03, 0.02]; // Different speeds for each UFO
  const ufoDirections: Vector3[] = [];
  const ufoRotations = [0.01, 0.015, 0.008]; // Different rotation speeds
  const ufoRespawnDelays: number[] = [0, 0, 0]; // Track respawn delay for each UFO
  const respawnDelay = 1000; // 1 second delay in milliseconds
  const fadeDuration = 500; // 0.5 seconds for fade in/out
  const ufoOpacities: number[] = [1, 1, 1]; // Track opacity for each UFO
  const ufoColors = [
    0xff0000, // Red
    0x00ff00, // Green
    0x0000ff, // Blue
    0xffff00, // Yellow
    0xff00ff, // Magenta
    0x00ffff, // Cyan
    0xff8800, // Orange
    0xff00aa  // Pink
  ];

  // Initialize UFOs
  for (let i = 0; i < ufoCount; i++) {
    const randomColorIndex = Math.floor(Math.random() * ufoColors.length);
    const ufo = createUFO(config.earthRadius * 0.1, ufoColors[randomColorIndex]);
    const radius = 25 + Math.random() * 15;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    ufo.position.x = radius * Math.sin(phi) * Math.cos(theta);
    ufo.position.y = radius * Math.sin(phi) * Math.sin(theta);
    ufo.position.z = radius * Math.cos(phi);
    
    // Initialize direction for each UFO
    const direction = new Vector3(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    ).normalize();
    ufoDirections.push(direction);
    
    scene.add(ufo);
    ufos.push(ufo);
  }

  // Update UFO positions in animation loop
  const animateUFOs = () => {
    const currentTime = Date.now();
    
    ufos.forEach((ufo, index) => {
      if (ufo) {
        // Handle fade in/out effect
        if (ufoRespawnDelays[index] > currentTime) {
          const fadeProgress = (ufoRespawnDelays[index] - currentTime) / fadeDuration;
          ufoOpacities[index] = Math.max(0, Math.min(1, fadeProgress));
          ufo.traverse((child) => {
            if (child instanceof Mesh) {
              child.material.transparent = true;
              child.material.opacity = ufoOpacities[index];
            }
          });
          ufo.visible = ufoOpacities[index] > 0;
        } else if (ufoOpacities[index] < 1) {
          ufoOpacities[index] = Math.min(1, ufoOpacities[index] + 0.02);
          ufo.traverse((child) => {
            if (child instanceof Mesh) {
              child.material.transparent = true;
              child.material.opacity = ufoOpacities[index];
            }
          });
          ufo.visible = true;
        }

        // Check if UFO is moving towards Earth
        if (isMovingTowardsEarth(ufo.position, ufoDirections[index])) {
          ufoDirections[index].copy(getNewDirection(ufo.position));
        }

        ufo.position.x += ufoDirections[index].x * ufoSpeeds[index];
        ufo.position.y += ufoDirections[index].y * ufoSpeeds[index];
        ufo.position.z += ufoDirections[index].z * ufoSpeeds[index];

        // Improved boundary handling with random coordinates for all axes
        const sceneSize = 100;
        
        // Helper function to get random position within scene bounds
        const getRandomPosition = () => (Math.random() * 2 - 1) * sceneSize;

        // Check if UFO has crossed any boundary
        if (Math.abs(ufo.position.x) > sceneSize || 
            Math.abs(ufo.position.y) > sceneSize || 
            Math.abs(ufo.position.z) > sceneSize) {
          
          // Hide UFO and set respawn time
          ufo.visible = false;
          ufoRespawnDelays[index] = currentTime + respawnDelay;
          
          // Set new position for when UFO reappears
          if (ufo.position.x > sceneSize) {
            ufo.position.x = -sceneSize;
          } else if (ufo.position.x < -sceneSize) {
            ufo.position.x = sceneSize;
          }
          
          if (ufo.position.y > sceneSize) {
            ufo.position.y = -sceneSize;
          } else if (ufo.position.y < -sceneSize) {
            ufo.position.y = sceneSize;
          }
          
          if (ufo.position.z > sceneSize) {
            ufo.position.z = -sceneSize;
          } else if (ufo.position.z < -sceneSize) {
            ufo.position.z = sceneSize;
          }

          // Set random positions for the other two axes
          if (Math.abs(ufo.position.x) > sceneSize) {
            ufo.position.y = getRandomPosition();
            ufo.position.z = getRandomPosition();
          } else if (Math.abs(ufo.position.y) > sceneSize) {
            ufo.position.x = getRandomPosition();
            ufo.position.z = getRandomPosition();
          } else if (Math.abs(ufo.position.z) > sceneSize) {
            ufo.position.x = getRandomPosition();
            ufo.position.y = getRandomPosition();
          }
        }

        ufo.rotation.y += ufoRotations[index]; // Different rotation speeds
      }
    });
    requestAnimationFrame(animateUFOs);
  };

  animateUFOs();

  return { 
    earth: earthGroup, // 返回地球组而不是单个地球网格
    clouds,
    pulseNetwork,
    pulsePoints,
    ring,
    glowRing,
    blueRing,
    stars,
    starVelocities,
    ufos
  };
};

export const createNetworkLayer = (scene: Scene, config: EarthConfig) => {
  const networkGeometry = new BoxGeometry(
    config.earthRadius * 2.3,
    config.earthRadius * 2.3,
    config.earthRadius * 2.3,
    20, 20, 20
  );
  const networkMaterial = new MeshPhongMaterial({
    color: config.networkColor,
    transparent: true,
    opacity: 0.3,
    wireframe: true,
    side: FrontSide,
    emissive: config.networkColor,
    emissiveIntensity: 0.2
  });
  const network = new Mesh(networkGeometry, networkMaterial);
  scene.add(network);

  return network;
};

export const createEnergyField = (scene: Scene, config: EarthConfig) => {
  const energyGeometry = new SphereGeometry(config.earthRadius + 0.2, 128, 128);
  const energyMaterial = new MeshPhongMaterial({
    color: config.energyColor,
    transparent: true,
    opacity: 0.1,
    side: BackSide,
    emissive: config.energyColor,
    emissiveIntensity: 0.1
  });
  const energyField = new Mesh(energyGeometry, energyMaterial);
  scene.add(energyField);

  return energyField;
};

// 添加星星创建逻辑
export const createStars = (scene: Scene) => {
  const starCount = 600;  // Increased from 200 to 600
  const starVelocities = new Float32Array(starCount * 3); // 存储星星的速度
  const starsGeometry = new BufferGeometry();
  const starsMaterial = new PointsMaterial({ color: 0xffffff, size: 0.1 });
  const positions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    const radius = 25 + Math.random() * 15;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    const speed = 0.005;  // Reduced from 2.0 to 0.005
    const dirX = Math.random() * 2 - 1;
    const dirY = Math.random() * 2 - 1;
    const dirZ = Math.random() * 2 - 1;
    const length = Math.sqrt(dirX * dirX + dirY * dirY + dirZ * dirZ);
    starVelocities[i * 3] = (dirX / length) * speed;
    starVelocities[i * 3 + 1] = (dirY / length) * speed;
    starVelocities[i * 3 + 2] = (dirZ / length) * speed;
  }

  starsGeometry.setAttribute('position', new BufferAttribute(positions, 3));
  const stars = new Points(starsGeometry, starsMaterial);
  scene.add(stars);

  return { stars, starVelocities };
};

export const createEarthModel = (scene: Scene, config: EarthConfig, camera: PerspectiveCamera): EarthModel => {
  const earthModel = createEarth(scene, config, camera);
  const { stars, starVelocities } = createStars(scene);

  return { ...earthModel, stars, starVelocities };
}; 