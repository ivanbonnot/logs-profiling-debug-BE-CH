const nodemailer = require('nodemailer');

// Configuración del transporter

const sendEmail = async (from, username, html) => {

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'watson.steuber@ethereal.email',
      pass: '1gB66v7C7WYBHAmUdF'
    }
  });

  try {
    const info = await transporter.sendMail({
      from,
      to: 'watson.steuber@ethereal.email',
      subject: `Nuevo Usuario: ${username}`,
      html: html
    })
    return {
      result: "success",
      messageId: info.messageId,
    };
  } catch (e) {
    return {
      result: "error",
      message: e.message,
    };
  }
}



module.exports = sendEmail