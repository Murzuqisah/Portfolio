// Image Carousel
let currentSlide = 0;
const images = document.querySelectorAll('.carousel-image');
const totalSlides = images.length;

function showSlide(index) {
    images.forEach(img => img.classList.remove('active'));
    images[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

document.querySelector('.carousel-btn.next')?.addEventListener('click', nextSlide);
document.querySelector('.carousel-btn.prev')?.addEventListener('click', prevSlide);

// Auto-advance carousel every 10 seconds
setInterval(nextSlide, 10000);

// Fetch GitHub README
async function fetchGitHubReadme() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/Murzuqisah/Murzuqisah/main/README.md');
        const markdown = await response.text();
        
        const container = document.getElementById('github-readme-content');
        if (container) {
            // Simple markdown to HTML conversion
            const html = markdown
                .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/\n/g, '<br>');
            
            container.innerHTML = html;
        }
    } catch (error) {
        console.error('Error fetching GitHub README:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchGitHubReadme);
