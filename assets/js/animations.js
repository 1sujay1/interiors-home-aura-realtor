// GSAP Animations
function initGSAPAnimations() {
    // Hero section animation
    gsap.from('.hero-content', {
        duration: 1.2,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        stagger: 0.2
    });

    // Animate service cards with stagger
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'back.out(1.4)'
        });
    });

    // Parallax effect for hero background
    gsap.to('.hero-bg', {
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        y: 100,
        scale: 1.05,
        ease: 'none'
    });

    // Text reveal animation
    gsap.utils.toArray('.reveal-text').forEach(text => {
        gsap.from(text, {
            scrollTrigger: {
                trigger: text,
                toggleActions: 'play none none none'
            },
            y: '100%',
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });
}

// Initialize counter animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        
        const updateCount = () => {
            const currentCount = +counter.innerText.replace(/,/g, '');
            
            if (currentCount < target) {
                counter.innerText = Math.ceil(currentCount + step).toLocaleString();
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        
        // Start counting when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                observer.unobserve(counter);
            }
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Add hover effect to all interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effect to cards
    const cards = document.querySelectorAll('.card, .service-card, .gallery-item');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Add shine effect
            const shine = card.querySelector('.shine') || document.createElement('div');
            if (!card.querySelector('.shine')) {
                shine.className = 'shine';
                shine.style.position = 'absolute';
                shine.style.top = '0';
                shine.style.left = '0';
                shine.style.width = '100%';
                shine.style.height = '100%';
                shine.style.background = 'linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)';
                shine.style.opacity = '0';
                shine.style.transition = 'opacity 0.3s';
                card.style.position = 'relative';
                card.style.overflow = 'hidden';
                card.appendChild(shine);
            }
            
            shine.style.opacity = '0.7';
            shine.style.left = `${x - 100}px`;
            shine.style.top = `${y - 100}px`;
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                shine.style.opacity = '0';
            });
        });
    });
    
    // Initialize animations
    initGSAPAnimations();
    initCounterAnimations();
    
    // Add smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 80,
                        autoKill: true
                    },
                    ease: 'power2.inOut'
                });
            }
        });
    });
});
