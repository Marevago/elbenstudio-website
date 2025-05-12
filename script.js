document.addEventListener('DOMContentLoaded', function() {
    setupMenu();
    if (document.getElementById('contactForm')) {
        setupContactForm();
    }
});

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
