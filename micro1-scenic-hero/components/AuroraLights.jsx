import React, { useEffect, useRef } from 'react';

/**
 * AuroraLights — Realistic northern lights simulation for the night sky.
 * Renders undulating aurora borealis curtains with shimmering vertical rays
 * and luminous emerald/cyan/purple light waves.
 */
const AURORA_PALETTE = [
  { r: 34, g: 211, b: 153, stop: 0.2 },  // Emerald
  { r: 45, g: 212, b: 191, stop: 0.4 },  // Teal
  { r: 56, g: 189, b: 248, stop: 0.6 },  // Cyan
  { r: 168, g: 85, b: 247, stop: 0.8 },  // Violet
  { r: 74, g: 222, b: 128, stop: 1.0 },  // Green
];

export const AuroraLights = ({ opacity = 0.75 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = 0;
    let height = 0;
    let animId = null;
    let time = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
      height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Multi-frequency noise function for organic shimmering ribbons
    const waveNoise = (x, t, speed, freq, phase) => {
      return (
        Math.sin(x * freq + t * speed + phase) * 0.5 +
        Math.sin(x * freq * 1.8 - t * speed * 0.7 + phase * 1.3) * 0.3 +
        Math.sin(x * freq * 3.1 + t * speed * 1.2 + phase * 0.7) * 0.2
      );
    };

    const drawAuroraCurtain = (curtainIdx, baseHeightFrac, ampFrac, speed, color1, color2) => {
      const baseY = height * baseHeightFrac;
      const amp = height * ampFrac;
      const phase = curtainIdx * 2.14;

      const segments = Math.ceil(width / 6);
      const points = [];

      for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * width;
        const n = waveNoise(x, time, speed, 0.0016, phase);
        const y = baseY + n * amp;
        points.push({ x, y });
      }

      // Draw bottom wave curve
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const cx = (prev.x + curr.x) / 2;
        const cy = (prev.y + curr.y) / 2;
        ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);
      }

      // Aurora curtain extends upwards into the upper sky
      const curtainHeight = height * (0.28 + (curtainIdx % 2) * 0.12);
      ctx.lineTo(width + 20, points[points.length - 1].y - curtainHeight);
      ctx.lineTo(-20, points[0].y - curtainHeight);
      ctx.closePath();

      // Vertical glow gradient (bright at base, billowing soft rays upwards)
      const grad = ctx.createLinearGradient(0, baseY + amp, 0, baseY - curtainHeight);
      grad.addColorStop(0, `rgba(${color1.r}, ${color1.g}, ${color1.b}, 0)`);
      grad.addColorStop(0.18, `rgba(${color1.r}, ${color1.g}, ${color1.b}, ${0.55 * opacity})`);
      grad.addColorStop(0.55, `rgba(${color2.r}, ${color2.g}, ${color2.b}, ${0.35 * opacity})`);
      grad.addColorStop(0.85, `rgba(${color2.r}, ${color2.g}, ${color2.b}, ${0.12 * opacity})`);
      grad.addColorStop(1, `rgba(${color2.r}, ${color2.g}, ${color2.b}, 0)`);

      ctx.fillStyle = grad;
      ctx.fill();

      // Draw vertical shimmer rays inside the curtain
      const rayCount = 18;
      for (let r = 0; r < rayCount; r++) {
        const rx = (r / rayCount) * width + Math.sin(time * 0.4 + r) * 30;
        const rayWidth = 20 + Math.sin(r * 1.5 + time) * 12;
        const rayIntensity = Math.max(0, Math.sin(r * 0.8 + time * 0.6)) * 0.22 * opacity;

        if (rayIntensity > 0.02) {
          const rayGrad = ctx.createLinearGradient(0, baseY, 0, baseY - curtainHeight * 1.2);
          rayGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          rayGrad.addColorStop(0.3, `rgba(${color1.r}, ${color1.g}, ${color1.b}, ${rayIntensity})`);
          rayGrad.addColorStop(0.7, `rgba(${color2.r}, ${color2.g}, ${color2.b}, ${rayIntensity * 0.6})`);
          rayGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.fillStyle = rayGrad;
          ctx.fillRect(rx - rayWidth / 2, baseY - curtainHeight * 1.1, rayWidth, curtainHeight * 1.2);
        }
      }

      ctx.restore();
    };

    const render = () => {
      time += 0.007;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'screen';

      // Layer 1: Background violet/teal curtain
      drawAuroraCurtain(
        0,
        0.38,
        0.07,
        0.4,
        { r: 147, g: 51, b: 234 }, // Purple
        { r: 45, g: 212, b: 191 }  // Teal
      );

      // Layer 2: Main bright emerald wave
      drawAuroraCurtain(
        1,
        0.32,
        0.09,
        0.55,
        { r: 34, g: 211, b: 153 }, // Emerald
        { r: 56, g: 189, b: 248 }  // Cyan
      );

      // Layer 3: Vibrant high-altitude cyan/green wave
      drawAuroraCurtain(
        2,
        0.26,
        0.08,
        0.45,
        { r: 74, g: 222, b: 128 }, // Bright green
        { r: 168, g: 85, b: 247 }  // Violet
      );

      // Layer 4: Subtle foreground shimmer
      drawAuroraCurtain(
        3,
        0.42,
        0.06,
        0.65,
        { r: 34, g: 211, b: 238 }, // Cyan
        { r: 52, g: 211, b: 153 }  // Emerald
      );

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="hero-aurora-canvas"
      aria-hidden="true"
    />
  );
};

export default AuroraLights;
