import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Formulario from '../pages/Formulario'
import Confirmacion from '../pages/Confirmacion'
import Login from '../pages/admin/Login'
import Solicitudes from '../pages/admin/Solicitudes'
import DetalleSolicitud from '../pages/admin/DetailleSolicitud'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Formulario/>} />
        <Route path="/confirmacion" element={<Confirmacion />} />      
          <Route path="/admin" element={<Login/>} />
                  <Route path="/admin/solicitudes" element={<Solicitudes />} />
                          <Route path="/admin/solicitudes/:id" element={<DetalleSolicitud />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App