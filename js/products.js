// Products functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize product sections
    initializeProductSections();
    
    // Add to cart functionality
    document.addEventListener('click', (e) => {
      if (e.target.closest('.add-btn')) {
        const productCard = e.target.closest('.product-card');
        const productId = productCard.dataset.id;
        const productName = productCard.querySelector('h3').textContent;
        
        addToCart(productId);
        showToast(`${productName} added to cart`);
      }
    });
  });
  
  function initializeProductSections() {
    // Initialize each product section
    initializeProductSection('fruits-scroll', fruitProducts);
    initializeProductSection('vegetables-scroll', vegetableProducts);
    initializeProductSection('snacks-scroll', snackProducts);
    initializeProductSection('dairy-scroll', dairyProducts);
  }
  
  function initializeProductSection(containerId, products) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = products.map(product => `
      <div class="product-card" data-id="${product.id}">
        <div class="delivery-time">
          <i class="bi bi-clock"></i> 10 mins
        </div>
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="weight">${product.weight}</p>
        <div class="price-row">
          <span class="price">₹${product.price}</span>
          <button class="add-btn"><i class="bi bi-plus"></i></button>
        </div>
      </div>
    `).join('');
    
    // Initialize scrolling
    const section = container.closest('.products-section');
    const leftBtn = section.querySelector('.scroll-left');
    const rightBtn = section.querySelector('.scroll-right');
    
    leftBtn.style.display = 'none';
    rightBtn.style.display = container.scrollWidth > container.clientWidth ? 'flex' : 'none';
    
    leftBtn.addEventListener('click', () => {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    });
    
    rightBtn.addEventListener('click', () => {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    });
    
    container.addEventListener('scroll', () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      leftBtn.style.display = scrollLeft > 0 ? 'flex' : 'none';
      rightBtn.style.display = scrollLeft < (scrollWidth - clientWidth) ? 'flex' : 'none';
    });
  }
  
  function showToast(message) {
    const toast = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }