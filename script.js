/**
 * PHAN TẤN KIỆT (KIET PHAN) - INTERACTIVE PORTFOLIO & CV
 * Supercharged Motion Suite: Cosmic Constellation & Data Pulses, Cyber Cursor & Ripples,
 * Mouse-Tracking Border Spotlight, Holographic 3D Tilt, Counter & Skill Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  initCustomCursorAndRipples();
  initCardSpotlight();
  initCardSpecularGlare();
  initCyberTextScramble();
  initSmoothInertiaScroll();
  initSfxToggle();
  initMagneticButtons();
  initParallaxDepth();
  initTypingEffect();
  initAvatar3DTilt();
  initProjectCards3DTilt();
  initHero3DWebGL();
  initPhotoSwitcher();
  initProjectFilters();
  initProjectModals();
  initProjectLinkClicks();
  initTerminalInteractive();
  initScrollProgressBarAndBackToTop();
  initScrollRevealAndCounters();
  initCopyButtons();
  initContactForm();
  initThemeToggle();
  initAudioPlayer();
  initPrintModal();
  initNavigationSpy();
  initMobileMenu();
});

/* ==========================================================================
   1. Cosmic Constellation & Cyber Data Pulse Canvas
   ========================================================================== */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let nodes = [];
  let stars = [];
  let dataPackets = [];

  const isMobile = window.innerWidth < 768;
  const nodeCount = isMobile ? 32 : 68;
  const starCount = isMobile ? 25 : 55;
  const maxDistance = isMobile ? 110 : 155;

  const mouse = {
    x: null,
    y: null,
    radius: 160
  };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', () => {
    resize();
    createStars();
    createNodes();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Layer 1: Distant Twinkling Cosmic Stars
  class Star {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 1.4 + 0.6;
      this.baseAlpha = Math.random() * 0.45 + 0.2;
      this.speed = Math.random() * 0.02 + 0.008;
      this.phase = Math.random() * Math.PI * 2;
    }

    draw() {
      this.phase += this.speed;
      const alpha = this.baseAlpha + Math.sin(this.phase) * 0.2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(167, 243, 208, ${Math.max(0.05, alpha)})`;
      ctx.fill();
    }
  }

  // Layer 2: Interactive Cyber Constellation Nodes
  class ConstellationNode {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.75;
      this.vy = (Math.random() - 0.5) * 0.75;
      this.size = Math.random() * 2 + 1.2;
      this.pulsePhase = Math.random() * Math.PI * 2;

      // Color variations: Emerald, Mint, Cyan
      const colors = [
        { r: 16, g: 185, b: 129 },   // Emerald
        { r: 0, g: 245, b: 160 },    // Mint Ultra
        { r: 6, g: 182, b: 212 },    // Cyan Accent
        { r: 52, g: 211, b: 153 }    // Emerald Light
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Smooth mouse interaction (soft vortex gravitation)
      if (mouse.x !== null && mouse.y !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const dirX = (dx / dist) * force * 1.8;
          const dirY = (dy / dist) * force * 1.8;
          this.x += dirX;
          this.y += dirY;
        }
      }
    }

    draw() {
      this.pulsePhase += 0.03;
      const dynamicSize = this.size + Math.sin(this.pulsePhase) * 0.4;

      // Soft radiant aura
      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, dynamicSize * 2.8);
      grad.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.9)`);
      grad.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.35)`);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.beginPath();
      ctx.arc(this.x, this.y, dynamicSize * 2.8, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Sharp core
      ctx.beginPath();
      ctx.arc(this.x, this.y, dynamicSize, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
      ctx.fill();
    }
  }

  // Layer 3: Traveling Fiber Light Packets
  class DataPacket {
    constructor(fromNode, toNode) {
      this.from = fromNode;
      this.to = toNode;
      this.progress = 0;
      this.speed = Math.random() * 0.015 + 0.012;
      this.size = Math.random() * 1.8 + 1.2;
    }

    update() {
      this.progress += this.speed;
      return this.progress < 1;
    }

    draw() {
      const px = this.from.x + (this.to.x - this.from.x) * this.progress;
      const py = this.from.y + (this.to.y - this.from.y) * this.progress;

      ctx.beginPath();
      ctx.arc(px, py, this.size * 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.shadowColor = '#00f5a0';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    }
  }

  // Layer 4: Occasional High-Speed Shooting Stars / Meteors
  let meteors = [];
  class Meteor {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * (width + 200);
      this.y = Math.random() * (height * 0.45);
      this.length = Math.random() * 85 + 65;
      this.speed = Math.random() * 14 + 11;
      this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.15;
      this.alpha = 1;
      this.active = true;
    }
    update() {
      if (!this.active) return false;
      this.x -= Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      this.alpha -= 0.018;
      if (this.alpha <= 0 || this.x < -100 || this.y > height + 100) {
        this.active = false;
        return false;
      }
      return true;
    }
    draw() {
      if (!this.active) return;
      const tailX = this.x + Math.cos(this.angle) * this.length;
      const tailY = this.y - Math.sin(this.angle) * this.length;

      const grad = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
      grad.addColorStop(0, `rgba(255, 255, 255, ${this.alpha})`);
      grad.addColorStop(0.35, `rgba(0, 245, 160, ${this.alpha * 0.85})`);
      grad.addColorStop(1, 'rgba(0, 245, 160, 0)');

      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(tailX, tailY);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.9;
      ctx.stroke();

      // Glowing core head
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
      ctx.shadowColor = '#00f5a0';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function createStars() {
    stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }
  }

  function createNodes() {
    nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new ConstellationNode());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // 1. Draw twinkling stars
    for (let i = 0; i < stars.length; i++) {
      stars[i].draw();
    }

    // 2. Update and draw nodes
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update();
      nodes[i].draw();

      // Connect with lines
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * 0.28;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);

          // Subtle gradient laser line
          const lineGrad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
          lineGrad.addColorStop(0, `rgba(${nodes[i].color.r}, ${nodes[i].color.g}, ${nodes[i].color.b}, ${alpha})`);
          lineGrad.addColorStop(1, `rgba(${nodes[j].color.r}, ${nodes[j].color.g}, ${nodes[j].color.b}, ${alpha})`);

          ctx.strokeStyle = lineGrad;
          ctx.lineWidth = 0.85;
          ctx.stroke();

          // Occasionally spawn a high-speed data pulse packet
          if (dataPackets.length < 12 && Math.random() < 0.0035) {
            dataPackets.push(new DataPacket(nodes[i], nodes[j]));
          }
        }
      }

      // Connect to mouse cursor
      if (mouse.x !== null && mouse.y !== null) {
        const mdx = nodes[i].x - mouse.x;
        const mdy = nodes[i].y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < mouse.radius) {
          const mAlpha = (1 - mdist / mouse.radius) * 0.45;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 245, 160, ${mAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // 3. Update & render data light pulses
    for (let k = dataPackets.length - 1; k >= 0; k--) {
      if (!dataPackets[k].update()) {
        dataPackets.splice(k, 1);
      } else {
        dataPackets[k].draw();
      }
    }

    // 4. Update & render shooting stars / meteors
    if (Math.random() < 0.007 && meteors.length < 3) {
      meteors.push(new Meteor());
    }
    for (let m = meteors.length - 1; m >= 0; m--) {
      if (!meteors[m].update()) {
        meteors.splice(m, 1);
      } else {
        meteors[m].draw();
      }
    }

    requestAnimationFrame(animate);
  }

  resize();
  createStars();
  createNodes();
  animate();
}

/* ==========================================================================
   2. Cyber Custom Cursor & Click Ripple Burst
   ========================================================================== */
function initCustomCursorAndRipples() {
  const dot = document.getElementById('custom-cursor-dot');
  const ring = document.getElementById('custom-cursor-ring');
  const cursorLabel = document.getElementById('cursor-label');
  const spotlight = document.getElementById('cursor-spotlight');

  if (!dot || !ring) return;

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let spotlightX = -100;
  let spotlightY = -100;

  let lastTrailTime = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

    const now = performance.now();
    if (now - lastTrailTime > 42 && !document.hidden && window.innerWidth >= 768) {
      lastTrailTime = now;
      createCometParticle(e.clientX, e.clientY);
    }
  });

  function createCometParticle(x, y) {
    const p = document.createElement('div');
    p.className = 'cursor-trail-particle';
    const size = Math.random() * 4.5 + 2.5;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${x + (Math.random() - 0.5) * 6}px`;
    p.style.top = `${y + (Math.random() - 0.5) * 6}px`;

    const colors = [
      'rgba(0, 245, 160, 0.75)',
      'rgba(6, 182, 212, 0.75)',
      'rgba(52, 211, 153, 0.7)'
    ];
    const col = colors[Math.floor(Math.random() * colors.length)];
    p.style.background = col;
    p.style.boxShadow = `0 0 ${size * 2}px ${col}`;

    document.body.appendChild(p);
    setTimeout(() => p.remove(), 700);
  }

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;

    if (spotlight) {
      spotlightX += (mouseX - spotlightX) * 0.1;
      spotlightY += (mouseY - spotlightY) * 0.1;
      spotlight.style.transform = `translate(${spotlightX}px, ${spotlightY}px)`;
    }

    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Smart Contextual Morphing Detection (Awwwards Signature)
  const hoverSelectors = 'a, button, input, textarea, .project-card, .skill-category-card, .timeline-card, .hobby-card, .photo-thumb-btn, .copy-mini-btn, .avatar-frame, .stat-item, .terminal-window';

  function getContextualLabel(target) {
    if (!target) return null;
    const explicit = target.getAttribute('data-cursor-text');
    if (explicit) return explicit;

    if (target.closest('.btn-project-link, .btn-project-link-sub') || target.closest('a[target="_blank"]')) return 'MỞ WEBSITE ↗';
    if (target.closest('.project-detail-btn')) return 'KIẾN TRÚC ℹ️';
    if (target.closest('.photo-thumb-btn') || target.closest('#avatar-frame-trigger')) return 'ĐỔI ẢNH 🔄';
    if (target.closest('.copy-mini-btn')) return 'COPY 📋';
    if (target.closest('#audio-toggle-btn')) return 'NHẠC NỀN 🎵';
    if (target.closest('#sfx-toggle-btn')) return 'HIỆU ỨNG 🔊';
    if (target.closest('#theme-toggle-btn')) return 'GIAO DIỆN 🌓';
    if (target.closest('#print-cv-btn') || target.closest('#btn-print-cv-header')) return 'IN CV 📄';
    if (target.closest('.terminal-window')) return 'TERMINAL ⚡';
    if (target.closest('.filter-btn')) return 'BỘ LỌC 📂';
    if (target.closest('.project-card')) return 'XEM DỰ ÁN ↗';
    return null;
  }

  document.addEventListener('mouseover', (e) => {
    const labelText = getContextualLabel(e.target);
    if (labelText && cursorLabel) {
      cursorLabel.textContent = labelText;
      ring.classList.add('cursor-has-label');
      document.body.classList.add('cursor-hover');
    } else if (e.target.closest(hoverSelectors)) {
      ring.classList.remove('cursor-has-label');
      if (cursorLabel) cursorLabel.textContent = '';
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    const toEl = e.relatedTarget ? e.relatedTarget.closest(hoverSelectors) : null;
    if (!toEl) {
      document.body.classList.remove('cursor-hover');
      ring.classList.remove('cursor-has-label');
      if (cursorLabel) cursorLabel.textContent = '';
    }
  });

  // Click shockwave ripple & sparks
  document.addEventListener('click', (e) => {
    ring.classList.add('cursor-click');
    playCyberTone('blip');
    setTimeout(() => ring.classList.remove('cursor-click'), 180);

    // Ripple
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);

    // Micro sparks
    const sparkCount = 8;
    for (let i = 0; i < sparkCount; i++) {
      const spark = document.createElement('div');
      spark.className = 'click-spark';
      spark.style.left = `${e.clientX}px`;
      spark.style.top = `${e.clientY}px`;
      document.body.appendChild(spark);

      const angle = (Math.PI * 2 / sparkCount) * i + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 35 + 25;
      const targetX = Math.cos(angle) * speed;
      const targetY = Math.sin(angle) * speed;

      spark.animate([
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: `translate(calc(-50% + ${targetX}px), calc(-50% + ${targetY}px)) scale(0)`, opacity: 0 }
      ], {
        duration: 450 + Math.random() * 150,
        easing: 'cubic-bezier(0, 0.8, 0.2, 1)',
        fill: 'forwards'
      }).onfinish = () => spark.remove();
    }
  });
}

