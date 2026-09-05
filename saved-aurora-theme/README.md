# Arctic Aurora Theme & Northern Lights Components

This folder contains the complete, self-contained **Arctic Aurora theme**, including:
- `aurora.css` — Complete CSS variables, full-viewport canvas styling, 3D fluted shutter button styling, and glowing neon gradient borders.
- `AuroraCanvas.jsx` — High-performance, GPU-accelerated interactive Northern Lights wave simulation that responds to mouse / touch movement.
- `AuroraLights.jsx` — Alternate realistic Northern Lights simulation with vertical curtains and shimmering rays.

---

## 🎨 Palette Breakdown
- **Electric Cyan**: `#22D3EE`
- **Sky Blue**: `#38BDF8`
- **Arctic Green**: `#4ADE80`
- **Glacial Emerald**: `#34D399`
- **Deep Cobalt**: `#6366F1`
- **Glacial Frost Light Crest**: `#F0FDFA`
- **Abyssal Shadow**: `#040914` & `#1E1B4B`

---

## 🚀 How to Use in Any Project

### 1. Global Background Northern Lights
Import `AuroraCanvas` and place it at the root of your application (outside of scrolling containers):

```jsx
import AuroraCanvas from './saved-aurora-theme/AuroraCanvas';
import './saved-aurora-theme/aurora.css';

function App() {
  return (
    <>
      <AuroraCanvas />
      <main>
        {/* Your content */}
      </main>
    </>
  );
}
```

### 2. Arctic Aurora 3D Fluted Button
Use the class `.aurora-btn-primary` in your markup:

```html
<button class="aurora-btn-primary">
  <span>Explore Work</span>
</button>
```

### 3. Gradient Glowing Text
Use the class `.aurora-gradient-text`:

```html
<h2>
  Code is craft. <span class="aurora-gradient-text">Both have to earn their place.</span>
</h2>
```

---

## ⚙️ Configuration
In `AuroraCanvas.jsx`, you can adjust:
- `AURORA_COLORS`: Array of RGB color stops.
- Wave speeds, frequencies, and vertical blur in `.aurora-canvas` (`filter: blur(35px); opacity: 0.95;`).
