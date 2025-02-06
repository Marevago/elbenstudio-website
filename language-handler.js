// language-handler.js
class LanguageHandler {
    constructor() {
        this.currentLang = 'en'; // Default language
        this.translations = translations; // From translations.js
        this.init();
    }

    async init() {
        // Try to get language from localStorage first
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang) {
            this.setLanguage(savedLang);
            return;
        }

        // Otherwise, detect location and set appropriate language
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            
            // Set Portuguese for Brazil and Portugal
            if (data.country_code === 'BR' || data.country_code === 'PT') {
                this.setLanguage('pt');
            } else {
                this.setLanguage('en');
            }
        } catch (error) {
            console.error('Error detecting location:', error);
            this.setLanguage('en'); // Default to English on error
        }
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);
        this.updateContent();
        
        // Atualizar o estado visual dos botões
        document.querySelectorAll('.language-button').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
    }

    updateContent() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translations[this.currentLang][key];
            
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.innerHTML = translation;
                }
            }
        });
    }

    getText(key) {
        return this.translations[this.currentLang][key] || key;
    }
}