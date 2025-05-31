import React, { useState } from "react";
import { createPeticion } from "../../services/peticiones.service";

const CreatePeticion = ({ onSubmit, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const data = {
      recurso: formData.get("recurso"),
      cantidad_solicitada: parseInt(formData.get("cantidad_solicitada")),
      fecha_entrega_esperada: formData.get("fecha_entrega_esperada"),
      fecha_devolucion_esperada: formData.get("fecha_devolucion_esperada"),
      notas: formData.get("notas"),
    };

    try {
      await createPeticion(data);
      onSubmit();
    } catch (error) {
      console.error("Error creando petición:", error);
      alert("Hubo un error al crear la petición. Revisa la consola para más detalles.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input
        type="text"
        name="recurso"
        placeholder="ID Recurso"
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        name="cantidad_solicitada"
        placeholder="Cantidad"
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="date"
        name="fecha_entrega_esperada"
        placeholder="Fecha Entrega Esperada"
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="date"
        name="fecha_devolucion_esperada"
        placeholder="Fecha Devolución Esperada"
        className="w-full p-2 border rounded"
      />
      <textarea
        name="notas"
        placeholder="Notas"
        className="w-full p-2 border rounded"
      />
      <div className="flex justify-end gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {isSubmitting ? "Creando..." : "Crear"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default CreatePeticion;