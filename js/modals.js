// Modal functionality
document.addEventListener('DOMContentLoaded', () => {
    // Close modals when clicking close button
    document.querySelectorAll('.modal-close').forEach(btn => {
      btn.addEventListener('click', () => {
        closeModal(btn.closest('.modal').id);
      });
    });
    
    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal.id);
        }
      });
    });
  });
  
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
      
      // Load profile data if profile modal
      if (modalId === 'profileModal') {
        loadProfileData();
      }
    }
  }
  
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  }
  
  function loadProfileData() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      document.getElementById('profileName').value = currentUser.name || '';
      document.getElementById('profileAddress').value = currentUser.address || '';
      document.getElementById('profileContact').value = currentUser.contact || '';
    }
  }