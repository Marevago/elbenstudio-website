import { submitContact } from './supabase.js';

// Loading screen functionality
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Se não houver loading screen, garante que o scroll esteja habilitado
    if (!loadingScreen) {
        document.body.style.overflow = 'visible';
        return;
    }
    
    // Hide the loading screen after 1 second
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        
        // Remove the loading screen from the DOM after the fade-out animation completes
        setTimeout(() => {
            loadingScreen.remove();
            document.body.style.overflow = 'visible'; // Re-enable scrolling
        }, 300); // Shorter fade-out duration
    }, 1500);
}

// Initialize everything when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if loading screen exists
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Only prevent scrolling if there's a loading screen
    if (loadingScreen) {
        document.body.style.overflow = 'hidden';
        // Start the loading screen sequence
        initLoadingScreen();
    } else {
        // Ensure scrolling is enabled if no loading screen
        document.body.style.overflow = 'visible';
    }
    
    // Initialize other components
    setupMenu();
    setupParticles();
    if (document.getElementById('contactForm')) {
        setupContactForm();
    }
});

// Configuração das partículas
const setupParticles = () => {
    const particlesConfig = {
        particles: {
            number: {
                value: 56,
                direction: 'bottom',
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'
            },
            shape: {
                type: ['circle'],
                stroke: {
                    width: 0,
                    color: '#000000'
                },
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 3,
                    size_min: 0.3,
                    sync: false
                }
            },
            line_linked: {
                enable: false
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'bottom',
                straight: false,
                out_mode: 'out',
                bounce: false,
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'repulse'
                },
                resize: true
            },
        },
        retina_detect: true
    };

    const particlesContainer = document.querySelector('.particles-container');
    if (particlesContainer) {
        particlesJS(particlesContainer.id, particlesConfig);
    }
};

// Funções do popup
const setupPopup = () => {
    const popup = document.getElementById('successPopup');
    if (!popup) return;

    // Fechar ao clicar fora
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopup();
        }
    });
};

const showPopup = () => {
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.style.display = 'flex';
        setupPopup();
    } else {
        alert('Mensagem enviada com sucesso!');
    }
};

const closePopup = () => {
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.style.display = 'none';
    }
};

// Configuração do menu
const setupMenu = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuItems = document.querySelector('.menu-items');
    
    if (!menuToggle || !menuItems) return;

    const toggleMenu = (show) => {
        menuToggle.classList.toggle('active', show);
        menuItems.classList.toggle('active', show);
    };

    menuToggle.addEventListener('click', () => {
        const isActive = menuItems.classList.contains('active');
        toggleMenu(!isActive);
    });

    document.addEventListener('click', (event) => {
        const isClickInside = menuToggle.contains(event.target) || menuItems.contains(event.target);
        if (!isClickInside && menuItems.classList.contains('active')) {
            toggleMenu(false);
        }
    });

    const menuLinks = document.querySelectorAll('.menu-items a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });
};

// Configuração do formulário
const setupContactForm = () => {
    const form = document.getElementById('contactForm');
    const submitButton = form?.querySelector('.submit-button');
    
    if (!form || !submitButton) return;

    submitButton.addEventListener('click', handleSubmit);
};

// Manipulação do envio
const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const form = document.getElementById('contactForm');
    
    // Coletar dados do formulário
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };

    try {
        await submitContact(formData);
        form.reset();
        showPopup();
    } catch (error) {
        console.error('Erro ao enviar:', error);
        alert('Erro ao enviar mensagem. Por favor, tente novamente.');
    }
};

// Exportar funções necessárias globalmente
window.closePopup = closePopup;
