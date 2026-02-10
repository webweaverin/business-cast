/**
 * Modern Business Website Script
 * Handles dynamic content, navigation, and interactions (no third-party libs)
 */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. Data Objects for Dynamic Content
       ========================================= */
    const featuresData = [
        {
            icon: 'fa-rocket',
            title: 'Fast Performance',
            desc: 'Optimized code and assets ensuring your site loads in milliseconds, keeping users engaged.'
        },
        {
            icon: 'fa-mobile-alt',
            title: 'Fully Responsive',
            desc: 'Looks perfect on all devices, from large desktop monitors to the smallest mobile screens.'
        },
        {
            icon: 'fa-shield-alt',
            title: 'Secure & Reliable',
            desc: 'Built with security best practices to protect your data and provide 99.9% uptime.'
        },
        {
            icon: 'fa-chart-line',
            title: 'SEO Optimized',
            desc: 'Strategic markup and structure to help you rank higher on search engines.'
        }
    ];

    const servicesData = [
        {
            icon: 'fa-code',
            title: 'Web Development',
            desc: 'Custom websites built from scratch to meet your specific business needs.'
        },
        {
            icon: 'fa-bullhorn',
            title: 'Digital Marketing',
            desc: 'Targeted campaigns to reach your audience and convert leads into customers.'
        },
        {
            icon: 'fa-paint-brush',
            title: 'UI/UX Design',
            desc: 'Beautiful, intuitive interfaces that provide an exceptional user experience.'
        },
        {
            icon: 'fa-cogs',
            title: 'Maintenance',
            desc: 'Ongoing support and updates to keep your digital assets running smoothly.'
        }
    ];

    /* =========================================
       2. Dynamic Rendering Functions
       ========================================= */
    const renderCards = (containerId, data) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        data.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'card reveal-bottom';
            // Add staggering delay for nice effect
            card.style.transitionDelay = `${index * 0.1}s`;
            
            card.innerHTML = `
                <div class="card-icon">
                    <i class="fas ${item.icon}"></i>
                </div>
                <h3 class="card-title">${item.title}</h3>
                <p class="card-desc">${item.desc}</p>
            `;
            container.appendChild(card);
        });
    };

    renderCards('features-container', featuresData);
    renderCards('services-container', servicesData);

    /* =========================================
       3. Navbar & Sticky Logic
       ========================================= */
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    // Sticky Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        highlightActiveLink();
    });

    // Mobile Menu Toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu on link click
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        });
    });

    // Active Link Highlighting
    const highlightActiveLink = () => {
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };

    /* =========================================
       4. Typing Animation
       ========================================= */
    const typingText = document.querySelector('.typing-text');
    const words = ["Solutions", "Strategies", "Success", "Growth"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeWriter() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Faster deleting
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150; // Normal typing
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before next word
        }

        setTimeout(typeWriter, typeSpeed);
    }
    
    // Start typing animation
    typeWriter();

    /* =========================================
       5. Scroll Reveal Animation
       ========================================= */
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-bottom');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    /* =========================================
       6. Animated Counters
       ========================================= */
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const startCounters = () => {
        const statsSection = document.querySelector('.hero-stats');
        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight;

        if (sectionPos < screenPos && !hasCounted) {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const increment = target / 100;
                
                const updateCounter = () => {
                    const count = +counter.innerText;
                    if(count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
            });
            hasCounted = true;
        }
    };

    window.addEventListener('scroll', startCounters);

    /* =========================================
       7. Form Validation & Submission
       ========================================= */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple Validation
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        let isValid = true;

        if (name.value.trim() === '') {
            setError(name, 'Name is required');
            isValid = false;
        } else {
            setSuccess(name);
        }

        if (email.value.trim() === '') {
            setError(email, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            setError(email, 'Provide a valid email address');
            isValid = false;
        } else {
            setSuccess(email);
        }

        if (message.value.trim() === '') {
            setError(message, 'Message is required');
            isValid = false;
        } else {
            setSuccess(message);
        }

        if (isValid) {
            // Simulate AJAX request
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'Message Sent!';
                btn.style.background = '#2ecc71';
                formStatus.innerHTML = '<p style="color: #2ecc71; margin-top: 10px;">Thank you! Your message has been sent successfully.</p>';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.style.background = ''; // Revert to CSS
                    formStatus.innerHTML = '';
                    // Clear success styles
                    const formGroups = contactForm.querySelectorAll('.form-group');
                    formGroups.forEach(group => group.classList.remove('success'));
                }, 4000);
            }, 1500);
        }
    });

    function setError(input, message) {
        const formGroup = input.parentElement;
        const small = formGroup.querySelector('small');
        small.innerText = message;
        formGroup.className = 'form-group error';
        input.style.borderColor = '#e74c3c';
    }

    function setSuccess(input) {
        const formGroup = input.parentElement;
        const small = formGroup.querySelector('small');
        small.innerText = '';
        formGroup.className = 'form-group success';
        input.style.borderColor = '#2ecc71';
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    /* =========================================
       8. Dark Mode Toggle
       ========================================= */
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check local storage or system preference
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDark.matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.querySelector('i').classList.remove('fa-moon');
        themeToggle.querySelector('i').classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.querySelector('i').classList.remove('fa-sun');
            themeToggle.querySelector('i').classList.add('fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.querySelector('i').classList.remove('fa-moon');
            themeToggle.querySelector('i').classList.add('fa-sun');
        }
    });

});
