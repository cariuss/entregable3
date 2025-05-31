// src/services/usuarios.service.js
import api from "./axiosConfig";

// Obtener todos los usuarios
export const getUsuarios = async () => {
  try {
    const response = await api.get("usuarios/api/v1/");
    return response.data;
  } catch (error) {
    console.error("Error recibiendo usuarios:", error);
    return [];
  }
};

// Crear nuevo usuario
export const createUs  = async (data) => {
  try {
    const response = await api.post("usuarios/api/v1/", data);
    return response.data;
  } catch (error) {
    console.error("Error creando usuario:", error.response?.data || error.message);
    throw error;
  }
};

// Eliminar usuario
export const deleteUsuario = async (id) => {
  try {
    const response = await api.delete(`usuarios/api/v1/${id}/`);
    return response;
  } catch (error) {
    console.error("Error eliminando usuario:", error);
    return null;
  }
};

// Actualizar usuario
export const updateUsuario = async (id, data) => {
  try {
    const response = await api.patch(`usuarios/api/v1/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    return null;
  }
};
