// ===== MAIN.JS =====

document.addEventListener('DOMContentLoaded', () => {

  // Hamburger toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
    });
    // Close on link click (mobile)
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
      });
    });
  }

  // Scroll: add shadow to navbar on scroll
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.style.boxShadow = window.scrollY > 10
        ? '0 4px 30px rgba(26,18,8,0.12)'
        : '0 2px 20px rgba(26,18,8,0.07)';
    });
  }

});
