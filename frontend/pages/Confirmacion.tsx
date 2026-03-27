import { useSearchParams } from 'react-router-dom'

const Confirmacion = () => {
  const [searchParams] = useSearchParams()
  const estado = searchParams.get('estado')

  return (
    <div>
      {estado === 'aprobado' ? (
        <>
          <h1>¡Pago aprobado!</h1>
          <p>Recibimos tu solicitud. Te avisamos por mail cuando el informe esté listo.</p>
        </>
      ) : estado === 'rechazado' ? (
        <>
          <h1>Pago rechazado</h1>
          <p>Hubo un problema con el pago. Por favor intentá de nuevo.</p>
        </>
      ) : (
        <>
          <h1>Pago pendiente</h1>
          <p>Tu pago está siendo procesado. Te avisamos por mail cuando se confirme.</p>
        </>
      )}
    </div>
  )
}

export default Confirmacion