// gestor_de_recursos/frontend/static/frontend/js/recursos_form.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-recurso');
    if (!form) return;

    const getToken = () => localStorage.getItem('access_token');
    const pk = document.getElementById('recurso-id').value; // si existe, es edición

    // Si pk existe, precargamos los datos de ese recurso:
    if (pk && pk !== 'None') {
        fetch(`/recursos/api/v1/${pk}/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    window.location.href = '/login/';
                    throw new Error('No autorizado');
                }
                if (!res.ok) {
                    throw new Error(`Error ${res.status} al cargar recurso ${pk}`);
                }
                return res.json();
            })
            .then(data => {
                document.getElementById('nombre').value = data.nombre;
                document.getElementById('descripcion').value = data.descripcion || '';
                document.getElementById('tipo').value = data.tipo;
                document.getElementById('cantidad_total').value = data.cantidad_total;
                document.getElementById('cantidad_disponible').value = data.cantidad_disponible;
            })
            .catch(err => {
                console.error('Error al precargar el recurso:', err);
            });
    }

    form.addEventListener('submit', (evt) => {
        evt.preventDefault();

        // Construimos el payload incluyendo 'id'
        let payload = {
            nombre: document.getElementById('nombre').value.trim(),
            descripcion: document.getElementById('descripcion').value.trim(),
            tipo: document.getElementById('tipo').value.trim(),
            cantidad_total: parseInt(document.getElementById('cantidad_total').value, 10),
            cantidad_disponible: parseInt(document.getElementById('cantidad_disponible').value, 10)
        };

        // Si estamos creando (pk vacío), tomamos el id desde el input
        if (!pk || pk === 'None') {
            payload.id = document.getElementById('id').value.trim();
        } else {
            // En edición incluimos el mismo id (pk)
            payload.id = pk;
        }

        let url = '/recursos/api/v1/';
        let method = 'POST';

        if (pk && pk !== 'None') {
            url += `${pk}/`;
            method = 'PUT';
        }

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (response.status === 401 || response.status === 403) {
                    window.location.href = '/login/';
                    throw new Error('No autorizado');
                }
                if (response.ok) {
                    window.location.href = '/recursos/';
                } else {
                    return response.json().then(errData => {
                        alert('Error al guardar recurso: ' + JSON.stringify(errData));
                    });
                }
            })
            .catch(err => {
                console.error('Error al guardar recurso:', err);
            });
    });
});
