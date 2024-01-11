const nodemailer = require("nodemailer");

async function postEmailService(name, phone, email, message) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    service: "gmail",
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: process.env.EMAIL_RECEIVER,
    subject: `MogLab-Mail de ${name}`,
    text: `de: ${email}\ntel: ${phone}\n${message}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    return {
      status: 200,
      response: "Email enviado com sucesso",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      response: `Algo deu errado ao enviar o e-mail! ${error}`,
    };
  }
}

module.exports = {
  postEmailService,
};
