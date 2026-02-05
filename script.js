document.addEventListener("DOMContentLoaded", () => {
    // Inicia Logos (Com link para home)
    initLogos();
    
    // Inicia lógica da Landing Page (se estiver nela)
    initSaibaMais();

    // Verificação de segurança para animações (GSAP)
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        try {
            gsap.registerPlugin(ScrollTrigger);

            const heroLogo = document.querySelector("#hero .logo-wrapper-v");
            
            if (heroLogo) {
                const tl = gsap.timeline({ onComplete: initScrollAnimation });

                tl.from(heroLogo, {
                    duration: 1.2,
                    y: 60,
                    opacity: 0,
                    ease: "power3.out"
                })
                .from("#hero .accent-v", { 
                    duration: 1,
                    y: -100, 
                    opacity: 0,
                    ease: "bounce.out"
                }, "-=0.8")
                .to(".hero-title", {
                    opacity: 1,
                    y: 0,
                    duration: 0.8
                })
                .to(".scroll-indicator", {
                    opacity: 0.7,
                    duration: 0.8
                }, "-=0.5");
            } else {
                initScrollAnimation();
            }
        } catch (error) {
            console.warn("Erro ao iniciar animação GSAP:", error);
            document.querySelectorAll('.hero-title, .scroll-indicator').forEach(el => el.style.opacity = 1);
        }
    } else {
        // Fallback: Se o GSAP não carregar
        initScrollAnimation(); 
        const titles = document.querySelectorAll(".hero-title, .scroll-indicator");
        titles.forEach(el => {
            el.style.opacity = 1;
            el.style.transform = "none";
        });
    }

    // Efeito do Mouse (Glow)
    document.addEventListener('mousemove', (e) => {
        const glow1 = document.querySelector(".bg-glow-1");
        const glow2 = document.querySelector(".bg-glow-2");
        if (!glow1 || !glow2 || typeof gsap === 'undefined') return;
        
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        gsap.to(".bg-glow-1, .bg-glow-2", { x: x, y: y, duration: 2, ease: "power1.out" });
    });
});

function initScrollAnimation() {
    if (typeof gsap === 'undefined') {
        document.querySelectorAll('.card, .info-card, .price-card, .step-card, .feature-row').forEach(c => {
            c.style.opacity = 1;
            c.style.transform = 'none';
        });
        return;
    }

    if(document.querySelector("#hero")) {
        gsap.to("#hero .logo-wrapper-v", {
            scrollTrigger: {
                trigger: "#hero",
                start: "10% top",
                end: "60% top",
                scrub: 1,
                toggleActions: "play reverse play reverse"
            },
            opacity: 0,
            scale: 0.7,
            y: -50,
            filter: "blur(5px)"
        });
    }

    const cards = document.querySelectorAll('.card, .info-card, .price-card, .step-card, .feature-row');
    cards.forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.6
        });
    });
}

