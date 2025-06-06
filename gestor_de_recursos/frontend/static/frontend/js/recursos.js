// frontend/static/frontend/js/recursos.js

document.addEventListener('DOMContentLoaded', () => {
    const tablaBody = document.querySelector('#tabla-recursos tbody');
    const btnNuevo = document.getElementById('btn-nuevo-recurso');

    // Función para obtener el token desde localStorage
    function getToken() {
        return localStorage.getItem('access_token');
    }

    // Si estamos en la página de lista de recursos:
    if (tablaBody) {
        fetch('/recursos/api/v1/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        })
            .then(response => {
                if (response.status === 401 || response.status === 403) {
                    // Si no está autorizado, redirigir a login
                    window.location.href = '/login/';
                    throw new Error('No autorizado');
                }
                return response.json();
            })
            .then(data => {
                tablaBody.innerHTML = '';
                data.forEach(item => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
              <td>${item.id}</td>
              <td>${item.nombre}</td>
              <td>${item.descripcion}</td>
              <td>
                <a href="/recursos/editar/${item.id}/">Editar</a>
                <button data-id="${item.id}" class="btn-eliminar">Eliminar</button>
              </td>
            `;
                    tablaBody.appendChild(tr);
                });

                // Manejador para los botones “Eliminar”
                document.querySelectorAll('.btn-eliminar').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const id = btn.getAttribute('data-id');
                        if (!confirm(`¿Eliminar el recurso ${id}?`)) return;

                        fetch(`/recursos/api/v1/${id}/`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${getToken()}`
                            }
                        })
                            .then(resp => {
                                if (resp.status === 204) {
                                    btn.closest('tr').remove();
                                } else if (resp.status === 401 || resp.status === 403) {
                                    window.location.href = '/login/';
                                } else {
                                    alert('Error al eliminar recurso.');
                                }
                            });
                    });
                });
            })
            .catch(err => {
                console.error('Error al obtener recursos:', err);
            });
    }

    // “Nuevo Recurso” redirige a la plantilla de creación
    if (btnNuevo) {
        btnNuevo.addEventListener('click', () => {
            window.location.href = '/recursos/nuevo/';
        });
    }
});
