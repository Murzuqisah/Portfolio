// Image Carousel
let currentSlide = 0;
const images = document.querySelectorAll('.carousel-image');
const totalSlides = images.length;
let autoAdvanceInterval;

function showSlide(index) {
    images.forEach(img => img.classList.remove('active'));
    images[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Auto-advance: 3s on mobile, 10s on desktop
function startAutoAdvance() {
    const isMobile = window.innerWidth <= 768;
    const interval = isMobile ? 3000 : 10000;
    
    if (autoAdvanceInterval) clearInterval(autoAdvanceInterval);
    autoAdvanceInterval = setInterval(nextSlide, interval);
}

startAutoAdvance();
window.addEventListener('resize', startAutoAdvance);
