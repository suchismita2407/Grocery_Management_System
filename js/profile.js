// profile.js
document.addEventListener('DOMContentLoaded', function() {
    const profileModal = document.getElementById('profileModal');
    const profileLink = document.getElementById('profileLink');
    const closeProfileBtn = document.getElementById('closeProfileBtn');
    const editProfileBtn = document.getElementById('editProfileBtn');
    const viewOrdersBtn = document.getElementById('viewOrdersBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const backToProfileBtn = document.getElementById('backToProfileBtn');
    const profileForm = document.getElementById('profileForm');
    
    const profileView = document.getElementById('profileView');
    const editProfileView = document.getElementById('editProfileView');
    const orderHistoryView = document.getElementById('orderHistoryView');
    
    // Open profile modal
    if (profileLink) {
        profileLink.addEventListener('click', function(e) {
            e.preventDefault();
            loadProfileData();
            profileView.style.display = 'block';
            editProfileView.style.display = 'none';
            orderHistoryView.style.display = 'none';
            profileModal.style.display = 'flex';
        });
    }
    
    // Close modal
    if (closeProfileBtn) {
        closeProfileBtn.addEventListener('click', function() {
            profileModal.style.display = 'none';
        });
    }
    
    // Edit profile button
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            profileView.style.display = 'none';
            editProfileView.style.display = 'block';
            loadProfileForm();
        });
    }
    
    // View orders button
    if (viewOrdersBtn) {
        viewOrdersBtn.addEventListener('click', function() {
            profileView.style.display = 'none';
            orderHistoryView.style.display = 'block';
            loadOrderHistory();
        });
    }
    
    // Cancel edit button
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', function() {
            editProfileView.style.display = 'none';
            profileView.style.display = 'block';
        });
    }
    
    // Back to profile button
    if (backToProfileBtn) {
        backToProfileBtn.addEventListener('click', function() {
            orderHistoryView.style.display = 'none';
            profileView.style.display = 'block';
        });
    }
    
    // Profile form submission
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveProfileData();
        });
    }
    
    // Load profile data to display
    function loadProfileData() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === currentUser.email) || {};
        
        document.getElementById('profileNameDisplay').textContent = user.name || 'Not set';
        document.getElementById('profileEmailDisplay').textContent = user.email || 'Not set';
        document.getElementById('profileAddressDisplay').textContent = user.address || 'Not set';
        document.getElementById('profilePhoneDisplay').textContent = user.phone || 'Not set';
    }
    
    // Load profile data into form
    function loadProfileForm() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === currentUser.email) || {};
        
        document.getElementById('profileName').value = user.name || '';
        document.getElementById('profileEmail').value = user.email || '';
        document.getElementById('profileAddress').value = user.address || '';
        document.getElementById('profilePhone').value = user.phone || '';
    }
    
    // Save profile data
    function saveProfileData() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
        let users = JSON.parse(localStorage.getItem('users')) || [];
        
        const updatedUser = {
            name: document.getElementById('profileName').value,
            email: document.getElementById('profileEmail').value,
            address: document.getElementById('profileAddress').value,
            phone: document.getElementById('profilePhone').value,
            password: currentUser.password // Keep the same password
        };
        
        // Update users array
        users = users.map(u => u.email === currentUser.email ? updatedUser : u);
        
        // Update current user
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        localStorage.setItem('users', JSON.stringify(users));
        
        // Show success message
        alert('Profile updated successfully!');
        
        // Return to profile view
        editProfileView.style.display = 'none';
        profileView.style.display = 'block';
        loadProfileData();
    }
    
    // Load order history
    function loadOrderHistory() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const userOrders = orders.filter(order => order.userEmail === currentUser.email);
        const orderHistoryList = document.getElementById('orderHistoryList');
        
        orderHistoryList.innerHTML = '';
        
        if (userOrders.length === 0) {
            orderHistoryList.innerHTML = '<p>No orders found.</p>';
            return;
        }
        
        userOrders.forEach(order => {
            const orderItem = document.createElement('div');
            orderItem.className = 'order-item';
            
            const orderHeader = document.createElement('div');
            orderHeader.className = 'order-header';
            
            const orderId = document.createElement('span');
            orderId.textContent = `Order #${order.id}`;
            
            const orderDate = document.createElement('span');
            orderDate.className = 'order-date';
            orderDate.textContent = new Date(order.date).toLocaleDateString();
            
            const orderTotal = document.createElement('span');
            orderTotal.className = 'order-total';
            orderTotal.textContent = `₹${order.total.toFixed(2)}`;
            
            orderHeader.appendChild(orderId);
            orderHeader.appendChild(orderDate);
            orderHeader.appendChild(orderTotal);
            
            const orderProducts = document.createElement('div');
            orderProducts.className = 'order-products';
            orderProducts.textContent = `${order.items.length} items`;
            
            orderItem.appendChild(orderHeader);
            orderItem.appendChild(orderProducts);
            
            orderHistoryList.appendChild(orderItem);
        });
    }
});