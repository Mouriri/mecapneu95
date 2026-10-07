/**
 * MECA PNEU 95 - SCRIPT MINIMALISTE & MODERNE
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initBusinessStatus();
    renderReviews();
    initMobileMenu();
});

const PHONE_INTL = "33632338587";

/**
 * Gestion du Mode Sombre / Mode Clair (Dark / Light Theme)
 */
function initThemeToggle() {
    const savedTheme = localStorage.getItem('mecapneu_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const toggleBtns = document.querySelectorAll('.theme-toggle-btn, .theme-toggle');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('mecapneu_theme', newTheme);
        });
    });
}

/**
 * Calcul du statut d'ouverture en direct (7j/7)
 * Lundi au Samedi : 09h00 - 20h00
 * Dimanche : 11h00 - 20h00
 */
function initBusinessStatus() {
    const badges = document.querySelectorAll('.live-status-badge');
    const now = new Date();
    const day = now.getDay(); // 0 = Dimanche, 1 = Lundi, 2 = Mardi, ..., 6 = Samedi
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTime = hour + minute / 60;

    let isOpen = false;
    let nextOpenText = "";

    if (day === 0) { // Dimanche (11h00 - 20h00)
        if (currentTime >= 11 && currentTime < 20) {
            isOpen = true;
        } else if (currentTime < 11) {
            nextOpenText = "Ouvre aujourd'hui à 11h00";
        } else {
            nextOpenText = "Ouvre demain (Lundi) à 09h00";
        }
    } else if (day === 6) { // Samedi (09h00 - 20h00)
        if (currentTime >= 9 && currentTime < 20) {
            isOpen = true;
        } else if (currentTime < 9) {
            nextOpenText = "Ouvre aujourd'hui à 09h00";
        } else {
            nextOpenText = "Ouvre demain (Dimanche) à 11h00";
        }
    } else { // Lundi au Vendredi (09h00 - 20h00)
        if (currentTime >= 9 && currentTime < 20) {
            isOpen = true;
        } else if (currentTime < 9) {
            nextOpenText = "Ouvre aujourd'hui à 09h00";
        } else {
            nextOpenText = "Ouvre demain à 09h00";
        }
    }

    badges.forEach(badge => {
        if (isOpen) {
            badge.className = 'live-status-badge live-badge';
            badge.innerHTML = `<span class="live-dot"></span> Ouvert actuellement (jusqu'à 20h00)`;
        } else {
            badge.className = 'live-status-badge live-badge closed';
            badge.innerHTML = `<span class="live-dot"></span> Fermé actuellement • ${nextOpenText}`;
        }
    });
}

/**
 * Affichage des Avis Clients Google réels
 */
function renderReviews() {
    const container = document.getElementById('reviews-grid');
    if (!container || typeof REVIEWS_DATA === 'undefined') return;

    container.innerHTML = REVIEWS_DATA.map(rev => `
        <div class="review-card">
            <div>
                <div class="review-card-top">
                    <div class="reviewer-name">${rev.name}</div>
                    <div class="review-date">${rev.date}</div>
                </div>
                <div class="review-stars">★★★★★</div>
                <p class="review-text">"${rev.comment}"</p>
            </div>
            <div style="margin-top:0.75rem; font-size:0.78rem; color:var(--text-muted);">
                ✓ ${rev.service}
            </div>
        </div>
    `).join('');
}

/**
 * Menu Hamburger Mobile (Ouvrir / Fermer avec transition fluide)
 */
function initMobileMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');

    if (!hamburgerBtn || !mobileDrawer) return;

    function toggleMenu() {
        const isOpen = mobileDrawer.classList.toggle('open');
        hamburgerBtn.classList.toggle('active', isOpen);
        hamburgerBtn.setAttribute('aria-expanded', isOpen);
        mobileDrawer.setAttribute('aria-hidden', !isOpen);
    }

    function closeMenu() {
        mobileDrawer.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
    }

    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Fermer le menu UNIQUEMENT lors du clic sur un lien d'ancrage interne (#services, #contact, etc.)
    const internalLinks = mobileDrawer.querySelectorAll('.mobile-nav-link[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Fermer si clic en dehors
    document.addEventListener('click', (e) => {
        if (!mobileDrawer.contains(e.target) && !hamburgerBtn.contains(e.target)) {
            closeMenu();
        }
    });

    // Fermer avec la touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
}