/* ==========================================================================
   3. Interactive Mouse Border Spotlight on Cards
   ========================================================================== */
function initCardSpotlight() {
  const cards = document.querySelectorAll(
    '.project-card, .skill-category-card, .timeline-card, .bio-card, .terminal-window, .hobby-card, .contact-info-card, .contact-form-card, .avatar-3d-card, .ai-spotlight-box'
  );

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   4. Dynamic Typing Text Effect
   ========================================================================== */
function initTypingEffect() {
  const textEl = document.getElementById('typing-text');
  if (!textEl) return;

  const titles = [
    "Thực tập sinh Công nghệ Thông tin",
    "Lớp trưởng D23CTC1 (2023 - 2027)",
    "Lập trình Web: Node.js & JavaScript",
    "Tác giả Hệ thống Điểm Danh GPS MUCE",
    "Tận dụng AI: Antigravity, Claude, ChatGPT",
    "Đam mê Tự động hóa & Kỹ thuật Thực chiến"
  ];

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function type() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      textEl.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      textEl.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      typingSpeed = 2200; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   5. Holographic 3D Tilt on Avatar Card (High-Intensity 3D Perspective)
   ========================================================================== */
function initAvatar3DTilt() {
  const card = document.getElementById('avatar-card');
  const glare = document.getElementById('avatar-card-glare');
  if (!card || window.innerWidth < 992) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -18;
    const rotateY = ((x - centerX) / centerX) * 18;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-10px)`;
    card.style.boxShadow = `${(-rotateY * 2.8).toFixed(1)}px ${(rotateX * 2.8).toFixed(1)}px 50px rgba(0, 0, 0, 0.65), 0 0 35px rgba(0, 245, 160, 0.35)`;

    if (glare) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.setProperty('--glare-x', `${glareX}%`);
      glare.style.setProperty('--glare-y', `${glareY}%`);
    }
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    card.style.boxShadow = '';
  });
}

/* ==========================================================================
   6. 3D Perspective Tilt for Project Cards & Interactive UI Blocks
   ========================================================================== */
function initProjectCards3DTilt() {
  if (window.innerWidth < 992) return;
  const cards = document.querySelectorAll('.project-card, .skill-category-card, .timeline-card, .terminal-window');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const isLarge = card.classList.contains('terminal-window') || card.classList.contains('project-card');
      const maxAngle = isLarge ? 15 : 12;

      const rotateX = ((y - centerY) / centerY) * -maxAngle;
      const rotateY = ((x - centerX) / centerX) * maxAngle;

      card.style.transform = `perspective(1100px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px)`;
      card.style.boxShadow = `${(-rotateY * 2.2).toFixed(1)}px ${(rotateX * 2.2).toFixed(1)}px 42px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 245, 160, 0.28)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      card.style.boxShadow = '';
    });
  });
}

