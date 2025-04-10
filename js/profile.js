// Profile functionality
document.addEventListener('DOMContentLoaded', () => {
    const editProfileBtn = document.getElementById('editProfileBtn');
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    const profileForm = document.getElementById('profileForm');
    const profileAddress = document.getElementById('profileAddress');
    const profileContact = document.getElementById('profileContact');
    
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', () => {
            profileAddress.disabled = false;
            profileContact.disabled = false;
            editProfileBtn.classList.add('d-none');
            saveProfileBtn.classList.remove('d-none');
        });
    }
    
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Validate contact
            if (!/^\d{10}$/.test(profileContact.value)) {
                alert('Contact number must be 10 digits');
                return;
            }
            
            // Validate address
            if (profileAddress.value.trim() === '') {
                alert('Address cannot be empty');
                return;
            }
            
            // Update user data
            const userIndex = users.findIndex(u => u.id === currentUser.id);
            if (userIndex !== -1) {
                users[userIndex].address = profileAddress.value;
                users[userIndex].contact = profileContact.value;
                localStorage.setItem('users', JSON.stringify(users));
                
                // Update current user
                currentUser.address = profileAddress.value;
                currentUser.contact = profileContact.value;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                
                // Disable fields
                profileAddress.disabled = true;
                profileContact.disabled = true;
                saveProfileBtn.classList.add('d-none');
                editProfileBtn.classList.remove('d-none');
                
                // Show success message
                alert('Profile updated successfully');
            }
        });
    }
});