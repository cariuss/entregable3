// frontend/static/frontend/js/peticiones_form.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-peticion');
    if (!form) return;

    const getToken = () => localStorage.getItem('access_token');
    const pk = document.getElementById('peticion-id').value; // “None” o número

    // ---------------------------------------------------
    // 1) Traer lista de recursos para llenar el <select id="recurso">
    // ---------------------------------------------------
    const cargarRecursosEnSelect = () => {
        const tokenR = getToken();
        let headersR = { 'Content-Type': 'application/json' };
        if (tokenR) headersR['Authorization'] = `Bearer ${tokenR}`;

        fetch('/recursos/api/v1/', {
            headers: headersR
        })
            .then(r => {
                if (r.status === 401 || r.status === 403) {
                    window.location.href = '/login/';
                    throw new Error('No autorizado');
                }
                return r.json();
            })
            .then(listaRecursos => {
                const selectRecurso = document.getElementById('recurso');
                selectRecurso.innerHTML = ''; // Limpiar
                listaRecursos.forEach(r => {
                    const option = document.createElement('option');
                    option.value = r.id;
                    option.textContent = `${r.nombre} (Disponibles: ${r.cantidad_disponible})`;
                    selectRecurso.appendChild(option);
                });
            })
            .catch(err => console.error('Error al cargar recursos:', err));
    };

    cargarRecursosEnSelect();

    // ---------------------------------------------------
    // 2) Si es edición, precargar datos de la petición
    // ---------------------------------------------------
    if (pk && pk !== 'None') {
        const tokenE = getToken();
        let headersE = { 'Content-Type': 'application/json' };
        if (tokenE) headersE['Authorization'] = `Bearer ${tokenE}`;

        fetch(`/peticiones/api/v1/${pk}/`, {
            headers: headersE
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    window.location.href = '/login/';
                    throw new Error('No autorizado');
                }
                if (!res.ok) {
                    throw new Error(`Error ${res.status} al cargar petición ${pk}`);
                }
                return res.json();
            })
            .then(data => {
                document.getElementById('recurso').value = data.recurso;
                document.getElementById('cantidad_solicitada').value = data.cantidad_solicitada;
                // Las fechas vienen en ISO “YYYY-MM-DDTHH:MM:SSZ”: sólo tomamos la parte YYYY-MM-DD
                document.getElementById('fecha_entrega_esperada').value = data.fecha_entrega_esperada;
                document.getElementById('fecha_devolucion_esperada').value = data.fecha_devolucion_esperada || '';
                document.getElementById('estado').value = data.estado;
                document.getElementById('notas').value = data.notas || '';
            })
            .catch(err => console.error('Error al precargar la petición:', err));
    }

    // ---------------------------------------------------
    // 3) Al enviar el formulario: crear o actualizar
    // ---------------------------------------------------
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();

        // Construimos el payload a enviar
        let payload = {
            recurso: document.getElementById('recurso').value,
            cantidad_solicitada: parseInt(document.getElementById('cantidad_solicitada').value, 10),
            fecha_entrega_esperada: document.getElementById('fecha_entrega_esperada').value,
            fecha_devolucion_esperada: document.getElementById('fecha_devolucion_esperada').value || null,
            estado: document.getElementById('estado').value,
            notas: document.getElementById('notas').value.trim()
        };

        let url = '/peticiones/api/v1/';
        let method = 'POST';

        if (pk && pk !== 'None') {
            // En edición, apuntamos a /peticiones/api/v1/<pk>/ y usamos PUT
            payload.id = parseInt(pk, 10);
            url += `${pk}/`;
            method = 'PUT';
        }

        const tokenC = getToken();
        let headersC = { 'Content-Type': 'application/json' };
        if (tokenC) headersC['Authorization'] = `Bearer ${tokenC}`;

        fetch(url, {
            method: method,
            headers: headersC,
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (response.status === 401 || response.status === 403) {
                    window.location.href = '/login/';
                    throw new Error('No autorizado');
                }
                if (response.ok) {
                    window.location.href = '/peticiones/';
                } else {
                    return response.json().then(errData => {
                        alert('Error al guardar petición: ' + JSON.stringify(errData));
                    });
                }
            })
            .catch(err => console.error('Error al guardar petición:', err));
    });
});
