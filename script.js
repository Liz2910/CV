document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle Logic
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeBtn.querySelector('i');

    // System preference check
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    // Initialize Theme (Saved > System > Default Light)
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark-mode') {
        enableDarkMode();
    } else if (!savedTheme && prefersDarkScheme.matches) {
        enableDarkMode();
    }

    // Toggle Click Event
    themeBtn.addEventListener('click', () => {
        // Ripple Effect
        themeBtn.classList.remove('ripple-active');
        void themeBtn.offsetWidth; // Trigger Reflow
        themeBtn.classList.add('ripple-active');

        // Logic
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    function enableDarkMode() {
        body.classList.add('dark-mode');
        icon.classList.remove('la-moon');
        icon.classList.add('la-sun');
        localStorage.setItem('theme', 'dark-mode');
        themeBtn.setAttribute('aria-label', 'Cambiar a modo claro');
    }

    function disableDarkMode() {
        body.classList.remove('dark-mode');
        icon.classList.remove('la-sun');
        icon.classList.add('la-moon');
        localStorage.setItem('theme', 'light-mode');
        themeBtn.setAttribute('aria-label', 'Cambiar a modo oscuro');
    }

    // 2. Scroll Animations (Optional - CSS now defaults to visible)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible-el');
            }
        });
    });

    document.querySelectorAll('.hidden-el').forEach(el => observer.observe(el));
});
