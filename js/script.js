document.addEventListener('DOMContentLoaded', () => {
    // --- Durum ve Elementler (State & Elements) ---
    const app = document.getElementById('app');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    const themeToggle = document.getElementById('themeToggle');
    let contentData = {};

    // --- Tema Yönetimi (Theme Handling) ---
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // --- Mobil Menü (Mobile Menu) ---
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        // Hamburger menü animasyonu
        const bars = menuToggle.querySelectorAll('.bar');
        if (nav.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Linke tıklandığında menüyü kapat
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            const bars = menuToggle.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // --- Veri Çekme (Data Fetching) ---
    async function loadContent() {
        try {
            const response = await fetch('data/content.json');
            if (!response.ok) throw new Error('İçerik yüklenemedi');
            contentData = await response.json();
            handleRoute(); // İlk render
        } catch (error) {
            console.error('İçerik yükleme hatası:', error);
            let errorMessage = 'İçerik yüklenemedi. Lütfen daha sonra tekrar deneyin.';

            if (window.location.protocol === 'file:') {
                errorMessage = `
                    <strong>Dikkat:</strong> Tarayıcı güvenlik kuralları (CORS) nedeniyle, HTML dosyasını doğrudan açtığınızda (file://) dışarıdan veri (JSON) çekilemez.<br><br>
                    Lütfen projeyi çalıştırmak için şunlardan birini yapın:<br>
                    1. VS Code'da <strong>"Live Server"</strong> eklentisini kurun ve "Open with Live Server" diyerek açın.<br>
                    2. Veya projeyi GitHub Pages'e yükleyin.
                `;
            }

            app.innerHTML = `<p class="error-message" style="display:block; text-align:center; max-width: 600px; margin: 2rem auto;">${errorMessage}</p>`;
        }
    }

    // --- Yönlendirme (Routing) ---
    function handleRoute() {
        const hash = window.location.hash || '#home';

        // Aktif linki güncelle
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });

        // Hash'e göre içeriği render et
        switch (hash) {
            case '#home':
                renderHome();
                break;
            case '#about':
                renderAbout();
                break;
            case '#projects':
                renderProjects();
                break;
            case '#contact':
                renderContact();
                break;
            default:
                renderHome();
        }
    }

    window.addEventListener('hashchange', handleRoute);

    // --- Render Fonksiyonları ---
    function renderHome() {
        if (!contentData.profile) return;
        const { name, title, bio, avatar } = contentData.profile;

        app.innerHTML = `
            <section class="section hero">
                <div class="container">
                    <img src="${avatar}" alt="${name}" class="hero-avatar">
                    <h1 class="hero-title">Merhaba, Ben ${name}</h1>
                    <p class="hero-subtitle">${title}</p>
                    <p class="about-content" style="margin-bottom: 2rem;">${bio}</p>
                    <a href="#projects" class="btn">Çalışmalarımı Gör</a>
                </div>
            </section>
        `;
    }

    function renderAbout() {
        if (!contentData.profile) return;
        const { bio } = contentData.profile;

        app.innerHTML = `
            <section class="section">
                <div class="container">
                    <h2 class="section-title">Hakkımda</h2>
                    <div class="about-content">
                        <p>${bio}</p>
                        <p style="margin-top: 1rem;">
                            Web geliştirme dünyasına olan ilgim, kullanıcıların hayatını kolaylaştıran dijital çözümler üretme isteğimle başladı.
                            HTML, CSS ve JavaScript gibi temel teknolojilerin yanı sıra, modern frontend framework'leri ile de projeler geliştiriyorum.
                            Kod kalitesine, performansa ve kullanıcı deneyimine (UX) büyük önem veriyorum.
                        </p>
                        <p style="margin-top: 1rem;">
                            Boş zamanlarımda yeni teknolojileri araştırmayı, açık kaynak projelere katkıda bulunmayı ve teknoloji bloglarını takip etmeyi seviyorum.
                        </p>
                    </div>
                </div>
            </section>
        `;
    }

    function renderProjects() {
        if (!contentData.projects) return;

        const projectsHtml = contentData.projects.map(project => `
            <article class="project-card" id="project-${project.id}">
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <p class="project-desc">${project.description}</p>
                    <div class="project-details" style="display: none; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                        <p>${project.details}</p>
                    </div>
                    <button class="project-link btn-inspect" data-id="${project.id}" style="background:none; border:none; cursor:pointer; font-size:1rem; padding:0; margin-top:1rem;">
                        Projeyi İncele 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </button>
                </div>
            </article>
        `).join('');

        app.innerHTML = `
            <section class="section">
                <div class="container">
                    <h2 class="section-title">Projelerim</h2>
                    <div class="projects-grid">
                        ${projectsHtml}
                    </div>
                </div>
            </section>
        `;

        // İncele butonlarına tıklama olayı ekle
        document.querySelectorAll('.btn-inspect').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                const card = document.getElementById(`project-${id}`);
                const details = card.querySelector('.project-details');
                const icon = e.currentTarget.querySelector('svg');

                if (details.style.display === 'none') {
                    details.style.display = 'block';
                    e.currentTarget.innerHTML = `Kapat <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
                } else {
                    details.style.display = 'none';
                    e.currentTarget.innerHTML = `Projeyi İncele <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
                }
            });
        });
    }

    function renderContact() {
        if (!contentData.contact) return;

        app.innerHTML = `
            <section class="section">
                <div class="container contact-container">
                    <h2 class="section-title">İletişime Geç</h2>
                    <form id="contactForm" class="contact-form" novalidate>
                        <div class="form-group">
                            <label for="name" class="form-label">İsim</label>
                            <input type="text" id="name" name="name" class="form-input" required minlength="2">
                            <span class="error-message">Lütfen isminizi girin (min 2 karakter).</span>
                        </div>
                        <div class="form-group">
                            <label for="email" class="form-label">E-posta</label>
                            <input type="email" id="email" name="email" class="form-input" required>
                            <span class="error-message">Lütfen geçerli bir e-posta adresi girin.</span>
                        </div>
                        <div class="form-group">
                            <label for="message" class="form-label">Mesaj</label>
                            <textarea id="message" name="message" class="form-textarea" required minlength="10"></textarea>
                            <span class="error-message">Lütfen bir mesaj girin (min 10 karakter).</span>
                        </div>
                        <button type="submit" class="btn">Mesaj Gönder</button>
                        <div id="successMessage" class="success-message">
                            Teşekkürler! Mesajınız başarıyla gönderildi.
                        </div>
                    </form>
                </div>
            </section>
        `;

        // Render sonrası form dinleyicisini ekle
        const form = document.getElementById('contactForm');
        form.addEventListener('submit', handleFormSubmit);
    }

    // --- Form Doğrulama (Validation) ---
    function handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const inputs = form.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            const errorSpan = input.nextElementSibling;
            if (!input.checkValidity()) {
                isValid = false;
                errorSpan.style.display = 'block';
                input.style.borderColor = '#ef4444';
            } else {
                errorSpan.style.display = 'none';
                input.style.borderColor = 'var(--border-color)';
            }
        });

        // Gerekirse özel doğrulama mantığı (örn. email için regex)
        const email = form.querySelector('#email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            isValid = false;
            email.nextElementSibling.style.display = 'block';
            email.style.borderColor = '#ef4444';
        }

        if (isValid) {
            // Gönderimi simüle et
            const submitBtn = form.querySelector('button[type="submit"]');
            const successMsg = document.getElementById('successMessage');

            submitBtn.disabled = true;
            submitBtn.textContent = 'Gönderiliyor...';

            setTimeout(() => {
                form.reset();
                submitBtn.style.display = 'none';
                successMsg.style.display = 'block';
            }, 1500);
        }
    }

    // --- Başlatma ---
    loadContent();
});
