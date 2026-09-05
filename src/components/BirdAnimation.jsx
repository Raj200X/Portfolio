import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

export const BirdAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let anim = null;
    try {
      anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/animations/bird.json',
      });
    } catch (err) {
      console.error('Failed to load bird lottie animation:', err);
    }

    return () => {
      if (anim) anim.destroy();
    };
  }, []);

  return (
    <div className="hero-bird-track" aria-hidden="true">
      <div ref={containerRef} className="hero-bird-lottie" />
    </div>
  );
};

export default BirdAnimation;
