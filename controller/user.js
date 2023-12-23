const { uploadPhoto } = require("../services/user");

async function updateProfileImage(req, res) {
  const userId = req.params.id;
  const data = req.body;
  try {
    await uploadPhoto(userId, data);
    res.status(201).send("Foto atualizada com sucesso");
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao atulizar a foto");
  }
}

module.exports = {
  updateProfileImage,
};
