// Section scroll navigation
const sections = ['home', 'about', 'experience', 'contact'];
let currentSection = 0;

function scrollToSection(index) {
    if (index >= 0 && index < sections.length) {
        currentSection = index;
        document.getElementById(sections[index]).scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        updateDots();
    }
}

function updateDots() {
    document.querySelectorAll('.scroll-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSection);
    });
}

// Click navigation
document.querySelectorAll('.scroll-dot').forEach(dot => {
    dot.addEventListener('click', () => {
        const section = parseInt(dot.dataset.section);
        scrollToSection(section);
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        scrollToSection(currentSection + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        scrollToSection(currentSection - 1);
    }
});

// Update current section on scroll
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const scrollPos = window.scrollY + window.innerHeight / 2;
        sections.forEach((section, index) => {
            const element = document.getElementById(section);
            if (element) {
                const top = element.offsetTop;
                const bottom = top + element.offsetHeight;
                if (scrollPos >= top && scrollPos < bottom) {
                    currentSection = index;
                    updateDots();
                }
            }
        });
    }, 100);
});
