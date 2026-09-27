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
  const DESTINO_URL = "ekexis.html";

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
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const triggerEl = document.querySelector('.story');
  const caps = gsap.utils.toArray('.story__cap');

  if (!triggerEl || caps.length === 0) return;

  gsap.registerPlugin(ScrollTrigger);

  caps.forEach((cap, i) => {
    gsap.set(cap, {
      opacity: i === 0 ? 1 : 0,
      y: i === 0 ? 0 : 30,
      filter: i === 0 ? 'blur(0px)' : 'blur(8px)',
      pointerEvents: i === 0 ? 'auto' : 'none'
    });
  });

  const scrollDistance = (caps.length - 1) * 1000;
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerEl,
      start: 'top top',
      end: `+=${scrollDistance}`,
      pin: true,
      anticipatePin: 1, 
      scrub: 0.8,       
      invalidateOnRefresh: true
    }
  });

  caps.forEach((cap, index) => {
    const isFirst = index === 0;
    const isLast = index === caps.length - 1;

    if (isFirst) {
      tl.to({}, { duration: 1.5 });
      tl.to(cap, {
        opacity: 0,
        y: -25,
        filter: 'blur(8px)',
        duration: 1,
        ease: 'power2.inOut',
        onComplete: () => { cap.style.pointerEvents = 'none'; }
      });
    } else {

      tl.to(cap, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.inOut',
        onStart: () => { cap.style.pointerEvents = 'auto'; }
      }, '-=0.2'); 

      tl.to({}, { duration: 2.0 });

      if (!isLast) {
        tl.to(cap, {
          opacity: 0,
          y: -25,
          filter: 'blur(8px)',
          duration: 1,
          ease: 'power2.inOut',
          onComplete: () => { cap.style.pointerEvents = 'none'; }
        });
      }
    }
  });

  ScrollTrigger.refresh();
});