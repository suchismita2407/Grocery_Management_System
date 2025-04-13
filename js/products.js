// products.js - Updated version
document.addEventListener('DOMContentLoaded', function() {
  // Load products for each category
  loadProductsByCategory('fruits', 'fruits-scroll');
  loadProductsByCategory('vegetables', 'vegetables-scroll');
  loadProductsByCategory('dairy', 'dairy-scroll');
  loadProductsByCategory('snacks', 'snacks-scroll');
  
  // Initialize cart
  initializeCart();
});

function loadProductsByCategory(category, containerId) {
  const products = getProductsByCategory(category);
  const container = document.getElementById(containerId);
  
  if (!container) return;
  
  container.innerHTML = '';
  
  products.forEach(product => {
      const productCard = createProductCard(product);
      container.appendChild(productCard);
  });
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
      <div class="delivery-time">
          <i class="fas fa-clock"></i> Delivery in ${product.deliveryTime}
      </div>
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <div class="weight">${product.weight}</div>
      <div class="price-row">
          <span class="price">₹${product.price}</span>
          <button class="add-btn" data-id="${product.id}">
              <i class="fas fa-plus"></i>
          </button>
      </div>
  `;
  
  // Add event listener to add button
  const addBtn = card.querySelector('.add-btn');
  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addToCart(product);
  });
  
  return card;
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
      existingItem.quantity += 1;
  } else {
      cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
      });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  showNotification(`${product.name} added to cart`);
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById('cartCount').textContent = count;
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.innerHTML = `
      <div class="notification-content">
          <i class="fas fa-check-circle"></i>
          <span>${message}</span>
      </div>
  `;
  
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => {
      notification.classList.add('show');
  }, 10);
  
  // Hide after 3 seconds
  setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
          document.body.removeChild(notification);
      }, 300);
  }, 3000);
}
