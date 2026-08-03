document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
        html.classList.add('dark-mode');
    }

    // Click to toggle
    themeToggle.addEventListener('click', function() {
        html.classList.toggle('dark-mode');
        localStorage.setItem('theme', html.classList.contains('dark-mode') ? 'dark' : 'light');
    });
});