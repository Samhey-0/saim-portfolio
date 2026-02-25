/**
 * Portfolio Website - JavaScript
 * Handles all interactive functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initCustomCursor();
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    initTypingEffect();
    initScrollAnimations();
    initNavbarScroll();
    initContactForm();
    initYear();
});

/**
 * Custom Cursor
 * Creates a custom cursor that follows mouse movement
 */
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (!cursor || !follower) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    function animateCursor() {
        // Direct cursor follow
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        
        // Smooth follower
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Add hover effect for links and buttons
    const interactiveElements = document.querySelectorAll('a, button, input, textarea');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

/**
 * Dark/Light Mode Toggle
 * Persists user preference in localStorage
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle?.querySelector('i');
    
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    // Apply theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Toggle click handler
    themeToggle?.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        if (!icon) return;
        
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

/**
 * Mobile Menu Toggle
 * Handles hamburger menu for mobile navigation
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;
    
    menuToggle?.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu?.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
    
    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            menuToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
}

/**
 * Smooth Scrolling
 * Enables smooth scroll for anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });
}

/**
 * Typing Effect
 * Animated typing for profession text in hero section
 */
function initTypingEffect() {
    const typedText = document.querySelector('.typed-text');
    if (!typedText) return;
    
    const professions = [
        'Full Stack Developer',
        'Web Designer',
        'UI/UX Enthusiast',
        'Problem Solver',
        'Tech Blogger'
    ];
    
    let professionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentProfession = professions[professionIndex];
        
        if (isDeleting) {
            typedText.textContent = currentProfession.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedText.textContent = currentProfession.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentProfession.length) {
            // Pause at end
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            professionIndex = (professionIndex + 1) % professions.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing
    setTimeout(type, 1000);
}

/**
 * Scroll Animations
 * Uses Intersection Observer for fade-in animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.project-card, .skill-item, .stat-item, .contact-item, .section-header'
    );
    
    // Add initial class
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });
    
    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Navbar Scroll Effect
 * Adds shadow and shrinks navbar on scroll
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Set active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const navHeight = navbar.offsetHeight;
            
            if (scrollY >= sectionTop - navHeight - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Contact Form Handler
 * Validates and handles form submission
 * Note: EmailJS integration ready - configure below
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const toast = document.getElementById('toast');
    const submitBtn = form?.querySelector('.btn-submit');
    
    if (!form) return;
    
    // EmailJS Configuration
    // Replace these with your EmailJS credentials
    const EMAILJS_CONFIG = {
        publicKey: 'YOUR_PUBLIC_KEY',
        serviceId: 'YOUR_SERVICE_ID',
        templateId: 'YOUR_TEMPLATE_ID'
    };
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate form
        if (!validateForm(form)) {
            return;
        }
        
        // Show loading state
        submitBtn?.classList.add('loading');
        
        try {
            // Option 1: Use EmailJS (uncomment and configure)
            /*
            const response = await emailjs.sendForm(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                form,
                EMAILJS_CONFIG.publicKey
            );
            */
            
            // Option 2: Simulate form submission (for demo)
            await simulateFormSubmission();
            
            // Show success toast
            showToast('success', 'Message sent successfully!');
            
            // Reset form
            form.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            showToast('error', 'Failed to send message. Please try again.');
        } finally {
            submitBtn?.classList.remove('loading');
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            // Clear error on input
            const formGroup = input.closest('.form-group');
            formGroup?.classList.remove('error');
        });
    });
    
    function validateForm(form) {
        const inputs = form.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function validateField(input) {
        const formGroup = input.closest('.form-group');
        const errorSpan = formGroup?.querySelector('.form-error');
        let isValid = true;
        let errorMessage = '';
        
        // Check required
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Check email format
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Check minimum length for message
        if (input.name === 'message' && input.value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters';
        }
        
        // Update UI
        if (formGroup) {
            if (isValid) {
                formGroup.classList.remove('error');
            } else {
                formGroup.classList.add('error');
            }
        }
        
        if (errorSpan) {
            errorSpan.textContent = errorMessage;
        }
        
        return isValid;
    }
    
    function simulateFormSubmission() {
        return new Promise((resolve) => {
            setTimeout(resolve, 1500);
        });
    }
    
    function showToast(type, message) {
        if (!toast) return;
        
        const icon = toast.querySelector('.toast-icon i');
        const title = toast.querySelector('.toast-title');
        const msg = toast.querySelector('.toast-message');
        
        if (type === 'success') {
            icon?.classList.remove('fa-times-circle');
            icon?.classList.add('fa-check-circle');
            title.textContent = 'Success!';
        } else {
            icon?.classList.remove('fa-check-circle');
            icon?.classList.add('fa-times-circle');
            title.textContent = 'Error!';
        }
        
        msg.textContent = message;
        
        // Show toast
        toast.classList.add('show');
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }
    
    // Close toast on button click
    const toastClose = toast?.querySelector('.toast-close');
    toastClose?.addEventListener('click', () => {
        toast.classList.remove('show');
    });
}

/**
 * Update Year
 * Automatically updates the copyright year
 */
function initYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Optional: Google Analytics (uncomment to enable)
 */
// window.addEventListener('load', () => {
//     // Add your Google Analytics tracking code here
// });

/**
 * Optional: Service Worker Registration (for PWA)
 */
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/sw.js')
//             .then(registration => {
//                 console.log('SW registered:', registration);
//             })
//             .catch(error => {
//                 console.log('SW registration failed:', error);
//             });
//     });
// }
