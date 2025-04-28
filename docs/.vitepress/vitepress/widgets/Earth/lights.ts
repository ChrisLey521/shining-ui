/*
 * @Author: 李世林 shilin.li@qingteng.cn
 * @Date: 2025-04-21 17:57:32
 * @LastEditors: 李世林 shilin.li@qingteng.cn
 * @LastEditTime: 2025-04-21 19:41:16
 * @FilePath: \esop-report\src\components\Earth\lights.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Scene, AmbientLight, DirectionalLight, PointLight } from 'three';

export const setupLights = (scene: Scene) => {
  // 环境光 - 降低强度以模拟太空环境
  const ambientLight = new AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);
  
  // 主光源（模拟太阳）- 增加强度并调整位置
  const mainLight = new DirectionalLight(0xffffff, 2);
  mainLight.position.set(10, 5, 5);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width = 2048;
  mainLight.shadow.mapSize.height = 2048;
  scene.add(mainLight);
  
  // 辅助光源 - 调整颜色和强度
  const fillLight = new DirectionalLight(0xffffff, 0.5);
  fillLight.position.set(-5, -3, -5);
  scene.add(fillLight);

  // 边缘光 - 调整位置和强度
  const rimLight = new DirectionalLight(0xffffff, 0.3);
  rimLight.position.set(0, 5, 0);
  scene.add(rimLight);

  // 添加点光源以增加立体感
  const pointLight = new PointLight(0xffffff, 0.3);
  pointLight.position.set(0, 0, 10);
  scene.add(pointLight);

  return { ambientLight, mainLight, fillLight, rimLight, pointLight };
}; 