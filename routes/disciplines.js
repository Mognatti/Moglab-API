const { Router } = require("express");

const {
  getDisciplnes,
  getDisciplinesNames,
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
router.get("/names", getDisciplinesNames);
router.get("/name", getDisciplinesNames);
router.get("/:discipline/articles", getDisciplineArticles);

router.post("/", postNewDiscipline);
router.post("/:discipline/articles", postNewArticle);

router.patch("/:discipline", patchDiscipline);
router.patch("/:discipline/articles", patchArticle);

router.delete("/", deleteDiscipline);
router.delete("/:discipline", deleteArticle);

module.exports = router;