/* ==========================================================================
   5. Photo Switcher & Avatar Lightbox (Tự Động Luân Chuyển 2 Ảnh)
   ========================================================================== */
function initPhotoSwitcher() {
  const mainImg = document.getElementById('main-avatar-img');
  const thumbBtns = Array.from(document.querySelectorAll('.photo-thumb-btn'));
  const avatarTrigger = document.getElementById('avatar-frame-trigger');
  const avatarCard = document.getElementById('avatar-card');

  if (!mainImg || thumbBtns.length === 0) return;

  let currentIndex = 0;
  let autoSlideTimer = null;

  const avatarInner = document.querySelector('.avatar-inner');

  function switchPhoto(index) {
    if (index < 0 || index >= thumbBtns.length) return;
    currentIndex = index;
    const btn = thumbBtns[index];
    const targetSrc = btn.getAttribute('data-img');
    if (!targetSrc) return;

    if (avatarInner) avatarInner.classList.add('flipping');
    playCyberTone('whoosh');

    setTimeout(() => {
      mainImg.src = targetSrc;
      if (avatarInner) avatarInner.classList.remove('flipping');
    }, 180);

    thumbBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % thumbBtns.length;
      switchPhoto(nextIndex);
    }, 3500); // Tự động đổi ảnh mỗi 3.5 giây
  }

  function stopAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  // Click chọn thủ công
  thumbBtns.forEach((btn, idx) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      switchPhoto(idx);
      startAutoSlide(); // Khởi động lại đếm giờ
    });
  });

  // Tạm dừng khi rê chuột vào xem, tiếp tục khi rê ra ngoài
  if (avatarCard) {
    avatarCard.addEventListener('mouseenter', stopAutoSlide);
    avatarCard.addEventListener('mouseleave', startAutoSlide);
  }

  // Bắt đầu tự động chuyển ảnh
  startAutoSlide();

  // Avatar click opens larger preview
  if (avatarTrigger) {
    avatarTrigger.addEventListener('click', () => {
      openProjectModal('avatar_preview', {
        title: "Chân dung đại diện • Phan Tấn Kiệt",
        badge: "Profile Photo",
        html: `
          <div style="text-align: center;">
            <div style="max-width: 380px; margin: 0 auto 16px; border-radius: 16px; overflow: hidden; border: 2px solid var(--emerald-primary); box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
              <img src="${mainImg.src}" alt="Phan Tấn Kiệt" style="width: 100%; height: auto; display: block;">
            </div>
            <h4 style="font-size: 1.2rem; color: #ffffff;">Phan Tấn Kiệt (Kiet Phan)</h4>
            <p style="color: var(--emerald-light); font-weight: 600; margin-top: 4px;">Sinh viên CNTT • Lớp trưởng D23CTC1 (2023 - 2027)</p>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 8px;">Trường Đại học Xây dựng Miền Trung (MUCE)</p>
          </div>
        `
      });
    });
  }
}

/* ==========================================================================
   6. Project Category Filter
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  const pill = document.getElementById('filter-active-pill');

  function updatePill(btn) {
    if (!pill || !btn) return;
    const bar = btn.parentElement;
    const barRect = bar.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const left = btnRect.left - barRect.left;
    pill.style.width = `${btnRect.width}px`;
    pill.style.transform = `translateX(${left}px)`;
    pill.style.opacity = '1';
  }

  const activeBtn = document.querySelector('.filter-btn.active');
  if (activeBtn) {
    setTimeout(() => updatePill(activeBtn), 120);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updatePill(btn);
      playCyberTone('blip');

      const filter = btn.getAttribute('data-filter');

      cards.forEach((card, idx) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.animation = `fadeInUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.04}s forwards`;
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  window.addEventListener('resize', () => {
    const current = document.querySelector('.filter-btn.active');
    if (current) updatePill(current);
  });
}

/* ==========================================================================
   7. Project Architecture Detail Modals
   ========================================================================== */
