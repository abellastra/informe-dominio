import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Formulario from "../pages/Formulario";
import Confirmacion from "../pages/Confirmacion";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/solicitar" element={<Formulario />} />
        <Route path="/confirmacion" element={<Confirmacion />} />
       </Routes>
    </BrowserRouter>
  );
};

export default App;
