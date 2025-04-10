document.addEventListener('DOMContentLoaded', function() {
    // Check for remembered user
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    if (rememberMe) {
        const savedCustomerId = localStorage.getItem('customerId');
        if (savedCustomerId) {
            document.getElementById('loginCustomerId').value = savedCustomerId;
            document.getElementById('rememberMe').checked = true;
        }
    }

    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const customerId = document.getElementById('loginCustomerId').value.trim();
            const password = document.getElementById('loginPassword').value.trim();
            const rememberMe = document.getElementById('rememberMe').checked;
            const errorElement = document.getElementById('loginError');
            
            // Reset error and validation
            errorElement.style.display = 'none';
            document.querySelectorAll('.form-control').forEach(el => {
                el.classList.remove('invalid');
                const feedback = el.nextElementSibling;
                if (feedback && feedback.classList.contains('invalid-feedback')) {
                    feedback.style.display = 'none';
                }
            });
            
            // Validate inputs
            let isValid = true;
            if (!customerId) {
                document.getElementById('loginCustomerId').classList.add('invalid');
                document.getElementById('loginCustomerId').nextElementSibling.style.display = 'block';
                isValid = false;
            }
            if (!password) {
                document.getElementById('loginPassword').classList.add('invalid');
                document.getElementById('loginPassword').nextElementSibling.style.display = 'block';
                isValid = false;
            }
            if (!isValid) return;
            
            // Get users from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            // Find user by Customer ID and Password
            const user = users.find(u => u.id === customerId && u.password === password);
            
            if (user) {
                // Set current user
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                // Remember user if checkbox is checked
                if (rememberMe) {
                    localStorage.setItem('rememberMe', 'true');
                    localStorage.setItem('customerId', customerId);
                } else {
                    localStorage.removeItem('rememberMe');
                    localStorage.removeItem('customerId');
                }
                
                // Redirect to home page
                window.location.href = 'index.html';
            } else {
                errorElement.textContent = 'Invalid Customer ID or Password';
                errorElement.style.display = 'block';
            }
        });
    }
    
    // Forgot password link
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('forgotPasswordModal').style.display = 'flex';
        });
    }
    
    // Forgot password form
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('forgotEmail').value.trim();
            const messageElement = document.getElementById('forgotPasswordMessage');
            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            // Reset validation and message
            document.getElementById('forgotEmail').classList.remove('invalid');
            document.getElementById('forgotEmail').nextElementSibling.style.display = 'none';
            messageElement.style.display = 'none';
            
            // Validate email
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                document.getElementById('forgotEmail').classList.add('invalid');
                document.getElementById('forgotEmail').nextElementSibling.style.display = 'block';
                return;
            }
            
            // Check if email exists
            const user = users.find(u => u.email === email);
            
            if (user) {
                // In a real app, you would send a reset link to the email
                messageElement.textContent = `Password reset link has been sent to ${email}`;
                messageElement.style.color = '#27ae60';
                messageElement.style.backgroundColor = '#e8f5e9';
                messageElement.style.display = 'block';
                
                // Hide the form
                forgotPasswordForm.style.display = 'none';
                
                // Close modal after 3 seconds
                setTimeout(() => {
                    document.getElementById('forgotPasswordModal').style.display = 'none';
                    forgotPasswordForm.style.display = 'block';
                    messageElement.style.display = 'none';
                    forgotPasswordForm.reset();
                }, 3000);
            } else {
                messageElement.textContent = 'No account found with this email address';
                messageElement.style.color = '#e74c3c';
                messageElement.style.backgroundColor = '#fdecea';
                messageElement.style.display = 'block';
            }
        });
    }
    
    // Modal close functionality
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.getElementById('forgotPasswordModal').style.display = 'none';
            document.getElementById('forgotPasswordForm').reset();
            document.getElementById('forgotPasswordMessage').style.display = 'none';
            document.getElementById('forgotPasswordForm').style.display = 'block';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.getElementById('forgotPasswordForm').reset();
            document.getElementById('forgotPasswordMessage').style.display = 'none';
            document.getElementById('forgotPasswordForm').style.display = 'block';
        }
    });
});