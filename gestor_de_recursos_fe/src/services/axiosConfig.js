import axios from "axios";

const getTokenSafe = () => {
  try {
    return (
      localStorage.getItem("token") ||
      sessionStorage.getItem("token") ||
      ""
    );
  } catch (error) {
    console.warn("localStorage/sessionStorage no accesible:", error);
    return "";
  }
};

const api = axios.create({
  baseURL: "https://da89-190-121-129-147.ngrok-free.app",
});

api.interceptors.request.use(
  (config) => {
    // 1) Forzar JSON pidiendo un AJAX
    config.headers["X-Requested-With"] = "XMLHttpRequest";
    // 2) (Opcional) Forzar Accept en JSON
    config.headers["Accept"] = "application/json";
    // 3) Inyectar token
    const token = getTokenSafe();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
