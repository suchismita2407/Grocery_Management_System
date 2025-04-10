// Main application initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart count
    updateCartCount();
    
    // Check if user is logged in
    checkAuthState();
  });
  
  function checkAuthState() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const welcomeMessage = document.getElementById('welcomeMessage');
    
    if (currentUser && welcomeMessage) {
      welcomeMessage.textContent = `Welcome back, ${currentUser.name}!`;
    }
  }
  
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const cartCount = document.getElementById('cartCount');
    
    if (cartCount && currentUser) {
      const userCart = cart[currentUser.id] || [];
      const totalItems = userCart.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.textContent = totalItems;
    }
  }