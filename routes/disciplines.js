const { Router } = require("express");

const {
  getDisciplnes,
  getDisciplnesById,
  getDisciplnesByName,
  postNewDiscipline,
  patchDiscipline,
  deleteDiscipline,
} = require("../controller/discplines");

const router = Router();

router.get("/", getDisciplnes);
router.get("/id/:id", getDisciplnesById);
router.get("/name/:name", getDisciplnesByName);

router.post("/", postNewDiscipline);

router.patch("/id/:id", patchDiscipline);

router.delete("/id/:id", deleteDiscipline);

router.put("/", (req, res) => {
  res.send(
    "Atualiza totalmente o aquivo, mudando todos os dados para os novos que foram inseridos! "
  );
});

module.exports = router;
