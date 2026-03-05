// Noteracker Ltd. - Main JavaScript

// Initialize everything after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  loadComponents();
  initFadeInAnimations();
  initSmoothScrolling();
  createMalwareAnimation();
  initCounterAnimation();
});

// Header and footer are injected server-side by Cloudflare Worker (HTMLRewriter)
// No client-side fetch needed — just initialize interactive behavior
function loadComponents() {
  initMobileToggle();
  initHeaderScroll();
  setActiveNav();
}

// Mobile Navigation Toggle
function initMobileToggle() {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        navMenu.classList.remove('active');
      }
    });
  });
}

// Header Scroll Effect with Hide/Show
function initHeaderScroll() {
  let lastScroll = 0;
  const header = document.querySelector('.header');
  const subHeader = document.querySelector('.sub-header');
  if (!header) return;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Sub-header: hide on scroll down
    if (subHeader) {
      if (currentScroll > 50) {
        subHeader.classList.add('hidden');
        header.style.top = '0';
      } else {
        subHeader.classList.remove('hidden');
        header.style.top = '';
      }
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
  });
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }
    });
  });
}

// Active Navigation Highlight
function setActiveNav() {
  const pathname = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (pathname === href || (pathname === '/' && href === '/index.html')) {
      link.classList.add('active');
    }
  });
}

// Intersection Observer for Fade-in Animations
function initFadeInAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.card, .stat-card, .section-header');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Counter Animation for Stats
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, 16);
}

function initCounterAnimation() {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        animateCounter(entry.target);
        entry.target.classList.add('counted');
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
  });
}

