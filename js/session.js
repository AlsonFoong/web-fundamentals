document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('vividlyCurrentUser'));
    const loginLink = document.getElementById('login');

    if (currentUser && loginLink) {
        loginLink.textContent = `${currentUser.name} - Logout`;
        loginLink.href = '#';

        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('vividlyCurrentUser');
            window.location.href = './index.html';
        });
    }
});