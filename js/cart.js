// Cart functionality
document.addEventListener('DOMContentLoaded', () => {
    // Checkout button
    document.getElementById('checkoutBtn')?.addEventListener('click', checkout);
  });
  
  function addToCart(productId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    if (!cart[currentUser.id]) {
      cart[currentUser.id] = [];
    }
    
    const existingItem = cart[currentUser.id].find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart[currentUser.id].push({
        productId,
        quantity: 1
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  }
  
  function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTax = document.getElementById('cartTax');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const userCart = cart[currentUser.id] || [];
    
    if (userCart.length === 0) {
      emptyCartMessage.style.display = 'block';
      cartItemsContainer.innerHTML = '';
      checkoutBtn.disabled = true;
      return;
    }
    
    emptyCartMessage.style.display = 'none';
    
    let itemsHTML = '';
    let subtotal = 0;
    
    userCart.forEach(item => {
      const product = [...fruitProducts, ...vegetableProducts, ...snackProducts, ...dairyProducts]
        .find(p => p.id === item.productId);
      
      if (product) {
        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;
        
        itemsHTML += `
          <div class="cart-item">
            <img src="${product.image}" alt="${product.name}" class="cart-item-img">
            <div class="cart-item-details">
              <h4 class="cart-item-title">${product.name}</h4>
              <p class="cart-item-price">₹${product.price} each</p>
            </div>
            <div class="cart-item-actions">
              <button class="decrease-quantity" data-id="${product.id}">-</button>
              <input type="text" class="quantity-input" value="${item.quantity}" data-id="${product.id}" readonly>
              <button class="increase-quantity" data-id="${product.id}">+</button>
              <button class="remove-item" data-id="${product.id}">
                <i class="bi bi-trash"></i>
              </button>
            </div>
            <div class="cart-item-total">₹${itemTotal.toFixed(2)}</div>
          </div>
        `;
      }
    });
    
    cartItemsContainer.innerHTML = itemsHTML;
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.increase-quantity').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = e.target.dataset.id;
        updateCartItemQuantity(productId, 1);
      });
    });
    
    document.querySelectorAll('.decrease-quantity').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = e.target.dataset.id;
        updateCartItemQuantity(productId, -1);
      });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = e.target.closest('button').dataset.id;
        removeCartItem(productId);
      });
    });
    
    // Calculate totals
    const tax = subtotal * 0.10;
    const total = subtotal + tax;
    
    cartSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
    cartTax.textContent = `₹${tax.toFixed(2)}`;
    cartTotal.textContent = `₹${total.toFixed(2)}`;
    checkoutBtn.disabled = false;
  }
  
  function updateCartItemQuantity(productId, change) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    const item = cart[currentUser.id]?.find(item => item.productId === productId);
    
    if (item) {
      item.quantity += change;
      
      if (item.quantity <= 0) {
        removeCartItem(productId);
        return;
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartDisplay();
      updateCartCount();
    }
  }
  
  function removeCartItem(productId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    cart[currentUser.id] = cart[currentUser.id]?.filter(item => item.productId !== productId);
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
  }
  
  function checkout() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    const userCart = cart[currentUser.id] || [];
    
    if (userCart.length === 0) return;
    
    // Create order
    const orderId = 'ORD-' + Date.now();
    const orderDate = new Date().toISOString();
    
    let subtotal = 0;
    const orderItems = [];
    
    userCart.forEach(item => {
      const product = [...fruitProducts, ...vegetableProducts, ...snackProducts, ...dairyProducts]
        .find(p => p.id === item.productId);
      
      if (product) {
        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;
        
        orderItems.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          total: itemTotal
        });
      }
    });
    
    const tax = subtotal * 0.10;
    const total = subtotal + tax;
    
    const order = {
      orderId,
      userId: currentUser.id,
      items: orderItems,
      subtotal,
      tax,
      total,
      date: orderDate,
      status: 'completed'
    };
    
    // Save order
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear cart
    delete cart[currentUser.id];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show order success
    const orderDetails = document.getElementById('orderDetails');
    orderDetails.innerHTML = `
      <div class="order-details">
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Date:</strong> ${new Date(orderDate).toLocaleString()}</p>
        <p><strong>Total:</strong> ₹${total.toFixed(2)}</p>
        <h4 class="order-items-title">Order Items:</h4>
        <ul class="order-items-list">
          ${orderItems.map(item => `
            <li class="order-item">
              <span>${item.name} x ${item.quantity}</span>
              <span>₹${item.total.toFixed(2)}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
    
    closeModal('cartModal');
    openModal('orderSuccessModal');
  }