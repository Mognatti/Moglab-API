const { Router } = require("express");
const { updateProfileImage } = require("../controller/user");

const router = Router();

router.get("/", (req, res) => {
  res.send("Base de usuários");
});
router.post("/:id/files", updateProfileImage);

module.exports = router;
