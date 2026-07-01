/* ==========================================================================
   TECH FROM TCHAD — script.js
   Compte à rebours, navbar au scroll, FAQ, envoi WhatsApp, AOS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- AOS (Animate On Scroll) ---------- */
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }

  /* ---------- Année du footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar : effet au scroll ---------- */
  const navbar = document.getElementById('mainNav');
  const toggleNavbarStyle = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  toggleNavbarStyle();
  window.addEventListener('scroll', toggleNavbarStyle, { passive: true });

  /* Fermer le menu mobile après un clic sur un lien */
  const navMenu = document.getElementById('navMenu');
  document.querySelectorAll('#navMenu .nav-link, #navMenu .tft-btn-nav').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navMenu);
        bsCollapse.hide();
      }
    });
  });

  /* ---------- Compte à rebours vers le 10 juillet 2026 ---------- */
  const COUNTDOWN_TARGET = new Date('2026-07-10T00:00:00');

  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');

  const pad = (n) => String(n).padStart(2, '0');

  const updateCountdown = () => {
    const now = new Date();
    let diff = COUNTDOWN_TARGET - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minutesEl.textContent = pad(minutes);
    secondsEl.textContent = pad(seconds);
  };

  if (daysEl) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* ---------- Formulaire d'inscription -> WhatsApp ---------- */
  const form = document.getElementById('registrationForm');
  const WHATSAPP_NUMBER = '23569845000';

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const nom = document.getElementById('nom').value.trim();
      const prenom = document.getElementById('prenom').value.trim();
      const telephone = document.getElementById('telephone').value.trim();
      const ville = document.getElementById('ville').value.trim();
      const niveau = document.getElementById('niveau').value;
      const experience = document.getElementById('experience').value;
      const expediteur = document.getElementById('expediteur').value.trim();
      const montant = document.getElementById('montant').value.trim();

      const message =
`Bonjour Tech From Tchad, je souhaite m'inscrire à la formation "Maintenance de base d'un ordinateur" 🖥️

👤 Nom : ${nom}
👤 Prénom : ${prenom}
📞 Téléphone : ${telephone}
🏙️ Ville : ${ville}
🎓 Niveau d'études : ${niveau}
💻 Expérience en informatique : ${experience}
💳 Nom de l'expéditeur du paiement : ${expediteur}
💰 Montant payé : ${montant} FCFA

Merci de confirmer mon inscription.`;

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank', 'noopener');
    });
  }

  /* ---------- Scrollspy léger : surligner le lien actif ---------- */
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('#navMenu .nav-link');

  const highlightActiveLink = () => {
    let currentId = '';
    sections.forEach(section => {
      const top = section.offsetTop - 140;
      if (window.scrollY >= top) {
        currentId = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  };
  window.addEventListener('scroll', highlightActiveLink, { passive: true });
  highlightActiveLink();

});
