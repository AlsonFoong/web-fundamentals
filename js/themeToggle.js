document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // On initial page load, theme is handled by inline JS to prevent flash of inaccurate color theme:
    // <script>
    //     if (localStorage.getItem('theme') === 'dark') {
    //         document.documentElement.classList.add('dark-mode')
    //     }
    // </script>

    // Click to toggle
    themeToggle.addEventListener('click', function() {
        html.classList.toggle('dark-mode');
        localStorage.setItem('theme', html.classList.contains('dark-mode') ? 'dark' : 'light');
    });
});