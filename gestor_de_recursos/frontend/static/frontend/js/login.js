// frontend/static/frontend/js/login.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const mensajeError = document.getElementById('mensaje-error');

    if (!form) return;

    form.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        mensajeError.textContent = '';

        const correo = document.getElementById('correo').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!correo || !password) {
            mensajeError.textContent = 'Por favor ingresa correo y contraseña.';
            return;
        }

        try {
            const respuesta = await fetch('/login/api/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo, password }),
            });

            if (!respuesta.ok) {
                // Extraemos el detalle del error (400 o 404)
                const errorData = await respuesta.json();
                if (errorData.detail) {
                    mensajeError.textContent = errorData.detail;
                } else {
                    mensajeError.textContent = 'Credenciales inválidas';
                }
                return;
            }

            const datos = await respuesta.json();
            // Esperamos que LoginView devuelva { access: "...", usuario: { ... } }
            const token = datos.access;
            if (token) {
                // Guardamos el token en localStorage para usarlo en las llamadas fetch posteriores
                localStorage.setItem('access_token', token);
                // También podrías guardar info de usuario si la necesitas:
                localStorage.setItem('usuario_nombre', datos.usuario.nombre);
                localStorage.setItem('usuario_correo', datos.usuario.correo);

                // Redirigimos a la lista de recursos
                window.location.href = '/recursos/';
            } else {
                mensajeError.textContent = 'No se obtuvo token de acceso.';
            }
        } catch (err) {
            console.error('Error en login.js:', err);
            mensajeError.textContent = 'Error de red. Intenta de nuevo.';
        }
    });
});