const projectDetailsData = {
  gps: {
    title: "Hệ Thống Điểm Danh Hoạt Động & Sự Kiện GPS",
    badge: "Dự Án Cho Trường • Đang Sử Dụng",
    html: `
      <div style="line-height: 1.7; color: var(--text-main);">
        <p style="margin-bottom: 16px;">
          <strong>Bối cảnh & Vấn đề giải quyết:</strong> Trong các phong trào, hội thảo và sự kiện đoàn hội tại Trường ĐH Xây dựng Miền Trung (MUCE), việc điểm danh bằng giấy hoặc quét mã QR tĩnh thường xuyên xảy ra tình trạng điểm danh hộ, điểm danh ảo gây mất công bằng và khó khăn khi tổng hợp báo cáo.
        </p>

        <h4 style="color: var(--emerald-light); font-size: 1.05rem; margin-bottom: 8px;">Kiến Trúc & Công Nghệ Triển Khai:</h4>
        <ul style="padding-left: 20px; margin-bottom: 18px; color: var(--text-muted);">
          <li><strong style="color: var(--text-main);">Backend:</strong> Node.js, Express REST API, xử lý thuật toán tính khoảng cách địa lý theo công thức Haversine.</li>
          <li><strong style="color: var(--text-main);">Database:</strong> PostgreSQL (Lưu trữ trên Neon Serverless) đảm bảo tốc độ truy vấn cao và an toàn dữ liệu.</li>
          <li><strong style="color: var(--text-main);">Frontend:</strong> HTML5 Geolocation API, giao diện Responsive thân thiện với thiết bị di động của sinh viên.</li>
          <li><strong style="color: var(--text-main);">Media & Hosting:</strong> Render Cloud và Cloudinary lưu trữ tài liệu chứng minh.</li>
        </ul>

        <h4 style="color: var(--emerald-light); font-size: 1.05rem; margin-bottom: 8px;">Kết Quả Đạt Được:</h4>
        <p style="color: var(--text-muted); margin-bottom: 20px;">
          Hệ thống được Ban chấp hành Đoàn trường và Nhà trường đánh giá cao, chính thức đưa vào sử dụng lâu dài cho các sự kiện sinh viên từ năm 2024 đến nay.
        </p>

        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <a href="https://diem-danh-muce.onrender.com" target="_blank" rel="noopener noreferrer" class="btn-primary" style="flex: 1; text-align: center;">
            Mở Website diem-danh-muce.onrender.com
          </a>
        </div>
      </div>
    `
  },
  binhchon: {
    title: "Cổng Bình Chọn Trực Tuyến MUCE 2026",
    badge: "Dự Án Cho Trường • Realtime",
    html: `
      <div style="line-height: 1.7; color: var(--text-main);">
        <p style="margin-bottom: 16px;">
          <strong>Mục tiêu dự án:</strong> Cung cấp nền tảng bình chọn trực tuyến minh bạch, giao diện đẹp mắt cho các cuộc thi tài năng, nét đẹp sinh viên hoặc bình chọn sự kiện của trường Đại học Xây dựng Miền Trung.
        </p>

        <h4 style="color: var(--emerald-light); font-size: 1.05rem; margin-bottom: 8px;">Tính Năng Kỹ Thuật Chính:</h4>
        <ul style="padding-left: 20px; margin-bottom: 18px; color: var(--text-muted);">
          <li>Cơ chế xác thực bình chọn chống spam và chống tự động hóa bằng bot.</li>
          <li>Thống kê và cập nhật biểu đồ xếp hạng thời gian thực.</li>
          <li>Tối ưu hóa hình ảnh thí sinh thông qua CDN để đảm bảo tải trang cực nhanh trong giờ cao điểm.</li>
        </ul>

        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <a href="https://binhchon-muce.onrender.com" target="_blank" rel="noopener noreferrer" class="btn-primary" style="flex: 1; text-align: center;">
            Mở Website binhchon-muce.onrender.com
          </a>
        </div>
      </div>
    `
  },
  zalochat: {
    title: "Web ZaloChat - Ứng Dụng Nhắn Tin Trực Tuyến",
    badge: "Dự Án Cá Nhân • Realtime WebSockets",
    html: `
      <div style="line-height: 1.7; color: var(--text-main);">
        <p style="margin-bottom: 16px;">
          <strong>Ý tưởng thiết kế:</strong> Tái hiện trải nghiệm nhắn tin tức thời mượt mà như Zalo ngay trên trình duyệt web, kết nối trực tiếp với bạn bè mà không cần cài đặt ứng dụng phức tạp.
        </p>

        <h4 style="color: var(--emerald-light); font-size: 1.05rem; margin-bottom: 8px;">Kỹ Năng Áp Dụng:</h4>
        <ul style="padding-left: 20px; margin-bottom: 18px; color: var(--text-muted);">
          <li>Giao tiếp hai chiều thời gian thực với độ trễ cực thấp (&lt; 50ms).</li>
          <li>Trạng thái online/offline, thông báo âm thanh khi có tin nhắn mới, chỉ báo đang gõ.</li>
          <li>Bố cục giao diện Responsive, hỗ trợ tin nhắn văn bản và biểu tượng cảm xúc.</li>
        </ul>

        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <a href="https://nhantinptk.onrender.com" target="_blank" rel="noopener noreferrer" class="btn-primary" style="flex: 1; text-align: center;">
            Trải Nghiệm Web ZaloChat Live
          </a>
        </div>
      </div>
    `
  },
  tiktube: {
    title: "TikTube - Nền Tảng Video Giải Trí Đa Phương Tiện",
    badge: "Dự Án Cá Nhân • Streaming Video",
    html: `
      <div style="line-height: 1.7; color: var(--text-main);">
        <p style="margin-bottom: 16px;">
          <strong>Khái niệm sản phẩm:</strong> Sự kết hợp tinh tế giữa giao diện lướt video ngắn cuốn hút của TikTok và hệ thống danh mục quản trị video phong phú của YouTube.
        </p>

        <h4 style="color: var(--emerald-light); font-size: 1.05rem; margin-bottom: 8px;">Điểm Sáng Công Nghệ:</h4>
        <ul style="padding-left: 20px; margin-bottom: 18px; color: var(--text-muted);">
          <li>Tích hợp Cloudinary Video API để tự động nén và phân phối video chất lượng cao phù hợp băng thông.</li>
          <li>Chế độ Dark Mode hiện đại, nút tương tác like, chia sẻ và theo dõi kênh.</li>
        </ul>

        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <a href="https://tiktubeptk.onrender.com" target="_blank" rel="noopener noreferrer" class="btn-primary" style="flex: 1; text-align: center;">
            Xem TikTube Live trên Render
          </a>
        </div>
      </div>
    `
  },
  tienganh: {
    title: "Học Tập Về Tiếng Anh (Bộ Đôi 2 Website)",
    badge: "Dự Án Cá Nhân • EdTech Tool",
    html: `
      <div style="line-height: 1.7; color: var(--text-main);">
        <p style="margin-bottom: 16px;">
          <strong>Ý tưởng & Mục tiêu:</strong> Xây dựng bộ công cụ học tập tiếng Anh trực quan phục vụ ôn tập chuẩn đầu ra đại học cho bản thân và bạn bè, chia làm 2 hệ thống web độc lập phục vụ 2 mục đích riêng biệt.
        </p>

        <h4 style="color: var(--emerald-light); font-size: 1.05rem; margin-bottom: 12px;">Chi Tiết 2 Nền Tảng Trực Tuyến:</h4>

        <div style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 20px;">
          <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 8px; padding: 14px 16px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
              <span style="font-weight: 800; color: #ffffff;">Link 1: Tiếng Anh Đầu Ra PTK</span>
              <span style="font-size: 0.75rem; background: var(--grad-emerald); color: #fff; padding: 2px 8px; border-radius: 4px; font-weight: 700;">Luyện Đề Thi</span>
            </div>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 10px;">
              Hệ thống ôn luyện đề thi trắc nghiệm, bấm giờ làm bài, giải thích đáp án và theo dõi tiến độ chuẩn đầu ra tốt nghiệp đại học.
            </p>
            <a href="https://tieng-anh-dau-ra-ptk.onrender.com" target="_blank" rel="noopener noreferrer" class="btn-primary" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; font-size: 0.82rem;">
              <span>Mở Web Tiếng Anh Đầu Ra</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>

          <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 8px; padding: 14px 16px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
              <span style="font-weight: 800; color: #ffffff;">Link 2: Học Từ Vựng Tiếng Anh</span>
              <span style="font-size: 0.75rem; background: rgba(255,255,255,0.1); color: var(--emerald-light); border: 1px solid rgba(16,185,129,0.3); padding: 2px 8px; border-radius: 4px; font-weight: 700;">Từ Vựng Flashcards</span>
            </div>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 10px;">
              Học từ vựng qua thẻ Flashcard thông minh 2 mặt, tra nghĩa, ví dụ câu ngữ cảnh và phát âm bản xứ với Audio Web API.
            </p>
            <a href="https://tuvungtienganh-1.onrender.com" target="_blank" rel="noopener noreferrer" class="btn-primary" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; font-size: 0.82rem; background: var(--bg-card-hover); border: 1px solid var(--emerald-light);">
              <span>Mở Web Học Từ Vựng</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>
        </div>
      </div>
    `
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('project-modal-close');
  const detailBtns = document.querySelectorAll('.project-detail-btn');

  detailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pKey = btn.getAttribute('data-project');
      const data = projectDetailsData[pKey];
      if (data) {
        openProjectModal(pKey, data);
      }
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  }
}

