/**
 * Grasshopper Futuristic Effects
 * Handles:
 * 1. Cyber Grid Canvas Animation (interactive network nodes in Hero)
 * 2. Background Hovering/Flying Grasshoppers
 * 3. Jumping Grasshoppers (triggered on scroll/section entry)
 * 4. Glowing Neon Trails
 */

document.addEventListener('DOMContentLoaded', () => {
  initCyberGrid();
  initGrasshopperSpawner();
});

/* =========================================================================
   1. CYBER GRID CANVAS ANIMATION
   ========================================================================= */
function initCyberGrid() {
  const canvas = document.getElementById('cyber-grid-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = canvas.offsetWidth);
  let height = (canvas.height = canvas.offsetHeight);

  const particles = [];
  const properties = {
    bgColor: '#050505',
    particleColor: 'rgba(57, 255, 20, 0.5)',
    lineColor: 'rgba(57, 255, 20, 0.12)',
    particleRadius: 2.2,
    particleCount: 65,
    maxVelocity: 0.6,
    lineLength: 130,
    mouseRadius: 160
  };

  let mouse = { x: null, y: null };

  // Set sizing
  window.addEventListener('resize', () => {
    width = canvas.width = canvas.parentNode.offsetWidth;
    height = canvas.height = canvas.parentNode.offsetHeight;
  });

  // Track mouse in hero section
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    heroSection.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });
  }

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() * 2 - 1) * properties.maxVelocity;
      this.vy = (Math.random() * 2 - 1) * properties.maxVelocity;
    }

    update() {
      // Move particle
      this.x += this.vx;
      this.y += this.vy;

      // Bounce on edges
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interactive push/pull
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < properties.mouseRadius) {
          const force = (properties.mouseRadius - dist) / properties.mouseRadius;
          // Slowly push particle away from mouse
          this.x -= (dx / dist) * force * 0.8;
          this.y -= (dy / dist) * force * 0.8;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
      ctx.fillStyle = properties.particleColor;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#39ff14';
      ctx.fill();
      ctx.shadowBlur = 0; // Reset
    }
  }

  // Populate particles
  for (let i = 0; i < properties.particleCount; i++) {
    particles.push(new Particle());
  }

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < properties.lineLength) {
          const alpha = 1 - dist / properties.lineLength;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(57, 255, 20, ${alpha * 0.18})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Draw line to mouse
      if (mouse.x !== null && mouse.y !== null) {
        const p = particles[i];
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < properties.mouseRadius) {
          const alpha = 1 - dist / properties.mouseRadius;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(57, 255, 20, ${alpha * 0.28})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    // Clear canvas
    ctx.fillStyle = properties.bgColor;
    ctx.fillRect(0, 0, width, height);

    // Draw Cyber grid lines (static backdrop)
    ctx.strokeStyle = 'rgba(57, 255, 20, 0.03)';
    ctx.lineWidth = 1;
    const gridGap = 50;
    
    for (let x = 0; x < width; x += gridGap) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridGap) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Update & draw particles
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    drawLines();
    requestAnimationFrame(loop);
  }

  loop();
}

/* =========================================================================
   2. NEON TRAILS & PARTICLES
   ========================================================================= */
function spawnTrailParticle(x, y) {
  const particle = document.createElement('div');
  particle.className = 'trail-particle';
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;

  // Randomize size slightly
  const size = Math.random() * 3 + 2;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  document.body.appendChild(particle);

  // Animate fade & removal
  let opacity = 1;
  const fadeEffect = setInterval(() => {
    if (opacity <= 0) {
      clearInterval(fadeEffect);
      particle.remove();
    } else {
      opacity -= 0.05;
      particle.style.opacity = opacity;
      particle.style.transform = `scale(${opacity}) translate(${(Math.random() - 0.5) * 4}px, ${(Math.random() - 0.5) * 4}px)`;
    }
  }, 30);
}

/* =========================================================================
   3. FLYING GRASSHOPPERS
   ========================================================================= */
