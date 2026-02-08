document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // 1. Theme Toggle Logic (Dark/Light Mode)
    // ============================================
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeBtn.querySelector('i');

    // Check system preference
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    // Initialize Theme (Priority: Saved > System > Default Light)
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark-mode') {
        enableDarkMode();
    } else if (!savedTheme && prefersDarkScheme.matches) {
        enableDarkMode();
    }

    // Toggle Click Event
    themeBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    function enableDarkMode() {
        body.classList.add('dark-mode');
        body.setAttribute('data-theme', 'dark');
        icon.classList.remove('la-moon');
        icon.classList.add('la-sun');
        localStorage.setItem('theme', 'dark-mode');
        themeBtn.setAttribute('aria-label', 'Cambiar a modo claro');
    }

    function disableDarkMode() {
        body.classList.remove('dark-mode');
        body.removeAttribute('data-theme');
        icon.classList.remove('la-sun');
        icon.classList.add('la-moon');
        localStorage.setItem('theme', 'light-mode');
        themeBtn.setAttribute('aria-label', 'Cambiar a modo oscuro');
    }

    // ============================================
    // 2. Smooth Scroll Animations
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible-el');
            }
        });
    }, observerOptions);

    // Observe all elements with hidden-el class
    document.querySelectorAll('.hidden-el').forEach(el => observer.observe(el));

    // ============================================
    // 3. Smooth Scrolling for Navigation Links
    // ============================================
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
            }
        });
    });

    // ============================================
    // 4. Navbar Scroll Effect
    // ============================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.padding = '0.8rem 6%';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.padding = '1.2rem 6%';
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // ============================================
    // 5. Print PDF Functionality Enhancement
    // ============================================
    const printButton = document.querySelector('button[onclick*="print"]');
    if (printButton) {
        printButton.addEventListener('click', (e) => {
            e.preventDefault();

            // Temporarily remove animations for cleaner print
            document.body.style.animation = 'none';

            setTimeout(() => {
                window.print();
                // Restore after print dialog
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 100);
            }, 100);
        });
    }

    // ============================================
    // 6. Dynamic Year in Footer
    // ============================================
    const footer = document.querySelector('footer p');
    if (footer) {
        const currentYear = new Date().getFullYear();
        footer.innerHTML = footer.innerHTML.replace('2026', currentYear);
    }

    // ============================================
    // 7. Add Active State to Navigation
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
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

    // ============================================
    // 8. Console Easter Egg
    // ============================================
    console.log('%c¡Hola Developer! 👋', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%c¿Buscando algo interesante? Contáctame: lmcg2910@gmail.com', 'color: #764ba2; font-size: 14px;');
});
