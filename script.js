// Hero Slideshow functionality
let currentHeroSlide = 0;
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-dot');
let heroInterval;

// Set hero slide
function setHeroSlide(index) {
    if (heroSlides.length === 0) return;
    
    // Remove active class from current slide and dot
    heroSlides[currentHeroSlide]?.classList.remove('active');
    heroDots[currentHeroSlide]?.classList.remove('active');
    
    // Update index
    currentHeroSlide = index;
    
    // Add active class to new slide and dot
    heroSlides[currentHeroSlide]?.classList.add('active');
    heroDots[currentHeroSlide]?.classList.add('active');
    
    // Reset auto-advance timer
    clearInterval(heroInterval);
    startHeroAutoAdvance();
}

// Auto-advance hero slides
function advanceHeroSlide() {
    const nextSlide = (currentHeroSlide + 1) % heroSlides.length;
    setHeroSlide(nextSlide);
}

// Start auto-advance
function startHeroAutoAdvance() {
    heroInterval = setInterval(advanceHeroSlide, 5000); // Change every 5 seconds
}

// Initialize hero slideshow
if (heroSlides.length > 0) {
    startHeroAutoAdvance();
}

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const carouselButtons = document.querySelectorAll('.carousel-btn');

// Gallery image tracking for each school
const galleryState = {
    primary: 0,
    secondary: 0
};

// Change carousel slide
function changeSlide(index) {
    slides[currentSlide].classList.remove('active');
    carouselButtons[currentSlide].style.background = 'linear-gradient(135deg, var(--primary-navy) 0%, var(--secondary-blue) 100%)';
    
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    carouselButtons[currentSlide].style.background = 'linear-gradient(135deg, var(--primary-gold) 0%, var(--accent-gold) 100%)';
    carouselButtons[currentSlide].style.color = 'var(--primary-navy)';
}

// Change gallery image within a school
function changeGalleryImage(school, direction) {
    const slideElement = document.getElementById(school);
    const images = slideElement.querySelectorAll('.gallery-image');
    
    // Remove active class from current image
    images[galleryState[school]].classList.remove('active-gallery');
    
    // Update index
    galleryState[school] += direction;
    
    // Wrap around
    if (galleryState[school] < 0) {
        galleryState[school] = images.length - 1;
    } else if (galleryState[school] >= images.length) {
        galleryState[school] = 0;
    }
    
    // Add active class to new image
    images[galleryState[school]].classList.add('active-gallery');
}

// Auto-advance gallery images
function autoAdvanceGallery() {
    const activeSlide = slides[currentSlide];
    const schoolId = activeSlide.id;
    
    if (schoolId) {
        changeGalleryImage(schoolId, 1);
    }
}

// Set up auto-advance for gallery (every 5 seconds)
let galleryInterval = setInterval(autoAdvanceGallery, 5000);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Determine which slide to show based on the target
            if (this.getAttribute('href') === '#primary') {
                changeSlide(0);
            } else if (this.getAttribute('href') === '#secondary') {
                changeSlide(1);
            }
            
            // Scroll to the schools section
            const schoolsSection = document.querySelector('.schools-section');
            if (schoolsSection) {
                schoolsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Initialize first carousel button as active
if (carouselButtons.length > 0) {
    carouselButtons[0].style.background = 'linear-gradient(135deg, var(--primary-gold) 0%, var(--accent-gold) 100%)';
    carouselButtons[0].style.color = 'var(--primary-navy)';
}

// Add active class to current page nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        const newSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
        changeSlide(newSlide);
    } else if (e.key === 'ArrowRight') {
        const newSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
        changeSlide(newSlide);
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.carousel-container')?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.carousel-container')?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left
        const newSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
        changeSlide(newSlide);
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe right
        const newSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
        changeSlide(newSlide);
    }
}
