import { useCallback, useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Lenis from 'lenis';
import {
  ArrowUpRight,
  Award,
  Braces,
  Code2,
  Command,
  Database,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  Menu,
  Send,
  Terminal,
  X,
} from 'lucide-react';
import { portfolio } from './data/portfolio';

// Module-level scroll helper — usable by any component
const gsapScrollTo = (id) => {
  const target = document.getElementById(id);
  if (!target) return;
  gsap.to(window, {
    scrollTo: { y: target, offsetY: 80 },
    duration: 1.2,
    ease: 'power3.inOut',
  });
};

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const navItems = [
  { id: 'home', label: 'Home', index: '00' },
  { id: 'about', label: 'About', index: '01' },
  { id: 'skills', label: 'Skills', index: '02' },
  { id: 'projects', label: 'Work', index: '03' },
  { id: 'education', label: 'Education', index: '04' },
  { id: 'certifications', label: 'Certifications', index: '05' },
  { id: 'contact', label: 'Contact', index: '06' },
];

const tickerItems = [
  'React',
  'Node.js',
  'Express',
  'MongoDB',
  'DSA',
  'API Design',
  'Vite',
  'TailwindCSS',

];

const roleLines = [
  'MERN stack developer',
  'React interface engineer',
  'DSA-focused builder',
  'API-minded student',
];

const GithubMark = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.17c-3.2.7-3.87-1.38-3.87-1.38-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.02 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.41-5.27 5.7.41.36.78 1.06.78 2.14v3.19c0 .31.21.67.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

const LinkedinMark = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
  </svg>
);

const socialLinks = [
  { label: 'GitHub', href: portfolio.profile.social.github, Icon: GithubMark },
  { label: 'LinkedIn', href: portfolio.profile.social.linkedin, Icon: LinkedinMark },
  {
    label: 'Email',
    href: `mailto:${portfolio.profile.email}`,
    Icon: Mail,
  },
];

const codingProfiles = [
  { label: 'LeetCode', href: portfolio.profile.social.leetcode, iconSlug: 'leetcode' },
  { label: 'CodeChef', href: portfolio.profile.social.codechef, iconSlug: 'codechef' },
  { label: 'GFG', href: portfolio.profile.social.gfg, iconSlug: 'geeksforgeeks' },
  { label: 'HackerRank', href: portfolio.profile.social.hackerrank, iconSlug: 'hackerrank' },
];

