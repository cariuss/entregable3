import React from "react";
import { createUs } from "../../services/usuarios.service";

const ROL_CHOICES = [
  { value: "administrador", label: "Administrador" },
  { value: "usuario_estandar", label: "Usuario Estándar" },
  { value: "supervisor", label: "Supervisor" },
];

const CreateUsuario = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    try {
      const response = await createUs(data);
      console.log("Recurso creado:", response);
    } catch (error) {
      console.error("Error al crear el recurso:", error);
      alert("Hubo un error al crear el recurso");
    }
  };
  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-md rounded-2xl px-8 pt-8 pb-10 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-8 text-center">Crear Usuario</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            id="id"
            name="id"
            type="text"
            placeholder="ID de usuario"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
          />
          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Nombre"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
          />
          <input
            id="correo"
            name="correo"
            type="email"
            placeholder="Correo"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
          />
          <input
            id="numero"
            name="numero"
            type="text"
            placeholder="Número"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
          />
          <input
            id="direccion"
            name="direccion"
            type="text"
            placeholder="Dirección"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
          />
          <input
            id="contraseña"
            name="password" // antes era "password"
            type="password"
            placeholder="Contraseña"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
          />
          <select
            id="rol"
            name="rol"
            defaultValue=""
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 bg-white"
          >
            <option value="">Seleccione un rol</option>
            {ROL_CHOICES.map((rol) => (
              <option key={rol.value} value={rol.value}>
                {rol.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-md transition duration-300"
          >
            Crear Usuario
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUsuario;
