import { useEffect, useRef } from 'react';

/**
 * AuroraCanvas — Interactive Northern Lights background
 *
 * Renders animated aurora borealis waves on a full-viewport canvas.
 * Waves respond to mouse movement with amplitude/position shifts.
 * Uses sine waves with pseudo-noise for organic shapes.
 */

const AURORA_COLORS = [
  { r: 34,  g: 211, b: 238 },  // Cyan    #22D3EE
  { r: 74,  g: 222, b: 128 },  // Green   #4ADE80
  { r: 56,  g: 189, b: 248 },  // Sky     #38BDF8
  { r: 52,  g: 211, b: 153 },  // Emerald #34D399
  { r: 99,  g: 102, b: 241 },  // Cobalt  #6366F1
];

const WAVE_COUNT = AURORA_COLORS.length;

// Simple pseudo-noise for organic wave motion
function noise(x, seed) {
  const n = Math.sin(x * 1.17 + seed * 0.73) * 0.5
          + Math.sin(x * 2.31 + seed * 1.41) * 0.25
          + Math.sin(x * 0.53 + seed * 2.17) * 0.25;
  return n;
}

export default function AuroraCanvas() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 }); // normalized 0-1
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height, dpr;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function handleMouseMove(e) {
      mouseRef.current.x = e.clientX / width;
      mouseRef.current.y = e.clientY / height;
    }

    function handleTouchMove(e) {
      if (e.touches.length > 0) {
        mouseRef.current.x = e.touches[0].clientX / width;
        mouseRef.current.y = e.touches[0].clientY / height;
      }
    }

    let scrollY = 0;
    function handleScroll() {
      scrollY = window.scrollY || window.pageYOffset || 0;
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    let time = 0;

    function drawWave(index, color, t) {
      const mouse = mouseRef.current;

      // Vertical position shifts subtly with scroll to keep waves active at any scroll point
      const scrollOffset = (scrollY * 0.0004) % 1;
      const waveCycle = (index * 0.18 + scrollOffset * 0.3) % 0.8;
      const baseY = height * (0.15 + waveCycle);
      const amplitude = height * (0.08 + index * 0.02);
      const speed = 0.25 + index * 0.07;
      const freq = 0.0018 + index * 0.0003;
      const seed = index * 7.3;

      // Mouse influence — waves shift toward cursor
      const mouseInfluenceX = (mouse.x - 0.5) * width * 0.16;
      const mouseInfluenceY = (mouse.y - 0.5) * height * 0.12;

      // Opacity — luminous polar night brightness
      const distFromMouse = Math.abs(mouse.y - (baseY / height));
      const mouseGlow = Math.max(0, 1 - distFromMouse * 2.2);
      const baseOpacity = 0.12 + index * 0.022;
      const opacity = Math.min(0.42, baseOpacity + mouseGlow * 0.20);

      const points = [];
      const segments = Math.ceil(width / 4);

      for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * width;
        const nx = x * freq + t * speed;

        const wave = Math.sin(nx) * amplitude
                   + noise(nx * 0.7, seed + t * 0.2) * amplitude * 0.6
                   + Math.sin(nx * 0.3 + t * 0.15) * amplitude * 0.35;

        const y = baseY + wave + mouseInfluenceY * (1 - index * 0.12);

        points.push({ x: x + mouseInfluenceX * (0.4 + index * 0.12), y });
      }

      // Draw filled wave shape with gradient
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const cpx = (prev.x + curr.x) / 2;
        const cpy = (prev.y + curr.y) / 2;
        ctx.quadraticCurveTo(prev.x, prev.y, cpx, cpy);
      }

      // Close path downward
      ctx.lineTo(width + 50, height + 50);
      ctx.lineTo(-50, height + 50);
      ctx.closePath();

      // Create vertical gradient for the wave
      const gradTop = Math.max(0, baseY - amplitude * 1.4);
      const gradBottom = Math.min(height * 1.2, baseY + height * 0.45);
      const gradient = ctx.createLinearGradient(0, gradTop, 0, gradBottom);
      gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`);
      gradient.addColorStop(0.35, `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * 0.65})`);
      gradient.addColorStop(0.7, `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * 0.2})`);
      gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

      ctx.fillStyle = gradient;
      ctx.fill();
    }

    function animate() {
      time += 0.008;

      ctx.clearRect(0, 0, width, height);

      // Set blend mode for natural light mixing
      ctx.globalCompositeOperation = 'lighter';

      // Draw each aurora wave
      for (let i = 0; i < WAVE_COUNT; i++) {
        drawWave(i, AURORA_COLORS[i], time);
      }

      // Reset blend mode
      ctx.globalCompositeOperation = 'source-over';

      animRef.current = requestAnimationFrame(animate);
    }

    // Pause when tab hidden for performance
    function handleVisibility() {
      if (document.hidden) {
        if (animRef.current) cancelAnimationFrame(animRef.current);
      } else {
        animRef.current = requestAnimationFrame(animate);
      }
    }

    document.addEventListener('visibilitychange', handleVisibility);
    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="aurora-canvas"
      aria-hidden="true"
    />
  );
}
