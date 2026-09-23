const header = document.querySelector('.header');
const SCROLL_THRESHOLD = 120;

window.addEventListener('scroll', () => {
  if (window.scrollY > SCROLL_THRESHOLD) {
    header.classList.add('is-visible');
  } else {
    header.classList.remove('is-visible');
  }
}, { passive: true });