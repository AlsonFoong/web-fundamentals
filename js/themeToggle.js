document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // On initial page load, theme is handled by inline JS to prevent flash of inaccurate color theme:
    // <script>
    //     if (localStorage.getItem('theme') === 'dark') {
    //         document.documentElement.classList.add('dark-mode')
    //     }
    // </script>

    // Click to toggle
    themeToggle.addEventListener('click', function () {
        html.classList.toggle('dark-mode');
        localStorage.setItem('theme', html.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // Implement onboarding for first-time users

    const themeNotification = document.getElementById('theme-notification')
    const themeNotificationCancel = document.getElementById('theme-notification-cancel')
    const hasSeen = localStorage.getItem('hasSeenThemeNotification') === 'true'

    if (!hasSeen) {
        themeNotification.style.display = 'flex'
        themeNotificationCancel.addEventListener('click', (e) => {
            themeNotification.style.display = 'none'
            localStorage.setItem('hasSeenThemeNotification', true)
        }, { once: true })
    }
});