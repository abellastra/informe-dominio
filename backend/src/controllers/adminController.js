export const login = async (req, res) => {
  try {
    const { password } = req.body
    console.log(password,"passwor______________________________")
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Contraseña incorrecta' })
    }

    res.cookie('adminToken', 'admin-autenticado', {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 8 // 8 horas
    })

    res.json({ ok: true })

  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' })
  }
}