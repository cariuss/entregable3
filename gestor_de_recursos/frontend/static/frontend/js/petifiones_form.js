// frontend/static/frontend/js/peticiones_form.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-peticion');
    if (!form) return;

    const getToken = () => localStorage.getItem('access_token');
    const pk = document.getElementById('peticion-id').value;

    if (pk) {
        fetch(`/peticiones/api/v1/${pk}/`, {
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
                return res.json();
            })
            .then(data => {
                document.getElementById('titulo').value = data.titulo || '';
                document.getElementById('detalle').value = data.detalle || '';
            })
            .catch(err => {
                console.error('Error al cargar la petición:', err);
            });
    }

    form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const payload = {
            titulo: document.getElementById('titulo').value.trim(),
            detalle: document.getElementById('detalle').value.trim(),
        };

        let url = '/peticiones/api/v1/';
        let method = 'POST';
        if (pk) {
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
                    window.location.href = '/peticiones/';
                } else {
                    return response.json().then(errData => {
                        alert('Error: ' + JSON.stringify(errData));
                    });
                }
            })
            .catch(err => {
                console.error('Error al guardar petición:', err);
            });
    });
});
