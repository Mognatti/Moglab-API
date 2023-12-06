const {
  createDiscipline,
  getDisciplinesData,
  updateDiscipline,
  removeDiscipline,
  getOnlyNames,
} = require("../services/disciplines");
const {
  checkId,
  checkName,
  badKey,
  checkParamsForPost,
} = require("../functions");

async function getDisciplinesNames(req, res) {
  try {
    const disciplines = await getOnlyNames();
    return res.status(200).send(disciplines);
  } catch (error) {
    return res.status(500).send("Algo deu errado!");
  }
}

async function getDisciplnes(req, res) {
  try {
    const disciplines = await getDisciplinesData();
    return res.status(200).send(disciplines);
  } catch (error) {
    return res.status(error.status).send(error.message);
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

async function deleteDiscipline(req, res) {
  try {
    const { name } = req.body;
    console.log(name);
    if (checkName(name)) {
      await removeDiscipline(name);
      res.status(200).send("Item deletado com sucesso");
    } else {
      return badKey(res);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  getDisciplinesNames,
  getDisciplnes,
  postNewDiscipline,
  patchDiscipline,
  deleteDiscipline,
};
