// DOM Elements
const navbar = document.querySelector('.navbar');
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const skillCategories = document.querySelectorAll('.skill-category');
const skillsGroups = document.querySelectorAll('.skills-group');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.querySelector('.contact-form');
const scrollIndicator = document.querySelector('.scroll-indicator');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeNavigation();
    initializeSkills();
    initializeProjects();
    initializeContactForm();
    initializeScrollEffects();
    initializeTypingEffect();
});

// Navigation functionality
function initializeNavigation() {
    // Check if elements exist
    if (!hamburger || !navMenu || !navLinks) {
        console.error('Navigation elements not found');
        return;
    }
    
    // Mobile menu toggle
    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Add body scroll lock
        document.body.classList.toggle('nav-open');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Get the target href
            const targetHref = link.getAttribute('href');
            const target = document.querySelector(targetHref);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                
                // Reset all animations before scroll
                resetAllAnimations();
                
                // Close mobile menu
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
                
                // Force smooth scroll to target
                setTimeout(() => {
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });
    
    // Active link highlighting
    setActiveNavLink();
    window.addEventListener('scroll', setActiveNavLink);
}

function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

// Scroll effects
function initializeScrollEffects() {
    // Performance optimization for mobile
    let isScrolling = false;
    let scrollTimeout;
    let ticking = false;
    
    // Use requestAnimationFrame for smooth scroll
    function updateScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
            resetImageAnimation();
        }

        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    }, { passive: true, capture: false });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                
                // Reset all animations before scroll
                resetAllAnimations();
                
                // Force smooth scroll with multiple methods
                try {
                    // Method 1: Modern browsers
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth',
                        block: 'start'
                    });
                } catch (error) {
                    // Method 2: Fallback with polyfill
                    const startPosition = window.pageYOffset;
                    const targetPosition = offsetTop;
                    const distance = targetPosition - startPosition;
                    const duration = 1200; // Slightly longer for smoother
                    
                    let startTime = null;
                    
                    function smoothScroll(currentTime) {
                        if (startTime === null) startTime = currentTime;
                        
                        const timeElapsed = currentTime - startTime;
                        const progress = Math.min(timeElapsed / duration, 1);
                        
                        // Use easeInOutCubic for smoother animation
                        const easeProgress = progress < 0.5
                            ? 4 * progress * progress * progress
                            : 1 - Math.pow(-2 * progress + 2, 2);
                        
                        const currentPosition = startPosition + (distance * easeProgress);
                        window.scrollTo(0, currentPosition);
                        
                        if (progress < 1) {
                            requestAnimationFrame(smoothScroll);
                        } else {
                            // Scroll completed, restart animations
                            setTimeout(() => {
                                resetImageAnimation();
                            }, 200);
                        }
                    }
                    
                    requestAnimationFrame(smoothScroll);
                }
            }
        });
    });
}

// Reset all animations
function resetAllAnimations() {
    const imageWrapper = document.querySelector('.image-wrapper');
    const heroElements = document.querySelectorAll('.hero-subtitle, .hero-title, .hero-description, .hero-buttons');
    
    if (imageWrapper) {
        // Force reset image to normal state
        imageWrapper.style.animation = 'none';
        imageWrapper.style.transform = 'scale(1) rotate(0deg)';
        imageWrapper.style.boxShadow = '0 0 20px rgba(37, 99, 235, 0.2)';
        imageWrapper.style.opacity = '1';
        
        // Force reflow
        void imageWrapper.offsetWidth;
    }
    
    // Reset text animations
    heroElements.forEach(element => {
        element.style.animation = 'none';
        element.style.opacity = '0';
        element.style.transform = 'none';
        element.style.visibility = 'hidden';
    });
    
    // Restart animations after a short delay
    setTimeout(() => {
        // Restart image animation
        if (imageWrapper) {
            const isMobile = window.innerWidth <= 768;
            if (!isMobile) {
                imageWrapper.style.animation = 'imageGlow 4s ease-in-out infinite';
                imageWrapper.style.boxShadow = '0 0 30px rgba(37, 99, 235, 0.3), 0 0 60px rgba(37, 99, 235, 0.1)';
            }
        }
        
        // Restart text animations
        heroElements[0].style.animation = 'fadeInUp 0.8s ease forwards';
        heroElements[0].style.animationDelay = '0.2s';
        heroElements[0].style.opacity = '1';
        heroElements[0].style.visibility = 'visible';
        
        heroElements[1].style.animation = 'fadeInUp 0.8s ease forwards';
        heroElements[1].style.animationDelay = '0.4s';
        heroElements[1].style.opacity = '1';
        heroElements[1].style.visibility = 'visible';
        
        heroElements[2].style.animation = 'fadeInUp 0.8s ease forwards';
        heroElements[2].style.animationDelay = '0.6s';
        heroElements[2].style.opacity = '1';
        heroElements[2].style.visibility = 'visible';
        
        heroElements[3].style.animation = 'fadeInUp 0.8s ease forwards';
        heroElements[3].style.animationDelay = '0.8s';
        heroElements[3].style.opacity = '1';
        heroElements[3].style.visibility = 'visible';
        
        heroElements[4].style.animation = 'fadeInUp 0.8s ease forwards';
        heroElements[4].style.animationDelay = '1s';
        heroElements[4].style.opacity = '1';
        heroElements[4].style.visibility = 'visible';
    }, 100);
}

