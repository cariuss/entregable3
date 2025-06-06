// frontend/static/frontend/js/peticiones.js

document.addEventListener('DOMContentLoaded', () => {
    const tablaBody = document.querySelector('#tabla-peticiones tbody');
    const btnNueva = document.getElementById('btn-nueva-peticion');


    const getToken = () => localStorage.getItem('access_token');

    if (tablaBody) {
        const token = getToken();
        let headersFetch = { 'Content-Type': 'application/json' };
        if (token) headersFetch['Authorization'] = `Bearer ${token}`;

        fetch('/peticiones/api/v1/', {
            headers: headersFetch
        })
            .then(response => {
                if (response.status === 401 || response.status === 403) {
                    // Si no está autenticado, redirigimos al login
                    window.location.href = '/login/';
                    throw new Error('No autorizado');
                }
                return response.json();
            })
            .then(data => {
                // Limpiamos el <tbody> antes de poblar
                tablaBody.innerHTML = '';

                data.forEach(item => {
                    const tr = document.createElement('tr');

                    // Una fila por cada SolicitudRecurso:
                    tr.innerHTML = `
              <td>${item.id}</td>
              <td>${item.usuario.nombre || item.usuario.correo}</td>
              <td>${item.recurso}</td>
              <td>${item.cantidad_solicitada}</td>
              <td>${new Date(item.fecha_solicitud).toLocaleString()}</td>
              <td>${item.estado}</td>
              <td>
                <button class="btn-editar-peticion" data-id="${item.id}">Editar</button>
                <button class="btn-eliminar-peticion" data-id="${item.id}">Eliminar</button>
              </td>
            `;
                    tablaBody.appendChild(tr);
                });


                document.querySelectorAll('.btn-editar-peticion').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const id = btn.getAttribute('data-id');
                        window.location.href = `/peticiones/editar/${id}/`;
                    });
                });


                document.querySelectorAll('.btn-eliminar-peticion').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const id = btn.getAttribute('data-id');
                        if (!confirm(`¿Eliminar la petición #${id}?`)) return;

                        const token2 = getToken();
                        let headers2 = { 'Content-Type': 'application/json' };
                        if (token2) headers2['Authorization'] = `Bearer ${token2}`;

                        fetch(`/peticiones/api/v1/${id}/`, {
                            method: 'DELETE',
                            headers: headers2
                        })
                            .then(resp => {
                                if (resp.status === 204) {
                                    // Quitamos la fila del DOM
                                    btn.closest('tr').remove();
                                } else if (resp.status === 401 || resp.status === 403) {
                                    window.location.href = '/login/';
                                } else {
                                    alert('Error al eliminar la petición.');
                                }
                            });
                    });
                });
            })
            .catch(err => console.error('Error al obtener peticiones:', err));
    }

    if (btnNueva) {
        btnNueva.addEventListener('click', () => {
            window.location.href = '/peticiones/nuevo/';
        });
    }
});