// Enhanced 4-Stage Malware Animation (400x400px)
function createMalwareAnimation() {
  const container = document.getElementById('malware-animation');
  if (!container) return;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '400');
  svg.setAttribute('height', '400');
  svg.setAttribute('viewBox', '0 0 400 400');
  svg.style.maxWidth = '400px';
  svg.style.margin = '0 auto';
  svg.style.display = 'block';

  // Stage 1: Infected Website (Red)
  const stage1 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  stage1.setAttribute('id', 'stage-1');
  stage1.setAttribute('opacity', '0');

  const infectedSite = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  infectedSite.setAttribute('x', '80');
  infectedSite.setAttribute('y', '100');
  infectedSite.setAttribute('width', '240');
  infectedSite.setAttribute('height', '200');
  infectedSite.setAttribute('rx', '12');
  infectedSite.setAttribute('fill', '#252b30');
  infectedSite.setAttribute('stroke', '#ff4444');
  infectedSite.setAttribute('stroke-width', '4');

  const warningIcon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  warningIcon.setAttribute('x', '200');
  warningIcon.setAttribute('y', '210');
  warningIcon.setAttribute('text-anchor', 'middle');
  warningIcon.setAttribute('font-size', '48');
  warningIcon.textContent = '\u26A0\uFE0F';

  const infectedLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  infectedLabel.setAttribute('x', '200');
  infectedLabel.setAttribute('y', '330');
  infectedLabel.setAttribute('text-anchor', 'middle');
  infectedLabel.setAttribute('fill', '#ff4444');
  infectedLabel.setAttribute('font-size', '20');
  infectedLabel.setAttribute('font-weight', 'bold');
  infectedLabel.textContent = 'INFECTED';

  stage1.appendChild(infectedSite);
  stage1.appendChild(warningIcon);
  stage1.appendChild(infectedLabel);

  // Malware particles
  for (let i = 0; i < 8; i++) {
    const particle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    const angle = (i / 8) * Math.PI * 2;
    particle.setAttribute('cx', 200 + Math.cos(angle) * 80);
    particle.setAttribute('cy', 200 + Math.sin(angle) * 80);
    particle.setAttribute('r', '5');
    particle.setAttribute('fill', '#ff4444');
    particle.setAttribute('class', 'malware-particle');
    stage1.appendChild(particle);
  }

  // Stage 2: Treatment (Yellow - Noteracker working)
  const stage2 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  stage2.setAttribute('id', 'stage-2');
  stage2.setAttribute('opacity', '0');

  const treatingSite = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  treatingSite.setAttribute('x', '80');
  treatingSite.setAttribute('y', '100');
  treatingSite.setAttribute('width', '240');
  treatingSite.setAttribute('height', '200');
  treatingSite.setAttribute('rx', '12');
  treatingSite.setAttribute('fill', '#252b30');
  treatingSite.setAttribute('stroke', '#e6b802');
  treatingSite.setAttribute('stroke-width', '4');

  const syringe = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  syringe.setAttribute('x', '200');
  syringe.setAttribute('y', '210');
  syringe.setAttribute('text-anchor', 'middle');
  syringe.setAttribute('font-size', '48');
  syringe.textContent = '\uD83D\uDC89';

  const treatingLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  treatingLabel.setAttribute('x', '200');
  treatingLabel.setAttribute('y', '330');
  treatingLabel.setAttribute('text-anchor', 'middle');
  treatingLabel.setAttribute('fill', '#e6b802');
  treatingLabel.setAttribute('font-size', '20');
  treatingLabel.setAttribute('font-weight', 'bold');
  treatingLabel.textContent = 'TREATING...';

  stage2.appendChild(treatingSite);
  stage2.appendChild(syringe);
  stage2.appendChild(treatingLabel);

  // Stage 3: Cleaned (Green)
  const stage3 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  stage3.setAttribute('id', 'stage-3');
  stage3.setAttribute('opacity', '0');

  const cleanSite = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  cleanSite.setAttribute('x', '80');
  cleanSite.setAttribute('y', '100');
  cleanSite.setAttribute('width', '240');
  cleanSite.setAttribute('height', '200');
  cleanSite.setAttribute('rx', '12');
  cleanSite.setAttribute('fill', '#252b30');
  cleanSite.setAttribute('stroke', '#899e2e');
  cleanSite.setAttribute('stroke-width', '4');

  const checkIcon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  checkIcon.setAttribute('x', '200');
  checkIcon.setAttribute('y', '210');
  checkIcon.setAttribute('text-anchor', 'middle');
  checkIcon.setAttribute('font-size', '48');
  checkIcon.textContent = '\u2705';

  const cleanLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  cleanLabel.setAttribute('x', '200');
  cleanLabel.setAttribute('y', '330');
  cleanLabel.setAttribute('text-anchor', 'middle');
  cleanLabel.setAttribute('fill', '#899e2e');
  cleanLabel.setAttribute('font-size', '20');
  cleanLabel.setAttribute('font-weight', 'bold');
  cleanLabel.textContent = 'CLEANED';

  stage3.appendChild(cleanSite);
  stage3.appendChild(checkIcon);
  stage3.appendChild(cleanLabel);

  // Stage 4: Active & Secure (Green with animated cursor)
  const stage4 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  stage4.setAttribute('id', 'stage-4');
  stage4.setAttribute('opacity', '0');

  const activeSite = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  activeSite.setAttribute('x', '80');
  activeSite.setAttribute('y', '100');
  activeSite.setAttribute('width', '240');
  activeSite.setAttribute('height', '200');
  activeSite.setAttribute('rx', '12');
  activeSite.setAttribute('fill', '#252b30');
  activeSite.setAttribute('stroke', '#899e2e');
  activeSite.setAttribute('stroke-width', '4');

  const shieldIcon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  shieldIcon.setAttribute('x', '200');
  shieldIcon.setAttribute('y', '210');
  shieldIcon.setAttribute('text-anchor', 'middle');
  shieldIcon.setAttribute('font-size', '48');
  shieldIcon.textContent = '\uD83D\uDEE1\uFE0F';

  const activeLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  activeLabel.setAttribute('x', '200');
  activeLabel.setAttribute('y', '330');
  activeLabel.setAttribute('text-anchor', 'middle');
  activeLabel.setAttribute('fill', '#899e2e');
  activeLabel.setAttribute('font-size', '20');
  activeLabel.setAttribute('font-weight', 'bold');
  activeLabel.textContent = 'SECURED';

  // Animated cursor
  const cursor = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  cursor.setAttribute('x', '250');
  cursor.setAttribute('y', '150');
  cursor.setAttribute('font-size', '24');
  cursor.setAttribute('class', 'animated-cursor');
  cursor.textContent = '\uD83D\uDC46';

  stage4.appendChild(activeSite);
  stage4.appendChild(shieldIcon);
  stage4.appendChild(activeLabel);
  stage4.appendChild(cursor);

  // Add all stages to SVG
  svg.appendChild(stage1);
  svg.appendChild(stage2);
  svg.appendChild(stage3);
  svg.appendChild(stage4);

  container.appendChild(svg);

  // Animation sequence (10 second loop)
  function animate() {
    setTimeout(() => { stage1.setAttribute('opacity', '1'); }, 0);
    setTimeout(() => { stage1.setAttribute('opacity', '0'); stage2.setAttribute('opacity', '1'); }, 2000);
    setTimeout(() => { stage2.setAttribute('opacity', '0'); stage3.setAttribute('opacity', '1'); }, 4000);
    setTimeout(() => { stage3.setAttribute('opacity', '0'); stage4.setAttribute('opacity', '1'); }, 6000);
    setTimeout(() => { stage4.setAttribute('opacity', '0'); animate(); }, 10000);
  }

  animate();

  // Add CSS animations
  const style = document.createElement('style');
  style.textContent = `
    #malware-animation g {
      transition: opacity 0.5s ease;
    }
    .malware-particle {
      animation: particle-float 2s ease-in-out infinite;
    }
    @keyframes particle-float {
      0%, 100% { transform: translate(0, 0); opacity: 0.6; }
      50% { transform: translate(10px, -10px); opacity: 1; }
    }
    .animated-cursor {
      animation: cursor-move 2s ease-in-out infinite;
    }
    @keyframes cursor-move {
      0%, 100% { transform: translate(0, 0); }
      25% { transform: translate(-20px, 20px); }
      50% { transform: translate(20px, -20px); }
      75% { transform: translate(-10px, -10px); }
    }
  `;
  document.head.appendChild(style);
}