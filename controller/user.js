const { uploadPhoto } = require("../services/user");

async function updateProfileImage(req, res) {
  const userId = req.params.id;
  const data = req.body;
  try {
    const req = await uploadPhoto(userId, data);
    if (req == "OK") {
      res.status(201).send("Foto atualizada com sucesso");
    } else {
      res.status(500).send(req.message);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao atulizar a foto");
  }
}

module.exports = {
  updateProfileImage,
};
