// cart.js
document.addEventListener('DOMContentLoaded', function() {
  // Get modal and trigger elements
  const cartModal = document.getElementById('cartModal');
  const cartLink = document.getElementById('cartLink');
  const closeCartBtn = cartModal.querySelector('.close-btn');
  
  // Open cart modal when cart icon is clicked
  if (cartLink) {
      cartLink.addEventListener('click', function(e) {
          e.preventDefault();
          loadCartItems();
          cartModal.style.display = 'flex';
          document.body.style.overflow = 'hidden'; // Prevent scrolling
      });
  }
  
  // Close modal when X button is clicked
  if (closeCartBtn) {
      closeCartBtn.addEventListener('click', function() {
          cartModal.style.display = 'none';
          document.body.style.overflow = 'auto'; // Re-enable scrolling
      });
  }
  
  // Close modal when clicking outside
  cartModal.addEventListener('click', function(e) {
      if (e.target === cartModal) {
          cartModal.style.display = 'none';
          document.body.style.overflow = 'auto';
      }
  });
  
  // Initialize cart
  initializeCart();
});

function initializeCart() {
  // Create empty cart if it doesn't exist
  if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]));
  }
  updateCartCount();
}

function loadCartItems() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  
  // Clear existing items
  cartItemsContainer.innerHTML = '';
  
  if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
          <div class="empty-cart">
              <i class="fas fa-shopping-cart"></i>
              <p>Your cart is empty</p>
          </div>
      `;
      return;
  }
  
  // Add each cart item to the modal
  cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
          <img src="${item.image}" alt="${item.name}">
          <div class="item-details">
              <h4>${item.name}</h4>
              <div class="item-price">₹${item.price}</div>
              <div class="item-quantity">
                  <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                  <span class="quantity">${item.quantity}</span>
                  <button class="quantity-btn increase" data-id="${item.id}">+</button>
              </div>
          </div>
          <button class="remove-item" data-id="${item.id}">
              <i class="fas fa-trash"></i>
          </button>
      `;
      cartItemsContainer.appendChild(cartItem);
      
      // Add event listeners for quantity buttons
      cartItem.querySelector('.decrease').addEventListener('click', () => updateQuantity(item.id, -1));
      cartItem.querySelector('.increase').addEventListener('click', () => updateQuantity(item.id, 1));
      cartItem.querySelector('.remove-item').addEventListener('click', () => removeItem(item.id));
  });
  
  updateCartSummary();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById('cartCount').textContent = count;
}