/* =========================================================
   KAMAL RAO — PORTFOLIO SCRIPT
   Structure:
   1. Loading Screen
   2. Custom Cursor
   3. Scroll Progress + Header
   4. Mobile Nav
   5. Typing Animation
   6. Particle Background
   7. Scroll Reveal (fade-up / fade-left)
   8. Animated Counters
   9. Skill Bars
   10. Portfolio Filter + Modal
   11. Video Section + Modal
   12. Card Tilt Effect
   13. Ripple Buttons
   14. Contact Form
   15. Back To Top / Footer Year
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. LOADING SCREEN ---------- */
  const loader = document.getElementById('loader');
  const loaderBarFill = document.getElementById('loaderBarFill');
  const loaderPercent = document.getElementById('loaderPercent');

  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadInterval);
      setTimeout(() => {
        loader.classList.add('loaded');
        document.body.style.overflow = '';
      }, 300);
    }
    loaderBarFill.style.width = progress + '%';
    loaderPercent.textContent = Math.floor(progress) + '%';
  }, 180);

  document.body.style.overflow = 'hidden';

  /* ---------- 2. CUSTOM CURSOR ---------- */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  if (!isTouchDevice) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      document.body.classList.add('cursor-active');
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    const hoverTargets = 'a, button, .project-card, .video-card, input, textarea';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverTargets)) cursorRing.classList.add('hover-target');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverTargets)) cursorRing.classList.remove('hover-target');
    });
  }

  /* ---------- 3. SCROLL PROGRESS + HEADER ---------- */
  const scrollProgress = document.getElementById('scrollProgress');
  const siteHeader = document.getElementById('siteHeader');
  const navLinkEls = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.width = (scrollTop / docHeight) * 100 + '%';

    siteHeader.classList.toggle('scrolled', scrollTop > 40);

    // Active nav link tracking
    let currentSection = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      if (scrollTop >= top) currentSection = sec.getAttribute('id');
    });
    navLinkEls.forEach(link => {
      link.classList.toggle('active-link', link.getAttribute('href') === '#' + currentSection);
    });
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------- 4. MOBILE NAV ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinkEls.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ---------- 5. TYPING ANIMATION ---------- */
  const typingText = document.getElementById('typingText');
  const roles = [
    'Creative Designer',
    'Video Editor',
    'Motion Designer',
    'AI Content Creator',
    'Social Media Marketer'
  ];
  let roleIndex = 0, charIndex = 0, isDeleting = false;

  function typeLoop() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      typingText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeLoop, 1500);
        return;
      }
    } else {
      typingText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, isDeleting ? 45 : 90);
  }
  typeLoop();

  /* ---------- 6. PARTICLE BACKGROUND (Hero) ---------- */
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  const heroSection = document.querySelector('.hero');

  function resizeCanvas() {
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function createParticles() {
    const count = window.innerWidth < 768 ? 35 : 70;
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.4,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.15
    }));
  }
  createParticles();
  window.addEventListener('resize', createParticles);

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(96, 165, 250, ${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();

  /* ---------- 7. SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll('.fade-up, .fade-left');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- 8. ANIMATED COUNTERS ---------- */
  const statNumbers = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1600;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(update);
  }

  /* ---------- 9. SKILL BARS ---------- */
  const skillBars = document.querySelectorAll('.skill-bar');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const percent = bar.getAttribute('data-percent');
        const fill = bar.querySelector('.skill-fill');
        const label = bar.querySelector('.skill-percent');

        fill.style.width = percent + '%';

        let current = 0;
        const target = parseInt(percent, 10);
        const step = () => {
          current += Math.ceil((target - current) / 8) || 1;
          if (current >= target) current = target;
          label.textContent = current + '%';
          if (current < target) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);

        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });
  skillBars.forEach(bar => skillObserver.observe(bar));

  /* ---------- 10. PORTFOLIO FILTER + MODAL ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const match = filter === 'all' || card.getAttribute('data-category') === filter;
        card.classList.toggle('hidden-item', !match);
      });
    });
  });

  const projectModal = document.getElementById('projectModal');
  const projectModalClose = document.getElementById('projectModalClose');
  const modalImage = document.getElementById('modalImage');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTools = document.getElementById('modalTools');
  const modalLink = document.getElementById('modalLink');

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const thumbStyle = card.querySelector('.project-thumb').getAttribute('style');
      modalImage.setAttribute('style', thumbStyle);
      modalCategory.textContent = card.querySelector('.project-category').textContent;
      modalTitle.textContent = card.getAttribute('data-title');
      modalDesc.textContent = card.getAttribute('data-desc');
      modalTools.textContent = card.getAttribute('data-tools');
      modalLink.setAttribute('href', card.getAttribute('data-link'));

      openModal(projectModal);
    });
  });
  projectModalClose.addEventListener('click', () => closeModal(projectModal));
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) closeModal(projectModal);
  });

  /* ---------- 11. VIDEO SECTION + MODAL ---------- */
  const videoModal = document.getElementById('videoModal');
  const videoModalClose = document.getElementById('videoModalClose');
  const modalVideo = document.getElementById('modalVideo');
  const videoModalTitle = document.getElementById('videoModalTitle');
  const videoModalCategory = document.getElementById('videoModalCategory');
  const videoCards = document.querySelectorAll('.video-card');

  videoCards.forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-video');
      modalVideo.setAttribute('src', src);
      videoModalTitle.textContent = card.getAttribute('data-title');
      videoModalCategory.textContent = card.getAttribute('data-category');
      openModal(videoModal);
      modalVideo.play().catch(() => {});
    });
  });

  function closeVideoModal() {
    modalVideo.pause();
    modalVideo.removeAttribute('src');
    modalVideo.load();
    closeModal(videoModal);
  }
  videoModalClose.addEventListener('click', closeVideoModal);
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideoModal();
  });

  /* Shared modal open/close helpers */
  function openModal(modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (projectModal.classList.contains('open')) closeModal(projectModal);
      if (videoModal.classList.contains('open')) closeVideoModal();
    }
  });

  /* ---------- 12. CARD TILT EFFECT ---------- */
  const tiltCards = document.querySelectorAll('.card-tilt');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -10;
      const rotateY = ((x / rect.width) - 0.5) * 10;
      card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(700px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  /* ---------- 13. RIPPLE BUTTONS ---------- */
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const circle = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      circle.className = 'ripple-circle';
      circle.style.width = circle.style.height = size + 'px';
      circle.style.left = (e.clientX - rect.left - size / 2) + 'px';
      circle.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 650);
    });
  });

  /* ---------- 14. CONTACT FORM ---------- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // NOTE: Hook this up to your backend / form service (e.g. Formspree, EmailJS) to actually send messages.
    formSuccess.classList.add('show');
    contactForm.reset();
    setTimeout(() => formSuccess.classList.remove('show'), 4000);
  });

  /* ---------- 15. BACK TO TOP / FOOTER YEAR ---------- */
  const backToTop = document.getElementById('backToTop');
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.getElementById('footerYear').textContent = new Date().getFullYear();

});