class FlyingGrasshopper {
  constructor() {
    this.el = document.createElement('div');
    this.el.className = 'animated-grasshopper';
    
    // SVG markup for flying grasshopper
    this.el.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <g transform="translate(50, 50)">
          <path d="M -5,-35 Q -10,-48 -25,-55" fill="none" stroke="#39ff14" stroke-width="1.5" filter="drop-shadow(0 0 4px #39ff14)" />
          <path d="M 5,-35 Q 10,-48 25,-55" fill="none" stroke="#39ff14" stroke-width="1.5" filter="drop-shadow(0 0 4px #39ff14)" />
          <path d="M -12,15 L -22,35 L -18,50" fill="none" stroke="#39ff14" stroke-width="1.2" opacity="0.8" />
          <path d="M 12,15 L 22,35 L 18,50" fill="none" stroke="#39ff14" stroke-width="1.2" opacity="0.8" />
          <rect x="-8" y="-25" width="16" height="50" rx="6" fill="#1e1e1e" stroke="#39ff14" stroke-width="1.5" />
          <polygon points="0,-35 -8,-25 8,-25" fill="#2a2a2a" stroke="#39ff14" stroke-width="1" />
          <circle cx="-5" cy="-28" r="1.5" fill="#39ff14" />
          <circle cx="5" cy="-28" r="1.5" fill="#39ff14" />
          <g class="wing-left" style="transform-origin: -6px -15px;">
            <path d="M -6,-15 C -25,-40 -48,-30 -45,-5 C -42,20 -15,5 -6,-15" fill="rgba(57, 255, 20, 0.3)" stroke="#39ff14" stroke-width="1" />
          </g>
          <g class="wing-right" style="transform-origin: 6px -15px;">
            <path d="M 6,-15 C 25,-40 48,-30 45,-5 C 42,20 15,5 6,-15" fill="rgba(57, 255, 20, 0.3)" stroke="#39ff14" stroke-width="1" />
          </g>
        </g>
      </svg>
    `;

    document.body.appendChild(this.el);

    // Initial positioning: Left side offscreen
    this.x = -80;
    this.y = Math.random() * (window.innerHeight * 0.6) + (window.innerHeight * 0.2);
    
    // Target parameters
    this.speed = Math.random() * 3 + 4; // Velocity X
    this.sineFreq = Math.random() * 0.02 + 0.01;
    this.sineAmp = Math.random() * 4 + 2;
    this.baseY = this.y;
    this.angle = 0;

    this.animate();
  }

  animate() {
    const step = () => {
      this.x += this.speed;
      this.angle += this.sineFreq;
      this.y = this.baseY + Math.sin(this.angle) * this.sineAmp * 10;

      // Rotate matching heading
      const dy = Math.cos(this.angle) * this.sineAmp * 10 * this.sineFreq;
      const heading = Math.atan2(dy, this.speed) * (180 / Math.PI) + 90; // Add 90 because SVG faces up

      this.el.style.left = `${this.x}px`;
      this.el.style.top = `${this.y}px`;
      this.el.style.transform = `rotate(${heading}deg) scale(0.7)`;

      // Spawn trail particle (only every few frames for performance)
      if (Math.random() < 0.45) {
        // Offset particle slightly behind head
        spawnTrailParticle(this.x + 25, this.y + 25);
      }

      // Check boundary
      if (this.x < window.innerWidth + 100) {
        requestAnimationFrame(step);
      } else {
        this.el.remove();
      }
    };

    requestAnimationFrame(step);
  }
}

/* =========================================================================
   4. JUMPING GRASSHOPPERS
   ========================================================================= */
function performGrasshopperJump(startX, startY, endX, endY) {
  const jumper = document.createElement('div');
  jumper.className = 'animated-grasshopper';
  jumper.style.width = '45px';
  jumper.style.height = '45px';

  // SVG for jumping grasshopper
  jumper.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <g transform="translate(10, 80) rotate(-25)">
        <path d="M 30,10 Q 15,3 0,5" fill="none" stroke="#39ff14" stroke-width="1.8" filter="drop-shadow(0 0 4px #39ff14)" />
        <path d="M 32,13 Q 18,8 3,11" fill="none" stroke="#39ff14" stroke-width="1" />
        <path d="M 40,25 L 30,30 L 35,38" fill="none" stroke="#39ff14" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 55,20 C 70,20 95,28 105,38 C 90,38 70,30 55,25 Z" fill="#1b1c1b" stroke="#39ff14" stroke-width="1" />
        <polygon points="35,12 55,10 60,25 38,25" fill="#242424" stroke="#39ff14" stroke-width="1.5" />
        <polygon points="35,12 22,20 28,30 38,25" fill="#1b1c1b" stroke="#39ff14" stroke-width="1.5" />
        <polygon points="23,21 27,24 25,28 22,25" fill="#39ff14" />
        <path d="M 45,13 Q 80,10 98,28 Q 75,25 55,20" fill="rgba(57, 255, 20, 0.2)" stroke="#39ff14" stroke-width="1" />
        <path d="M 55,20 L 80,45 C 78,48 70,42 55,25 Z" fill="#242424" stroke="#39ff14" stroke-width="1.5" />
        <path d="M 80,45 L 110,65 L 115,63" fill="none" stroke="#39ff14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </g>
    </svg>
  `;

  document.body.appendChild(jumper);

  // Jump Animation variables
  const duration = 900; // ms
  const startTime = performance.now();
  const jumpHeight = 150; // Max arch height

  function updateJump(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Linear interpolation for X, Y
    const currentX = startX + (endX - startX) * progress;
    // Parabolic height calculation
    const currentY = startY + (endY - startY) * progress - Math.sin(progress * Math.PI) * jumpHeight;

    // Calculate tangent slope for rotation
    const nextProgress = Math.min(progress + 0.01, 1);
    const nextX = startX + (endX - startX) * nextProgress;
    const nextY = startY + (endY - startY) * nextProgress - Math.sin(nextProgress * Math.PI) * jumpHeight;
    const angle = Math.atan2(nextY - currentY, nextX - currentX) * (180 / Math.PI);

    jumper.style.left = `${currentX}px`;
    jumper.style.top = `${currentY}px`;
    jumper.style.transform = `rotate(${angle}deg)`;

    // Spawn trails
    if (Math.random() < 0.6) {
      spawnTrailParticle(currentX + 22, currentY + 22);
    }

    if (progress < 1) {
      requestAnimationFrame(updateJump);
    } else {
      // Landing explosion/burst particles
      createLandingBurst(endX + 22, endY + 22);
      jumper.remove();
    }
  }

  requestAnimationFrame(updateJump);
}

function createLandingBurst(x, y) {
  for (let i = 0; i < 8; i++) {
    const burst = document.createElement('div');
    burst.className = 'trail-particle';
    burst.style.left = `${x}px`;
    burst.style.top = `${y}px`;
    document.body.appendChild(burst);

    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 2;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;

    let life = 1.0;
    const animateBurst = setInterval(() => {
      if (life <= 0) {
        clearInterval(animateBurst);
        burst.remove();
      } else {
        const cx = parseFloat(burst.style.left);
        const cy = parseFloat(burst.style.top);
        burst.style.left = `${cx + vx}px`;
        burst.style.top = `${cy + vy}px`;
        life -= 0.08;
        burst.style.opacity = life;
        burst.style.transform = `scale(${life})`;
      }
    }, 25);
  }
}

// Public API for jumping from one selector to another
window.triggerJump = function(fromSelector, toSelector) {
  const fromEl = document.querySelector(fromSelector);
  const toEl = document.querySelector(toSelector);

  if (!fromEl || !toEl) return;

  const rectFrom = fromEl.getBoundingClientRect();
  const rectTo = toEl.getBoundingClientRect();

  const scrollX = window.scrollX || window.pageXOffset;
  const scrollY = window.scrollY || window.pageYOffset;

  const startX = rectFrom.left + scrollX + rectFrom.width / 2;
  const startY = rectFrom.top + scrollY + rectFrom.height / 2;
  const endX = rectTo.left + scrollX + rectTo.width / 2;
  const endY = rectTo.top + scrollY + rectTo.height / 2;

  performGrasshopperJump(startX, startY, endX, endY);
};

/* =========================================================================
   5. SPANWER LOGIC
   ========================================================================= */
function initGrasshopperSpawner() {
  // Spawn a flying grasshopper every 12-18 seconds
  setInterval(() => {
    if (Math.random() < 0.8) {
      new FlyingGrasshopper();
    }
  }, 12000);

  // Spawn initial flying grasshopper shortly after load
  setTimeout(() => {
    new FlyingGrasshopper();
  }, 4000);
}
