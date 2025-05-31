// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow">
      <div className="flex space-x-4">
        <Link to="/list_usuarios" className="hover:underline">
          Usuarios
        </Link>
        <Link to="/list_recursos" className="hover:underline">
          Recursos
        </Link>
        <Link to="/list_peticiones" className="hover:underline">
          Peticiones
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded"
      >
        Cerrar Sesión
      </button>
    </nav>
  );
};

export default Navbar;
