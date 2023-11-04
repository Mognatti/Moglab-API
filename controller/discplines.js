const {
  createDiscipline,
  fetchAllDisciplines,
  fetchDisciplinesById,
  fetchDisciplinesByName,
  updateDiscipline,
  removeDiscipline,
} = require("../services/disciplines");
const { checkId, badId, checkParamsForPost } = require("../functions");

function getDisciplnes(req, res) {
  try {
    const disciplines = fetchAllDisciplines();
    res.status(200).send(disciplines);
  } catch (error) {
    res.send(error.message);
  }
}

function getDisciplnesById(req, res) {
  try {
    const id = req.params.id;
    if (checkId(id)) {
      const disciplines = fetchDisciplinesById(id);
      res.send(disciplines);
    } else {
      badId(res);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

function getDisciplnesByName(req, res) {
  try {
    const name = req.params.name;
    const disciplines = fetchDisciplinesByName(name);
    res.send(disciplines);
  } catch (error) {
    res.send(error.message);
  }
}

function postNewDiscipline(req, res) {
  try {
    const newDiscipline = req.body;
    if (checkParamsForPost(newDiscipline)) {
      createDiscipline(newDiscipline);
      res.status(201).send(newDiscipline);
    } else {
      res.status(422).send("Objeto inválido");
    }
  } catch (error) {
    res.send(error);
  }
}

function patchDiscipline(req, res) {
  try {
    const id = req.params.id;
    const content = req.body;
    if (checkId(id)) {
      updateDiscipline(id, content);
      res.status(201).send("Disciplina atualizada com sucesso");
    } else {
      badId(res);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

function deleteDiscipline(req, res) {
  try {
    const id = req.params.id;
    if (checkId(id)) {
      removeDiscipline(id);
      res.status(200).send("Item deletado com sucesso");
    } else {
      badId(res);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  getDisciplnes,
  getDisciplnesById,
  getDisciplnesByName,
  postNewDiscipline,
  patchDiscipline,
  deleteDiscipline,
};
