document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Open/Close Controls
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const burgerTop = document.getElementById('burger-top');
    const burgerMid = document.getElementById('burger-mid');
    const burgerBot = document.getElementById('burger-bot');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMobileMenu = () => {
        const isOpen = !mobileMenu.classList.contains('hidden');
        if (isOpen) {
            // Close mobile menu animation
            mobileMenu.classList.add('scale-y-95', 'opacity-0');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 150);
            
            // Revert burger icon lines
            burgerTop.classList.remove('rotate-45', 'translate-y-2');
            burgerMid.classList.remove('opacity-0');
            burgerBot.classList.remove('-rotate-45', '-translate-y-2');
        } else {
            // Open mobile menu animation
            mobileMenu.classList.remove('hidden');
            setTimeout(() => {
                mobileMenu.classList.remove('scale-y-95', 'opacity-0');
            }, 10);
            
            // Transform burger icon into 'X'
            burgerTop.classList.add('rotate-45', 'translate-y-2');
            burgerMid.classList.add('opacity-0');
            burgerBot.classList.add('-rotate-45', '-translate-y-2');
        }
    };

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Close mobile menu whenever a menu link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                toggleMobileMenu();
            }
        });
    });

    // 2. Sticky Header shadow and spacing adjustment on scroll
    const header = document.getElementById('sticky-header');
    const handleScrollHeader = () => {
        if (window.scrollY > 40) {
            header.classList.add('shadow-md', 'h-16');
            header.classList.remove('h-20');
        } else {
            header.classList.remove('shadow-md', 'h-16');
            header.classList.add('h-20');
        }
    };
    
    window.addEventListener('scroll', handleScrollHeader);
    handleScrollHeader(); // Run on startup in case page load is pre-scrolled

    // 3. Intersection Observer for fade-in and slide scroll reveals
    const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-fade-in, .reveal-slide-left, .reveal-slide-right');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                // Once element is shown, we unobserve it
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // 4. Scrollspy - Highlight active nav links on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const updateActiveNavLink = () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 200; // offset to trigger active state earlier

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentSectionId}`) {
                link.classList.add('text-brand-600', 'after:w-full');
                link.classList.remove('text-slate-600');
            } else {
                link.classList.remove('text-brand-600', 'after:w-full');
                link.classList.add('text-slate-600');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Run on startup

    // 5. Contact Form Simulation & Feedback
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('form-name').value;
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;
            
            // Loading State
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch animate-spin"></i> <span>Sending Order...</span>`;
            
            setTimeout(() => {
                // Success State
                submitBtn.classList.remove('bg-brand-600', 'hover:bg-brand-700');
                submitBtn.classList.add('bg-emerald-600');
                submitBtn.innerHTML = `<i class="fa-solid fa-check"></i> <span>Order Received, ${name}!</span>`;
                
                // Clear Form Fields
                contactForm.reset();
                
                // Revert to original state after 3 seconds
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('bg-emerald-600');
                    submitBtn.classList.add('bg-brand-600', 'hover:bg-brand-700');
                    submitBtn.innerHTML = originalContent;
                }, 3000);
            }, 1200);
        });
    }
});
