import { jsPDF } from 'jspdf';

export const generatePDF = (data) => {
    const doc = new jsPDF({
        orientation: 'landscape',
        // format: 'a3' // Changed to A3 format
    });
    doc.setFontSize(10);
    doc.setFontSize(20);
    doc.text("Lista de Recursos", 10, 10);
    doc.setFontSize(10);

    const tableColumn = ["ID", "Nombre", "Descripción", "Tipo", "C_Total", "C_Disponible"];
    const columnWidths = [25, 50, 80, 50, 50, 30, 20, 20]; // Adjust as needed
    let startY = 30;
    let startX = 10;
    const rowHeight = 10;

    // Headers
    tableColumn.forEach((column, index) => {
        doc.setFont(undefined, 'bold');
        doc.rect(startX, startY, columnWidths[index], rowHeight, 'S');
        doc.text(column, startX + 1, startY + 6);
        startX += columnWidths[index];
    });

    startY += rowHeight;
    startX = 10;

    // Rows
    data.forEach(recurso => {
        const recursoData = [
            recurso.id,
            recurso.nombre,
            recurso.descripcion,
            recurso.tipo,
            recurso.cantidad_total,
            recurso.cantidad_disponible,
        ];

        recursoData.forEach((cell, index) => {
            doc.setFont(undefined, 'normal');
            doc.rect(startX, startY, columnWidths[index], rowHeight, 'S');
            doc.text(String(cell), startX + 1, startY + 6);
            startX += columnWidths[index];
        });

        startY += rowHeight;
        startX = 10;
    });

    doc.save("recursos.pdf");
}
