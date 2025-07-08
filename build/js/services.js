const params = new URLSearchParams(window.location.search);
const servicioID = params.get('id');
const title = document.querySelector('.hero__services--title');
const subtitle = document.querySelector('.hero__services--subtitle');
const serInfoTitle = document.querySelector('.serInfo__title');
const serInfoTitle2 = document.querySelector('.serInfo__title2');
const serInfoText = document.querySelector('.serInfo__text');
const serInfoImg = document.querySelector('.serInfo__img');
const usos = document.querySelector('.serInfo__usos');
const serInfodata = document.querySelector('.serInfo__data');
const serviciosGeneral = document.querySelector('.services');
const serIncludes = document.querySelector('.serInfo__includes--list');
const link = document.querySelector('.serInfo__cta--btn');

// Cargar JSON dinámicamente
const url = '/build/js/services.json'; // Ruta al archivo JSON
fetch(url)
  .then(res => res.json())
  .then(servicios => {
    const servicio = servicios[servicioID];

    if (servicio) {
      // Limpiar contenido previo
      serviciosGeneral.remove();
      title.textContent = servicio.titulo;
      subtitle.textContent = servicio.subtitulo || ''; // Manejar subtítulo si existe
      serInfoTitle.textContent = servicio.infoTitle || 'Información del Servicio'; // Manejar título de información si existe
      serInfoText.textContent = servicio.infoText || 'Descripción del servicio no disponible.'; // Manejar texto de información si existe
      serInfoImg.src = servicio.infoImg || ''; // Manejar imagen de información si existe
      serInfoTitle2.textContent = servicio.infoTitle2 || 'Información Adicional'; // Manejar segundo título de información si existe
      servicio.useCases.forEach(usecase => {
        const usecaseElement = document.createElement('div');
        usecaseElement.classList.add('serInfo__uso');
        const span = document.createElement('span');
        span.textContent = 'lightbulb';
        span.classList.add('material-symbols-rounded');
        const useCaseText = document.createElement('p');
        useCaseText.classList.add('serInfo__uso--text');
        useCaseText.textContent = usecase || 'Descripción del caso de uso no disponible.';

        usecaseElement.appendChild(span);
        usecaseElement.appendChild(useCaseText);

        usos.appendChild(usecaseElement);
      });
      servicio.data.forEach(data => {
        const dataElement = document.createElement('div');
        dataElement.classList.add('serInfo__data--container');

        const dataNumber = document.createElement('span');
        dataNumber.textContent = data.number || '0';
        dataNumber.classList.add('serInfo__data--number');

        const dataText = document.createElement('p');
        dataText.classList.add('serInfo__data--text');
        dataText.textContent = data.text || 'Descripción de los datos no disponible.';

        dataElement.appendChild(dataNumber);
        dataElement.appendChild(dataText);

        serInfodata.appendChild(dataElement);
      });
      servicio.includes.forEach(usecase => {
        const includesElement = document.createElement('div');
        includesElement.classList.add('serInfo__includes--item');
        const span = document.createElement('span');
        span.textContent = 'check';
        span.classList.add('material-symbols-rounded');
        const includeText = document.createElement('p');
        includeText.classList.add('seriInfo__includes--item--text');
        includeText.textContent = usecase || 'Descripción del caso de uso no disponible.';

        includesElement.appendChild(span);
        includesElement.appendChild(includeText);

        serIncludes.appendChild(includesElement);
      });
      link.href = `cotizar.html?cotizar=${servicioID}`; // Actualizar el enlace de cotización
    } else {
      title.textContent = 'Nuestros Servicios';
      subtitle.textContent = 'Creamos soluciones digitales para impulsar cada etapa de tu negocio o marca.';
      const serInfoButtons = document.querySelector('.hero__services--buttons');
      const serInfoUseCases = document.querySelector('.serInfo');
      const serInfoStats = document.querySelector('.serInfo__aside');
      const serInfoCta = document.querySelector('.serInfo__cta');
      const serInfoIncludes = document.querySelector('.serInfo__includes');
      serInfoButtons.remove();
      serInfoUseCases.remove();
      serInfoStats.remove();
      serInfoCta.remove();
      serInfoIncludes.remove();
    }
  })
  .catch(error => {
    console.error('Error al cargar el JSON:', error);
    title.innerHTML = `<h1>Error al cargar los servicios</h1>`;
  });


const copy = document.querySelector('.footer__copy');
const currentYear = new Date().getFullYear();
copy.textContent = `© ${currentYear} Devri Solutions. Todos los derechos reservados.`;