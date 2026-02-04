document.addEventListener("DOMContentLoaded", () => {
    
    gsap.registerPlugin(ScrollTrigger);
    
    // 1. INJEÇÃO DO LOGO (COM EFEITOS RESTAURADOS)
    initLogos(); 

    // Seletor ajustado para a classe padronizada .logo-wrapper-v
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


    function initScrollAnimation() {
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

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        gsap.to(".bg-glow-1, .bg-glow-2", {
            x: x,
            y: y,
            duration: 2,
            ease: "power1.out"
        });
    });

});

function initLogos() {
    // 1. INJEÇÃO DO CSS DO LOGOTIPO (COM EFEITOS DE HOVER)
    const style = document.createElement('style');
    style.innerHTML = `
        /* BASE DO LOGO - CLASSE COM SUFIXO -V */
        .logo-wrapper-v {
            font-family: 'Inter', sans-serif;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            user-select: none;
            line-height: 1;
            /* Tamanho base */
            font-size: 10px; 
            cursor: pointer;
        }

        /* SUBTÍTULO */
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

        /* TÍTULO PRINCIPAL */
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

        /* O CHARME DO ACENTO */
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
            color: #10b981; /* Verde Vitrô Original */
            
            /* TRANSIÇÃO SUAVE PARA O EFEITO */
            transition: top 0.3s ease, color 0.3s ease, text-shadow 0.3s ease;
        }

        /* O PINGO (REDONDO) */
        .dot-v {
            width: 0.15em;
            height: 0.15em;
            background-color: #10b981;
            border-radius: 50%; 
            margin-left: 0.1em;
            display: inline-block;
            
            /* TRANSIÇÃO SUAVE PARA O EFEITO */
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }

        /* --- EFEITOS DE INTERAÇÃO (HOVER) --- */
        
        /* Ao passar o mouse no logo, o acento sobe e brilha */
        .logo-wrapper-v:hover .accent-v {
            top: -0.35em; /* Levita */
            color: #34d399; /* Verde Luz */
            text-shadow: 0 0 20px rgba(16, 185, 129, 0.6); /* Glow */
        }

        /* Ao passar o mouse no logo, o ponto também brilha */
        .logo-wrapper-v:hover .dot-v {
            background-color: #34d399; /* Verde Luz */
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.6); /* Glow */
        }
    `;
    document.head.appendChild(style);

    // 2. INJEÇÃO DO HTML
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
    });
}