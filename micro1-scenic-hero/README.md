# 🌌 Night Horizon & Aurora Borealis Hero Component

A standalone, plug-and-play Hero section featuring:
- **Night Mountain Horizon**: Sharp, photorealistic mountain ridge silhouette under a clear starry night sky with the Milky Way.
- **Moving Aurora Borealis Waves**: Realistic animated northern lights canvas with undulating emerald green, cyan, and violet curtains and shimmering rays.
- **Soaring Flock of Birds**: Vector Lottie animation with wing flapping and flight physics gliding across the illuminated night sky.
- **Analog Film Grain / Noise Overlay**: Subtle tactile cinematic texture.
- **Centered Modern Typography**: Live pulsing status pill, bold display headline, subtitle, and magnetic pill CTA buttons.
- **Smooth GSAP Entrance Animations**.

---

## 📁 Folder Structure

```
micro1-scenic-hero/
├── assets/
│   ├── bird.json               # Vector Lottie animation for flying birds flock
│   ├── night-mountain.jpg      # High-res clear night mountain horizon & starry sky
│   ├── hero-mountain.png       # Alternate dusk mountain horizon
│   └── hero-noise.webp         # Analog film grain overlay texture
├── components/
│   ├── Hero.jsx                # Complete Hero component with layout & typography
│   ├── HeroScene.jsx           # Background composite (night horizon, aurora, birds, noise)
│   ├── AuroraLights.jsx        # Animated Aurora Borealis canvas waves component
│   └── BirdAnimation.jsx       # Lottie player component
├── styles/
│   └── hero.css                # Standalone CSS with zero external dependencies
└── README.md
```

---

## 🚀 Quick Start in Another Project

### 1. Install Dependencies
```bash
npm install lottie-web gsap lucide-react
```

### 2. Copy Assets
Copy the files inside `assets/` to your project's public folder:
- Copy `bird.json` → `public/animations/bird.json`
- Copy `night-mountain.jpg` → `public/images/night-mountain.jpg`
- Copy `hero-noise.webp` → `public/images/hero-noise.webp`

### 3. Copy Components & CSS
- Copy `components/` into your `src/components/`
- Import `hero.css` into your project: `import './styles/hero.css';`

### 4. Usage Example

```jsx
import React from 'react';
import Hero from './components/Hero';
import './styles/hero.css';

export default function App() {
  return (
    <main>
      <Hero
        badgeText="Your Name · Portfolio"
        heading="Engineering scalable web apps & high-impact systems"
        tagline="Crafting resilient backends, responsive interfaces, and modern architectures."
        primaryAction={{ label: 'Explore work', href: '#projects' }}
        secondaryAction={{ label: 'Resume', href: '/resume.pdf' }}
        contactAction={{ label: 'Get in touch', href: 'mailto:you@example.com' }}
      />
      {/* Rest of your page sections */}
    </main>
  );
}
```

---

## ⚙️ Configurable Props on `<Hero />`

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `badgeText` | `string` | `'Raj Srivastava · Portfolio'` | Top pill text with pulsing green status dot. Set to `null` to hide. |
| `heading` | `string \| ReactNode` | (default text) | Main prominent display heading. |
| `tagline` | `string` | (default text) | Subtitle description beneath heading. |
| `primaryAction` | `{ label, href, onClick }` | `{ label: 'Explore work', href: '#projects' }` | White primary pill button. |
| `secondaryAction` | `{ label, href }` | `{ label: 'Resume', href: '#' }` | Glass secondary pill button with download icon. |
| `contactAction` | `{ label, href }` | `{ label: 'Get in touch', href: '...' }` | Additional glass action button. |
| `socialLinks` | `Array<{ label, href }>` | `[...]` | Optional list of pill links. |
| `onScrollClick` | `function` | `null` | Custom click handler for bottom scroll button. |
| `mountainSrc` | `string` | `'/images/night-mountain.jpg'` | Path to mountain image asset. |
| `noiseSrc` | `string` | `'/images/hero-noise.webp'` | Path to noise texture asset. |
| `birdPath` | `string` | `'/animations/bird.json'` | Path to bird Lottie JSON asset. |
