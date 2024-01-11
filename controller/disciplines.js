const {
  getDisciplinesData,
  getNameAndId,
  getOnlyArticles,
  updateDiscipline,
  updateArticle,
  createDiscipline,
  postArticle,
  removeDiscipline,
  removeArticle,
} = require("../services/disciplines");
const { checkName, badKey, checkParamsForPost } = require("../functions");

async function getDisciplnes(req, res) {
  try {
    const disciplines = await getDisciplinesData();
    return res.status(200).send(disciplines);
  } catch (error) {
    return res.status(error.status).send(error.message);
  }
}

async function getDisciplinesNamesAndId(req, res) {
  try {
    const disciplines = await getNameAndId();
    return res.status(200).send(disciplines);
  } catch (error) {
    return res.status(500).send("Algo deu errado!");
  }
}

async function getDisciplineArticles(req, res) {
  try {
    const discipline = req.params.discipline;
    const disciplines = await getOnlyArticles(discipline);
    if (disciplines.length === 0) {
      return res.send("A disciplina não possui artigos cadastrados");
    }
    return res.send(disciplines);
  } catch (error) {
    res.send(error);
  }
}

async function postNewDiscipline(req, res) {
  try {
    const newDiscipline = req.body;
    if (checkParamsForPost(newDiscipline)) {
      const success = await createDiscipline(newDiscipline);
      if (success) {
        return res.status(201).send(success);
      } else {
        return res.status(500).send("Algo deu errado...");
      }
    } else {
      res.status(422).send("Objeto inválido");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function postNewArticle(req, res) {
  const discipline = req.params.discipline;
  const article = req.body;
  console.log(discipline);
  console.log(article);
  try {
    await postArticle(discipline, article);
    res.status(201).send("Artigo criado com sucesso");
  } catch (error) {
    res.status(500).send("Algo deu errado!");
  }
}

async function patchDiscipline(req, res) {
  try {
    const discipline = req.params.discpline;
    const newContent = req.body;
    await updateDiscipline(discipline, newContent);
    res.status(201).send("Disciplina atualizada com sucesso");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function patchArticle(req, res) {
  try {
    const discipline = req.params.discipline;
    const article = req.body;
    await updateArticle(discipline, article);
    res.status(201).send("Artigo atualizado com sucesso!");
  } catch (error) {
    res.status(500).send(error.message);
    throw new Error(error);
  }
}

async function deleteDiscipline(req, res) {
  try {
    const { id } = req.body;
    await removeDiscipline(id);
    res.status(200).send("Item deletado com sucesso");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function deleteArticle(req, res) {
  const discipline = req.params.discipline;
  const article = req.body;
  try {
    await removeArticle(discipline, article);
    console.log("Artigo removido com sucesso");
    return res.status(200).send("Artigo removido com sucesso");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error ao apagar artigo!");
  }
}

module.exports = {
  getDisciplinesNamesAndId,
  getDisciplnes,
  getDisciplineArticles,
  postNewDiscipline,
  postNewArticle,
  patchDiscipline,
  patchArticle,
  deleteDiscipline,
  deleteArticle,
};
