document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = themeBtn.querySelector('.theme-icon');
    const body = document.body;

    // Check for saved user preference in browser
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        themeIcon.innerText = '🌙';
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        const isLight = body.classList.contains('light-mode');
        themeIcon.innerText = isLight ? '🌙' : '☀';
        
        // Save the choice so it persists on refresh
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
});