import { CanvasTexture } from 'three';

const createTechTexture = (size: number = 1024): CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  // Base gradient
  const gradient = ctx.createRadialGradient(
    size/2, size/2, 0,
    size/2, size/2, size/2
  );
  gradient.addColorStop(0, '#1a1a2e');
  gradient.addColorStop(1, '#16213e');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // Circuit patterns
  ctx.strokeStyle = '#e94560';
  ctx.lineWidth = 2;
  
  // Draw horizontal and vertical lines
  for (let i = 0; i < 10; i++) {
    const x = (i + 1) * size / 11;
    const y = (i + 1) * size / 11;
    
    // Horizontal lines
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y);
    ctx.stroke();
    
    // Vertical lines
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, size);
    ctx.stroke();
  }

  // Add glowing dots at intersections
  ctx.fillStyle = '#e94560';
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const x = (i + 1) * size / 11;
      const y = (j + 1) * size / 11;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Add some random circuit paths
  ctx.strokeStyle = '#e94560';
  ctx.lineWidth = 1;
  for (let i = 0; i < 20; i++) {
    ctx.beginPath();
    const startX = Math.random() * size;
    const startY = Math.random() * size;
    ctx.moveTo(startX, startY);
    
    for (let j = 0; j < 5; j++) {
      const controlX1 = Math.random() * size;
      const controlY1 = Math.random() * size;
      const controlX2 = Math.random() * size;
      const controlY2 = Math.random() * size;
      const endX = Math.random() * size;
      const endY = Math.random() * size;
      
      ctx.bezierCurveTo(
        controlX1, controlY1,
        controlX2, controlY2,
        endX, endY
      );
    }
    ctx.stroke();
  }

  return new CanvasTexture(canvas);
};

export { createTechTexture }; 