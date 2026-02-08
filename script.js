document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // 1. THEME TOGGLE (Dark / Light)
    // ============================================
    const themeBtn = document.getElementById('theme-toggle');
    const icon = themeBtn.querySelector('i');
    const root = document.documentElement; // <html> element

    // Initialize: Saved → System → Light
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (saved === 'dark' || (!saved && prefersDark)) {
        setDark();
    } else {
        setLight();
    }

    themeBtn.addEventListener('click', () => {
        if (root.getAttribute('data-theme') === 'dark') {
            setLight();
        } else {
            setDark();
        }
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
    // 2. SCROLL REVEAL ANIMATIONS
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
    // 4. NAVBAR SHRINK ON SCROLL
    // ============================================
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.style.padding = '0.7rem 6%';
            navbar.style.boxShadow = 'var(--shadow-sm)';
        } else {
            navbar.style.padding = '1rem 6%';
            navbar.style.boxShadow = 'none';
        }
    });

    // ============================================
    // 5. ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 200) {
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
    // 6. PDF DOWNLOAD
    // ============================================
    const pdfBtn = document.getElementById('pdf-btn');
    if (pdfBtn) {
        pdfBtn.addEventListener('click', () => {
            window.print();
        });
    }
});