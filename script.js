// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidade original do menu - não modificar esta parte
    const menuToggle = document.querySelector('.menu-toggle');
    const menuItems = document.querySelector('.menu-items');
    
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

    // Inicialização do sistema de idiomas
    const langHandler = new LanguageHandler();

    // Configuração dos botões de idioma
    const buttons = document.querySelectorAll('.language-button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.getAttribute('data-lang');
            langHandler.setLanguage(lang);
            
            // Atualiza o estado visual dos botões
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Define o estado ativo inicial do idioma
    const currentLang = langHandler.currentLang;
    document.querySelector(`[data-lang="${currentLang}"]`)?.classList.add('active');

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
        '.methodology-list li',
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
});
