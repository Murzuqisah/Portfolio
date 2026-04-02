/**
 * Project Filter Functionality
 * Enables filtering of projects by category with smooth animations
 */

document.addEventListener('DOMContentLoaded', function () {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      const filterValue = this.getAttribute('data-filter');

      // Update active button state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Filter projects with animation
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'block';
          card.classList.add('animate-fade-in');
          // Trigger reflow to restart animation
          void card.offsetWidth;
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});
