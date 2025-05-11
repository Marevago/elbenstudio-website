// script.js
// Aguarda o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Funções do pop-up
    window.closePopup = function() {
        const popup = document.getElementById('successPopup');
        if (popup) {
            popup.style.display = 'none';
        }
    };

    // Função para configurar eventos do pop-up
    function setupPopupEvents() {
        const popup = document.getElementById('successPopup');
        if (!popup) return;

        // Fechar ao clicar fora
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                closePopup();
            }
        });

        // Fechar com ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closePopup();
            }
        });
    }

    // Funcionalidade original do menu - não modificar esta parte
    const menuToggle = document.querySelector('.menu-toggle');
    const menuItems = document.querySelector('.menu-items');
    
    // Só adiciona funcionalidades de menu se os elementos existirem
    if (menuToggle && menuItems) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            menuItems.classList.toggle('active');
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', function(event) {
            const isClickInside = menuToggle.contains(event.target) || menuItems.contains(event.target);
            
            if (!isClickInside && menuItems.classList.contains('active')) {
                menuToggle.classList.remove('active');
                menuItems.classList.remove('active');
            }
        });

        // Fechar menu ao clicar em um link
        const menuLinks = document.querySelectorAll('.menu-items a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                menuItems.classList.remove('active');
            });
        });
    }

    // Manipulador do formulário de contato
    const contactForm = document.getElementById('contactForm');
    const submitButton = document.querySelector('.submit-button');
    console.log('Formulário encontrado:', contactForm);
    console.log('Botão encontrado:', submitButton);

    if (contactForm && submitButton) {
        submitButton.addEventListener('click', async function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Botão clicado');
            
            // Coletar dados do formulário
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };

            console.log('Dados coletados:', formData);

            try {
                console.log('Iniciando envio para o servidor...');
                const apiUrl = 'https://elbenstudio-backend.up.railway.app';
                const url = `${apiUrl}/submit`;
                console.log('URL da API:', url);

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                console.log('Resposta recebida:', response.status);
                const data = await response.json();
                console.log('Dados da resposta:', data);

                if (response.ok) {
                    console.log('Envio bem-sucedido!');
                    // Limpar formulário
                    contactForm.reset();
                    
                    // Mostrar pop-up
                    const popup = document.getElementById('successPopup');
                    if (popup) {
                        popup.style.display = 'flex';
                        setupPopupEvents();
                        console.log('Pop-up exibido');
                    } else {
                        console.error('Elemento do pop-up não encontrado!');
                        alert('Mensagem enviada com sucesso!');
                    }
                } else {
                    console.error('Erro na resposta:', data);
                    alert('Erro ao enviar mensagem: ' + (data.message || 'Tente novamente'));
                }
            } catch (error) {
                console.error('Erro ao enviar:', error);
                alert('Erro ao enviar mensagem. Por favor, tente novamente.');
            }
        });
    }

    // Title electric flash: direct style toggling for impact
    const titleEl = document.querySelector('.title');
    if (titleEl) {
        setInterval(() => {
            setTimeout(() => {
                titleEl.style.filter = '';
                titleEl.style.textShadow = '';
            }, 100);
        }, 2000);
    }

    // Animações de scroll
    const observerOptions = {
        root: null,
        rootMargin: '-10% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    };

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

    // Scroll suave para links de âncora
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

    // Particle configs: light for dark backgrounds, dark for white backgrounds
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
    // Load particles for each section only if their container exists
    if (document.getElementById("particles-methodology")) {
        tsParticles.load("particles-methodology", lightParticleConfig);
    }
    if (document.getElementById("particles-members")) {
        tsParticles.load("particles-members", lightParticleConfig);
    }
    if (document.getElementById("particles-footer")) {
        tsParticles.load("particles-footer", lightParticleConfig);
    }
    if (document.getElementById("particles-contact")) {
        tsParticles.load("particles-contact", darkParticleConfig);
    }
    if (document.getElementById("particles-about")) {
        tsParticles.load("particles-about", darkParticleConfig);
    }
    if (document.getElementById("particles-blog")) {
        tsParticles.load("particles-blog", darkParticleConfig);
    }
    if (document.getElementById("particles-learn")) {
        tsParticles.load("particles-learn", darkParticleConfig);
    }
    if (document.getElementById("particles-portfolio")) {
        // Further bump portfolio particles by 25%
        const portfolioParticleConfig = JSON.parse(JSON.stringify(darkParticleConfig));
        portfolioParticleConfig.particles.number.value = Math.ceil(portfolioParticleConfig.particles.number.value * 10);
        tsParticles.load("particles-portfolio", portfolioParticleConfig);
    }
    ["project1", "project2", "project3"].forEach(idSuffix => {
        const container = `particles-${idSuffix}`;
        if (document.getElementById(container)) {
            tsParticles.load(container, darkParticleConfig);
        }
    });
 });
