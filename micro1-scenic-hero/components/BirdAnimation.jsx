import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

/**
 * BirdAnimation component
 * Plays the vector bird flock animation on loop using lottie-web.
 * 
 * @param {string} animationPath - Path to the bird.json file (default: '/animations/bird.json')
 * @param {object} animationData - Or direct imported JSON object
 */
export const BirdAnimation = ({ animationPath = '/animations/bird.json', animationData = null }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let anim = null;
    try {
      const config = {
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
      };

      if (animationData) {
        config.animationData = animationData;
      } else {
        config.path = animationPath;
      }

      anim = lottie.loadAnimation(config);
    } catch (err) {
      console.error('Failed to load bird lottie animation:', err);
    }

    return () => {
      if (anim) anim.destroy();
    };
  }, [animationPath, animationData]);

  return (
    <div className="hero-bird-track" aria-hidden="true">
      <div ref={containerRef} className="hero-bird-lottie" />
    </div>
  );
};

export default BirdAnimation;
