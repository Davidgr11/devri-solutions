document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.services__carousel');
  const btnPrev = document.querySelector('.services__carouselBtn--prev');
  const btnNext = document.querySelector('.services__carouselBtn--next');

  if (!carousel || !btnPrev || !btnNext) return;

  // Detecta la cantidad de scroll por card
  const getCardWidth = () => {
    const firstCard = carousel.querySelector('.service--software');
    if (!firstCard) return 0;
    const style = window.getComputedStyle(firstCard);
    const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    return firstCard.offsetWidth + margin;
  };

  btnNext.addEventListener('click', () => {
    carousel.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
  });

  btnPrev.addEventListener('click', () => {
    carousel.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const carousel2 = document.querySelector('.services__carousel2');
  const btnPrev2 = document.querySelector('.services__carouselBtn--prev2');
  const btnNext2 = document.querySelector('.services__carouselBtn--next2');

  if (!carousel2 || !btnPrev2 || !btnNext2) return;

  // Detecta la cantidad de scroll por card
  const getCardWidth = () => {
    const firstCard2 = carousel2.querySelector('.service--marketing');
    if (!firstCard2) return 0;
    const style = window.getComputedStyle(firstCard2);
    const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    return firstCard2.offsetWidth + margin;
  };

  btnNext2.addEventListener('click', () => {
    carousel2.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
  });

  btnPrev2.addEventListener('click', () => {
    carousel2.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const carousel3 = document.querySelector('.reviews__carousel');
  const btnPrev3 = document.querySelector('.reviews__carouselBtn--prev');
  const btnNext3 = document.querySelector('.reviews__carouselBtn--next');

  if (!carousel3 || !btnPrev3 || !btnNext3) return;

  // Detecta la cantidad de scroll por card
  const getCardWidth = () => {
    const firstCard3 = carousel3.querySelector('.review');
    if (!firstCard3) return 0;
    const style = window.getComputedStyle(firstCard3);
    const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    return firstCard3.offsetWidth + margin;
  };

  btnNext3.addEventListener('click', () => {
    carousel3.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
  });

  btnPrev3.addEventListener('click', () => {
    carousel3.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
  });
});
