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
  baseURL: "https://8e19-190-121-129-147.ngrok-free.app/"
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
