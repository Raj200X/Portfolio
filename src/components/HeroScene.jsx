import React from 'react';
import TwinklingStars from './TwinklingStars';
import BirdAnimation from './BirdAnimation';

export const HeroScene = ({ isDay = false }) => {
  return (
    <div className="hero-scenic-viewport" aria-hidden="true">
      {/* 1. Base night photograph with clear mountain horizon & starry sky */}
      <img
        src="/images/night-mountain.jpg"
        alt="Clear Night Mountain Horizon"
        className="hero-night-mountain"
        loading="eager"
      />

      {/* 2. Base day photograph with sunlit alpine peaks & clear blue sky */}
      <img
        src="/images/day-mountain.jpg"
        alt="Sunny Day Mountain Horizon"
        className="hero-day-mountain"
        loading="eager"
      />

      {/* 3. Organic blinking/twinkling stars (hidden in daylight) */}
      <TwinklingStars starCount={95} />

      {/* 4. Realistic flying birds soaring across the mountain sky */}
      <BirdAnimation />

      {/* 5. Tactile film noise overlay */}
      <div className="hero-scenic-noise" />

      {/* 6. Bottom vignette smoothly fading into the portfolio background */}
      <div className="hero-scenic-vignette" />
    </div>
  );
};

export default HeroScene;
