import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ListUsuario } from "./pages/usuarios/ListUsuario";
import { ListRecursos } from "./pages/ListRecursos";
import { ListPeticiones } from "./pages/peticiones/ListPeticiones";
import UsuarioLogin from "./pages/usuarios/UsuarioLogin";
import PrivateRoute from "./routes/PrivateRoutes";
import PrivateLayout from "./layouts/PrivateLayout";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública: Login */}
        <Route path="/" element={<UsuarioLogin />} />

        {/* Ruta privada: Usuarios */}
        <Route
          path="/list_usuarios"
          element={
            <PrivateRoute roles={["administrador"]}>
              <PrivateLayout>
                <ListUsuario />
              </PrivateLayout>
            </PrivateRoute>
          }
        />

        {/* Ruta privada: Recursos */}
        <Route
          path="/list_recursos"
          element={
            <PrivateRoute roles={["administrador"]}>
              <PrivateLayout>
                <ListRecursos />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/list_peticiones"
          element={
            <PrivateRoute roles={["administrador", "usuario_estandar"]}>
              <PrivateLayout>
                <ListPeticiones />
              </PrivateLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
