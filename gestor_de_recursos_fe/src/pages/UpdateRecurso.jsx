import React, { useState } from "react";
import {updateRecurso} from "../services/recursos.service";
export const UpdateRecurso = ({ recursoData, onSubmit }) => {

    const [updatedRecursoData, setUpdatedRecursoData] = useState({
        id: recursoData.id || "",
        nombre: recursoData.nombre || "",
        descripcion: recursoData.descripcion || "",
        tipo: recursoData.tipo || "",
        cantidad_total: recursoData.cantidad_total || 0,
        cantidad_disponible: recursoData.cantidad_disponible || 0,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Updated Recurso Data:", updatedRecursoData);
            const response = await updateRecurso(updatedRecursoData.id,updatedRecursoData);
            if (response.status != 200) {
                alert("Recurso actualizado correctamente");
                onSubmit();
            } else {
                alert("Error al actualizar el recurso");
            }
        } catch (error) {
            console.error("Error updating recurso:", error);
        }
    };

    const handleChange = async (e) => {
        setUpdatedRecursoData({
            ...updatedRecursoData,
            [e.target.name]: e.target.value,
        });
    };



    return (
        <div className="flex items-center justify-center">
            <form
                className="p-6 bg-white shadow-lg rounded-lg w-full max-w-lg"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Actualizar Recurso
                </h2>
                {[
                    { id: "id", type: "text", placeholder: "ID", disabled: true },
                    { id: "nombre", type: "text", placeholder: "Nombre" },
                    { id: "descripcion", type: "text", placeholder: "Descripción" },
                    { id: "tipo", type: "text", placeholder: "Tipo" },
                    {
                        id: "cantidad_total",
                        type: "number",
                        placeholder: "Cantidad Total",
                    },
                    {
                        id: "cantidad_disponible",
                        type: "number",
                        placeholder: "Cantidad Disponible",
                    },
                ].map(({ id, type, placeholder, disabled }) => (
                    <div key={id} className="mb-4">
                        <input
                            type={type}
                            id={id}
                            name={id}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                            placeholder={placeholder}
                            value={updatedRecursoData[id]}
                            onChange={handleChange}
                            disabled={disabled}
                        />
                    </div>
                ))}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={handleSubmit}
               >
                    Actualizar Recurso
                </button>
            </form>
        </div>
    );
};

export default UpdateRecurso;
