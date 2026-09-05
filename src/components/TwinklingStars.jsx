import React, { useEffect, useRef } from 'react';

/**
 * TwinklingStars — Ambient background blinking/twinkling stars
 * with interactive "Tap to Shoot Star" across the night mountain sky.
 */
export const TwinklingStars = ({ starCount = 85 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = 0;
    let height = 0;
    let animId = null;

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

    // Generate stars strictly confined to the upper 52% of the viewport (sky above mountains)
    const starColors = [
      { r: 255, g: 255, b: 255 }, // Crisp White
      { r: 224, g: 242, b: 254 }, // Pale Icy Cyan
      { r: 254, g: 240, b: 138 }, // Warm Starlight
      { r: 199, g: 210, b: 254 }, // Soft Indigo/Violet
      { r: 165, g: 243, b: 252 }, // Luminous Cyan
    ];

    const stars = Array.from({ length: starCount }).map(() => {
      const color = starColors[Math.floor(Math.random() * starColors.length)];
      return {
        x: Math.random(),
        y: Math.pow(Math.random(), 1.3) * 0.50, // purely confined to the upper sky
        radius: 0.6 + Math.random() * 1.5,
        color,
        speed: 0.02 + Math.random() * 0.045,
        phase: Math.random() * Math.PI * 2,
        maxOpacity: 0.55 + Math.random() * 0.45,
        minOpacity: 0.08 + Math.random() * 0.2,
        hasSpikes: Math.random() > 0.85, // Subtle cross diffraction for select stars
      };
    });

    // Shooting stars array (supports concurrent user taps and periodic auto streaks)
    let shootingStars = [];
    let nextAutoShootingTime = Date.now() + 6000 + Math.random() * 8000;

    const spawnShootingStar = (customX = null, customY = null) => {
      const startX = customX !== null ? customX : (0.15 + Math.random() * 0.7) * width;
      const startY = customY !== null ? customY : (0.04 + Math.random() * 0.20) * height;
      const angle = (Math.PI / 6) + (Math.random() * Math.PI) / 8;
      const length = 90 + Math.random() * 90;
      const speed = 7.5 + Math.random() * 4.5;

      shootingStars.push({
        x: startX,
        y: startY,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        length,
        life: 0,
        maxLife: 45 + Math.floor(Math.random() * 20),
      });

      nextAutoShootingTime = Date.now() + 12000 + Math.random() * 14000;
    };

    // Tap to shoot star listener (tap or click in sky)
    const handleTapToShoot = (e) => {
      // Don't trigger if tapping on interactive buttons/links
      if (e.target && e.target.closest('button, a, input')) return;

      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;

      // Only trigger if tapped in the sky area (upper 68% of hero)
      if (py <= height * 0.68 && px >= 0 && px <= width) {
        spawnShootingStar(px, py);
      }
    };

    const heroSection = canvas.closest('.hero-section') || window;
    heroSection.addEventListener('pointerdown', handleTapToShoot, { passive: true });

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw static background blinking stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const twinkle = Math.sin(time * star.speed + star.phase);
        const normTwinkle = (twinkle + 1) / 2;
        const alpha = star.minOpacity + normTwinkle * (star.maxOpacity - star.minOpacity);

        const px = star.x * width;
        const py = star.y * height;

        // Core star dot
        ctx.beginPath();
        ctx.arc(px, py, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${alpha})`;
        ctx.fill();

        // Soft ambient halo around brighter stars
        if (alpha > 0.6) {
          ctx.beginPath();
          ctx.arc(px, py, star.radius * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${(alpha - 0.6) * 0.35})`;
          ctx.fill();
        }

        // Diffraction cross spikes for prominent stars
        if (star.hasSpikes && alpha > 0.75) {
          const spikeLen = star.radius * 3.8;
          ctx.strokeStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${(alpha - 0.75) * 0.35})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(px - spikeLen, py);
          ctx.lineTo(px + spikeLen, py);
          ctx.moveTo(px, py - spikeLen);
          ctx.lineTo(px, py + spikeLen);
          ctx.stroke();
        }
      }

      // 2. Periodic background shooting star
      const now = Date.now();
      if (shootingStars.length === 0 && now > nextAutoShootingTime) {
        spawnShootingStar();
      }

      // 3. Render active shooting stars (including user tapped ones)
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const streak = shootingStars[i];
        streak.x += streak.dx;
        streak.y += streak.dy;
        streak.life += 1;

        const progress = streak.life / streak.maxLife;
        const fade = progress < 0.2 ? progress / 0.2 : 1 - (progress - 0.2) / 0.8;

        const tailX = streak.x - (streak.dx / 8) * streak.length;
        const tailY = streak.y - (streak.dy / 8) * streak.length;

        const grad = ctx.createLinearGradient(tailX, tailY, streak.x, streak.y);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        grad.addColorStop(0.7, `rgba(56, 189, 248, ${0.45 * fade})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${0.92 * fade})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(streak.x, streak.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(streak.x, streak.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${fade})`;
        ctx.fill();

        if (streak.life >= streak.maxLife) {
          shootingStars.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      heroSection.removeEventListener('pointerdown', handleTapToShoot);
    };
  }, [starCount]);

  return (
    <canvas
      ref={canvasRef}
      className="hero-twinkling-stars-canvas"
      aria-hidden="true"
    />
  );
};

export default TwinklingStars;