// Reset image animation
function resetImageAnimation() {
    const imageWrapper = document.querySelector('.image-wrapper');
    const isMobile = window.innerWidth <= 768;
    
    if (imageWrapper) {
        // Force reset to normal state
        imageWrapper.style.animation = 'none';
        imageWrapper.style.transform = 'scale(1) rotate(0deg)';
        imageWrapper.style.boxShadow = isMobile 
            ? '0 0 20px rgba(37, 99, 235, 0.2)'
            : '0 0 30px rgba(37, 99, 235, 0.3), 0 0 60px rgba(37, 99, 235, 0.1)';
        
        // Force reflow
        void imageWrapper.offsetWidth;
        
        // Only restart animation on desktop
        if (!isMobile) {
            setTimeout(() => {
                imageWrapper.style.animation = 'imageGlow 4s ease-in-out infinite';
            }, 50);
        }
    }
}

// Contact form
function initializeContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name') || this.querySelector('input[type="text"]').value,
                email: formData.get('email') || this.querySelector('input[type="email"]').value,
                subject: formData.get('subject') || this.querySelector('input[placeholder="Subjek"]').value,
                message: formData.get('message') || this.querySelector('textarea').value
            };
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading"></span> Mengirim...';
            submitBtn.disabled = true;
            
            // Simulate form submission (static)
            setTimeout(() => {
                showMessage('Pesan Anda telah berhasil dikirim! Saya akan segera menghubungi Anda.', 'success');
                this.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Log form data (untuk development)
                console.log('Form submitted:', data);
            }, 2000);
        });
    }
}

// Skills functionality
function initializeSkills() {
    skillCategories.forEach(category => {
        category.addEventListener('click', () => {
            const targetCategory = category.dataset.category;
            
            // Update active category
            skillCategories.forEach(cat => cat.classList.remove('active'));
            category.classList.add('active');
            
            // Show corresponding skills group
            skillsGroups.forEach(group => {
                group.classList.remove('active');
                if (group.id === `${targetCategory}-skills`) {
                    group.classList.add('active');
                    animateSkillBars(group);
                }
            });
        });
    });

    // Animate skill bars on page load
    animateSkillBars(document.querySelector('.skills-group.active'));
}

// Projects functionality
function initializeProjects() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                    animateProjectCard(card);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

function animateProjectCard(card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.5s ease-out';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
}

// Contact form
function initializeContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name') || this.querySelector('input[type="text"]').value,
                email: formData.get('email') || this.querySelector('input[type="email"]').value,
                subject: formData.get('subject') || this.querySelector('input[placeholder="Subjek"]').value,
                message: formData.get('message') || this.querySelector('textarea').value
            };
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading"></span> Mengirim...';
            submitBtn.disabled = true;
            
            try {
                // Static form submission (simulation)
                console.log('Form data:', data);
                
                // Simulate API call
                setTimeout(() => {
                    showMessage('Pesan Anda telah berhasil dikirim! Saya akan segera menghubungi Anda.', 'success');
                    this.reset();
                }, 1500);
                
            } catch (error) {
                console.error('Error:', error);
                showMessage('Terjadi kesalahan. Silakan coba lagi.', 'error');
            } finally {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message`;
    messageDiv.textContent = message;
    
    contactForm.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Animations on scroll
function initializeAnimations() {
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

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.section-header, .about-content, .skills-content, .projects-grid, .contact-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
}

// Typing effect for hero title
function initializeTypingEffect() {
    const titleElement = document.querySelector('.title-highlight');
    if (titleElement) {
        const text = titleElement.textContent;
        titleElement.textContent = '';
        titleElement.style.borderRight = '2px solid var(--primary-color)';
        
        let index = 0;
        const typeInterval = setInterval(() => {
            if (index < text.length) {
                titleElement.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    titleElement.style.borderRight = 'none';
                }, 1000);
            }
        }, 80);
    }
}

// Parallax effect for hero section
function initializeParallax() {
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.2;
            hero.style.transform = `translateY(${parallax}px)`;
        });
    }
}

// Mouse move effect for hero image
function initializeMouseMoveEffect() {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = heroImage.getBoundingClientRect();
            const x = (clientX - left) / width - 0.5;
            const y = (clientY - top) / height - 0.5;
            
            heroImage.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
        });
        
        document.addEventListener('mouseleave', () => {
            heroImage.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        });
    }
}

// Particle background effect - disabled for cleaner design
function createParticles() {
    // Disabled for cleaner, more professional look
    return;
}

// Theme toggle (optional feature)
function initializeThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        z-index: 999;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-theme')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    });
}

// Performance optimization - Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handlers
const debouncedScrollHandler = debounce(() => {
    setActiveNavLink();
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Initialize additional effects
initializeParallax();
initializeMouseMoveEffect();
createParticles();
// initializeThemeToggle(); // Uncomment to enable theme toggle

// Console welcome message
console.log('%c🚀 Portfolio Website Loaded Successfully!', 'color: #4F46E5; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with ❤️ using HTML, CSS, and JavaScript', 'color: #F59E0B; font-size: 14px;');
