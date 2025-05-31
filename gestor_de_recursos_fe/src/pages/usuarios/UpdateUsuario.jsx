import React, { useState, useEffect } from "react";
import { updateUsuario } from "../../services/usuarios.service";

export const UpdateUsuario = ({ usuarioData, onSubmitSuccess }) => {
    const [formData, setFormData] = useState({
        id: "",
        nombre: "",
        correo: "",
        numero: "",
        rol: "",
        password: "", 
    });

    useEffect(() => {
        if (usuarioData) {
            setFormData({ ...usuarioData, password: "" }); // no rellenamos contraseña
        }
    }, [usuarioData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = { ...formData };
            if (!dataToSend.password) delete dataToSend.password; // opcional: no enviar si está vacío
            const response = await updateUsuario(formData.id, dataToSend);
            console.log("Usuario actualizado:", response);
            if (onSubmitSuccess) onSubmitSuccess();
        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            alert("Hubo un error al actualizar el usuario");
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 ">
            <form
                className="p-6 bg-white shadow-lg rounded-lg w-full max-w-lg"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Actualizar Usuario
                </h2>
                {[
                    { id: "id", type: "text", placeholder: "ID", readOnly: true },
                    { id: "nombre", type: "text", placeholder: "Nombre" },
                    { id: "correo", type: "email", placeholder: "Correo" },
                    { id: "numero", type: "text", placeholder: "Número" },
                    { id: "rol", type: "text", placeholder: "Rol" },
                    { id: "password", type: "password", placeholder: "Nueva Contraseña" },
                ].map(({ id, type, placeholder, readOnly }) => (
                    <div key={id} className="mb-4">
                        <input
                            type={type}
                            id={id}
                            name={id}
                            value={formData[id] || ""}
                            onChange={handleChange}
                            readOnly={readOnly}
                            className={`mt-1 block w-full border ${
                                readOnly ? "bg-gray-200" : "bg-white"
                            } border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2`}
                            placeholder={placeholder}
                        />
                    </div>
                ))}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Actualizar Usuario
                </button>
            </form>
        </div>
    );
};

export default UpdateUsuario;
