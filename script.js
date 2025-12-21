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

    // Toggle theme
    toggleBtn.addEventListener('click', (e) => {
        let theme = document.body.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';

        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateButtonIcon(newTheme === 'dark');

        // Add ripple effect class
        toggleBtn.classList.add('active');
        setTimeout(() => toggleBtn.classList.remove('active'), 500);
    });

    function updateButtonIcon(isDark) {
        const icon = toggleBtn.querySelector('i');
        if (isDark) {
            icon.classList.remove('la-moon');
            icon.classList.add('la-sun');
            toggleBtn.setAttribute('aria-label', 'Cambiar a modo claro');
        } else {
            icon.classList.remove('la-sun');
            icon.classList.add('la-moon');
            toggleBtn.setAttribute('aria-label', 'Cambiar a modo oscuro');
        }
    }

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
