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
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
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
    // Reset animations when scrolling to hero
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
            // Reset image animation when back to top
            resetImageAnimation();
        }

        // Hide scroll indicator after scrolling
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Reset animations when navigating to hero
                if (this.getAttribute('href') === '#home') {
                    setTimeout(resetImageAnimation, 500);
                }
            }
        });
    });
}

// Reset image animation
function resetImageAnimation() {
    const imageWrapper = document.querySelector('.image-wrapper');
    if (imageWrapper) {
        // Force reset to normal state
        imageWrapper.style.animation = 'none';
        imageWrapper.style.transform = 'scale(1)';
        imageWrapper.style.boxShadow = '0 0 30px rgba(37, 99, 235, 0.3), 0 0 60px rgba(37, 99, 235, 0.1)';
        
        // Force reflow
        void imageWrapper.offsetWidth;
        
        // Restart animation after a short delay
        setTimeout(() => {
            imageWrapper.style.animation = 'imageGlow 4s ease-in-out infinite';
        }, 50);
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
