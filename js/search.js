// search.js
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (!searchTerm) return;
        
        // Get all products from your products data
        const products = getAllProducts(); // You'll need to implement this function
        
        const results = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.category.toLowerCase().includes(searchTerm)
        );
        
        displaySearchResults(results);
    }
    
    function getAllProducts() {
        // This should return all products from your data source
        // For now, we'll return an empty array - you'll need to implement this
        // based on how your products are stored (maybe from products-data.js)
        return [];
    }
    
    function displaySearchResults(results) {
        // Create a modal or section to display search results
        const searchResultsModal = document.createElement('div');
        searchResultsModal.className = 'modal';
        searchResultsModal.id = 'searchResultsModal';
        searchResultsModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Search Results for "${searchInput.value}"</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div id="searchResultsContainer" class="products-container">
                        ${results.length > 0 ? 
                            results.map(product => createProductCard(product)).join('') :
                            '<p>No products found matching your search.</p>'
                        }
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(searchResultsModal);
        searchResultsModal.style.display = 'flex';
        
        // Close button functionality
        const closeBtn = searchResultsModal.querySelector('.close-btn');
        closeBtn.addEventListener('click', function() {
            searchResultsModal.style.display = 'none';
            document.body.removeChild(searchResultsModal);
        });
    }
    
    function createProductCard(product) {
        return `
            <div class="product-card">
                <div class="delivery-time">
                    <i class="fas fa-clock"></i> Delivery in 30 mins
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
            </div>
        `;
    }
});