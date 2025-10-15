document.addEventListener('DOMContentLoaded', function () {
  // Particles.js initialization
  if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#ffffff' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false },
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } },
      },
      retina_detect: true,
    });
  }

  // GSAP animations with ScrollTrigger
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animations
    gsap.from('.hero-content h1', { duration: 1, y: 50, opacity: 0, ease: 'power3.out', delay: 0.2 });
    gsap.from('.hero-content p', { duration: 1, y: 30, opacity: 0, ease: 'power3.out', delay: 0.5 });
    gsap.from('.cta-button', { duration: 1, y: 20, opacity: 0, ease: 'power3.out', delay: 0.8 });

    // Staggered section animations
    const sections = gsap.utils.toArray('.section');
    sections.forEach((section, i) => {
      // Set initial state for all elements within the section
      const childElements = section.querySelectorAll(
        '.section-title, .about-content > *, .skills-grid > *, .projects-grid > *, .contact-grid > *, .download-cv-btn, .cta-button, #additional-resources .projects-grid > *'
      );
      gsap.set(childElements, { opacity: 0, y: 50, visibility: 'hidden' });

      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(childElements, {
            opacity: 1,
            y: 0,
            visibility: 'visible',
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
          });
        },
        onLeaveBack: () => {
          gsap.to(childElements, {
            opacity: 0,
            y: 50,
            visibility: 'hidden',
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.in',
          });
        },
        once: false,
      });
    });

    // Skill progress bars animation
    const progressBars = gsap.utils.toArray('.skill-progress-bar');
    progressBars.forEach((bar) => {
      ScrollTrigger.create({
        trigger: bar,
        start: 'top 90%',
        onEnter: () => {
          const progress = bar.dataset.progress;
          gsap.to(bar, {
            width: progress + '%',
            duration: 1.5,
            ease: 'power2.out',
          });
        },
        once: true,
      });
    });
  }

  // Vanilla Tilt initialization
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.skill-card, .project-card'), {
      max: 15,
      speed: 400,
      glare: true,
      'max-glare': 0.2,
    });
  }

  // Custom cursor
  const cursor = document.querySelector('.custom-cursor');
  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .skill-card, .project-card').forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Search functionality (if a search bar exists)
  const searchBar = document.getElementById('search-bar');
  if (searchBar) {
    const searchableCards = document.querySelectorAll('.project-card, .skill-card'); // Add other card types if needed

    searchBar.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      searchableCards.forEach((card) => {
        const title = card.querySelector('.project-title, .skill-title')?.textContent.toLowerCase() || '';
        const description = card.querySelector('.project-description, .skill-description')?.textContent.toLowerCase() || '';
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
});
