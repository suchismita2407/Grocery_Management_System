// main.js
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all modules
  if (typeof initNavbar === 'function') initNavbar();
  if (typeof initModals === 'function') initModals();
  if (typeof initCart === 'function') initCart();
  if (typeof initProfile === 'function') initProfile();
  if (typeof initProducts === 'function') initProducts();
  if (typeof initAuth === 'function') initAuth();
  if (typeof initSearch === 'function') initSearch();
  
  // Update cart count
  updateCartCount();
});

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = document.getElementById('cartCount');
  if (cartCount) {
      cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  }
}