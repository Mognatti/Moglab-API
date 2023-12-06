const { Router } = require("express");

const {
  getDisciplnes,
  postNewDiscipline,
  patchDiscipline,
  deleteDiscipline,
  getDisciplinesNames,
} = require("../controller/disciplines");

const router = Router();

router.get("/", getDisciplnes);
router.get("/names", getDisciplinesNames);
router.get("/name", (req, res) => {
  res
    .status(200)
    .send("Para receber os nomes de todas as disciplinas, use '/names'!");
});

router.post("/", postNewDiscipline);

router.patch("/id/:id", patchDiscipline);

router.put("/", (req, res) => {
  res.send(
    "Atualiza totalmente o aquivo, mudando todos os dados para os novos que foram inseridos! "
  );
});

router.delete("/", deleteDiscipline);

module.exports = router;
