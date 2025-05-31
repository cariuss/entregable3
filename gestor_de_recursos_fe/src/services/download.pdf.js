import jsPDF from "jspdf";

export const handleDownloadPDF = (data) => {
  const doc = new jsPDF("landscape");
  const margin = 10;
  const rowHeight = 10;
  const colPadding = 2;
  const startY = 10;

  const columns = [
    { header: "ID", key: "id", width: 30 },
    { header: "Nombre", key: "nombre", width: 40 },
    { header: "Descripción", key: "descripcion", width: 60 },
    { header: "Tipo", key: "tipo", width: 25 },
    { header: "Cantidad Total", key: "cantidad_total", width: 30 },
    { header: "Cantidad Disponible", key: "cantidad_disponible", width: 35 },
    { header: "Fecha Creación", key: "fecha_creacion", width: 40 },
    { header: "Fecha Actualización", key: "fecha_actualizacion", width: 40 },
  ];

  let x = margin;
  let y = startY;

  doc.setFontSize(10);

  // Header
  doc.setFillColor(41, 128, 185);
  doc.setTextColor(255);
  columns.forEach((col) => {
    doc.rect(x, y, col.width, rowHeight, "F");
    doc.text(col.header, x + colPadding, y + 7);
    x += col.width;
  });

  // Rows
  y += rowHeight;
  doc.setTextColor(0);
  data.forEach((item) => {
    x = margin;

    columns.forEach((col) => {
      let value = item[col.key];

      // Formatear fechas si es string ISO
      if (typeof value === "string" && value.includes("T") && col.key.includes("fecha")) {
        value = value.split("T")[0];
      }

      const displayValue = String(value ?? "").slice(0, 40); // por si acaso
      doc.rect(x, y, col.width, rowHeight);
      doc.text(displayValue, x + colPadding, y + 7);
      x += col.width;
    });

    y += rowHeight;

    if (y > 190) {
      doc.addPage("landscape");
      y = startY;
    }
  });

  doc.save("recursos.pdf");
};
