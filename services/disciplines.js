const { db } = require("../app/firebase");
const { FieldValue } = require("firebase-admin/firestore");
const fs = require("fs");

async function getOnlyNames() {
  try {
    const disciplinesRef = db.collection("Disciplines");
    const snapshot = await disciplinesRef.get();
    if (snapshot.empty) {
      return "Não existem disciplinas cadastradas!";
    } else {
      const data = [];
      snapshot.docs.forEach((doc) => {
        const docData = doc.data();
        data.push(docData.title);
      });
      return data;
    }
  } catch (error) {
    return error;
  }
}

async function getDisciplinesData() {
  try {
    const disciplinesRef = db.collection("Disciplines");
    const snapshot = await disciplinesRef.get();
    if (snapshot.empty) {
      return "Dados não existem";
    } else {
      const data = [];
      snapshot.docs.forEach((item) => {
        const itemData = item.data();
        data.push({
          title: itemData.title,
          description: itemData.description,
          articles: itemData.articles,
        });
      });
      console.log(data);
      return data;
    }
  } catch (error) {
    return error;
  }
}

async function createDiscipline(newDiscipline) {
  try {
    const disciplinesRef = db.collection("Disciplines");
    const { title, description } = newDiscipline;
    const disciplineDoc = disciplinesRef.doc(title);
    await disciplineDoc.set({
      title: title,
      description: description,
      articles: [],
    });
    return "Dados criados com sucesso!";
  } catch (error) {
    return false;
  }
}

function updateDiscipline(id, content) {
  let original = JSON.parse(fs.readFileSync("disciplines.json"));
  const index = original.findIndex((item) => item.id == id);
  const newContent = { ...original[index], ...content };
  original[index] = newContent;
  fs.writeFileSync("disciplines.json", JSON.stringify(original));
}

async function postArticle(discipline, article) {
  try {
    const disciplineRef = db.collection("Disciplines").doc(discipline);
    const arrayUnion = FieldValue.arrayUnion;
    const updateData = { articles: arrayUnion(article) };
    await disciplineRef.update(updateData);
    return console.log("Post feito com sucesso");
  } catch (error) {
    return console.log(error);
  }
}

async function removeDiscipline(name) {
  const disciplineDoc = db.collection("Disciplines").doc(name);
  try {
    await disciplineDoc.delete();
    return "Disciplina deletada com sucesso";
  } catch (error) {
    return "Erro ao deletar disciplina";
  }
}

async function removeArticle(discipline, article) {
  const disciplineDoc = db.collection("Disciplines").doc(discipline);
  const arrayRemove = FieldValue.arrayRemove;
  try {
    await disciplineDoc.update({ articles: arrayRemove(article) });
    return "Artigo deletado com sucesso";
  } catch (error) {
    console.log(error);
    return "Erro ao deletar artigo";
  }
}

module.exports = {
  getOnlyNames,
  getDisciplinesData,
  createDiscipline,
  updateDiscipline,
  removeDiscipline,
  postArticle,
  removeArticle,
};
