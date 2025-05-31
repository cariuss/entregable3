// axiosConfig.js
import axios from "axios";

const getTokenSafe = () => {
  try {
    return localStorage.getItem("token") || sessionStorage.getItem("token") || "";
  } catch (error) {
    console.warn("localStorage/sessionStorage no accesible:", error);
    return "";
  }
};

const api = axios.create({
  baseURL: "https://0204-2803-1800-4017-b892-702a-1cc1-fcbc-e3c8.ngrok-free.app/"
});

api.interceptors.request.use(
  (config) => {
    const token = getTokenSafe();
    console.log("TOKEN desde interceptor Axios:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
