

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuItems = document.querySelector('.menu-items');
    
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        menuItems.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = menuToggle.contains(event.target) || menuItems.contains(event.target);
        
        if (!isClickInside && menuItems.classList.contains('active')) {
            menuToggle.classList.remove('active');
            menuItems.classList.remove('active');
        }
    });

    // Close menu when clicking on a link
    const menuLinks = document.querySelectorAll('.menu-items a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            menuItems.classList.remove('active');
        });
    });
});
    const title = document.querySelector('.title');
    const text = title.textContent;
    title.textContent = '';
    
    for(let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i];
        span.style.opacity = '0';
        span.style.transition = 'opacity 0.3s ease';
        span.style.transitionDelay = `${i * 0.1}s`;
        title.appendChild(span);
        
        setTimeout(() => {
            span.style.opacity = '1';
        }, 100);
    }

    // Scroll-based animations
    const observerOptions = {
        root: null,
        rootMargin: '-10% 0px',  // Trigger slightly before element enters viewport
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]  // Multiple thresholds for smooth transition
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Get the element's opacity based on intersection ratio
            const opacity = entry.intersectionRatio;
            const translateY = 20 - (opacity * 20); // Start at 20px offset, move to 0

            // Apply smooth transitions
            entry.target.style.opacity = opacity;
            entry.target.style.transform = `translateY(${translateY}px)`;
        });
    }, observerOptions);

    // Elements to animate
    const elementsToAnimate = [
        '.mirror-card',
        '.vision-card',
        '.bridge-card',
        '.methodology-list li',
        '.member',
        '.cert-item',
    ];

    // Setup animations for each element
    elementsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            // Set initial styles
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            // Add slight delay for sequential elements
            if (selector === '.vision-card' || selector === '.methodology-list li') {
                element.style.transitionDelay = `${index * 0.1}s`;
            }

            // Observe element
            animateOnScroll.observe(element);
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

   

// Menu toggle (mantendo o existente)
const menuToggle = document.querySelector('.menu-toggle');
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
});
