// frontend/static/frontend/js/recursos.js

document.addEventListener('DOMContentLoaded', () => {
    const tablaBody = document.querySelector('#tabla-recursos tbody');
    const btnPdf = document.getElementById('btn-descargar-pdf');

    // Función para obtener token JWT guardado en localStorage (si tu API exige autenticación).
    const getToken = () => localStorage.getItem('access_token');

    // 1. Cargar la tabla HTML con todos los recursos de la API
    function cargarTablaRecursos() {
        const token = getToken();
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        fetch('/recursos/api/v1/', { headers })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    // No autorizado → redirigimos a login
                    window.location.href = '/login/';
                    throw new Error('No autorizado');
                }
                if (!res.ok) throw new Error(`Error ${res.status} al cargar recursos`);
                return res.json();
            })
            .then(data => {
                // data = array de objetos recurso
                tablaBody.innerHTML = ''; // limpio contenido previo
                data.forEach(rec => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
              <td>${rec.id}</td>
              <td>${rec.nombre}</td>
              <td>${rec.descripcion || ''}</td>
              <td>${rec.tipo}</td>
              <td>${rec.cantidad_total}</td>
              <td>${rec.cantidad_disponible}</td>
              <td>${new Date(rec.fecha_creacion).toLocaleString()}</td>
              <td>${new Date(rec.fecha_actualizacion).toLocaleString()}</td>
            `;
                    tablaBody.appendChild(tr);
                });
            })
            .catch(err => console.error('Error al cargar la tabla:', err));
    }

    // 2. Generar PDF “a mano” sin autoTable
    function generarPdfRecursos() {
        const token = getToken();
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        fetch('/recursos/api/v1/', { headers })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    window.location.href = '/login/';
                    throw new Error('No autorizado');
                }
                if (!res.ok) throw new Error(`Error ${res.status} al cargar recursos para PDF`);
                return res.json();
            })
            .then(data => {
                // “data” = array de recursos
                // Usamos jsPDF desde el global window.jspdf
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF({
                    orientation: 'landscape',
                    unit: 'pt',
                    format: 'a4',
                });

                // Configuración inicial
                let y = 40;
                const margenX = 40;
                const anchoPagina = doc.internal.pageSize.getWidth();
                const altoPagina = doc.internal.pageSize.getHeight();

                doc.setFontSize(14);
                doc.text('Listado de Recursos', margenX, y);
                y += 20;

                // Encabezado de tabla manual
                doc.setFontSize(10);
                const encabezados = [
                    'ID',
                    'Nombre',
                    'Descripción',
                    'Tipo',
                    'Cant. Total',
                    'Cant. Disp.',
                    'Creación',
                    'Actualización',
                ];
                // Dibujamos los nombres de columna separados por “|” (o como prefieras).
                doc.text(
                    encabezados.join(' | '),
                    margenX,
                    y
                );
                y += 15;

                doc.setLineWidth(0.5);
                doc.line(margenX, y - 5, anchoPagina - margenX, y - 5);
                y += 10;

                // Recorremos cada recurso y lo pintamos en una línea
                data.forEach(rec => {
                    // Preparamos los valores (limitar texto si es muy largo)
                    const desc = rec.descripcion ? rec.descripcion.substring(0, 30) + (rec.descripcion.length > 30 ? '...' : '') : '';
                    const linea = [
                        rec.id,
                        rec.nombre,
                        desc,
                        rec.tipo,
                        rec.cantidad_total,
                        rec.cantidad_disponible,
                        new Date(rec.fecha_creacion).toLocaleString(),
                        new Date(rec.fecha_actualizacion).toLocaleString(),
                    ].join(' | ');

                    // Antes de escribir, comprobamos si “y” supera el espacio disponible
                    if (y > altoPagina - 40) {
                        doc.addPage();
                        y = 40;
                    }

                    doc.text(linea, margenX, y);
                    y += 12;
                });

                // Forzar descarga
                const ahora = new Date();
                const fechaStr = ahora.toISOString().split('T')[0]; // yyyy-mm-dd
                doc.save(`recursos_${fechaStr}.pdf`);
            })
            .catch(err => console.error('Error al generar PDF de recursos:', err));
    }

    // 3. Al cargar la página, primero “poblar” la tabla HTML…
    cargarTablaRecursos();

    // 4. …y luego asignar el listener al botón de PDF
    if (btnPdf) {
        btnPdf.addEventListener('click', () => {
            generarPdfRecursos();
        });
    }
});
