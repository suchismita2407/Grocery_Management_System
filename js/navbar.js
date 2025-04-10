// Navbar functionality
document.addEventListener('DOMContentLoaded', () => {
    const navbarToggler = document.getElementById('navbarToggler');
    const navbarMenu = document.getElementById('navbarMenu');
    
    if (navbarToggler && navbarMenu) {
      navbarToggler.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
      });
    }
    
    // Profile and cart links
    const profileLink = document.getElementById('profileLink');
    const cartLink = document.getElementById('cartLink');
    const logoutLink = document.getElementById('logoutLink');
    
    profileLink?.addEventListener('click', (e) => {
      e.preventDefault();
      if (!checkAuth()) return;
      openModal('profileModal');
    });
    
    cartLink?.addEventListener('click', (e) => {
      e.preventDefault();
      if (!checkAuth()) return;
      openModal('cartModal');
      updateCartDisplay();
    });
    
    logoutLink?.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('currentUser');
      window.location.href = 'login.html';
    });
  });
  
  function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      window.location.href = 'login.html';
      return false;
    }
    return true;
  }