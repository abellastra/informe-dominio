import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Formulario from "../pages/Formulario";
import Confirmacion from "../pages/Confirmacion";
import Login from "../pages/admin/Login";
import RutaProtegida from "../componets/RutaProtegida";
import Solicitudes from "../pages/admin/Solicitudes";
import DetalleSolicitud from "../pages/admin/DetailleSolicitud";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/solicitar" element={<Formulario />} />
        <Route path="/confirmacion" element={<Confirmacion />} />
        <Route path="/admin" element={<Login />} />
        <Route
          path="/admin/solicitudes"
          element={
            <RutaProtegida>
              <Solicitudes />
            </RutaProtegida>
          }
        />
        <Route
          path="/admin/solicitudes/:id"
          element={
            <RutaProtegida>
              <DetalleSolicitud/>
            </RutaProtegida>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
