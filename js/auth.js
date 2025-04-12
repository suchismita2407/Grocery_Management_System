// auth.js
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser && window.location.pathname !== '/login.html') {
        window.location.href = 'login.html';
    }
    
    // Display user name if logged in
    if (currentUser) {
        const profileLink = document.getElementById('profileLink');
        if (profileLink) {
            profileLink.textContent = currentUser.name || 'My Profile';
        }
    }
    
    // Logout functionality
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
    }
});