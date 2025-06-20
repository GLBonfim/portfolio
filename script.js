document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;
    const starryBackground = document.getElementById('starryBackground'); // Obter o canvas

    // --- Lógica de Tema ---
    const applyTheme = (theme) => {
        const bulbIcon = themeToggleBtn.querySelector('i');

        if (theme === 'light') {
            body.classList.add('light-theme');
            bulbIcon.classList.remove('far', 'fa-lightbulb');
            bulbIcon.classList.add('fas', 'fa-lightbulb'); // Lâmpada "ligada"
            bulbIcon.classList.add('glowing'); // Adiciona a classe para ativar o brilho

            // Oculta o starryBackground suavemente
            starryBackground.style.opacity = '0';
            starryBackground.style.visibility = 'hidden';

        } else {
            body.classList.remove('light-theme');
            bulbIcon.classList.remove('fas', 'fa-lightbulb');
            bulbIcon.classList.add('far', 'fa-lightbulb'); // Lâmpada "desligada"
            bulbIcon.classList.remove('glowing'); // Remove a classe de brilho quando "apaga"

            // Mostra o starryBackground suavemente
            starryBackground.style.opacity = '1';
            starryBackground.style.visibility = 'visible';
        }

        localStorage.setItem('portfolioTheme', theme); // Salva a preferência

        // Remove a classe 'glowing' após a animação para que possa ser reativada no próximo clique
        setTimeout(() => {
            if (theme === 'dark' && bulbIcon.classList.contains('glowing')) {
                // Só remove se ainda estiver lá (evita remover se o tema for mudado rapidamente)
                bulbIcon.classList.remove('glowing');
            }
        }, 1000); // Duração da animação é 1s
    };

    // Inicializa o tema ao carregar a página
    const savedTheme = localStorage.getItem('portfolioTheme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // Tema padrão se não houver preferência salva (mantemos escuro como padrão)
        applyTheme('dark');
    }

    // Event Listener para o botão de alternar tema
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
            applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }

    // --- Lógica Existente de Exibição de Seções (inalterada) ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetSectionId = link.dataset.section;
            const targetSection = document.getElementById(targetSectionId);

            const isTargetSectionCurrentlyVisible = !targetSection.classList.contains('hidden');

            navLinks.forEach(navLink => navLink.classList.remove('active'));

            contentSections.forEach(section => {
                if (!section.classList.contains('hidden')) {
                    section.style.maxHeight = section.scrollHeight + 'px';
                    section.style.paddingTop = '30px';
                    section.style.paddingBottom = '30px';
                    section.style.marginTop = '30px';
                    section.style.marginBottom = '30px';
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';

                    void section.offsetWidth;

                    section.style.maxHeight = '0';
                    section.style.paddingTop = '0';
                    section.style.paddingBottom = '0';
                    section.style.marginTop = '0';
                    section.style.marginBottom = '0';
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        section.classList.add('hidden');
                        section.style.maxHeight = '';
                        section.style.paddingTop = '';
                        section.style.paddingBottom = '';
                        section.style.marginTop = '';
                        section.style.marginBottom = '';
                        section.style.opacity = '';
                        section.style.transform = '';
                    }, 500);
                }
            });

            if (!isTargetSectionCurrentlyVisible) {
                targetSection.classList.remove('hidden');

                targetSection.style.maxHeight = '0';
                targetSection.style.paddingTop = '0';
                targetSection.style.paddingBottom = '0';
                targetSection.style.marginTop = '0';
                targetSection.style.marginBottom = '0';
                targetSection.style.opacity = '0';
                targetSection.style.transform = 'translateY(20px)';

                void targetSection.offsetWidth;

                const sectionHeight = targetSection.scrollHeight;
                const generousMaxHeight = sectionHeight * 1.5 > 1000 ? sectionHeight * 1.5 : 1000;

                targetSection.style.maxHeight = generousMaxHeight + 'px';
                targetSection.style.paddingTop = '30px';
                targetSection.style.paddingBottom = '30px';
                targetSection.style.marginTop = '30px';
                targetSection.style.marginBottom = '30px';
                targetSection.style.opacity = '1';
                targetSection.style.transform = 'translateY(0)';

                link.classList.add('active');

                setTimeout(() => {
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 500);
            }
        });
    });

    const initialSection = document.getElementById('about');
    const initialNavLink = document.querySelector('.nav-link[data-section="about"]');

    if (initialSection && initialNavLink) {
        // Isso será aplicado apenas se 'about' for a seção inicial.
        // O tema já terá sido aplicado pela função applyTheme().
        initialSection.classList.remove('hidden');

        const initialSectionHeight = initialSection.scrollHeight;
        const generousInitialMaxHeight = initialSectionHeight * 1.5 > 1000 ? initialSectionHeight * 1.5 : 1000;

        initialSection.style.maxHeight = generousInitialMaxHeight + 'px';
        initialSection.style.paddingTop = '30px';
        initialSection.style.paddingBottom = '30px';
        initialSection.style.marginTop = '30px';
        initialSection.style.marginBottom = '30px';
        initialSection.style.opacity = '1';
        initialSection.style.transform = 'translateY(0)';

        initialNavLink.classList.add('active');
    }
});