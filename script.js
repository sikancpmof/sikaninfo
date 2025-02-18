// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Project Cards Animation
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Discord Widget Integration
window.onload = function() {
    const discordContainer = document.getElementById('discord-widget-container');
    const iframe = document.createElement('iframe');
    iframe.src = 'https://discord.com/widget?id=YOUR_DISCORD_SERVER_ID&theme=dark';
    iframe.width = '100%';
    iframe.height = '300';
    iframe.frameBorder = '0';
    iframe.sandbox = 'allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts';
    discordContainer.appendChild(iframe);
};

// Lazy Loading for Images
document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll('img');
    const imageOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px 50px 0px"
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src; // Trigger load
                imageObserver.unobserve(img);
            }
        });
    }, imageOptions);

    images.forEach(img => imageObserver.observe(img));
});