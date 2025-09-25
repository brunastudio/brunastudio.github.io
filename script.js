// Aguardar carregamento do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos do DOM
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const skillBars = document.querySelectorAll('.skill-progress');
    const contactForm = document.querySelector('.contact-form');
    
    // Toggle do menu mobile
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Fechar menu mobile ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Navegação ativa baseada no scroll
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Scroll suave para links de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Altura do header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animação das barras de habilidades
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            if (targetWidth) {
                bar.style.width = targetWidth + '%';
            }
        });
    }
    
    // Intersection Observer para animações
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Animar barras de habilidades quando a seção skills for visível
                if (entry.target.id === 'skills') {
                    setTimeout(animateSkillBars, 500);
                }
            }
        });
    }, observerOptions);
    
    // Observar seções para animações
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Observar cards de projetos e estatísticas
    const animatedElements = document.querySelectorAll('.project-card, .stat, .skill-category');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Efeito parallax no hero
    function parallaxEffect() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-container');
        
        if (hero && heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    }
    
    // Header transparente/opaco baseado no scroll
    function updateHeaderBackground() {
        const header = document.querySelector('.header');
        const scrolled = window.pageYOffset;
        
        if (scrolled > 100) {
            header.style.background = 'rgba(240, 231, 245, 0.98)';
            header.style.boxShadow = 'inset -3px 3px 10px rgba(180, 165, 203, 0.8), 0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(240, 231, 245, 0.95)';
            header.style.boxShadow = 'inset -3px 3px 10px rgba(180, 165, 203, 0.6)';
        }
    }
    
    // Event listeners para scroll
    window.addEventListener('scroll', function() {
        updateActiveNav();
        parallaxEffect();
        updateHeaderBackground();
    });
    
    // Formulário de contato
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coletar dados do formulário
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Validação básica
            if (!name || !email || !subject || !message) {
                showNotification('Por favor, preencha todos os campos.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, insira um email válido.', 'error');
                return;
            }
            
            // Simular envio (aqui você integraria com um serviço real)
            showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
            this.reset();
        });
    }
    
    // Função para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Sistema de notificações
    function showNotification(message, type = 'info') {
        // Remover notificação existente
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Criar nova notificação
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Estilos da notificação
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#7B40C9' : type === 'error' ? '#e74c3c' : '#4D2681'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 1rem;
            font-family: 'Open Sans', sans-serif;
            font-weight: 500;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
        `;
        
        // Botão de fechar
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            margin-left: auto;
        `;
        
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        document.body.appendChild(notification);
        
        // Remover automaticamente após 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
    
    // Adicionar animação CSS para notificações
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification:hover {
            transform: translateY(-2px);
            transition: transform 0.2s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Efeito de digitação no título hero
    function typeWriter() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;
        
        const originalText = heroTitle.innerHTML;
        const nameSpan = heroTitle.querySelector('.highlight');
        
        if (nameSpan) {
            const nameText = nameSpan.textContent;
            nameSpan.textContent = '';
            
            let i = 0;
            function type() {
                if (i < nameText.length) {
                    nameSpan.textContent += nameText.charAt(i);
                    i++;
                    setTimeout(type, 100);
                }
            }
            
            setTimeout(type, 1000);
        }
    }
    
    // Inicializar efeito de digitação
    setTimeout(typeWriter, 500);
    
    // Smooth scroll para botões do hero
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Inicializar navegação ativa
    updateActiveNav();
    updateHeaderBackground();
    
    // Adicionar classe de carregamento concluído
    document.body.classList.add('loaded');
});

// Preloader simples
window.addEventListener('load', function() {
    document.body.classList.add('page-loaded');
});

