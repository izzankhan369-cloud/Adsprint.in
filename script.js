// ================================
// CUSTOM GLOWING CURSOR
// ================================

const cursorGlow = document.querySelector('.cursor-glow');
const cursorDot = document.querySelector('.cursor-dot');
let mouseX = 0;
let mouseY = 0;
let glowX = 0;
let glowY = 0;
let dotX = 0;
let dotY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // Smooth follow for glow
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    
    // Direct follow for dot
    dotX += (mouseX - dotX) * 0.15;
    dotY += (mouseY - dotY) * 0.15;
    
    if (cursorGlow) {
        cursorGlow.style.transform = `translate(${glowX - 20}px, ${glowY - 20}px)`;
    }
    
    if (cursorDot) {
        cursorDot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
    }
    
    requestAnimationFrame(animateCursor);
}

if (window.innerWidth > 768) {
    animateCursor();
}

// Grow cursor on interactive elements
const interactives = document.querySelectorAll('a, button, .tilt-card, .btn');

interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursorGlow) cursorGlow.classList.add('grow');
    });
    
    el.addEventListener('mouseleave', () => {
        if (cursorGlow) cursorGlow.classList.remove('grow');
    });
});

// ================================
// SCROLL PROGRESS BAR
// ================================

function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / scrollHeight) * 100;
    
    if (scrollProgress) {
        scrollProgress.style.width = scrolled + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);

// ================================
// NAVBAR SCROLL EFFECT
// ================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ================================
// MOBILE MENU TOGGLE
// ================================

const mobileToggle = document.querySelector('.mobile-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMobileMenu() {
    mobileToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}

if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
}

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active')) {
        if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            toggleMobileMenu();
        }
    }
});

// ================================
// SMOOTH SCROLL
// ================================

const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href === '#') return;
        
        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// 3D TILT EFFECT FOR CARDS
// ================================

const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', handleTilt);
    card.addEventListener('mouseleave', resetTilt);
});

function handleTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    card.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(1.02, 1.02, 1.02)
    `;
}

function resetTilt(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
}

// ================================
// INTERSECTION OBSERVER - FADE IN
// ================================

const fadeElements = document.querySelectorAll('.fade-section');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(el => fadeObserver.observe(el));

// ================================
// COUNTER ANIMATION FOR STATS
// ================================

const statNumbers = document.querySelectorAll('.stat-number');
let hasCounterAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasCounterAnimated) {
            hasCounterAnimated = true;
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

function animateCounters() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
                
                // Add suffix based on stat
                if (target === 100) {
                    stat.textContent = target + '%';
                }
            }
        };
        
        updateCounter();
    });
}

// ================================
// PARALLAX EFFECT
// ================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
    
    const sphere = document.querySelector('.sphere');
    if (sphere) {
        sphere.style.transform = `translateY(${scrolled * 0.15}px) rotateZ(${scrolled * 0.05}deg)`;
    }
});

// ================================
// ACTIVE NAV LINK
// ================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNav);

// ================================
// PERFORMANCE MONITORING
// ================================

window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ Adsprint loaded in ${Math.round(loadTime)}ms`);
    
    if (loadTime > 1000) {
        console.warn('Load time exceeded 1 second');
    }
});

// Core Web Vitals tracking
if ('PerformanceObserver' in window) {
    // LCP
    try {
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {}
    
    // FID
    try {
        const fidObserver = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {}
    
    // CLS
    try {
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            });
            console.log('CLS:', clsValue);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {}
}

// ================================
// REDUCED MOTION SUPPORT
// ================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--transition', 'none');
    document.documentElement.style.setProperty('--transition-bounce', 'none');
    
    document.querySelectorAll('[class*="float"]').forEach(el => {
        el.style.animation = 'none';
    });
}

// ================================
// KEYBOARD ACCESSIBILITY
// ================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
});

// ================================
// CONSOLE BRANDING
// ================================

console.log('%c⚡ Adsprint', 'font-size: 28px; font-weight: bold; background: linear-gradient(135deg, #06b6d4, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cWhere Imagination Meets Innovation', 'font-size: 14px; color: #cbd5e1;');
console.log('%cFounded by Izzan • Goa, India', 'font-size: 12px; color: #64748b;');
console.log('%cWhatsApp: +91 90493 28327', 'font-size: 12px; color: #06b6d4;');

// ================================
// INITIALIZATION
// ================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('✓ Adsprint initialized');
    updateScrollProgress();
    highlightNav();
});
