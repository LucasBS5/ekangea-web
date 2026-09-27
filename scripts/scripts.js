/* ========== HEADER reveal ========== */

const header = document.querySelector('.header');
const SCROLL_THRESHOLD = 120;

if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('is-visible');
    } else {
      header.classList.remove('is-visible');
    }
  }, { passive: true });
}

/* ========== Formulario ========== */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('redirect-form');
  const inputEl = document.getElementById('name');
  const errorMsg = document.getElementById('error-msg');

  if (!form || !inputEl || !errorMsg) return;

  const PALABRA_SECRETA = "ekexis"; 
  const DESTINO_URL = "https://www.instagram.com/ekangea.tdm3/";

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const inputValor = inputEl.value.trim().toLowerCase();

    if (inputValor === PALABRA_SECRETA) {
      errorMsg.style.display = 'none';
      window.location.href = DESTINO_URL;
    } else {
      errorMsg.style.display = 'block';
    }
  });
});

/* ========== GSAP SCROLL FREEZE ========== */

window.addEventListener('load', () => {
  // Asegura que las librerias cargan
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const triggerEl = document.querySelector('.story');
  const caps = gsap.utils.toArray('.story__cap');

  // Si no existen los elementos en la página actual, salimos sin error
  if (!triggerEl || caps.length === 0) return;

  gsap.registerPlugin(ScrollTrigger);

  // Inicializar el primer capitulo
  gsap.set(caps[0], { opacity: 1, y: 0, filter: 'blur(0px)' });

  // Linea de tiempo atada al scroll
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerEl,
      start: 'top top',
      end: '+=3000',
      pin: true,
      scrub: 1,
    }
  });

  // Animacion
  caps.forEach((cap, index) => {
    if (index === 0) {
      tl.to(cap, {
        opacity: 0,
        y: -40,
        filter: 'blur(8px)',
        duration: 1
      }, '+=0.5');
    } else {
      tl.to(cap, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1
      })
      .to(cap, {
        opacity: 0,
        y: -40,
        filter: 'blur(8px)',
        duration: 1
      }, '+=0.8');
    }
  });

  ScrollTrigger.refresh();
});