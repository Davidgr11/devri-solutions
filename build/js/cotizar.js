// VARIABLES
const container = document.getElementById('pricing-container');
const summaryList = document.getElementById('summary-list');
const summaryTotal = document.getElementById('summary-total');
let seleccionados = [];

// OBTIENE ID DE SERVICIO SELECCIONADO EN LA URL
function getServicioIdDeURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('cotizar');
}

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {
    const servicioIdDeURL = getServicioIdDeURL();

    fetch('/build/js/cotizar.json')
        .then(res => res.json())
        .then(servicios => {
            servicios.forEach(servicio => {
                // Si viene un id en la URL y coincide, lo agrega a seleccionados
                if (servicioIdDeURL && servicio.id === servicioIdDeURL && !seleccionados.some(s => s.id === servicio.id)) {
                    seleccionados.push(servicio);
                }
                renderCard(servicio);
            });
            renderResumen();
            // Marca seleccionados visualmente al cargar
            marcarSeleccionados();
        });
});

function renderCard(servicio) {
    const card = document.createElement('div');
    card.className = 'pricing__service';
    card.dataset.id = servicio.id;

    card.innerHTML = `
        <h4 class="pricing__service-name">${servicio.nombre}</h4>
        <p class="pricing__service-subtitle">${servicio.subtitulo}</p>
        <button class="pricing__service-select-btn">Seleccionar</button>
        <a class="pricing__service-details" href="servicios.html?id=${servicio.id}">Ver detalles</a>
    `;

    // Si ya está seleccionado por default, marca el botón y la tarjeta
    if (seleccionados.some(s => s.id === servicio.id)) {
        card.classList.add('selected');
        const btn = card.querySelector('.pricing__service-select-btn');
        btn.classList.add('is-selected');
        btn.textContent = 'Seleccionado';
    }

    const btn = card.querySelector('.pricing__service-select-btn');
    btn.addEventListener('click', () => toggleSeleccion(servicio, card));

    container.appendChild(card);
}

// Marca tarjetas ya seleccionadas al recargar o desde URL
function marcarSeleccionados() {
    document.querySelectorAll('.pricing__service').forEach(card => {
        const id = card.dataset.id;
        const btn = card.querySelector('.pricing__service-select-btn');
        if (seleccionados.some(s => s.id === id)) {
            card.classList.add('selected');
            btn.classList.add('is-selected');
            btn.textContent = 'Seleccionado';
        } else {
            card.classList.remove('selected');
            btn.classList.remove('is-selected');
            btn.textContent = 'Seleccionar';
        }
    });
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
    const whatsappLink = document.getElementById('summary-whatsapp');
    let mensaje = "¡Hola! Quiero información de estos servicios:%0A";

    if (seleccionados.length === 0) {
        summaryTotal.textContent = '';
        if (whatsappLink) {
            whatsappLink.href = "";
            whatsappLink.classList.add('hidden');
        }
        return;
    } else {
        seleccionados.forEach(service => {
            let costo = service.precioFijo !== undefined
                ? service.precioFijo
                : (service.horas * service.precioHora);

            total += costo;

            const item = document.createElement('li');
            item.classList.add('pricing__summary-item');
            const icon = document.createElement('span');
            icon.classList.add('material-symbols-rounded');
            icon.textContent = 'check';
            const description = document.createElement('p');
            description.textContent = `${service.nombre}`;
            item.appendChild(icon);
            item.appendChild(description);
            summaryList.appendChild(item);

            mensaje += `- ${service.nombre}%0A`;
        });

        const rango = `${total.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} MXN + IVA`;
        summaryTotal.textContent = rango;
        mensaje += `%0A*Precio estimado:* ${rango}`;

        // Cambia el número aquí por el tuyo real:
        const numero = "525531434429";
        const whatsappURL = `https://wa.me/${numero}?text=${mensaje}`;

        if (whatsappLink) {
            whatsappLink.href = whatsappURL;
            whatsappLink.classList.remove('hidden');
        }
    }
}
