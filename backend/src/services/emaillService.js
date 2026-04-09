const sendEmail = async ({ to, subject, html }) => {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Informe de Dominio", email: process.env.GMAIL_USER },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    console.error("Brevo error completo:", error);
    throw new Error(`Brevo error: ${error}`);
  }
};

export const enviarConfirmacionCliente = async (solicitud) => {
  await sendEmail({
    to: solicitud.mailCliente,
    subject: "Recibimos tu solicitud de informe de dominio",
    html: `
      <h2>¡Hola!</h2>
      <p>Recibimos tu solicitud de informe de dominio.</p>
      <p><strong>Patente:</strong> ${solicitud.patente}</p>
      <p><strong>Vehículo:</strong> ${solicitud.tipoVehiculo}</p>
      <p>En breve nos ponemos en contacto contigo.</p>
    `,
  });
};

export const enviarAvisoGestora = async (solicitud) => {
  await sendEmail({
    to: process.env.MAIL_GESTORA,
    subject: `Nueva solicitud de informe - Patente ${solicitud.patente}`,
    html: `
      <h2>Nueva solicitud recibida</h2>
      <p><strong>Mail del cliente:</strong> ${solicitud.mailCliente}</p>
      <p><strong>Patente:</strong> ${solicitud.patente}</p>
      <p><strong>Vehículo:</strong> ${solicitud.tipoVehiculo}</p>
      <p><strong>ID de solicitud:</strong> ${solicitud.id}</p>
    `,
  });
};

export const enviarInformeCliente = async (solicitud, urlInforme) => {
  const urlDescarga = urlInforme.replace("/upload/", "/upload/fl_attachment/");
  await sendEmail({
    to: solicitud.mailCliente,
    subject: "Tu informe de dominio está listo",
    html: `
      <h2>¡Tu informe está listo!</h2>
      <p><strong>Patente:</strong> ${solicitud.patente}</p>
      <p>Podés descargar tu informe desde el siguiente link:</p>
      <a href="${urlDescarga}">Descargar informe</a>
    `,
  });
};
