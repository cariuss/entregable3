// frontend/static/frontend/js/peticiones.js

document.addEventListener('DOMContentLoaded', () => {
    const tablaBody = document.querySelector('#tabla-peticiones tbody');
    const btnNuevo = document.getElementById('btn-nuevo-peticion');
    const getToken = () => localStorage.getItem('access_token');

    if (tablaBody) {
        fetch('/peticiones/api/v1/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        })
            .then(response => {
                if (response.status === 401 || response.status === 403) {
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
              <td>${item.titulo || ''}</td>
              <td>${item.detalle || ''}</td>
              <td>
                <a href="/peticiones/editar/${item.id}/">Editar</a>
                <button data-id="${item.id}" class="btn-eliminar">Eliminar</button>
              </td>
            `;
                    tablaBody.appendChild(tr);
                });

                document.querySelectorAll('.btn-eliminar').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const id = btn.getAttribute('data-id');
                        if (!confirm(`¿Eliminar petición ${id}?`)) return;

                        fetch(`/peticiones/api/v1/${id}/`, {
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
                                    alert('Error al eliminar la petición.');
                                }
                            });
                    });
                });
            })
            .catch(err => {
                console.error('Error al obtener peticiones:', err);
            });
    }

    if (btnNuevo) {
        btnNuevo.addEventListener('click', () => {
            window.location.href = '/peticiones/nuevo/';
        });
    }
});
