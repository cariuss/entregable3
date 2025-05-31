import api from "./axiosConfig";

export const getRecursos = async () => {
  try {
    const response = await api.get("recursos/api/v1/");
    return response.data;
  } catch (error) {
    console.error("Error fetching recursos:", error);
    return [];
  }
};

export const updateRecurso = async (id, data) => {
  try {
    const response = await api.patch(`recursos/api/v1/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating recurso:", error);
    return null;
  }
};

export const createRecurso = async (data) => {
  try {
    const { data: res } = await api.post("recursos/api/v1/", data);
    return res;
  } catch (error) {
    console.error("Error creating recurso:", error);
    return null;
  }
};

export const deleteRecurso = async (id) => {
  try {
    const response = await api.delete(`recursos/api/v1/${id}/`);
    return response;
  } catch (error) {
    console.error("Error deleting recurso:", error);
    return null;
  }
};
