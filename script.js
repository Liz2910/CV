document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for saved user preference
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.setAttribute('data-theme', currentTheme);
        updateButtonIcon(currentTheme === 'dark');
    } else if (prefersDarkScheme.matches) {
        document.body.setAttribute('data-theme', 'dark');
        updateButtonIcon(true);
    }
    // Theme Toggle Logic
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeBtn.querySelector('i');

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark-mode') {
        body.classList.add('dark-mode');
        icon.classList.remove('la-moon');
        icon.classList.add('la-sun');
    } else if (!savedTheme && prefersDarkScheme.matches) { // If no saved theme and system prefers dark
        body.classList.add('dark-mode');
        icon.classList.remove('la-moon');
        icon.classList.add('la-sun');
        localStorage.setItem('theme', 'dark-mode');
    }


    themeBtn.addEventListener('click', () => {
        // Ripple Effect Trigger
        themeBtn.classList.remove('ripple-active'); // Reset
        void themeBtn.offsetWidth; // Trigger Reflow
        themeBtn.classList.add('ripple-active');

        body.classList.toggle('dark-mode');

        // Icon Switch with Wave
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('la-moon');
            icon.classList.add('la-sun');
            localStorage.setItem('theme', 'dark-mode');
            themeBtn.setAttribute('aria-label', 'Cambiar a modo claro');
        } else {
            icon.classList.remove('la-sun');
            icon.classList.add('la-moon');
            localStorage.setItem('theme', 'light-mode');
            themeBtn.setAttribute('aria-label', 'Cambiar a modo oscuro');
        }
    });

    // Scroll Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible-el');
                entry.target.classList.remove('hidden-el');
                observer.unobserve(entry.target); // Trigger once
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden-el');
    hiddenElements.forEach((el) => observer.observe(el));
});
