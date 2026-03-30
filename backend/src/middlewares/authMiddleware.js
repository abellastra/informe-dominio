export const verificarAdmin = (req, res, next) => {
  const token = req.cookies.adminToken
  console.log(req.cookies)
  console.log(token,"7//////////////////////////////")

  if (!token || token !== 'admin-autenticado') {
    return res.status(401).json({ error: 'No autorizado' })
  }

  next()
}