document.addEventListener('DOMContentLoaded', () => {
  // ----- FUNCIÓN REUTILIZABLE -----
  function setupCarousel(carouselSelector, cardSelector, btnPrevSelector, btnNextSelector) {
    const carousel = document.querySelector(carouselSelector);
    const btnPrev = document.querySelector(btnPrevSelector);
    const btnNext = document.querySelector(btnNextSelector);

    if (!carousel || !btnPrev || !btnNext) return;

    // Detecta la cantidad de scroll por card
    const getCardWidth = () => {
      const firstCard = carousel.querySelector(cardSelector);
      if (!firstCard) return 0;
      const style = window.getComputedStyle(firstCard);
      const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
      return firstCard.offsetWidth + margin;
    };

    // Oculta/activa los botones según el scroll
    const updateButtons = () => {
      // Al inicio
      btnPrev.style.display = carousel.scrollLeft <= 0 ? 'none' : '';
      // Al final
      const tolerance = 5;
      btnNext.style.display =
        (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - tolerance)
          ? 'none'
          : '';
    };

    // Inicializar estado de botones
    updateButtons();

    btnNext.addEventListener('click', () => {
      carousel.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
    });

    btnPrev.addEventListener('click', () => {
      carousel.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
    });

    // Actualizar al hacer scroll manual o por botón
    carousel.addEventListener('scroll', updateButtons);
    window.addEventListener('resize', updateButtons);
  }

  // ----- APLICA LA FUNCIÓN PARA CADA CARRUSEL -----

  // 1. Carrusel de software
  setupCarousel(
    '.services__carousel',
    '.service--software',
    '.services__carouselBtn--prev',
    '.services__carouselBtn--next'
  );

  // 2. Carrusel de marketing
  setupCarousel(
    '.services__carousel2',
    '.service--marketing',
    '.services__carouselBtn--prev2',
    '.services__carouselBtn--next2'
  );

  // 3. Carrusel de reseñas
  setupCarousel(
    '.reviews__carousel',
    '.review',
    '.reviews__carouselBtn--prev',
    '.reviews__carouselBtn--next'
  );
});
