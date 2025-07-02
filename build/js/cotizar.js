// VARIABLES
const container = document.getElementById('pricing-container');
const summaryList = document.getElementById('summary-list');
const summaryTotal = document.getElementById('summary-total');
let seleccionados = [];

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {
    renderResumen();

    fetch('/build/js/cotizar.json')
        .then(res => res.json())
        .then(servicios => {
            servicios.forEach(servicio => renderCard(servicio));
        });
});


function renderCard(servicio) {
    const card = document.createElement('div');
    card.className = 'pricing__service';
    card.dataset.id = servicio.id;

    const incluyeHTML = servicio.incluye
        .map(item => `<li class="pricing__service-benefit">
            <span class="material-symbols-rounded">check</span>${item}</li>`)
        .join('');

    card.innerHTML = `
    <h4 class="pricing__service-name">${servicio.nombre}</h4>
    <p class="pricing__service-subtitle">${servicio.subtitulo}</p>
    <ul class="pricing__service-list">${incluyeHTML}</ul>
    <button class="pricing__service-select-btn">Seleccionar</button>
  `;

    const btn = card.querySelector('.pricing__service-select-btn');
    btn.addEventListener('click', () => toggleSeleccion(servicio, card));

    container.appendChild(card);
}

function toggleSeleccion(servicio, card) {
    const yaSeleccionado = seleccionados.find(s => s.id === servicio.id);
    const btn = card.querySelector('.pricing__service-select-btn');

    if (yaSeleccionado) {
        seleccionados = seleccionados.filter(s => s.id !== servicio.id);
        card.classList.remove('selected');
        btn.classList.remove('is-selected');
        btn.textContent = 'Seleccionar';
    } else {
        seleccionados.push(servicio);
        card.classList.add('selected');
        btn.classList.add('is-selected');
        btn.textContent = 'Seleccionado';
    }

    renderResumen();
}

function renderResumen() {
    summaryList.innerHTML = '';
    let total = 0;

    if (seleccionados.length === 0) {
        summaryList.innerHTML = '<li>Selecciona los servicios de tu interés para obtener la cotización.</li>';
        summaryTotal.textContent = '';
        return;
    }
    else {
        seleccionados.forEach(service => {
            // Set the cost
            const costo = service.horas * service.precioHora;
            total += costo;
            // List item
            const item = document.createElement('li');
            item.classList.add('pricing__summary-item');
            // Icon
            const icon = document.createElement('span');
            icon.classList.add('material-symbols-rounded');
            icon.textContent = 'check';
            // Text
            const description = document.createElement('p');
            description.textContent = `${service.nombre}`
            // Append
            item.appendChild(icon);
            item.appendChild(description);
            summaryList.appendChild(item);
        });

        summaryTotal.textContent = `$${total} a $${total+(total/2)} MXN`;

    }
    
}
