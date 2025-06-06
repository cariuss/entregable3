// frontend/static/frontend/js/usuarios_form.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-usuario');
    if (!form) return;

    const getToken = () => localStorage.getItem('access_token');
    const pk = document.getElementById('usuario-id').value;

    if (pk) {
        fetch(`/usuarios/api/v1/${pk}/`, {
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
                document.getElementById('nombre').value = data.nombre || '';
                document.getElementById('correo').value = data.correo || '';
                document.getElementById('numero').value = data.numero || '';
                document.getElementById('direccion').value = data.direccion || '';
                document.getElementById('rol').value = data.rol || 'usuario_estandar';
            })
            .catch(err => {
                console.error('Error al cargar usuario:', err);
            });
    }

    form.addEventListener('submit', (evt) => {
        evt.preventDefault();

        const payload = {
            nombre: document.getElementById('nombre').value.trim(),
            correo: document.getElementById('correo').value.trim(),
            numero: document.getElementById('numero').value.trim(),
            direccion: document.getElementById('direccion').value.trim(),
            rol: document.getElementById('rol').value
        };

        // Si es creación, pedimos también password
        if (!pk) {
            payload.password = document.getElementById('password').value.trim();
        }

        let url = '/usuarios/api/v1/';
        let method = 'POST';
        if (pk) {
            url += `${pk}/`;
            method = 'PUT';
            // En edición no incluimos password
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
                    window.location.href = '/usuarios/';
                } else {
                    return response.json().then(errData => {
                        alert('Error: ' + JSON.stringify(errData));
                    });
                }
            })
            .catch(err => {
                console.error('Error al guardar usuario:', err);
            });
    });
});
