const { postEmailService } = require("../services/email");

async function sendEmail(req, res) {
  const { name, phone, email, message } = req.body;
  const { status, response } = await postEmailService(name, phone, email, message);
  return res.status(status).send(response);
}

module.exports = {
  sendEmail,
};