const cursorSelector = 'a, button, input, textarea, [data-cursor-hover]';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3.out' });

    const handleMove = (event) => {
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
    };

    const setHover = (event) => {
      if (event.target instanceof Element && event.target.closest(cursorSelector)) {
        dot.classList.add('is-hovering');
        ring.classList.add('is-hovering');
      }
    };

    const clearHover = (event) => {
      if (event.target instanceof Element && event.target.closest(cursorSelector)) {
        dot.classList.remove('is-hovering');
        ring.classList.remove('is-hovering');
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseover', setHover);
    window.addEventListener('mouseout', clearHover);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', setHover);
      window.removeEventListener('mouseout', clearHover);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

const LoadingScreen = ({ onComplete }) => {
  const [armed, setArmed] = useState(false);
  const screenRef = useRef(null);
  const barRef = useRef(null);
  const countRef = useRef(null);
  const bootLines = ['boot raj.system', 'hydrate portfolio data', 'mount motion engine', 'compile project orbit'];

  useEffect(() => {
    const progress = { value: 0 };
    const timeline = gsap.timeline();

    timeline
      .from('.loader-console-line', {
        y: 14,
        opacity: 0,
        stagger: 0.16,
        duration: 0.5,
        ease: 'power3.out',
      })
      .to(progress, {
        value: 100,
        duration: 1.3,
        ease: 'power3.inOut',
        onUpdate: () => {
          if (countRef.current) {
            countRef.current.textContent = `${String(Math.round(progress.value)).padStart(3, '0')}%`;
          }
        },
      })
      .to(
        barRef.current,
        {
          scaleX: 1,
          duration: 1.3,
          ease: 'power3.inOut',
        },
        '<'
      )
      .to('.loader-gate', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        onComplete: () => setArmed(true),
      });

    return () => timeline.kill();
  }, []);

  const exit = useCallback(() => {
    if (!armed) return;
    setArmed(false);
    gsap.to(screenRef.current, {
      yPercent: -100,
      duration: 0.95,
      ease: 'power4.inOut',
      onComplete,
    });
  }, [armed, onComplete]);

  useEffect(() => {
    if (!armed) return undefined;

    const handleKey = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        exit();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [armed, exit]);

  return (
    <div
      ref={screenRef}
      className={`loading-screen ${armed ? 'is-armed' : ''}`}
      onClick={exit}
      role="button"
      tabIndex={0}
      aria-label="Enter Raj Srivastava portfolio"
    >
      <div className="loader-grid" aria-hidden="true" />
      <div className="loader-rain" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, index) => (
          <span key={index}>0101 RAJ MERN DSA API</span>
        ))}
      </div>
      <div className="loader-content">
        <div className="loader-console" aria-hidden="true">
          {bootLines.map((line) => (
            <p key={line} className="loader-console-line">
              &gt; {line}
            </p>
          ))}
        </div>
        <div className="loader-kicker">dev.environment.ready = true</div>
        <div className="loader-word" aria-label="Raj Srivastava">
          {'RAJ SRIVASTAVA'.split(' ').map((word, wordIndex) => (
            <span key={wordIndex} className="loader-name-word">
              {word.split('').map((letter, letterIndex) => (
                <span key={`${wordIndex}-${letterIndex}`}>{letter}</span>
              ))}
            </span>
          ))}
        </div>
        <div className="loader-meter">
          <div ref={barRef} className="loader-meter-fill" />
        </div>
        <div ref={countRef} className="loader-count">000%</div>
        <div className="loader-gate">
          <span>Tap to initiate portfolio</span>
          <small>or press Enter</small>
        </div>
      </div>
    </div>
  );
};

// ---- Scramble / decypher text animation ----
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*?!<>[]{}~^';

