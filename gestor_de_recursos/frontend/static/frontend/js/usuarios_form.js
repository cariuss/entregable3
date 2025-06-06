// frontend/static/frontend/js/usuarios_form.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-usuario');
    if (!form) return;

    // Recuperamos el token JWT (si lo guardas en localStorage)
    const getToken = () => localStorage.getItem('access_token');

    // Obtenemos el valor de usuario-id; puede ser 'None' o un número
    const pk = document.getElementById('usuario-id').value;

    // Si estamos en edición (pk distinto de 'None'), hacemos fetch para precargar datos
    if (pk && pk !== 'None') {
        const tokenE = getToken();
        const headersE = { 'Content-Type': 'application/json' };
        if (tokenE) {
            headersE['Authorization'] = `Bearer ${tokenE}`;
        }

        fetch(`/usuarios/api/v1/${pk}/`, {
            headers: headersE
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    // Si no está autorizado, lo llevamos a login
                    window.location.href = '/login/';
                    throw new Error('No autorizado');
                }
                if (!res.ok) {
                    throw new Error(`Error ${res.status} al cargar usuario ${pk}`);
                }
                return res.json();
            })
            .then(data => {
                // Rellenamos cada campo con los datos existentes
                document.getElementById('nombre').value = data.nombre;
                document.getElementById('correo').value = data.correo;
                document.getElementById('numero').value = data.numero;
                document.getElementById('direccion').value = data.direccion;
                document.getElementById('rol').value = data.rol;
                // NOTA: no tocamos el input #password, para que quede vacío (el usuario decide si quiere cambiarla)
            })
            .catch(err => console.error('Error al precargar usuario:', err));
    }

    // Listener para crear o editar usuario
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();

        // Armamos el payload con todos los campos que aparecen en el formulario
        let payload = {
            nombre: document.getElementById('nombre').value.trim(),
            correo: document.getElementById('correo').value.trim(),
            numero: document.getElementById('numero').value.trim(),
            direccion: document.getElementById('direccion').value.trim(),
            rol: document.getElementById('rol').value
        };

        let url = '/usuarios/api/v1/';
        let method = 'POST';

        if (pk && pk !== 'None') {
            // Edición: incluimos el ID en el payload y cambiamos verbo a PUT
            payload.id = parseInt(pk, 10);
            url += `${pk}/`;
            method = 'PUT';

            // Si el input password no está vacío, lo agregamos
            const pwdEdit = document.getElementById('password').value.trim();
            if (pwdEdit) {
                payload.password = pwdEdit;
            }
        } else {
            // Creación: pedimos al usuario que ingrese ID y password
            payload.id = parseInt(document.getElementById('id').value.trim(), 10);
            payload.password = document.getElementById('password').value.trim();
        }

        // Preparamos los headers (con o sin token)
        const token = getToken();
        const headers2 = { 'Content-Type': 'application/json' };
        if (token) headers2['Authorization'] = `Bearer ${token}`;

        fetch(url, {
            method: method,
            headers: headers2,
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (response.status === 401 || response.status === 403) {
                    // No autorizado → volver a login
                    window.location.href = '/login/';
                    throw new Error('No autorizado');
                }
                if (response.ok) {
                    // Éxito: regresamos al listado de usuarios
                    window.location.href = '/usuarios/';
                } else {
                    // Si falla, mostramos el JSON de error
                    return response.json().then(errData => {
                        alert('Error al guardar usuario: ' + JSON.stringify(errData));
                    });
                }
            })
            .catch(err => console.error('Error al guardar usuario:', err));
    });
});
