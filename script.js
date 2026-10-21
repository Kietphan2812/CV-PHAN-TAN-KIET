/**
 * PHAN TẤN KIỆT (KIET PHAN) - INTERACTIVE PORTFOLIO & CV
 * Dynamic Motion, Particle Canvas, 3D Tilt, Audio Player, Project Filters, Modals & Toast
 */

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  initSpotlight();
  initTypingEffect();
  initAvatar3DTilt();
  initPhotoSwitcher();
  initProjectFilters();
  initProjectModals();
  initCopyButtons();
  initContactForm();
  initThemeToggle();
  initAudioPlayer();
  initPrintModal();
  initNavigationSpy();
  initMobileMenu();
});

/* ==========================================================================
   1. Interactive Particle Constellation Canvas
   ========================================================================== */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = window.innerWidth < 768 ? 32 : 65;
  const maxDistance = 140;

  const mouse = {
    x: null,
    y: null,
    radius: 130
  };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.size = Math.random() * 2 + 1;
      this.baseColor = 'rgba(52, 211, 153, ';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse collision repulsion
      if (mouse.x !== null && mouse.y !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const dirX = (dx / dist) * force * 2;
          const dirY = (dy / dist) * force * 2;
          this.x += dirX;
          this.y += dirY;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.baseColor + '0.6)';
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      // Connect with lines
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const opacity = (1 - dist / maxDistance) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(52, 211, 153, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  resize();
  initParticles();
  animate();
}

/* ==========================================================================
   2. Cursor Glow Spotlight
   ========================================================================== */
function initSpotlight() {
  const spotlight = document.getElementById('cursor-spotlight');
  if (!spotlight || window.innerWidth < 768) return;

  let currentX = -1000;
  let currentY = -1000;
  let targetX = -1000;
  let targetY = -1000;

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  function update() {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    spotlight.style.transform = `translate(${currentX}px, ${currentY}px)`;
    requestAnimationFrame(update);
  }

  update();
}

/* ==========================================================================
   3. Dynamic Typing Text Effect
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
   4. 3D Tilt Effect on Avatar Card
   ========================================================================== */
function initAvatar3DTilt() {
  const card = document.getElementById('avatar-card');
  if (!card || window.innerWidth < 992) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  });
}

/* ==========================================================================
   5. Photo Switcher & Avatar Lightbox
   ========================================================================== */
function initPhotoSwitcher() {
  const mainImg = document.getElementById('main-avatar-img');
  const thumbBtns = document.querySelectorAll('.photo-thumb-btn');
  const avatarTrigger = document.getElementById('avatar-frame-trigger');

  if (!mainImg) return;

  thumbBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetSrc = btn.getAttribute('data-img');
      if (targetSrc) {
        mainImg.style.opacity = '0';
        setTimeout(() => {
          mainImg.src = targetSrc;
          mainImg.style.opacity = '1';
        }, 150);

        thumbBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
    });
  });

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

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
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
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  });
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
