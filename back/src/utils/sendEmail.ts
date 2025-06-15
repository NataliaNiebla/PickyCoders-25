import nodemailer from 'nodemailer';

export const routerUser = async (email: string, nombre: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    }
  });

  const mailOptions = {
    from: `"Cooler Monitoring" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Recuperación de contraseña',
    html: `
      <h3>Hola ${nombre},</h3>
      <p>Solicitaste recuperar tu contraseña. Por favor contáctate con tu asesor o usa la app para restablecerla.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};
