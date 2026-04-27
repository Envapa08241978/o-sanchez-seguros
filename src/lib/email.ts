import nodemailer from "nodemailer";

export async function sendEmailNotification(subject: string, htmlContent: string) {
  const user = process.env.SMTP_USER || "oscareduardosanchezaguirre@gmail.com";
  const pass = process.env.SMTP_PASSWORD;

  if (!pass) {
    console.warn("SMTP_PASSWORD no está configurado. El email interno no será enviado.");
    return false;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user,
      pass: pass,
    },
  });

  const mailOptions = {
    from: `"O Sanchez Seguros Bot" <${user}>`,
    to: "oscareduardosanchezaguirre@gmail.com",
    subject: subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error al enviar el email de alerta:", error);
    return false;
  }
}
