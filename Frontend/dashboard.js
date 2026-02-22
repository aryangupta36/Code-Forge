// Simple Login Redirect Logic
const loginButton = document.querySelector('.login-card .sign-in-btn');
if (loginButton) {
    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        // Validate inputs before redirecting
        const email = document.querySelector('input[type="email"]').value;
        if (email.includes('@')) {
            window.location.href = 'dashboard.html';
        } else {
            alert("Please enter a valid email address.");
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved user preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
        themeToggle.textContent = '🌙'; // Set to moon if light mode
    }

    themeToggle.addEventListener('click', () => {
        // Toggle the class on body
        body.classList.toggle('light-mode');

        // Update the icon and save preference
        if (body.classList.contains('light-mode')) {
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            themeToggle.textContent = '☀';
            localStorage.setItem('theme', 'dark');
        }
    });
});