// Time Update
function updateTime() {
    const now = new Date();
    document.getElementById('current-time').textContent = 
        now.toLocaleTimeString('en-US', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    document.getElementById('current-year').textContent = now.getFullYear();
}

// Update time every second
updateTime();
setInterval(updateTime, 1000);

// Scroll handler
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav-container');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});