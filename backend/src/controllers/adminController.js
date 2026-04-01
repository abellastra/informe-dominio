import { v2 as cloudinary } from 'cloudinary'

export const login = async (req, res) => {
  try {
    const { password } = req.body;
    console.log(password, "passwor______________________________");
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    res.cookie("adminToken", "admin-autenticado", {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 8, // 8 horas
    });

    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("adminToken")
  res.json({ ok: true })
}


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})
export const obtenerFirmaCloudinary = (req, res) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000)
    const folder = 'informes'

    const firma = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      process.env.CLOUDINARY_API_SECRET
    )

    res.json({
      firma,
      timestamp,
      folder,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al generar la firma' })
  }
}