function openProjectModal(key, data) {
  const modal = document.getElementById('project-modal');
  const titleEl = document.getElementById('modal-project-title');
  const badgeEl = document.getElementById('modal-project-badge');
  const bodyEl = document.getElementById('modal-project-body');

  if (!modal || !titleEl || !badgeEl || !bodyEl) return;

  titleEl.textContent = data.title;
  badgeEl.textContent = data.badge;
  bodyEl.innerHTML = data.html;

  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
}

/* ==========================================================================
   7b. Reliable External Link Click Dispatcher for Project Cards
   ========================================================================== */
function initProjectLinkClicks() {
  const projectLinks = document.querySelectorAll('a.btn-project-link, a.btn-project-link-sub');
  projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.stopPropagation();
      const href = link.getAttribute('href');
      if (href && href !== '#' && !href.startsWith('javascript:')) {
        window.open(href, '_blank', 'noopener,noreferrer');
        e.preventDefault();
      }
    });
  });
}

/* ==========================================================================
   8. Copy to Clipboard with Toast
   ========================================================================== */
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('[data-copy]');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = btn.getAttribute('data-copy');
      if (val) {
        navigator.clipboard.writeText(val).then(() => {
          showToast(`Đã sao chép: "${val}"`);
        }).catch(() => {
          showToast("Không thể sao chép tự động, vui lòng chọn thủ công.");
        });
      }
    });
  });
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--emerald-ultra); flex-shrink: 0;">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/* ==========================================================================
   9. Contact Formspree Form Submission
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('btn-submit-message');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!submitBtn || !feedback) return;

    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <span>Đang gửi lời nhắn...</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
    `;

    feedback.style.display = 'none';
    feedback.className = 'form-feedback';

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        feedback.className = 'form-feedback success';
        feedback.textContent = '🎉 Cảm ơn bạn! Lời nhắn đã được gửi thành công đến hộp thư của Phan Tấn Kiệt. Tôi sẽ liên hệ lại sớm nhất!';
        feedback.style.display = 'block';
        form.reset();
        showToast("Lời nhắn đã gửi thành công!");
      } else {
        throw new Error('Gửi không thành công');
      }
    } catch (err) {
      feedback.className = 'form-feedback error';
      feedback.textContent = 'Không thể gửi trực tiếp qua API lúc này. Vui lòng liên hệ trực tiếp qua SĐT/Zalo: 0338351410 hoặc Email: kietphan28122004@gmail.com.';
      feedback.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

/* ==========================================================================
   10. Dark / Light Theme Toggle
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('ptk_theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('ptk_theme', next);
      showToast(`Đã chuyển sang giao diện: ${next === 'dark' ? 'Tối (Cyber Emerald)' : 'Sáng (Clean Green)'}`);
    });
  }
}

/* ==========================================================================
   11. Background Ambient Audio Controller
   ========================================================================== */
function initAudioPlayer() {
  const audio = document.getElementById('bg-music');
  const btn = document.getElementById('audio-toggle-btn');

  if (!audio || !btn) return;

  audio.volume = 0.4;
  let isPlaying = false;

  btn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => {
        isPlaying = true;
        btn.classList.add('playing');
        showToast("Đang phát nhạc nền thư giãn 🎵");
      }).catch(() => {
        showToast("Trình duyệt chặn phát âm thanh tự động, vui lòng thử lại.");
      });
    } else {
      audio.pause();
      isPlaying = false;
      btn.classList.remove('playing');
      showToast("Đã tạm dừng nhạc nền.");
    }
  });
}

/* ==========================================================================
   12. Original CV PDF Viewer, Export & Print Handler
   ========================================================================== */
function downloadOriginalCV() {
  const link = document.createElement('a');
  link.href = 'assets/pdf/CV_Phan_Tan_Kiet.pdf';
  link.download = 'CV THUC TAP PHAN TAN KIET.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('📄 Đang xuất file: CV THUC TAP PHAN TAN KIET.pdf');
}

function initPrintModal() {
  const printNavBtn = document.getElementById('print-cv-btn');
  const modal = document.getElementById('ats-cv-modal');
  const closeBtn = document.getElementById('ats-modal-close');
  const triggerPrintBtn = document.getElementById('btn-trigger-print');
  const modalDownloadBtn = document.getElementById('btn-modal-download-pdf');
  const heroDownloadBtn = document.getElementById('hero-download-cv-btn');

  // Khi bấm nút [Tải / In CV] ở thanh điều hướng: Xuất file ngay và mở khung xem
  if (printNavBtn) {
    printNavBtn.addEventListener('click', (e) => {
      e.preventDefault();
      downloadOriginalCV();
      if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
      }
    });
  }

  // Nút tải ở Hero
  if (heroDownloadBtn) {
    heroDownloadBtn.addEventListener('click', () => {
      showToast('📄 Đang xuất file: CV THUC TAP PHAN TAN KIET.pdf');
    });
  }

  // Nút tải trong Modal
  if (modalDownloadBtn) {
    modalDownloadBtn.addEventListener('click', () => {
      showToast('📄 Đang tải xuống file PDF gốc...');
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  if (triggerPrintBtn) {
    triggerPrintBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* ==========================================================================
   13. Navigation Spy & Sticky Header
   ========================================================================== */
function initNavigationSpy() {
  const header = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('.nav-item a');
  const sections = document.querySelectorAll('section');
  const pill = document.getElementById('nav-active-pill');
  const navContainer = document.getElementById('nav-links');

  function updateNavPill(activeLink) {
    if (!pill || !activeLink || !navContainer || window.innerWidth < 992) {
      if (pill) pill.style.opacity = '0';
      return;
    }
    const containerRect = navContainer.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    const left = linkRect.left - containerRect.left;
    pill.style.width = `${linkRect.width}px`;
    pill.style.transform = `translateX(${left}px)`;
    pill.style.opacity = '1';
  }

  // Initial positioning
  const currentActive = document.querySelector('.nav-item a.active');
  if (currentActive) {
    setTimeout(() => updateNavPill(currentActive), 150);
  }

  // Hover fluid preview
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => updateNavPill(link));
  });

  if (navContainer) {
    navContainer.addEventListener('mouseleave', () => {
      const active = document.querySelector('.nav-item a.active');
      if (active) updateNavPill(active);
    });
  }

  window.addEventListener('resize', () => {
    const active = document.querySelector('.nav-item a.active');
    if (active) updateNavPill(active);
  });

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Header shadow
    if (scrollPos > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Nav active link spy
    let currentId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        if (link.getAttribute('href') === `#${currentId}`) {
          if (!link.classList.contains('active')) {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            updateNavPill(link);
          }
        }
      });
    }
  }, { passive: true });
}

