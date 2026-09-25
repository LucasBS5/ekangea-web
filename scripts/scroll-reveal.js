const header = document.querySelector('.header');
const SCROLL_THRESHOLD = 120;

window.addEventListener('scroll', () => {
  if (window.scrollY > SCROLL_THRESHOLD) {
    header.classList.add('is-visible');
  } else {
    header.classList.remove('is-visible');
  }
}, { passive: true });

document.getElementById('redirect-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const inputValor = document.getElementById('name').value.trim().toLowerCase();
    const errorMsg = document.getElementById('error-msg');

    const PALABRA_SECRETA = "ekexis"; 
    const DESTINO_URL = "https://www.instagram.com/ekangea.tdm3/";

    if (inputValor === PALABRA_SECRETA) {
        errorMsg.style.display = 'none';
        window.location.href = DESTINO_URL;
        //window.open(DESTINO_URL, '_blank');
    } else {
        errorMsg.style.display = 'block';
    }
});