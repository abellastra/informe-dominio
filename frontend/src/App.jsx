import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Formulario from '../pages/Formulario'
import Confirmacion from '../pages/Confirmacion'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Formulario/>} />
        <Route path="/confirmacion" element={<Confirmacion />} />        <Route path="/admin" element={<h1>Panel gestora</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App