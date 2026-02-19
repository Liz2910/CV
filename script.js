document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // 1. THEME TOGGLE (Dark / Light)
    // ============================================
    const themeBtn = document.getElementById('theme-toggle');
    const icon = themeBtn.querySelector('i');
    const root = document.documentElement;

    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (saved === 'dark' || (!saved && prefersDark)) {
        setDark();
    } else {
        setLight();
    }

    themeBtn.addEventListener('click', () => {
        root.getAttribute('data-theme') === 'dark' ? setLight() : setDark();
    });

    function setDark() {
        root.setAttribute('data-theme', 'dark');
        icon.classList.replace('la-moon', 'la-sun');
        localStorage.setItem('theme', 'dark');
        themeBtn.setAttribute('aria-label', 'Cambiar a modo claro');
    }

    function setLight() {
        root.removeAttribute('data-theme');
        icon.classList.replace('la-sun', 'la-moon');
        localStorage.setItem('theme', 'light');
        themeBtn.setAttribute('aria-label', 'Cambiar a modo oscuro');
    }

    // ============================================
    // 2. SCROLL REVEAL (IntersectionObserver)
    // ============================================
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible-el');
                }
            });
        },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.section').forEach(el => revealObserver.observe(el));

    // ============================================
    // 3. SMOOTH SCROLL FOR NAV LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // 4. OPTIMIZED SCROLL HANDLER (rAF throttle)
    // ============================================
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    let ticking = false;

    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar shrink
        if (scrollY > 80) {
            navbar.style.padding = '0.7rem 6%';
            navbar.style.boxShadow = 'var(--shadow-sm)';
        } else {
            navbar.style.padding = '1rem 6%';
            navbar.style.boxShadow = 'none';
        }

        // Active nav link
        let current = '';
        sections.forEach(section => {
            if (scrollY >= section.offsetTop - 200) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }, { passive: true });

    // ============================================
    // 5. PDF DOWNLOAD
    // ============================================
    const pdfBtn = document.getElementById('pdf-btn');
    if (pdfBtn) {
        pdfBtn.addEventListener('click', () => {
            window.print();
        });
    }
});