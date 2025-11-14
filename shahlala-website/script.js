// Main JavaScript for Shahlala Website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initTypingEffect();
    initMusicPlayer();
    initMobileMenu();
    initScrollAnimations();
    initFloatingElements();
});

// Typing Effect for Hero Text
function initTypingEffect() {
    const typingText = document.getElementById('typing-text');
    if (!typingText) return;
    
    const texts = [
        "Welcome to Shahlala",
        "A Place of Love",
        "Full of Memories",
        "And Beautiful Surprises"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    setTimeout(type, 1000);
}

// Music Player Functionality
function initMusicPlayer() {
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    
    if (!musicToggle || !backgroundMusic) return;
    
    let isPlaying = false;
    
    // Auto-play on user interaction
    document.addEventListener('click', function initMusic() {
        if (!isPlaying) {
            backgroundMusic.play().catch(e => console.log('Auto-play prevented'));
            isPlaying = true;
            musicToggle.classList.add('playing');
        }
        document.removeEventListener('click', initMusic);
    });
    
    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            backgroundMusic.pause();
            musicToggle.textContent = '🔇';
            musicToggle.classList.remove('playing');
        } else {
            backgroundMusic.play();
            musicToggle.textContent = '🎵';
            musicToggle.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe feature cards and other elements
    document.querySelectorAll('.feature-card').forEach(el => {
        observer.observe(el);
    });
}

// Floating Elements (Hearts, Sparkles)
function initFloatingElements() {
    // Create floating hearts continuously
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every second
            createHearts(1);
        }
    }, 1000);
}

// Utility Functions
function createHearts(count) {
    const container = document.getElementById('animation-container');
    if (!container) return;
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.cssText = `
                position: fixed;
                font-size: ${Math.random() * 20 + 15}px;
                pointer-events: none;
                z-index: 1000;
                animation: floatUp ${Math.random() * 2 + 2}s ease-in forwards;
                left: ${Math.random() * 100}%;
                top: 100%;
            `;
            container.appendChild(heart);
            setTimeout(() => heart.remove(), 2000);
        }, i * 100);
    }
}

function createSparkles(count) {
    const container = document.getElementById('animation-container');
    if (!container) return;
    
    for (let i = 0; i < count; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: gold;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: sparkleFall ${Math.random() * 1 + 1}s ease-in forwards;
            left: ${Math.random() * 100}%;
            top: -10px;
            box-shadow: 0 0 10px gold;
        `;
        container.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1500);
    }
}

function showTemporaryMessage(message, duration) {
    const messageEl = document.createElement('div');
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(233, 30, 99, 0.95);
        color: white;
        padding: 20px 30px;
        border-radius: 50px;
        font-family: var(--handwritten);
        font-size: 1.5em;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        text-align: center;
        max-width: 300px;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(messageEl);
    
    setTimeout(() => {
        messageEl.style.opacity = '0';
        messageEl.style.transform = 'translate(-50%, -50%) scale(0.8)';
        setTimeout(() => {
            messageEl.remove();
        }, 300);
    }, duration);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
    @keyframes sparkleFall {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(style);