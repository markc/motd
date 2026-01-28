/**
 * RentaNet Site JavaScript
 * Marketing enhancements on top of base.js app shell
 * Particles, scroll reveal, footer year
 * Copyright (C) 2015-2026 Mark Constable <mc@netserva.org> (MIT License)
 */

const Site = {
    config: {
        particleCount: 20
    },

    // ============================================
    // FLOATING PARTICLES
    // ============================================

    initParticles() {
        const container = document.getElementById("particles");
        if (!container) return;

        for (let i = 0; i < this.config.particleCount; i++) {
            const particle = document.createElement("div");
            particle.className = "particle";
            particle.style.left = Math.random() * 100 + "%";
            particle.style.animationDelay = Math.random() * 15 + "s";
            particle.style.animationDuration = (10 + Math.random() * 10) + "s";
            container.appendChild(particle);
        }
    },

    // ============================================
    // SCROLL REVEAL ANIMATION
    // ============================================

    initScrollReveal() {
        const revealElements = document.querySelectorAll(".reveal");
        if (revealElements.length === 0) return;

        const revealOnScroll = () => {
            revealElements.forEach(el => {
                const elementTop = el.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                if (elementTop < windowHeight - 100) {
                    el.classList.add("active");
                }
            });
        };

        window.addEventListener("scroll", revealOnScroll, { passive: true });
        revealOnScroll();
    },

    // ============================================
    // DYNAMIC YEAR IN FOOTER
    // ============================================

    initFooterYear() {
        const yearSpan = document.getElementById("year");
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    },

    // ============================================
    // INITIALIZE ALL
    // ============================================

    init() {
        this.initParticles();
        this.initScrollReveal();
        this.initFooterYear();
    }
};

// Auto-init when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Site.init());
} else {
    Site.init();
}

// Global export
window.Site = Site;