const ScrambleText = ({ text, delay = 0, ready = false }) => {
  const [chars, setChars] = useState(() =>
    text.split('').map((c) => ({
      final: c,
      display: c === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      locked: c === ' ',
    }))
  );

  // Only start when ready=true (i.e. after loading screen is dismissed)
  useEffect(() => {
    if (!ready) return;

    const timeouts = [];
    const intervals = [];

    text.split('').forEach((finalChar, i) => {
      if (finalChar === ' ') return;

      const lockAt = delay + i * 60 + 600;

      const iv = setInterval(() => {
        setChars((prev) => {
          if (prev[i].locked) return prev;
          const next = [...prev];
          next[i] = { ...next[i], display: GLYPHS[Math.floor(Math.random() * GLYPHS.length)] };
          return next;
        });
      }, 40);
      intervals.push(iv);

      const t = setTimeout(() => {
        clearInterval(iv);
        setChars((prev) => {
          const next = [...prev];
          next[i] = { final: finalChar, display: finalChar, locked: true };
          return next;
        });
      }, lockAt);
      timeouts.push(t);
    });

    return () => {
      timeouts.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, [ready, text, delay]);

  return (
    <span className="scramble-name" aria-label={text}>
      {chars.map((c, i) => (
        <span
          key={i}
          className={`scramble-char${c.locked ? ' is-locked' : ''}${c.final === ' ' ? ' is-space' : ''}`}
        >
          {c.display}
        </span>
      ))}
    </span>
  );
};


const RoleTicker = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % roleLines.length);
    }, 1800);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <span className="role-ticker">
      <AnimatePresence mode="wait">
        <motion.span
          key={roleLines[index]}
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -18, opacity: 0 }}
          transition={{ duration: 0.34, ease: 'easeOut' }}
        >
          {roleLines[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const MagneticLink = ({ href, children, className = '', external = false, ...props }) => {
  const linkRef = useRef(null);

  const handleMove = (event) => {
    const rect = linkRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    gsap.to(linkRef.current, {
      x: x * 0.16,
      y: y * 0.2,
      duration: 0.35,
      ease: 'power3.out',
    });
  };

  const reset = () => {
    gsap.to(linkRef.current, { x: 0, y: 0, duration: 0.45, ease: 'elastic.out(1, 0.45)' });
  };

  const handleClick = (event) => {
    if (!external && href && href.startsWith('#')) {
      event.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        gsap.to(window, {
          scrollTo: { y: target, offsetY: 80 },
          duration: 1.2,
          ease: 'power3.inOut',
        });
      }
    }
  };

  return (
    <a
      ref={linkRef}
      href={href}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={handleClick}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  );
};

const Navigation = () => {
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ── shared smooth scroll helper ──
  const smoothScrollTo = useCallback((id, closeMenu = false) => {
    const target = document.getElementById(id);
    if (!target) return;
    if (closeMenu) setOpen(false);
    gsap.to(window, {
      scrollTo: { y: target, offsetY: 80 },
      duration: 1.2,
      ease: 'power3.inOut',
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      const targetLine = window.innerHeight * 0.42;
      const current = navItems.reduce((matched, item) => {
        const node = document.getElementById(item.id);
        if (!node) return matched;
        return node.getBoundingClientRect().top <= targetLine ? item.id : matched;
      }, 'home');

      setActive(current);
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}
      >
        <a
          className="brand-lockup"
          href="#home"
          aria-label="Raj Srivastava home"
          onClick={(e) => { e.preventDefault(); smoothScrollTo('home'); }}
        >
          <span>RAJ</span>
          <small>Srivastava</small>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.slice(1).map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={active === item.id ? 'is-active' : ''}
              onClick={(e) => { e.preventDefault(); smoothScrollTo(item.id); }}
            >
              <span>{item.index}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="menu-toggle"
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-label="Open navigation menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </motion.header>

      <aside className="chapter-rail" aria-label="Section progress">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={active === item.id ? 'is-active' : ''}
            onClick={(e) => { e.preventDefault(); smoothScrollTo(item.id); }}
          >
            <span>{item.index}</span>
          </a>
        ))}
      </aside>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu-overlay"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="menu-overlay-inner">
              <div className="menu-overlay-kicker">Navigate the build</div>
              <nav>
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => { e.preventDefault(); smoothScrollTo(item.id, true); }}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.12 + index * 0.06, duration: 0.5 }}
                  >
                    <span>{item.index}</span>
                    {item.label}
                  </motion.a>
                ))}
              </nav>
              <div className="menu-socials">
                {socialLinks.map(({ href, label, Icon }) => (
                  <a href={href} target="_blank" rel="noreferrer" key={label} aria-label={label}>
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


const Hero = ({ ready }) => {
  const sectionRef = useRef(null);
  const orbRef = useRef(null);

  useEffect(() => {
    if (!ready) return undefined;
    const ctxGSAP = gsap.context(() => {
      gsap.from('.hero-sub-content > *', {
        y: 28,
        opacity: 0,
        stagger: 0.13,
        delay: 1.1,
        duration: 0.85,
        ease: 'power3.out',
      });
      gsap.from('.hero-media', {
        x: 48,
        opacity: 0,
        delay: 0.6,
        duration: 1.1,
        ease: 'power3.out',
      });

    }, sectionRef);

    return () => ctxGSAP.revert();
  }, [ready]);

  useEffect(() => {
    if (!ready || !sectionRef.current) return undefined;
    const section = sectionRef.current;
    const orb = orbRef.current;
    if (!orb) return undefined;

    const orbX = gsap.quickTo(orb, 'left', { duration: 0.8, ease: 'power3.out' });
    const orbY = gsap.quickTo(orb, 'top', { duration: 0.8, ease: 'power3.out' });

    const handleMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      orbX(x);
      orbY(y);
    };

    section.addEventListener('mousemove', handleMove, { passive: true });
    return () => section.removeEventListener('mousemove', handleMove);
  }, [ready]);

  return (
    <>
      <section id="home" ref={sectionRef} className="hero-section">
        <div className="hero-outline-mark" aria-hidden="true">RS</div>

        {/* Cursor-following gradient orb */}
        <div ref={orbRef} className="hero-gradient-orb" aria-hidden="true" />


        <div className="hero-content">
          <div className="hero-copy">
            <h1 className="hero-glitch">
              <ScrambleText text="RAJ" delay={200} ready={ready} />
              <div className="hero-name-sub">
                <ScrambleText text="SRIVASTAVA" delay={520} ready={ready} />
              </div>
            </h1>

            <div className="hero-sub-content">
              <div className="hero-role">
                <RoleTicker />
              </div>
              <p>{portfolio.profile.tagline}</p>
              <div className="hero-actions">
                <MagneticLink className="primary-action" href="#projects">
                  Explore work
                  <ArrowUpRight size={17} />
                </MagneticLink>
                <MagneticLink
                  className="secondary-action"
                  href={portfolio.profile.resume}
                  external
                >
                  Resume
                  <Download size={16} />
                </MagneticLink>
              </div>
            </div>
          </div>
        </div>


        {/* Scroll pill */}
        <button
          className="scroll-pill"
          onClick={() => gsapScrollTo('manifesto')}
          aria-label="Scroll down"
        >
          <span className="scroll-pill-mouse">
            <span className="scroll-pill-wheel" />
          </span>
          <span className="scroll-pill-label">SCROLL</span>
        </button>


      </section>
      <TickerBand />
    </>
  );
};



const TickerBand = () => (
  <div className="ticker-band" aria-label="Technology ticker">
    <div className="ticker-track">
      {[...tickerItems, ...tickerItems].map((item, index) => (
        <span key={`${item}-${index}`}>
          {item}
          <i />
        </span>
      ))}
    </div>
  </div>
);

const Manifesto = () => (
  <section id="manifesto" className="manifesto-section" aria-label="Portfolio manifesto">
    <div className="manifesto-orb" aria-hidden="true" />
    <p className="manifesto-kicker" data-reveal>// raj.stack.executing</p>
    <h2 data-reveal>
      Code is <span className="brush">craft.</span> API's are architecture.
      <span style={{ color: 'var(--accent)' }}> Both have to earn their place in the stack.</span>
    </h2>
    <p className="manifesto-copy" data-reveal>
      From first component to final endpoint, every decision gets made with intent —
      readable logic, purposeful structure, and builds that actually ship.
    </p>
  </section>
);

const SectionHeading = ({ index, kicker, title, body }) => (
  <div className="section-heading" data-reveal>
    <div className="section-index">{index}</div>
    <div>
      <span className="section-kicker">{kicker}</span>
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  </div>
);

const About = () => (
  <section id="about" className="section section-about">
    <div className="section-inner">
      <SectionHeading
        index="01"
        kicker="Who I am"
        title="Just a guy who builds things on the internet."

      />

      <div className="about-layout">
        <div className="about-statement" data-reveal>
          <p>
            Third-year IT student at LPU. I spend most of my time building MERN
            apps, grinding DSA, and figuring out why my code works before it ships.
            I care about the full picture — clean UI on the frontend, solid logic on
            the backend, and systems that don't fall apart when it matters. I don't
            just build to finish; I build to understand.
          </p>
          <div className="identity-stamp">
            <span>Based in</span>
            <strong>{portfolio.profile.location}</strong>
          </div>
        </div>

        <div className="story-stack">
          {portfolio.achievements.map((ach) => (
            <article key={ach.title} className="story-row" data-reveal>
              <span>{ach.index}</span>
              <div>
                <h3>{ach.title}</h3>
                <p>{ach.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  </section>
);


const skillIcons = {
  'React': 'react',
  'TailwindCSS': 'tailwindcss',
  'JavaScript': 'javascript',
  'Node.js': 'nodedotjs',
  'Express.js': 'express',
  'MongoDB': 'mongodb',
  'Mongoose': 'mongoose',
  'Git & GitHub': 'github',
  'Vite': 'vite',
  'Postman': 'postman',
  'LeetCode': 'leetcode',
  'CodeChef': 'codechef',
  'GeeksforGeeks': 'geeksforgeeks',
  'GFG': 'geeksforgeeks',
  'HackerRank': 'hackerrank',
  'C++': 'cplusplus'
};

const Skills = () => (
  <section id="skills" className="section section-skills">
    <div className="section-inner">
      <SectionHeading
        index="02"
        kicker="Skills"
        title="Tools I actually use."
        body="No inflated claims. Just what I'm building with right now, and how comfortable I am with each."
      />

      <div className="skills-table" data-reveal>
        {portfolio.skills.map((group, i) => (
          <div key={group.category} className="skills-row">
            <span className="skills-row-num">0{i + 1}</span>
            <h3 className="skills-row-category">{group.category}</h3>
            <div className="skills-row-tags">
              {group.skills.map((skill) => {
                const iconSlug = skillIcons[skill.name];
                return (
                  <span
                    key={skill.name}
                    className={`skill-tag ${skill.level === 'Advanced' ? 'is-advanced' : 'is-intermediate'}`}
                  >
                    {iconSlug ? (
                      <img
                        className="skill-icon"
                        src={`https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${iconSlug}.svg`}
                        alt=""
                        loading="lazy"
                      />
                    ) : skill.name === 'REST Design' ? (
                      <Braces className="skill-icon-lucide" size={13} />
                    ) : skill.name === 'DSA' ? (
                      <Code2 className="skill-icon-lucide" size={13} />
                    ) : null}
                    {skill.name}
                  </span>
                );
              })}
            </div>
            <p className="skills-row-summary">{group.summary}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);


const ProjectCard = ({ project, index }) => (
  <article className={`project-card ${index % 2 !== 0 ? 'is-flipped' : ''}`} data-reveal>

    {/* Browser mockup */}
    <div className="project-mockup">
      <div className="mockup-bar">
        <span className="dot dot-red" />
        <span className="dot dot-yellow" />
        <span className="dot dot-green" />
        <div className="mockup-url">{project.liveUrl.replace('https://', '')}</div>
      </div>
      <div className="mockup-screen">
        <img
          src={
            project.image
              ? project.image
              : `https://image.thum.io/get/width/1200/crop/900/noanimate/${project.liveUrl}`
          }
          alt={`${project.title} preview`}
          loading="lazy"
        />
      </div>
    </div>

    {/* Editorial copy */}
    <div className="project-copy">
      <span className="project-num">0{index + 1}</span>
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <div className="project-stack">
        {project.stack.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
      <div className="project-ctas">
        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="proj-cta-live">
          View project <ArrowUpRight size={15} />
        </a>
        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="proj-cta-code">
          Source code <GithubMark size={14} />
        </a>
      </div>
    </div>

  </article>
);

const Projects = () => (
  <section id="projects" className="section section-projects">
    <div className="section-inner">
      <SectionHeading
        index="03"
        kicker="Selected work"
        title="Things I've actually built and shipped."
        body="MERN stack across the board. Each project solved a different problem."
      />
      <div className="project-list">
        {portfolio.projects.map((project, index) => (
          <ProjectCard project={project} index={index} key={project.title} />
        ))}
      </div>
    </div>
  </section>
);


const Education = () => (
  <section id="education" className="section section-education">
    <div className="section-inner">
      <SectionHeading
        index="04"
        kicker="Education"
        title="Academic Foundation."
        body="Structured computer science and engineering coursework that set my technical baseline."
      />

      <div className="education-layout" data-reveal>
        <div className="edu-timeline">
          {portfolio.credentials.education.map((item, i) => (
            <div key={item.degree} className="edu-row">
              <div className="edu-marker">
                <span className="edu-year">{item.period.split(' ').pop()}</span>
                <div className="edu-line" />
                {i === 0 && <div className="edu-dot-active" />}
                {i !== 0 && <div className="edu-dot" />}
              </div>
              <div className="edu-card">
                <span className="edu-period">{item.period}</span>
                <h3>{item.degree}</h3>
                <p>{item.institution}</p>
                <strong className="edu-result">{item.result}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Certifications = () => (
  <section id="certifications" className="section section-projects">
    <div className="section-inner">
      <SectionHeading
        index="05"
        kicker="Certifications"
        title="Technical Validation."
        body="Industry-standard credentials confirming hands-on software engineering competency and academic excellence."
      />

      <div className="projects-grid" data-reveal>
        {portfolio.credentials.certifications.map((cert, i) => (
          <article key={cert.title} className={`project-card ${i % 2 !== 0 ? 'is-flipped' : ''}`}>
            
            {/* Browser Mockup */}
            <div className="project-mockup">
              <div className="mockup-bar">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
                <div className="mockup-url">{cert.link.replace('https://', '').replace('http://', '')}</div>
              </div>
              <div className="mockup-screen">
                <iframe
                  src={`${cert.pdf}#toolbar=0&navpanes=0&scrollbar=0`}
                  title={`${cert.title} PDF`}
                  width="100%"
                  height="100%"
                  className="cert-iframe"
                  style={{
                    border: 'none',
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </div>

            {/* Copy / Content */}
            <div className="project-copy">
              <span className="project-num">0{i + 1}</span>
              <span className="project-status">{cert.issuer} Certified</span>
              <h3>{cert.title}</h3>
              <p>Credential verifying advanced competence, core domain knowledge, and verified software engineering abilities. Issued directly by {cert.issuer}.</p>
              <div className="project-stack">
                <span>{cert.issuer}</span>
                <span>Verified</span>
                <span>ID: {cert.credentialId}</span>
              </div>
              <div className="project-ctas">
                <a href={cert.pdf} target="_blank" rel="noreferrer" className="proj-cta-live">
                  View Certificate <ArrowUpRight size={15} />
                </a>
                <a href={cert.link} target="_blank" rel="noreferrer" className="proj-cta-code">
                  Verify Online <ExternalLink size={14} />
                </a>
              </div>
            </div>

          </article>
        ))}
      </div>
    </div>
  </section>
);

const TerminalContact = () => {
  const [lines, setLines] = useState([
    { type: 'system', value: 'Raj terminal ready. Type help, github, resume, email, profiles, or clear.' },
  ]);
  const [command, setCommand] = useState('');
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const pushLine = (line) => setLines((current) => [...current.slice(-7), line]);

  const handleCommand = (event) => {
    event.preventDefault();
    const nextCommand = command.trim().toLowerCase();
    if (!nextCommand) return;

    if (nextCommand === 'clear') {
      setLines([]);
      setCommand('');
      return;
    }

    pushLine({ type: 'input', value: `> ${nextCommand}` });

    const responses = {
      help: 'Commands: github, resume, email, profiles, clear.',
      github: 'Opening GitHub: github.com/RAJ200X',
      resume: 'Opening resume PDF.',
      email: `Opening email to ${portfolio.profile.email}`,
      profiles: 'Coding profiles are linked below: LeetCode, CodeChef, GFG, HackerRank.',
    };

    pushLine({ type: 'output', value: responses[nextCommand] || 'Unknown command. Try help.' });

    if (nextCommand === 'github') window.open(portfolio.profile.social.github, '_blank', 'noreferrer');
    if (nextCommand === 'resume') window.open(portfolio.profile.resume, '_blank', 'noreferrer');
    if (nextCommand === 'email') window.location.href = `mailto:${portfolio.profile.email}`;

    setCommand('');
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setSent(true);
    pushLine({ type: 'output', value: `Message staged from ${formState.name}.` });
  };

  const handleFormChange = (event) => {
    setFormState((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  return (
    <section id="contact" className="section section-contact">
      <div className="section-inner">
        <SectionHeading
          index="06"
          kicker="Contact"
          title="Let's actually talk."
          body={<>If you have a project, an internship, or just want to see what I'm currently working on — drop a message, use the terminal, or reach me directly at <strong style={{ color: 'var(--accent)' }}>{portfolio.profile.displayEmail}</strong>.</>}
        />

        <div className="contact-layout">
          <div className="terminal-panel" data-reveal>
            <div className="terminal-topbar">
              <span />
              <span />
              <span />
              <strong>raj@rajsrivastava.in ~</strong>
            </div>
            <div className="terminal-output">
              {lines.map((line, index) => (
                <p key={`${line.value}-${index}`} className={line.type}>
                  {line.value}
                </p>
              ))}
            </div>
            <form onSubmit={handleCommand} className="terminal-input">
              <Terminal size={17} />
              <input
                value={command}
                onChange={(event) => setCommand(event.target.value)}
                placeholder="type a command"
                aria-label="Terminal command"
              />
            </form>
          </div>

          <div className="contact-form-wrap" data-reveal>
            <div className="social-grid">
              {socialLinks.map(({ href, label, Icon }) => (
                <a href={href} target="_blank" rel="noreferrer" key={label}>
                  <Icon size={18} />
                  {label}
                </a>
              ))}
            </div>

            {!sent ? (
              <form onSubmit={handleFormSubmit} className="contact-form">
                <label>
                  <span>Name</span>
                  <input
                    name="name"
                    value={formState.name}
                    onChange={handleFormChange}
                    required
                    autoComplete="name"
                  />
                </label>
                <label>
                  <span>Email</span>
                  <input
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleFormChange}
                    required
                    autoComplete="email"
                  />
                </label>
                <label>
                  <span>Message</span>
                  <textarea
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={handleFormChange}
                    required
                  />
                </label>
                <button type="submit">
                  Send message
                  <Send size={16} />
                </button>
              </form>
            ) : (
              <div className="sent-state">
                <strong>Message staged.</strong>
                <p>
                  This frontend has the interaction ready. Connect the form to your preferred API
                  when you want real message delivery.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="profile-strip">
          {codingProfiles.map((profile) => (
            <a key={profile.label} href={profile.href} target="_blank" rel="noreferrer">
              <img
                src={`https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${profile.iconSlug}.svg`}
                alt=""
              />
              <span>{profile.label}</span>
              <ArrowUpRight size={14} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-wordmark">RAJ SRIVASTAVA</div>
    <div className="footer-bottom">
      <div className="footer-domain" style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
        &copy; {new Date().getFullYear()} rajsrivastava.in
      </div>
      <button
        className="footer-top-btn"
        onClick={() => gsapScrollTo('home')}
      >
        Back to top
        <ArrowUpRight size={15} />
      </button>
    </div>
  </footer>
);


const App = () => {
  const [loading, setLoading] = useState(true);
  const appRef = useRef(null);
  const completeLoading = useCallback(() => setLoading(false), []);

  useEffect(() => {
    if (loading) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.5,
    });

    const updateLenis = (time) => lenis.raf(time * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, [loading]);

  useEffect(() => {
    if (loading) return undefined;

    const ctx = gsap.context(() => {
      gsap.to('.scroll-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.2,
        },
      });

      gsap.utils.toArray('[data-reveal]').forEach((item) => {
        gsap.fromTo(
          item,
          { y: 48, opacity: 0, rotateX: 4, filter: 'blur(4px)' },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            },
          }
        );
      });
    }, appRef);

    return () => ctx.revert();
  }, [loading]);

  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <div className="paper-grid" aria-hidden="true" />
      <CustomCursor />
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={completeLoading} />}
      </AnimatePresence>

      <div ref={appRef} className={`app-shell ${loading ? 'is-loading' : 'is-ready'}`}>
        <Navigation />
        <main>
          <Hero ready={!loading} />
          <Manifesto />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Certifications />
          <TerminalContact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
