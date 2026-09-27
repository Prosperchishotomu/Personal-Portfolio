/* ============================================================
   PORTFOLIO SCRIPT — Prosper Chishotomu
   ============================================================ */

// ── Navbar scroll effect ──────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Hamburger menu ────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    hamburger.setAttribute('aria-expanded', isOpen);
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Smooth scroll for anchor links ───────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 80; // navbar height buffer
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ── Active nav link on scroll ─────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const activeSectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinkEls.forEach(link => {
                link.classList.toggle(
                    'active',
                    link.getAttribute('href') === `#${id}`
                );
            });
        }
    });
}, { threshold: 0.35, rootMargin: '-60px 0px -40% 0px' });

sections.forEach(s => activeSectionObserver.observe(s));

// ── Scroll-reveal animation ───────────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, parseInt(delay));
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => {
    revealObserver.observe(el);
});

// ── Typed role animation ──────────────────────────────────────
const roles = [
    'Data Scientist',
    'ML Engineer',
    'IT Specialist',
    'Software Developer',
    'Cloud Architect',
    'Tech Consultant'
];

const typedEl   = document.getElementById('typed-role');
let roleIndex   = 0;
let charIndex   = 0;
let isDeleting  = false;
const SPEED_TYPE = 80;
const SPEED_DEL  = 45;
const PAUSE_END  = 1800;
const PAUSE_DEL  = 500;

function typeRole() {
    const current = roles[roleIndex];

    if (!isDeleting) {
        typedEl.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
            isDeleting = true;
            setTimeout(typeRole, PAUSE_END);
            return;
        }
    } else {
        typedEl.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            roleIndex  = (roleIndex + 1) % roles.length;
            setTimeout(typeRole, PAUSE_DEL);
            return;
        }
    }

    setTimeout(typeRole, isDeleting ? SPEED_DEL : SPEED_TYPE);
}

// Start after a short delay for visual polish
setTimeout(typeRole, 800);

// ── Animate stat numbers (count-up) ──────────────────────────
function countUp(el, target, suffix, duration = 1500) {
    const start = performance.now();
    const update = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNums = entry.target.querySelectorAll('.stat-num');
            const targets  = [3, 15, 10];
            const suffixes = ['+', '+', '+'];
            statNums.forEach((el, i) => countUp(el, targets[i], suffixes[i]));
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) statsObserver.observe(statsSection);

// ── Card tilt on mouse move (subtle) ─────────────────────────
function addTilt(selector) {
    document.querySelectorAll(selector).forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 6;
            const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -6;
            card.style.transform = `translateY(-5px) rotateX(${y}deg) rotateY(${x}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

addTilt('.skill-card, .cert-card, .project-card');

// ── Console greeting ──────────────────────────────────────────
console.log(
    '%c👋 Hey there! I\'m Prosper Chishotomu.\n%cFeel free to explore the code — built with care.',
    'color:#5b9cf6;font-size:16px;font-weight:700;',
    'color:#8a93a8;font-size:13px;'
);