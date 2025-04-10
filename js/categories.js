document.addEventListener('DOMContentLoaded', function() {
    // Load categories section
    fetch('components/categories.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('categories-section').innerHTML = html;
            initCategories();
        });

    function initCategories() {
        const categories = [
            { name: 'Fruits', image: 'images/fruits.jpg' },
            { name: 'Vegetables', image: 'images/vegetables.jpg' },
            { name: 'Dairy', image: 'images/dairy.jpg' },
            { name: 'Bakery', image: 'images/bakery.jpg' },
            { name: 'Snacks', image: 'images/snacks.jpg' },
            { name: 'Beverages', image: 'images/beverages.jpg' },
            { name: 'Household', image: 'images/household.jpg' }
        ];

        const categoriesScroll = document.querySelector('.categories-scroll');
        if (categoriesScroll) {
            categoriesScroll.innerHTML = categories.map(category => `
                <div class="category-card">
                    <img src="${category.image}" alt="${category.name}">
                    <h3>${category.name}</h3>
                </div>
            `).join('');

            initCategoryScrolling();
        }
    }

    function initCategoryScrolling() {
        const scrollContainer = document.querySelector('.categories-scroll');
        const scrollLeftBtn = document.querySelector('.scroll-left');
        const scrollRightBtn = document.querySelector('.scroll-right');
        
        if (scrollContainer && scrollLeftBtn && scrollRightBtn) {
            const scrollAmount = 180; // Width of one card plus gap
            
            scrollLeftBtn.style.display = 'none';
            scrollRightBtn.style.display = scrollContainer.scrollWidth > scrollContainer.clientWidth ? 'flex' : 'none';
            
            scrollLeftBtn.addEventListener('click', () => {
                scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                updateScrollButtons();
            });
            
            scrollRightBtn.addEventListener('click', () => {
                scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                updateScrollButtons();
            });
            
            function updateScrollButtons() {
                const scrollLeft = scrollContainer.scrollLeft;
                const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
                
                scrollLeftBtn.style.display = scrollLeft > 0 ? 'flex' : 'none';
                scrollRightBtn.style.display = scrollLeft < maxScroll - 1 ? 'flex' : 'none';
            }
            
            scrollContainer.addEventListener('scroll', updateScrollButtons);
        }
    }
});