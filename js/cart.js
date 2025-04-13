// cart.js - Updated version
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart
    initializeCart();
    
    // Get modal and trigger elements
    const cartModal = document.getElementById('cartModal');
    const cartLink = document.getElementById('cartLink');
    const closeCartBtn = cartModal.querySelector('.close-btn');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    // Open cart modal when cart icon is clicked
    if (cartLink) {
        cartLink.addEventListener('click', function(e) {
            e.preventDefault();
            loadCartItems();
            cartModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close modal when X button is clicked
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', function() {
            cartModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside
    cartModal.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Handle checkout button click
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            checkout();
        });
    }
  });
  
  function initializeCart() {
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    updateCartCount();
  }
  
  function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        document.getElementById('checkoutBtn').disabled = true;
        return;
    }
    
    document.getElementById('checkoutBtn').disabled = false;
    
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
        
        // Add event listeners
        cartItem.querySelector('.decrease').addEventListener('click', () => updateQuantity(item.id, -1));
        cartItem.querySelector('.increase').addEventListener('click', () => updateQuantity(item.id, 1));
        cartItem.querySelector('.remove-item').addEventListener('click', () => removeItem(item.id));
    });
    
    updateCartSummary();
  }
  
  function updateQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        
        // Remove item if quantity reaches 0
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
        updateCartCount();
    }
  }
  
  function removeItem(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    updateCartCount();
  }
  
  function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.10; // 10% tax
    const total = subtotal + tax;
    
    document.getElementById('cartSubtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('cartTax').textContent = `₹${tax.toFixed(2)}`;
    document.getElementById('cartTotal').textContent = `₹${total.toFixed(2)}`;
  }
  
  function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) return;
    
    // Create order
    const order = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        items: cart,
        subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        tax: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.10,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.10
    };
    
    // Save order to history
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear cart
    localStorage.setItem('cart', JSON.stringify([]));
    updateCartCount();
    
    // Close cart modal
    document.getElementById('cartModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Show success modal
    showOrderSuccess(order);
  }
  
  function showOrderSuccess(order) {
    const orderSuccessModal = document.getElementById('orderSuccessModal');
    const orderDetails = document.getElementById('orderDetails');
    
    orderDetails.innerHTML = `
        <div class="order-summary">
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Date:</strong> ${order.date}</p>
            <p><strong>Total Items:</strong> ${order.items.reduce((total, item) => total + item.quantity, 0)}</p>
            <p><strong>Total Amount:</strong> ₹${order.total.toFixed(2)}</p>
        </div>
    `;
    
    orderSuccessModal.style.display = 'flex';
    
    // Close button
    document.getElementById('closeOrderSuccessBtn').addEventListener('click', function() {
        orderSuccessModal.style.display = 'none';
    });
    
    // Close when clicking outside
    orderSuccessModal.addEventListener('click', function(e) {
        if (e.target === orderSuccessModal) {
            orderSuccessModal.style.display = 'none';
        }
    });
  }
  
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
  }
