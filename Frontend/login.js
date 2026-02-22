document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent page refresh

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Strict validation to prevent single-character logins
    if (!email.includes('@') || !email.includes('.')) {
        alert("Please enter a valid email address.");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    // Success: Redirect to dashboard
    window.location.href = "dashboard.html";
});