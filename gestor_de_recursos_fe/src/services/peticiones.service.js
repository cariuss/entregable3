// src/services/peticiones.service.js
import api from "./axiosConfig";

// Obtener todas las peticiones
export const getPeticiones = async () => {
  try {
    const response = await api.get("/peticiones/api/v1/");
    return response.data;
  } catch (error) {
    console.error("Error al obtener peticiones:", error.response?.data || error.message);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

// Crear nueva petición
export const createPeticion = async (data) => {
  try {
    const response = await api.post("/peticiones/api/v1/", data);
    return response.data;
  } catch (error) {
    console.error("Error al crear petición:", error.response?.data || error.message);
    throw error; // Lanza el error para manejo superior
  }
};

// Eliminar petición por ID
export const deletePeticion = async (id) => {
  try {
    await api.delete(`/peticiones/api/v1/${id}/`);
    return true;
  } catch (error) {
    console.error("Error al eliminar petición:", error.response?.data || error.message);
    throw error; // Consistencia lanzando errores
  }
};

// Actualizar petición por ID
export const updatePeticion = async (id, data) => {
  try {
    const response = await api.patch(`/peticiones/api/v1/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar petición:", error.response?.data || error.message);
    throw error; // Mantiene consistencia de manejo de errores
  }
};