/* ==========================================================================
   14. Mobile Drawer Menu Toggle
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-item a');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  links.forEach(l => {
    l.addEventListener('click', () => {
      toggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

/* ==========================================================================
   15. Interactive Terminal: Copy JSON Profile
   ========================================================================== */
function initTerminalInteractive() {
  const copyBtn = document.getElementById('terminal-copy-btn');
  const codeEl = document.querySelector('#terminal-body code');

  if (!copyBtn || !codeEl) return;

  copyBtn.addEventListener('click', () => {
    const rawText = codeEl.innerText;
    navigator.clipboard.writeText(rawText).then(() => {
      const originalHTML = copyBtn.innerHTML;
      copyBtn.innerHTML = `
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>Đã chép! ✓</span>
      `;
      copyBtn.style.background = 'var(--emerald-primary)';
      copyBtn.style.color = '#ffffff';

      showToast("Đã sao chép cấu hình Developer Profile của Phan Tấn Kiệt!");

      setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
        copyBtn.style.background = '';
        copyBtn.style.color = '';
      }, 2500);
    }).catch(() => {
      showToast("Không thể sao chép, vui lòng chọn thủ công.");
    });
  });
}

/* ==========================================================================
   16. Reading Scroll Progress Bar & Circular Back to Top Button
   ========================================================================== */
function initScrollProgressBarAndBackToTop() {
  const progressBar = document.getElementById('scroll-progress-bar');
  const backToTopBtn = document.getElementById('back-to-top-btn');
  const circle = document.getElementById('progress-circle');

  const circumference = 2 * Math.PI * 19; // ~119.38
  if (circle) {
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;
  }

  function updateScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (backToTopBtn && circle) {
      if (scrollTop > 380) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }

      const offset = circumference - (progress / 100) * circumference;
      circle.style.strokeDashoffset = Math.max(0, offset);
    }
  }

  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* ==========================================================================
   17. Scroll Reveal & Number Counters & Skill Bars
   ========================================================================== */
function initScrollRevealAndCounters() {
  // 1. Observe all reveal-on-scroll elements
  const revealElements = document.querySelectorAll(
    '.reveal-on-scroll, section:not(.hero-section), .project-card, .skill-category-card, .timeline-card, .hobby-card, .contact-info-card, .contact-form-card'
  );

  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el, index) => {
    el.classList.add('reveal-on-scroll');
    // Stagger delay for cards inside grids
    if (el.classList.contains('project-card') || el.classList.contains('skill-category-card') || el.classList.contains('timeline-card') || el.classList.contains('hobby-card')) {
      const delay = (index % 4) * 0.1;
      el.style.transitionDelay = `${delay}s`;
    }
    revealObserver.observe(el);
  });

  // 2. Animate Hero Number Counters
  const heroStats = document.querySelector('.hero-stats');
  let countersAnimated = false;

  function runCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'), 10);
      const suffix = stat.getAttribute('data-suffix') || '';
      const duration = 1800; // ms
      const startTime = performance.now();

      function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Exponential ease out
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.floor(ease * target);
        stat.textContent = current + suffix;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          stat.textContent = target + suffix;
        }
      }

      requestAnimationFrame(step);
    });
  }

  if (heroStats) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        runCounters();
        statsObserver.disconnect();
      }
    }, { threshold: 0.2 });

    statsObserver.observe(heroStats);
  }

  // 3. Animate Skill Progress Bars
  const skillsSection = document.getElementById('skills');
  let skillsAnimated = false;

  function runSkillsBars() {
    if (skillsAnimated) return;
    skillsAnimated = true;

    const skillBars = document.querySelectorAll('.skill-progress-bar[data-progress]');
    skillBars.forEach((bar, idx) => {
      const targetPercent = bar.getAttribute('data-progress');
      setTimeout(() => {
        bar.style.width = `${targetPercent}%`;
      }, idx * 60);
    });
  }

  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        runSkillsBars();
        skillsObserver.disconnect();
      }
    }, { threshold: 0.15 });

    skillsObserver.observe(skillsSection);
  }
}

