// frontend/static/frontend/js/usuarios.js

document.addEventListener('DOMContentLoaded', () => {
    const tablaBody = document.querySelector('#tabla-usuarios tbody');
    const btnNuevo = document.getElementById('btn-nuevo-usuario');

    const getToken = () => localStorage.getItem('access_token');

    if (tablaBody) {
        fetch('/usuarios/api/v1/', {
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
              <td>${item.nombre}</td>
              <td>${item.correo}</td>
              <td>${item.rol}</td>
              <td>
                <a href="/usuarios/editar/${item.id}/">Editar</a>
                <button data-id="${item.id}" class="btn-eliminar-usuario">Eliminar</button>
              </td>
            `;
                    tablaBody.appendChild(tr);
                });

                document.querySelectorAll('.btn-eliminar-usuario').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const id = btn.getAttribute('data-id');
                        if (!confirm(`¿Eliminar usuario con ID ${id}?`)) return;

                        fetch(`/usuarios/api/v1/${id}/`, {
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
                                    alert('Error al eliminar el usuario.');
                                }
                            });
                    });
                });
            })
            .catch(err => {
                console.error('Error al obtener usuarios:', err);
            });
    }

    if (btnNuevo) {
        btnNuevo.addEventListener('click', () => {
            window.location.href = '/usuarios/nuevo/';
        });
    }
});