function initLogos() {
    if (document.querySelector('.logo-wrapper-v')) return;

    const style = document.createElement('style');
    style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@700;900&display=swap');

        .logo-wrapper-v {
            font-family: 'Archivo', sans-serif;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            user-select: none;
            line-height: 1;
            font-size: 10px; 
            cursor: pointer;
        }

        .brand-sub-v {
            font-size: 1.2em;
            font-weight: 700;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            margin-bottom: 0.65em;
            margin-left: 0.05em;
            color: inherit; 
            opacity: 0.7;
        }

        .brand-main-v {
            font-size: 8em;
            font-weight: 900;
            letter-spacing: -0.06em;
            position: relative;
            display: flex;
            align-items: baseline;
            line-height: 0.65;
            color: inherit; 
        }

        .char-o-wrapper-v {
            position: relative;
            display: inline-block;
            margin-left: 0.02em;
        }

        .accent-v {
            position: absolute;
            top: -0.20em;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.85em;
            font-weight: 900;
            color: #10b981;
            transition: top 0.3s ease, color 0.3s ease, text-shadow 0.3s ease;
        }

        .dot-v {
            width: 0.15em;
            height: 0.15em;
            background-color: #10b981;
            margin-left: 0.1em;
            display: inline-block;
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }

        .logo-wrapper-v:hover .accent-v {
            top: -0.35em;
            color: #34d399;
            text-shadow: 0 0 20px rgba(16, 185, 129, 0.6);
        }

        .logo-wrapper-v:hover .dot-v {
            background-color: #34d399;
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.6);
        }
    `;
    document.head.appendChild(style);

    const logoHTML = `
        <span class="brand-sub-v">agência</span>
        <div class="brand-main-v">
            vitr
            <div class="char-o-wrapper-v">
                <span class="accent-v">^</span>
                <span>o</span>
            </div>
            <span class="dot-v"></span>
        </div>
    `;

    const placeholders = document.querySelectorAll('.vitro-logo');
    placeholders.forEach(el => {
        el.classList.add('logo-wrapper-v');
        el.innerHTML = logoHTML;
        // Adiciona redirecionamento para Home
        el.onclick = () => window.location.href = 'index.html';
    });
}

/**
 * LÓGICA DA PÁGINA "SAIBA MAIS"
 */
function initSaibaMais() {
    const heroTitle = document.getElementById('hero-title');
    if (!heroTitle) return; // Se não tiver esse elemento, não estamos na página saibamais

    // Inicializa ícones do Lucide
    if(typeof lucide !== 'undefined') lucide.createIcons();

    const contentData = {
        'agenda': {
            title: "Seu Sistema de <span class='text-vitro-accent'>Agendamento Automático.</span>",
            desc: "Chega de perder tempo no WhatsApp respondendo 'tem horário pra hoje?'. Deixe seu cliente agendar sozinho, 24h por dia.",
            img: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop", 
            price: "49,90",
            features: [
                { icon: 'calendar-check', title: 'Agenda 24h', text: 'Seu cliente agenda domingos e feriados sem você precisar responder.' },
                { icon: 'smartphone', title: 'Gestão no Celular', text: 'Controle seus horários e serviços pelo App Google (AppSheet).' },
                { icon: 'bell', title: 'Lembretes Auto', text: 'Reduza faltas com confirmações automáticas enviadas para o cliente.' }
            ],
            ctaMsg: "Olá Vitrô! Vi o modelo de *Agendamento* no showroom e quero garantir a condição especial."
        },
        'loja': {
            title: "Sua Loja Virtual <span class='text-vitro-accent'>Pronta para Vender.</span>",
            desc: "Transforme seguidores em clientes. Um catálogo lindo, carrinho de compras e pedidos chegando prontos no seu WhatsApp.",
            img: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop", 
            price: "69,90",
            features: [
                { icon: 'shopping-bag', title: 'Catálogo Profissional', text: 'Valorize seus produtos com fotos e descrições em um site lindo.' },
                { icon: 'shopping-cart', title: 'Pedido no Zap', text: 'O cliente monta o carrinho e o pedido chega pronto para você fechar.' },
                { icon: 'smartphone', title: 'Fácil de Mexer', text: 'Atualize preços e fotos em segundos usando o App Google (AppSheet).' }
            ],
            ctaMsg: "Olá Vitrô! Vi o modelo de *Loja Virtual* no showroom e quero garantir a condição especial."
        },
        'default': {
            title: "Digitalize seu Negócio com <span class='text-vitro-accent'>Tecnologia Vitrô.</span>",
            desc: "Sistemas web modernos, rápidos e focados em vendas para facilitar sua vida.",
            img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
            price: "49,90",
            features: [
                { icon: 'smartphone', title: '100% Mobile', text: 'Funciona perfeitamente em qualquer celular, sem precisar baixar app.' },
                { icon: 'zap', title: 'Super Rápido', text: 'Tecnologia de ponta que carrega instantaneamente.' },
                { icon: 'layout', title: 'Design Premium', text: 'Visual moderno que transmite autoridade para sua marca.' }
            ],
            ctaMsg: "Olá Vitrô! Vi o site e quero saber mais sobre os sistemas."
        }
    };

    // Pega o parâmetro ?modelo= da URL
    const urlParams = new URLSearchParams(window.location.search);
    const modelParam = urlParams.get('modelo'); 
    
    // Seleciona o conteúdo
    const content = contentData[modelParam] || contentData['default'];

    // Aplica os textos e imagens
    document.getElementById('hero-title').innerHTML = content.title;
    document.getElementById('hero-desc').innerText = content.desc;
    document.getElementById('hero-img').src = content.img;
    
    // Atualiza o Preço na seção de Pricing
    const priceEl = document.getElementById('dynamic-price');
    if(priceEl) priceEl.innerText = content.price;

    // Gera as Features
    const featureGrid = document.getElementById('features-grid');
    if (featureGrid) {
        featureGrid.innerHTML = '';
        content.features.forEach(f => {
            const el = document.createElement('div');
            el.className = "bg-vitro-dark/50 p-8 rounded-2xl border border-white/5 hover:border-vitro-accent/30 transition duration-300 shadow-lg";
            el.innerHTML = `
                <div class="bg-vitro-dark w-14 h-14 rounded-xl flex items-center justify-center text-vitro-accent mb-6 shadow-lg border border-white/5">
                    <i data-lucide="${f.icon}" class="w-7 h-7"></i>
                </div>
                <h3 class="font-bold text-xl mb-3 text-white">${f.title}</h3>
                <p class="text-gray-400 text-sm leading-relaxed">${f.text}</p>
            `;
            featureGrid.appendChild(el);
        });
    }

    if(typeof lucide !== 'undefined') lucide.createIcons();

    // Configura o Botão do WhatsApp
    const phone = "551151998993";
    const btn = document.getElementById('btn-whatsapp-buy');
    if (btn) {
        btn.onclick = () => {
            const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(content.ctaMsg)}`;
            window.open(url, '_blank');
        };
    }
}

function scrollToPricing() {
    const el = document.getElementById('pricing');
    if(el) el.scrollIntoView({ behavior: 'smooth' });
}