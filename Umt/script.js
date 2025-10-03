// Initialize particles.js
particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#00ffff" },
      shape: { type: "circle" },
      opacity: {
        value: 0.5,
        random: true,
        anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
      },
      size: {
        value: 3,
        random: true,
        anim: { enable: true, speed: 40, size_min: 0.1, sync: false }
      },
      line_linked: { enable: true, distance: 150, color: "#00ffff", opacity: 0.4, width: 1 },
      move: { enable: true, speed: 6, random: true, out_mode: "out" }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
        resize: true
      },
      modes: {
        repulse: { distance: 200, duration: 0.4 },
        push: { particles_nb: 4 }
      }
    },
    retina_detect: true
  });
  
  // Register GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  
  // Animate hero content
  gsap.from(".hero-content", { opacity: 0, y: 100, duration: 1.5, ease: "power3.out" });
  
  // Animate parallax background on scroll
  gsap.to(".parallax-bg", {
    yPercent: 50,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });
  
  // Animate skill cards as they enter view
  gsap.utils.toArray(".skill-card").forEach((card) => {
    gsap.from(card, { opacity: 0, y: 50, duration: 0.8, scrollTrigger: { trigger: card, start: "top 80%" } });
  });
  
  // Animate project cards as they enter view
  gsap.utils.toArray(".project-card").forEach((card) => {
    gsap.from(card, { opacity: 0, y: 50, duration: 0.8, scrollTrigger: { trigger: card, start: "top 80%" } });
  });
  
  // Smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
    });
  });
  
  // Initialize VanillaTilt for elements with data-tilt attribute
  VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.5
  });
  
  // Glitch effect for hero text
  const glitchElement = document.querySelector(".glitch");
  setInterval(() => {
    glitchElement.classList.add("glitch-effect");
    setTimeout(() => {
      glitchElement.classList.remove("glitch-effect");
    }, 200);
  }, 3000);
  
  // Animate skill progress bars
  gsap.utils.toArray(".skill-progress-bar").forEach((bar) => {
    gsap.to(bar, {
      width: bar.dataset.progress + "%",
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: { trigger: bar, start: "top 80%" }
    });
  });
  
  // Custom cursor animation
  const cursor = document.querySelector(".custom-cursor");
  document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
  });
  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("cursor-hover"));
  });
  
  // Animate paragraphs in the about section
  gsap.utils.toArray(".about-text p").forEach((text) => {
    gsap.from(text, { opacity: 0, y: 20, duration: 1, scrollTrigger: { trigger: text, start: "top 80%" } });
  });
  
  // Optionally animate section titles
  gsap.utils.toArray(".section-title").forEach((title) => {
    gsap.from(title, { backgroundSize: "0 3px", duration: 1, scrollTrigger: { trigger: title, start: "top 80%" } });
  });
  