// Configuração das animações de scroll
const observerOptions = {
    root: null,
    rootMargin: '-10% 0px',
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
};

// Animador de scroll
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const opacity = entry.intersectionRatio;
        const translateY = 20 - (opacity * 20);
        entry.target.style.opacity = opacity;
        entry.target.style.transform = `translateY(${translateY}px)`;
    });
}, observerOptions);

// Elementos para animar
const elementsToAnimate = [
    '.mirror-card',
    '.vision-card',
    '.bridge-card',
    '.methodology-step',
    '.member',
    '.cert-item',
];

// Configuração das partículas
const lightParticleConfig = {
    particles: {
        number: { value: 8, density: { enable: true, area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: {
            value: { min: 0.1, max: 1 },
            random: { enable: true, minimumValue: 0.1 }
        },
        size: { value: { min: 1, max: 3 } },
        move: { enable: true, speed: 2, direction: "bottom", outModes: { default: "out" } }
    },
    detectRetina: true
};

const darkParticleConfig = {
    particles: {
        number: { value: 8, density: { enable: true, area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: {
            value: { min: 0.1, max: 1 },
            random: { enable: true, minimumValue: 0.1 }
        },
        size: { value: { min: 1, max: 3 } },
        move: { enable: true, speed: 2, direction: "bottom", outModes: { default: "out" } }
    },
    detectRetina: true
};

// Inicialização das animações
document.addEventListener('DOMContentLoaded', () => {
    // Configurar animações de scroll
    elementsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            if (selector === '.vision-card' || selector === '.methodology-list li') {
                element.style.transitionDelay = `${index * 0.1}s`;
            }

            animateOnScroll.observe(element);
        });
    });

    // Configurar partículas
    const particleContainers = {
        light: ['methodology', 'members', 'footer'],
        dark: ['contact', 'about', 'blog', 'learn']
    };

    // Carregar partículas light
    particleContainers.light.forEach(container => {
        const elementId = `particles-${container}`;
        if (document.getElementById(elementId)) {
            tsParticles.load(elementId, lightParticleConfig);
        }
    });

    // Carregar partículas dark
    particleContainers.dark.forEach(container => {
        const elementId = `particles-${container}`;
        if (document.getElementById(elementId)) {
            tsParticles.load(elementId, darkParticleConfig);
        }
    });

    // Configuração especial para portfolio
    if (document.getElementById("particles-portfolio")) {
        const portfolioConfig = JSON.parse(JSON.stringify(darkParticleConfig));
        portfolioConfig.particles.number.value *= 10;
        tsParticles.load("particles-portfolio", portfolioConfig);
    }

    // Configurar projetos
    ["project1", "project2", "project3"].forEach(idSuffix => {
        const container = `particles-${idSuffix}`;
        if (document.getElementById(container)) {
            tsParticles.load(container, darkParticleConfig);
        }
    });
});
