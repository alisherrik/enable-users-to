document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation toggle
  const toggle = document.querySelector('[data-testid="mobile-nav-toggle"]');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('open');
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Close mobile menu if open
        if (navLinks && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Active nav link highlighting on scroll
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');
  
  function highlightNav() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href').slice(1) === current) {
        item.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNav);
  highlightNav(); // Run once on load

  // IntersectionObserver for .reveal scroll animations
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // Staggered animation delays for feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });

  // GLM will implement all interactivity for: Primary CTA flow, Mobile navigation
});