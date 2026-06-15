/* ═══════════════════════════════════════════════════════════════
   BOGOTÁ BLING — main.js
   ═══════════════════════════════════════════════════════════════ */

const WA_NUMBER = '573177810009';
const WA_BASE   = `https://wa.me/${WA_NUMBER}`;

/* ─── Reemplazar todos los links de WhatsApp ─────────────────── */
function updateWhatsAppLinks() {
  const links = [
    { selector: '.nav__cta',          msg: 'Hola, quiero ver el catálogo de relojes Bogotá Bling 🕐' },
    { selector: '.hero__actions a:first-child', msg: 'Hola, quiero consultar por un reloj de Bogotá Bling 🕐' },
    { selector: '.catalogo__footer a', msg: 'Hola, quiero ver el catálogo completo de Bogotá Bling 🕐' },
    { selector: '.porque__left a',    msg: 'Hola, quiero hablar con un asesor de Bogotá Bling 🕐' },
    { selector: '.prox-card--cta a',  msg: 'Hola, quiero ser parte del lanzamiento de Bogotá Bling 🚀' },
    { selector: '.footer__social-link--wa', msg: 'Hola, me interesa un reloj de Bogotá Bling 🕐' },
    { selector: '.fab-wa',            msg: 'Hola, me interesa un reloj de Bogotá Bling 🕐' },
  ];

  links.forEach(({ selector, msg }) => {
    document.querySelectorAll(selector).forEach(el => {
      el.href = `${WA_BASE}?text=${encodeURIComponent(msg)}`;
    });
  });
}

/* ─── Datos del catálogo ─────────────────────────────────────── */
const watches = [
  {
    brand: 'Rolex',
    name: 'Submariner Date',
    ref: 'Ref. 126610LN',
    price: '$18.500.000',
    emoji: '🕐',
    badge: 'Bestseller',
    msg: 'Hola, me interesa el Rolex Submariner Date Ref. 126610LN 🕐',
  },
  {
    brand: 'Audemars Piguet',
    name: 'Royal Oak',
    ref: 'Ref. 15510ST',
    price: '$42.000.000',
    emoji: '⌚',
    badge: 'Exclusivo',
    msg: 'Hola, me interesa el Audemars Piguet Royal Oak Ref. 15510ST ⌚',
  },
  {
    brand: 'Patek Philippe',
    name: 'Nautilus',
    ref: 'Ref. 5711/1A-010',
    price: '$95.000.000',
    emoji: '🕰️',
    badge: 'Edición Limitada',
    msg: 'Hola, me interesa el Patek Philippe Nautilus Ref. 5711/1A-010 🕰️',
  },
  {
    brand: 'TAG Heuer',
    name: 'Carrera Calibre 16',
    ref: 'Ref. CV2A1R.FC6235',
    price: '$8.200.000',
    emoji: '🕑',
    badge: 'Disponible',
    msg: 'Hola, me interesa el TAG Heuer Carrera Calibre 16 ⌚',
  },
  {
    brand: 'IWC',
    name: 'Portugieser Tourbillon',
    ref: 'Ref. IW546304',
    price: '$62.000.000',
    emoji: '🕒',
    badge: 'Premium',
    msg: 'Hola, me interesa el IWC Portugieser Tourbillon 🕒',
  },
  {
    brand: 'Omega',
    name: 'Speedmaster Moonwatch',
    ref: 'Ref. 310.30.42.50.01.001',
    price: '$14.800.000',
    emoji: '🕓',
    badge: 'Icónico',
    msg: 'Hola, me interesa el Omega Speedmaster Moonwatch 🕓',
  },
  {
    brand: 'Cartier',
    name: 'Santos de Cartier',
    ref: 'Ref. WSSA0018',
    price: '$22.500.000',
    emoji: '🕔',
    badge: 'Nuevo',
    msg: 'Hola, me interesa el Cartier Santos de Cartier 🕔',
  },
  {
    brand: 'Hublot',
    name: 'Big Bang Unico',
    ref: 'Ref. 441.NX.1171.RX',
    price: '$35.000.000',
    emoji: '🕕',
    badge: 'Trending',
    msg: 'Hola, me interesa el Hublot Big Bang Unico 🕕',
  },
];

/* ─── Renderizar catálogo ────────────────────────────────────── */
function renderCatalogo() {
  const grid = document.getElementById('catalogoGrid');
  if (!grid) return;

  grid.innerHTML = watches.map((w, i) => `
    <article class="watch-card reveal" style="transition-delay:${i * 60}ms">
      <div class="watch-card__img-wrap">
        <span class="watch-card__emoji" role="img" aria-label="${w.name}">${w.emoji}</span>
        <span class="watch-card__badge">${w.badge}</span>
      </div>
      <div class="watch-card__body">
        <p class="watch-card__brand">${w.brand}</p>
        <h3 class="watch-card__name">${w.name}</h3>
        <p class="watch-card__ref">${w.ref}</p>
        <div class="watch-card__footer">
          <div>
            <span class="watch-card__price-label">Precio</span>
            <span class="watch-card__price">${w.price}</span>
          </div>
          <a
            href="${WA_BASE}?text=${encodeURIComponent(w.msg)}"
            target="_blank"
            class="watch-card__btn"
            aria-label="Ver detalles de ${w.name}"
          >
            Ver Detalles
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </article>
  `).join('');
}

/* ─── Navbar scroll ──────────────────────────────────────────── */
function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ─── Hamburger menú ─────────────────────────────────────────── */
function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.classList.toggle('active', open);
    btn.setAttribute('aria-expanded', open);
  });

  // Cerrar al hacer click en un link
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      btn.classList.remove('active');
    });
  });
}

/* ─── Reveal on scroll ───────────────────────────────────────── */
function initReveal() {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ─── Reloj animado (hero) ───────────────────────────────────── */
function initClock() {
  const hour   = document.getElementById('hourHand');
  const minute = document.getElementById('minuteHand');
  const second = document.getElementById('secondHand');
  if (!hour || !minute || !second) return;

  function tick() {
    const now  = new Date();
    const h    = now.getHours() % 12;
    const m    = now.getMinutes();
    const s    = now.getSeconds();
    const ms   = now.getMilliseconds();

    const sDeg = (s + ms / 1000) * 6;
    const mDeg = (m + s / 60) * 6;
    const hDeg = (h + m / 60) * 30;

    hour.style.transform   = `rotate(${hDeg}deg)`;
    minute.style.transform = `rotate(${mDeg}deg)`;
    second.style.transform = `rotate(${sDeg}deg)`;
  }

  tick();
  setInterval(tick, 50); // Smooth second hand
}

/* ─── Smooth anchor scroll ───────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ─── INIT ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderCatalogo();
  updateWhatsAppLinks();
  initNavbar();
  initHamburger();
  initClock();
  initSmoothScroll();

  // Reveal se inicia después de que el DOM esté listo
  requestAnimationFrame(() => {
    setTimeout(initReveal, 100);
  });
});
