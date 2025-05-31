import React from "react";
import { createRecurso } from "../services/recursos.service";

export const CreateRecurso = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        try {
            const response = await createRecurso(data);
            console.log("Recurso creado:", response);
        } catch (error) {
            console.error("Error al crear el recurso:", error);
            alert("Hubo un error al crear el recurso");
        }
    };
return (
    <div
        className="flex items-center justify-center bg-gray-100"
    >
        <form
            className="p-6 bg-white shadow-lg rounded-lg w-full max-w-lg"
            onSubmit={handleSubmit}
        >
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Crear Recurso
            </h2>
            {[
                { id: "id", type: "text", placeholder: "ID" },
                { id: "nombre", type: "text", placeholder: "Nombre" },
                { id: "descripcion", type: "text", placeholder: "Descripción" },
                { id: "tipo", type: "text", placeholder: "Tipo" },
                { id: "cantidad_total", type: "number", placeholder: "Cantidad Total" },
                { id: "cantidad_disponible", type: "number", placeholder: "Cantidad Disponible" },
            ].map(({ id, type, placeholder }) => (
                <div key={id} className="mb-4">
                    <input
                        type={type}
                        id={id}
                        name={id}
                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                        placeholder={placeholder}
                    />
                </div>
            ))}
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Crear Recurso
            </button>
        </form>
    </div>
);
};

export default CreateRecurso;