/* ==========================================================================
   18. Magnetic Pull on Interactive Buttons
   ========================================================================== */
function initMagneticButtons() {
  if (window.innerWidth < 992) return;

  const magneticTargets = document.querySelectorAll(
    '.btn-primary, .btn-outline, .brand-logo, #theme-toggle-btn, #audio-toggle-btn, .back-to-top-btn, .photo-thumb-btn, .copy-mini-btn'
  );

  magneticTargets.forEach(el => {
    el.classList.add('magnetic-btn');

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      el.style.transform = `translate(${dx * 0.28}px, ${dy * 0.28}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0px, 0px)';
    });

    el.addEventListener('mouseenter', () => {
      playCyberTone('tick');
    });
  });
}

/* ==========================================================================
   19. Multi-Layer Scroll Parallax Depth
   ========================================================================== */
function initParallaxDepth() {
  const badge1 = document.querySelector('.float-badge-1');
  const badge2 = document.querySelector('.float-badge-2');
  const orb1 = document.querySelector('.ambient-orb-1');
  const orb2 = document.querySelector('.ambient-orb-2');
  const orb3 = document.querySelector('.ambient-orb-3');

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.scrollY;

        if (badge1) {
          badge1.style.transform = `translateY(${Math.sin(scrolled * 0.004) * 8 - scrolled * 0.05}px) rotate(${Math.sin(scrolled * 0.003) * 2.5}deg)`;
        }
        if (badge2) {
          badge2.style.transform = `translateY(${Math.cos(scrolled * 0.004) * 8 - scrolled * 0.06}px) rotate(${Math.cos(scrolled * 0.003) * -2.5}deg)`;
        }
        if (orb1) {
          orb1.style.transform = `translate(0, ${scrolled * 0.12}px)`;
        }
        if (orb2) {
          orb2.style.transform = `translate(0, ${scrolled * -0.1}px)`;
        }
        if (orb3) {
          orb3.style.transform = `translate(0, ${scrolled * 0.08}px)`;
        }

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ==========================================================================
   20. Web Audio API Cyber Haptic Tone Synthesizer
   ========================================================================== */
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

let sfxEnabled = true;

function playCyberTone(type = 'tick') {
  if (!sfxEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'tick') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.012);
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);
      osc.start(now);
      osc.stop(now + 0.012);
    } else if (type === 'blip') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(1250, now + 0.022);
      gain.gain.setValueAtTime(0.022, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);
      osc.start(now);
      osc.stop(now + 0.022);
    } else if (type === 'whoosh') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.038);
      gain.gain.setValueAtTime(0.018, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.038);
      osc.start(now);
      osc.stop(now + 0.038);
    }
  } catch (err) {
    // Silently continue if autoplay policies apply
  }
}

/* ==========================================================================
   21. SFX Synthesizer Toggle & Controller
   ========================================================================== */
function initSfxToggle() {
  const sfxBtn = document.getElementById('sfx-toggle-btn');
  if (!sfxBtn) return;

  const saved = localStorage.getItem('sfx_enabled');
  if (saved !== null) {
    sfxEnabled = saved === 'true';
  }

  function updateBtnUI() {
    if (sfxEnabled) {
      sfxBtn.classList.add('active');
      sfxBtn.classList.remove('muted');
      sfxBtn.title = 'Bật/Tắt âm thanh tương tác vi điện tử (Đang Bật)';
    } else {
      sfxBtn.classList.remove('active');
      sfxBtn.classList.add('muted');
      sfxBtn.title = 'Bật/Tắt âm thanh tương tác vi điện tử (Đang Tắt)';
    }
  }
  updateBtnUI();

  sfxBtn.addEventListener('click', () => {
    sfxEnabled = !sfxEnabled;
    localStorage.setItem('sfx_enabled', sfxEnabled);
    updateBtnUI();
    if (sfxEnabled) {
      playCyberTone('blip');
    }
  });
}

/* ==========================================================================
   22. Dynamic Specular Glare (Apple & Stripe Specular Reflection on Cards)
   ========================================================================== */
function initCardSpecularGlare() {
  const cards = document.querySelectorAll(
    '.project-card, .skill-category-card, .timeline-card, .hobby-card, .bio-card, .terminal-window'
  );

  cards.forEach(card => {
    if (!card.querySelector('.card-glare')) {
      const glare = document.createElement('div');
      glare.className = 'card-glare';
      glare.setAttribute('aria-hidden', 'true');
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
      const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--glare-x', `${xPercent.toFixed(1)}%`);
      card.style.setProperty('--glare-y', `${yPercent.toFixed(1)}%`);
    });
  });
}

/* ==========================================================================
   23. Cyber Matrix Text Decryption Scramble (Awwwards Typography)
   ========================================================================== */
function initCyberTextScramble() {
  const scrambleElements = document.querySelectorAll('.cyber-scramble');
  const glyphs = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789_#@$%&*+=~^';

  function scramble(el) {
    if (el.dataset.scrambling === 'true') return;
    el.dataset.scrambling = 'true';
    el.classList.add('scrambling');

    const original = el.getAttribute('data-original') || el.textContent;
    let iteration = 0;
    const maxIterations = original.length;

    const interval = setInterval(() => {
      el.textContent = original
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iteration) {
            return original[index];
          }
          return glyphs[Math.floor(Math.random() * glyphs.length)];
        })
        .join('');

      if (iteration >= maxIterations) {
        clearInterval(interval);
        el.textContent = original;
        el.dataset.scrambling = 'false';
        el.classList.remove('scrambling');
      }

      iteration += 1 / 2.5; // Decryption cadence
    }, 28);
  }

  // Trigger once on page load
  setTimeout(() => {
    scrambleElements.forEach(el => scramble(el));
  }, 450);

  // Trigger on hover
  scrambleElements.forEach(el => {
    el.addEventListener('mouseenter', () => scramble(el));
  });
}

/* ==========================================================================
   24. Lenis-Style Inertial Momentum Smooth Scrolling (Velvety Smooth 60fps+ LERP)
   ========================================================================== */
function initSmoothInertiaScroll() {
  // Only apply on desktop non-touch screens with fine pointer
  if (window.innerWidth < 992 || window.matchMedia('(pointer: coarse)').matches) return;

  let currentY = window.scrollY;
  let targetY = window.scrollY;
  let isMoving = false;
  let rafId = null;

  function clamp(val, min, max) {
    return Math.max(min, Math.min(val, max));
  }

  function maxScroll() {
    return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  }

  function updateScroll() {
    const diff = targetY - currentY;
    // Exponential deceleration curve
    currentY += diff * 0.092;

    window.scrollTo(0, currentY);

    if (Math.abs(diff) > 0.6) {
      rafId = requestAnimationFrame(updateScroll);
    } else {
      currentY = targetY;
      window.scrollTo(0, currentY);
      isMoving = false;
    }
  }

  window.addEventListener('wheel', (e) => {
    // If inside a scrollable modal dialog or terminal, preserve native local scrolling
    if (e.target.closest('.modal-dialog, .terminal-body')) return;

    e.preventDefault();
    targetY = clamp(targetY + e.deltaY * 0.95, 0, maxScroll());

    if (!isMoving) {
      isMoving = true;
      currentY = window.scrollY;
      rafId = requestAnimationFrame(updateScroll);
    }
  }, { passive: false });

  // Sync target when user navigates via anchor links or back-to-top button
  window.addEventListener('scroll', () => {
    if (!isMoving) {
      targetY = window.scrollY;
      currentY = window.scrollY;
    }
  }, { passive: true });
}

/* ==========================================================================
   25. Interactive 3D WebGL Holographic Lab (Three.js Powered)
   ========================================================================== */
function initHero3DWebGL() {
  const canvas = document.getElementById('hero-3d-canvas');
  const container = document.getElementById('holo-canvas-wrapper');
  const switchBtn = document.getElementById('holo-switch-shape-btn');
  const shapeNameEl = document.getElementById('holo-shape-name');

  if (!canvas || !container || typeof THREE === 'undefined') return;

  const width = container.clientWidth || 380;
  const height = container.clientHeight || 195;

  // Scene & Camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.z = 7.5;

  // Renderer with alpha transparency & high performance
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0x00f5a0, 1.8);
  dirLight1.position.set(5, 5, 5);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x06b6d4, 1.5);
  dirLight2.position.set(-5, -5, 3);
  scene.add(dirLight2);

  // Group for the 3D Hologram Core
  const coreGroup = new THREE.Group();
  scene.add(coreGroup);

  // 3 Geometries: Torus Knot, Icosahedron, Tech Box
  const geometries = [
    {
      name: 'Torus Knot 3D',
      geom: new THREE.TorusKnotGeometry(1.5, 0.42, 100, 16)
    },
    {
      name: 'Cyber Icosahedron',
      geom: new THREE.IcosahedronGeometry(2.1, 1)
    },
    {
      name: 'Matrix Tech Cube',
      geom: new THREE.BoxGeometry(2.4, 2.4, 2.4, 3, 3, 3)
    }
  ];

  let currentGeomIndex = 0;

  // Materials
  const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f5a0,
    wireframe: true,
    transparent: true,
    opacity: 0.85
  });

  const solidMaterial = new THREE.MeshStandardMaterial({
    color: 0x06b6d4,
    roughness: 0.25,
    metalness: 0.85,
    transparent: true,
    opacity: 0.45,
    wireframe: false
  });

  let wireMesh = new THREE.Mesh(geometries[0].geom, wireMaterial);
  let solidMesh = new THREE.Mesh(geometries[0].geom, solidMaterial);
  solidMesh.scale.set(0.96, 0.96, 0.96);

  coreGroup.add(solidMesh);
  coreGroup.add(wireMesh);

  // Orbiting Quantum Particle Ring
  const particleCount = 320;
  const particleGeom = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const radius = 3.2 + (Math.random() - 0.5) * 1.2;
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI * 0.7;

    particlePositions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
    particlePositions[i * 3 + 1] = radius * Math.sin(phi);
    particlePositions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
  }

  particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  const particleMaterial = new THREE.PointsMaterial({
    color: 0x34d399,
    size: 0.065,
    transparent: true,
    opacity: 0.75
  });

  const particleCloud = new THREE.Points(particleGeom, particleMaterial);
  coreGroup.add(particleCloud);

  // Interactive Mouse Dragging & Orbiting
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let targetRotation = { x: 0, y: 0 };

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      coreGroup.rotation.y += deltaX * 0.012;
      coreGroup.rotation.x += deltaY * 0.012;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    } else {
      // Subtle mouse tracking
      const rect = container.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotation.y = relX * 0.8;
      targetRotation.x = relY * 0.8;
    }
  });

  // Touch Dragging for Mobile
  container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      coreGroup.rotation.y += deltaX * 0.015;
      coreGroup.rotation.x += deltaY * 0.015;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, { passive: true });

  // Shape Switcher Handler
  if (switchBtn) {
    switchBtn.addEventListener('click', () => {
      currentGeomIndex = (currentGeomIndex + 1) % geometries.length;
      const nextGeom = geometries[currentGeomIndex];

      // Shrink scale out then scale back in
      let scale = 1;
      const shrinkInterval = setInterval(() => {
        scale -= 0.15;
        if (scale <= 0.2) {
          clearInterval(shrinkInterval);
          wireMesh.geometry = nextGeom.geom;
          solidMesh.geometry = nextGeom.geom;
          if (shapeNameEl) shapeNameEl.textContent = nextGeom.name;
          playCyberTone('whoosh');

          const growInterval = setInterval(() => {
            scale += 0.15;
            coreGroup.scale.set(scale, scale, scale);
            if (scale >= 1) {
              coreGroup.scale.set(1, 1, 1);
              clearInterval(growInterval);
            }
          }, 16);
        } else {
          coreGroup.scale.set(scale, scale, scale);
        }
      }, 16);
    });
  }

  // Responsive Resize
  function onResize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w === 0 || h === 0) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', onResize);

  // Animation Loop
  let clock = new THREE.Clock();

  function animate3D() {
    requestAnimationFrame(animate3D);

    // Auto spin when not manually dragging
    if (!isDragging) {
      coreGroup.rotation.y += 0.008;
      coreGroup.rotation.x += 0.004;

      // Smooth inertia towards cursor
      coreGroup.rotation.y += (targetRotation.y - (coreGroup.rotation.y % (Math.PI * 2))) * 0.03;
      coreGroup.rotation.x += (targetRotation.x - (coreGroup.rotation.x % (Math.PI * 2))) * 0.03;
    }

    // Spin particle halo in opposite direction
    particleCloud.rotation.y -= 0.005;
    particleCloud.rotation.z += 0.003;

    renderer.render(scene, camera);
  }

  animate3D();
}

