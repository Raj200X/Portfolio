import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Download } from 'lucide-react';
import gsap from 'gsap';
import HeroScene from './HeroScene';

/**
 * Standalone Micro1-Style Scenic Hero Component
 */
export const Hero = ({
  badgeText = 'Raj Srivastava · Portfolio',
  heading = 'Engineering scalable full-stack apps & high-impact systems',
  tagline = 'Crafting resilient backends, responsive interfaces, and scalable architectures with intent and clean performance.',
  primaryAction = {
    label: 'Explore work',
    href: '#projects',
  },
  secondaryAction = {
    label: 'Resume',
    href: '#',
    download: true,
  },
  contactAction = {
    label: 'Get in touch',
    href: 'mailto:contact@rajsrivastava.in',
  },
  socialLinks = [
    { label: 'GitHub', href: 'https://github.com/RAJ200X' },
    { label: 'LinkedIn', href: 'http://www.linkedin.com/in/rajsrivastava0' },
  ],
  onScrollClick = null,
  mountainSrc = '/images/hero-mountain.png',
  noiseSrc = '/images/hero-noise.webp',
  birdPath = '/animations/bird.json',
}) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Entrance staggered fade-ins
      gsap.from('.hero-micro-pill', {
        y: -18,
        opacity: 0,
        delay: 0.2,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.hero-micro-heading', {
        y: 28,
        opacity: 0,
        delay: 0.35,
        duration: 0.9,
        ease: 'power3.out',
      });

      gsap.from('.hero-micro-tagline', {
        y: 20,
        opacity: 0,
        delay: 0.5,
        duration: 0.9,
        ease: 'power3.out',
      });

      gsap.from('.hero-micro-actions, .hero-micro-socials', {
        y: 22,
        opacity: 0,
        stagger: 0.12,
        delay: 0.65,
        duration: 0.9,
        ease: 'power3.out',
      });

      gsap.from('.scroll-pill', {
        y: 18,
        opacity: 0,
        delay: 0.85,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScroll = () => {
    if (onScrollClick) {
      onScrollClick();
    } else {
      window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="hero-section" id="home">
      {/* Scenic Mountain Horizon, Twilight Sky & Flying Birds */}
      <HeroScene
        mountainSrc={mountainSrc}
        noiseSrc={noiseSrc}
        birdPath={birdPath}
      />

      {/* Centered micro1-style typography & actions */}
      <div className="hero-micro-wrap">
        {/* Status / Kicker Pill Badge */}
        {badgeText && (
          <div className="hero-micro-pill">
            <span className="hero-micro-pill-dot" />
            <span>{badgeText}</span>
          </div>
        )}

        {/* Display Headline */}
        <h1 className="hero-micro-heading">{heading}</h1>

        {/* Subtitle / Tagline */}
        {tagline && <p className="hero-micro-tagline">{tagline}</p>}

        {/* Action Buttons */}
        <div className="hero-micro-actions">
          {primaryAction && (
            <a
              className="hero-btn-primary"
              href={primaryAction.href}
              onClick={primaryAction.onClick}
            >
              {primaryAction.label}
              <ArrowUpRight size={17} />
            </a>
          )}
          {secondaryAction && (
            <a
              className="hero-btn-secondary"
              href={secondaryAction.href}
              target="_blank"
              rel="noreferrer"
            >
              {secondaryAction.label}
              <Download size={16} />
            </a>
          )}
          {contactAction && (
            <a className="hero-btn-secondary" href={contactAction.href}>
              {contactAction.label}
              <ArrowUpRight size={16} />
            </a>
          )}
        </div>

        {/* Optional Social Links */}
        {socialLinks && socialLinks.length > 0 && (
          <div className="hero-micro-socials">
            {socialLinks.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="hero-micro-social-link"
              >
                <span>{label}</span>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Scroll Pill Indicator */}
      <button
        className="scroll-pill"
        onClick={handleScroll}
        aria-label="Scroll down"
      >
        <span className="scroll-pill-mouse">
          <span className="scroll-pill-wheel" />
        </span>
        <span className="scroll-pill-label">SCROLL</span>
      </button>
    </section>
  );
};

export default Hero;
