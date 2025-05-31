// Decodifica JWT sin necesidad de una librería externa
export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export const getUserFromToken = () => {
  const usuario = localStorage.getItem("usuario");
  if (!usuario) return null;
  try {
    return JSON.parse(usuario);
  } catch {
    return null;
  }
};

export const isAuthenticated = () => !!localStorage.getItem("token");

export const hasRole = (roles = []) => {
  const user = getUserFromToken();
  return user && roles.includes(user.rol);
};