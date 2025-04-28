/*
 * @Author: 李世林 shilin.li@qingteng.cn
 * @Date: 2025-04-21 17:57:12
 * @LastEditors: 李世林 shilin.li@qingteng.cn
 * @LastEditTime: 2025-04-28 11:34:13
 * @FilePath: \esop-report\src\components\Earth\types.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Line, Mesh, Scene, WebGLRenderer, Points, PerspectiveCamera, Group } from 'three';

interface EarthModel {
  earth: Group | null;
  clouds: Mesh | null;
  pulseNetwork: Mesh | null;
  pulsePoints: Points | null;
  ring: Mesh | null;
  glowRing: Mesh | null;
  blueRing: Mesh | null;
  stars: Points | null;
  starVelocities: Float32Array | null;
  ufos: Group[];
}

interface EarthRefs {
  container: HTMLDivElement | null;
  renderer: WebGLRenderer | null;
  scene: Scene | null;
  camera: PerspectiveCamera | null;
  line: Line | null;
  glowLine: Line | null;
  earth: Mesh | null;
  networkLayer: Mesh | null;
  energyField: Mesh | null;
  pulseLayers: Mesh[] | null;
  pulsePoints: Mesh[] | null;
  stars: Points | null;
  starVelocities: Float32Array | null;
}

interface EarthConfig {
  width: number;
  height: number;
  earthRadius: number;
  networkLayerRadius: number;
  energyFieldRadius: number;
  pulseLayerRadius: number;
  pulsePointRadius: number;
  starCount: number;
  starSize: number;
  earthColor: string;
  networkColor: string;
  energyColor: string;
  pulseColor: string;
  starColor: string;
  borderColor: string;
  glowColor: string;
}

export {
  type EarthConfig,
  type EarthRefs,
  type EarthModel
}