// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
});

function animateFollower() {
  fx += (mx - fx) * 0.22;
  fy += (my - fy) * 0.22;
  follower.style.transform = `translate3d(${fx}px, ${fy}px, 0)`;
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, input, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('active'); follower.classList.add('active'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('active'); follower.classList.remove('active'); });
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ===== SCROLL REVEAL =====
const reveals = document.querySelectorAll(
  '.skill-category, .project-card, .info-card, .contact-card, .contact-form-wrap, .about-text, .availability-banner, .cert-card'
);
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => { el.classList.add('reveal'); observer.observe(el); });

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--text)' : '';
  });
});

// ===== CONTACT FORM =====
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  const btn = document.getElementById('send-btn');
  const orig = btn.textContent;
  btn.textContent = 'Message Sent! ✅';
  btn.style.background = 'var(--green)';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = orig;
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 3000);
});

// ===== TYPING EFFECT for hero badge =====
// Already static – no need

// ===== PARTICLE / SPARKLE on click =====
document.addEventListener('click', e => {
  const spark = document.createElement('div');
  spark.style.cssText = `
    position:fixed; left:${e.clientX}px; top:${e.clientY}px;
    width:6px; height:6px; background:var(--accent); border-radius:50%;
    pointer-events:none; z-index:9999;
    animation: sparkle 0.5s ease forwards;
  `;
  document.body.appendChild(spark);
  setTimeout(() => spark.remove(), 500);
});

const style = document.createElement('style');
style.textContent = `
  @keyframes sparkle {
    0%   { transform: scale(1) translate(0,0); opacity:1; }
    100% { transform: scale(0) translate(${Math.random()*60-30}px, ${Math.random()*60-30}px); opacity:0; }
  }
`;
document.head.appendChild(style);
