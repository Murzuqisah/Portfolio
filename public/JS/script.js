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
