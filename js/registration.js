// Replace your entire registration.js with this code
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    
    if (registrationForm) {
        // Add event listeners for form submission
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields before submission
            const isNameValid = validateName(document.getElementById('name'));
            const isEmailValid = validateEmail(document.getElementById('email'));
            const isPasswordValid = validatePassword(document.getElementById('password'));
            const isAddressValid = validateAddress(document.getElementById('address'));
            const isContactValid = validateContact(document.getElementById('contact'));
            
            if (isNameValid && isEmailValid && isPasswordValid && isAddressValid && isContactValid) {
                // All validations passed - proceed with registration
                registerUser();
            }
        });
    }
    
    // Modal close functionality
    const closeModalBtn = document.getElementById('closeModalBtn');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            document.getElementById('registrationSuccessModal').style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
});

// Validation functions
function validateName(input) {
    const nameRegex = /^[A-Za-z ]+$/;
    const isValid = nameRegex.test(input.value.trim());
    toggleValidationFeedback(input, isValid);
    return isValid;
}

function validateEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(input.value.trim());
    toggleValidationFeedback(input, isValid);
    return isValid;
}

function validatePassword(input) {
    // At least one uppercase, one number, one special char, min 8 chars
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    const isValid = passwordRegex.test(input.value);
    toggleValidationFeedback(input, isValid);
    return isValid;
}

function validateAddress(input) {
    const isValid = input.value.trim().length > 0;
    toggleValidationFeedback(input, isValid);
    return isValid;
}

function validateContact(input) {
    const contactRegex = /^[0-9]{10}$/;
    const isValid = contactRegex.test(input.value.trim());
    toggleValidationFeedback(input, isValid);
    return isValid;
}

function toggleValidationFeedback(input, isValid) {
    if (isValid) {
        input.classList.remove('invalid');
        input.nextElementSibling.style.display = 'none';
    } else {
        input.classList.add('invalid');
        input.nextElementSibling.style.display = 'block';
    }
}

function registerUser() {
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const address = document.getElementById('address').value.trim();
    const contact = document.getElementById('contact').value.trim();
    
    // Generate customer ID (simple implementation)
    const customerId = 'CUST' + Math.floor(1000 + Math.random() * 9000);
    
    // Create user object
    const user = {
        id: customerId,
        name: name,
        email: email,
        password: password,
        address: address,
        contact: contact
    };
    
    // Get existing users or initialize empty array
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if email already exists
    const emailExists = users.some(u => u.email === email);
    if (emailExists) {
        alert('This email is already registered. Please use a different email.');
        return;
    }
    
    // Add new user
    users.push(user);
    
    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    // Show registration details in modal
    const detailsDiv = document.getElementById('registrationDetails');
    detailsDiv.innerHTML = `
        <p><strong>Customer ID:</strong> ${customerId}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Contact:</strong> ${contact}</p>
    `;
    
    // Show success modal
    document.getElementById('registrationSuccessModal').style.display = 'flex';
    
    // Reset form
    document.getElementById('registrationForm').reset();
}