// Menu Mobile
document.addEventListener('DOMContentLoaded', function() {
    const menuMobile = document.querySelector('.menu-mobile');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');
    
    // Abrir menu mobile
    menuMobile.addEventListener('click', function() {
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Fechar menu mobile
    function closeMobileMenu() {
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    closeMenu.addEventListener('click', closeMobileMenu);
    
    // Fechar menu ao clicar em link
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Fechar menu ao clicar fora
    mobileOverlay.addEventListener('click', function(e) {
        if (e.target === mobileOverlay) {
            closeMobileMenu();
        }
    });
    
    // ============================================
    // FILTRO DO PORTFÓLIO
    // ============================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adiciona active class ao botão clicado
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ============================================
    // FORMULÁRIO DE AGENDAMENTO
    // ============================================
    const agendamentoForm = document.getElementById('form-agendamento');
    
    // Máscara de telefone
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Limitar a 11 dígitos
            if (value.length > 11) {
                value = value.substring(0, 11);
            }
            
            // Formatar
            if (value.length <= 10) {
                value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else {
                value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
            }
            
            e.target.value = value;
        });
    }
    
    // Configurar data mínima (amanhã)
    const dataInput = document.getElementById('data');
    if (dataInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        dataInput.min = tomorrow.toISOString().split('T')[0];
        
        // Máximo 60 dias à frente
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 60);
        dataInput.max = maxDate.toISOString().split('T')[0];
    }
    
    // Enviar formulário
    if (agendamentoForm) {
        agendamentoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!this.checkValidity()) {
                this.reportValidity();
                return;
            }
            
            // Coletar dados
            const nome = document.getElementById('nome').value;
            const telefone = document.getElementById('telefone').value.replace(/\D/g, '');
            const servico = document.getElementById('servico').selectedOptions[0].text;
            const data = document.getElementById('data').value;
            const periodo = document.getElementById('periodo').selectedOptions[0].text;
            const mensagem = document.getElementById('mensagem').value;
            
            // Formatar data
            const dataObj = new Date(data);
            const dataFormatada = dataObj.toLocaleDateString('pt-BR', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });
            
            // Criar mensagem para WhatsApp
            const whatsappMessage = `*NOVO AGENDAMENTO*%0A%0A` +
                                  `*Nome:* ${nome}%0A` +
                                  `*Telefone:* ${telefone}%0A` +
                                  `*Serviço:* ${servico}%0A` +
                                  `*Data:* ${dataFormatada}%0A` +
                                  `*Período:* ${periodo}%0A` +
                                  `*Observações:* ${mensagem || 'Nenhuma'}%0A%0A` +
                                  `_Este agendamento foi feito através do site._`;
            
            // Redirecionar para WhatsApp
            window.open(`https://wa.me/5511999999999?text=${whatsappMessage}`, '_blank');
            
            // Limpar formulário
            agendamentoForm.reset();
        });
    }
    
    // ============================================
    // ANIMAÇÃO DE ENTRADA DAS SEÇÕES
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observar todas as seções
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // ============================================
    // LIGHTBOX CONFIGURAÇÃO
    // ============================================
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'albumLabel': "Imagem %1 de %2",
            'fadeDuration': 300,
            'imageFadeDuration': 300
        });
    }
    
    // ============================================
    // SCROLL SUAVE PARA LINKS INTERNOS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // HEADER BACKGROUND AO SCROLL
    // ============================================
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'var(--branco)';
            header.style.boxShadow = '0 2px 20px rgba(212, 165, 165, 0.1)';
        }
    });
    
    // ============================================
    // FORMATAÇÃO DE PREÇOS DINÂMICOS
    // ============================================
    function formatarPrecos() {
        document.querySelectorAll('.servico-preco').forEach(preco => {
            const valor = preco.textContent;
            if (valor.includes('R$')) {
                preco.innerHTML = `<i class="fas fa-tag"></i> ${valor}`;
            }
        });
    }
    
    formatarPrecos();
    
    // ============================================
    // CONTADOR DE SERVIÇOS (OPCIONAL)
    // ============================================
    function iniciarContadorServicos() {
        const contador = document.querySelector('.servicos-contador');
        if (contador) {
            let count = 0;
            const target = 500;
            const duration = 2000;
            const increment = target / (duration / 16);
            
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    count = target;
                    clearInterval(timer);
                }
                contador.textContent = Math.floor(count) + '+';
            }, 16);
        }
    }
    
    // Iniciar quando a seção de serviços estiver visível
    const servicosObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                iniciarContadorServicos();
                servicosObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const servicosSection = document.querySelector('.servicos');
    if (servicosSection) {
        servicosObserver.observe(servicosSection);
    }
});

// ============================================
// AJUSTES DE RESPONSIVIDADE DINÂMICOS
// ============================================
window.addEventListener('resize', function() {
    const nav = document.querySelector('.nav');
    const menuMobile = document.querySelector('.menu-mobile');
    
    if (window.innerWidth > 768) {
        if (nav) nav.style.display = 'flex';
    } else {
        if (nav) nav.style.display = 'none';
    }
});

// Inicializar ajustes ao carregar
window.addEventListener('load', function() {
    if (window.innerWidth <= 768) {
        const nav = document.querySelector('.nav');
        if (nav) nav.style.display = 'none';
    }
});

// ============================================
// MENSAGEM DE BOAS-VINDAS NO CONSOLE
// ============================================
console.log('%c💅 Unhas Perfeitas - Site Portfólio %c\nSite desenvolvido com carinho para manicures profissionais!', 
            'background: linear-gradient(135deg, #F8E0E6, #D4A5A5); color: white; padding: 10px; font-size: 14px; border-radius: 5px;',
            'color: #D4A5A5; font-size: 12px;');