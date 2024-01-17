const { Router } = require("express");

const {
  getDisciplnes,
  getDisciplinesNamesAndId,
  getDisciplineArticles,
  postNewDiscipline,
  postNewArticle,
  patchDiscipline,
  patchArticle,
  deleteDiscipline,
  deleteArticle,
} = require("../controller/disciplines");

const router = Router();
router.get("/", getDisciplnes);
router.get("/names", getDisciplinesNamesAndId);
router.get("/name", getDisciplinesNamesAndId);
router.get("/:discipline/articles", getDisciplineArticles);

router.post("/", postNewDiscipline);
router.post("/:discipline/articles", postNewArticle);

router.patch("/:discipline", patchDiscipline);
router.patch("/:discipline/articles", patchArticle);

router.delete("/discipline/:id", deleteDiscipline);
router.delete("/:discipline/articles/:id", deleteArticle);

module.exports = router;
