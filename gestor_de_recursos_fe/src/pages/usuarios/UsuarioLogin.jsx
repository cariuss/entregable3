import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../../components/Modal"

export const UsuarioLogin = () => {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState({}); // para el mensaje e icono
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(correo, contraseña);
    const res = await fetch("https://8e19-190-121-129-147.ngrok-free.app/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo, password: contraseña }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.access);
      localStorage.setItem("usuario", JSON.stringify(data.usuario)); // <-- Guardamos usuario completo

      setModalProps({
        title: "Inicio de sesión exitoso",
        text: "Bienvenido a la plataforma",
        icon: "success",
        confirmButtonText: "Continuar",
        onConfirm: () => {
          setIsModalOpen(false);
          navigate("/list_peticiones");
        },
      });
      setIsModalOpen(true);
    } else {
      setModalProps({
        title: "Error",
        text: data.detail || "Credenciales incorrectas",
        icon: "error",
        confirmButtonText: "Intentar de nuevo",
        onConfirm: () => setIsModalOpen(false),
      });
      setIsModalOpen(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Iniciar Sesión
        </h2>

        <div className="mb-4">
          <label
            htmlFor="correo"
            className="block text-gray-700 font-medium mb-1"
          >
            Correo electrónico
          </label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="correo@ejemplo.com"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="contraseña"
            className="block text-gray-700 font-medium mb-1"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="contraseña"
            name="contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="********"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Iniciar Sesión
        </button>
      </form>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        {...modalProps}
      />
    </div>
  );
};

export default UsuarioLogin;
