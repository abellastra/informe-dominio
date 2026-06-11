import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Solicitudes from "./pages/Solicitudes";
import DetalleSolicitud from "./pages/DetalleSolicitud";
import RutaProtegida from "./components/RutaProtegida";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/solicitudes"
          element={
            <RutaProtegida>
              <Solicitudes />
            </RutaProtegida>
          }
        />
        <Route
          path="/solicitudes/:id"
          element={
            <RutaProtegida>
              <DetalleSolicitud />
            </RutaProtegida>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;