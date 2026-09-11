import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT ?? 465),
  secure: Number(process.env.MAIL_PORT ?? 465) === 465,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
})

export async function verifyMailer() {
  await transporter.verify()
  console.log("Conexión SMTP correcta")
}

interface SendMailOptions {
  to: string
  subject: string
  html: string
}

export async function sendMail({ to, subject, html }: SendMailOptions) {
  const info = await transporter.sendMail({
    from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_USERNAME}>`,
    to,
    subject,
    html
  })

  console.log(`Correo enviado: ${info.messageId}`)

  return info
}