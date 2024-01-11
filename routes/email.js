const { Router } = require("express");
const { sendEmail } = require("../controller/email");

const router = Router();

router.get("/", (req, res) => {
  res.send("Esse endpoint pode ser usado para o envio de e-mails");
});

router.post("/", sendEmail);

module.exports = router;
