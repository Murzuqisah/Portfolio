document.querySelector(".menu-toggle").addEventListener("click", function () {
  document.querySelector(".nav-links").classList.toggle("active");
  this.classList.toggle("active");
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Make project cards clickable
document.querySelectorAll('.project-card[href]').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', function(e) {
    if (!e.target.closest('a')) {
      window.open(this.getAttribute('href'), '_blank');
    }
  });
});
