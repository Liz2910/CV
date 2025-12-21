document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved user preference, if any, on load of the website
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme) {
        document.body.setAttribute('data-theme', currentTheme);
        updateButtonIcon(currentTheme === 'dark');
    } else if (prefersDarkScheme.matches) {
        document.body.setAttribute('data-theme', 'dark');
        updateButtonIcon(true);
    }

    // Toggle theme
    toggleBtn.addEventListener('click', () => {
        let theme = document.body.getAttribute('data-theme');
        if (theme === 'dark') {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            updateButtonIcon(false);
        } else {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateButtonIcon(true);
        }
    });

    function updateButtonIcon(isDark) {
        toggleBtn.textContent = isDark ? '☀️' : '🌙';
        toggleBtn.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    }
});
