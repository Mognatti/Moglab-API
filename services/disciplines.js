const { db } = require("../app/firebase");
const { FieldValue } = require("firebase-admin/firestore");
const { v4: uuidv4 } = require("uuid");

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
          id: itemData.id,
        });
      });
      return data;
    }
  } catch (error) {
    return error;
  }
}

async function getNameAndId() {
  try {
    const disciplinesRef = db.collection("Disciplines");
    const snapshot = await disciplinesRef.select("title", "id").get();
    if (snapshot.empty) {
      return "Não existem disciplinas cadastradas!";
    } else {
      const data = [];
      snapshot.docs.forEach((doc) => {
        const docData = doc.data();
        if (docData.title && docData.id) {
          data.push({ title: docData.title, id: docData.id });
        }
      });
      return data;
    }
  } catch (error) {
    return error;
  }
}

async function getOnlyArticles(discipline) {
  const query = db.collection("Disciplines").where("title", "==", discipline);
  try {
    const snapshot = await query.get();
    if (snapshot.empty) {
      throw new Error("Disciplina não encontrada!");
    }
    const doc = snapshot.docs[0];
    const articles = doc.data().articles || [];
    return { disciplina: discipline, artigos: articles };
  } catch (error) {
    throw new Error("Algo deu errado!");
  }
}

async function createDiscipline(newDiscipline) {
  try {
    const disciplinesRef = db.collection("Disciplines");
    const { title, description } = newDiscipline;
    const id = uuidv4();
    const disciplineDoc = disciplinesRef.doc(id);
    await disciplineDoc.set({
      title: title,
      description: description,
      articles: [],
      id: id,
    });
    return "Dados criados com sucesso!";
  } catch (error) {
    return false;
  }
}

async function updateDiscipline(discipline, newContent) {
  const disciplineRef = db.collection("Disciplines").doc(newContent.id);
  try {
    const snapshot = await disciplineRef.get();
    if (!snapshot.exists) {
      return "Disciplina não encontrada! Caso queria criá-la, use a sessão de criar disciplinas";
    }
    await disciplineRef.update({
      title: newContent.title,
      description: newContent.description,
    });
    return "Disciplina atualizada com sucesso";
  } catch (error) {
    throw new Error("Algo deu errado!");
  }
}

async function updateArticle(discipline, article) {
  const query = db.collection("Disciplines").where("title", "==", discipline);

  try {
    const snapshot = await query.get();

    if (snapshot.empty) {
      throw new Error("Dados da disciplina não encontrados!");
    }
    const doc = snapshot.docs[0];
    const disciplineRef = doc.ref;
    const data = doc.data().articles || [];
    const articleToUpdate = data.findIndex((item) => item.id === article.id);
    if (articleToUpdate !== -1) {
      data.splice(articleToUpdate, 1, article);
      await disciplineRef.update({
        articles: data,
      });
      return "Artigo atualizado com sucesso!";
    } else {
      throw new Error("Artigo não encontrado!");
    }
  } catch (error) {
    throw new Error(error);
  }
}

async function postArticle(discipline, article) {
  const query = db.collection("Disciplines").where("title", "==", discipline);
  try {
    const snapshot = await query.get();
    if (snapshot.empty) {
      throw new Error("Disciplina não encontrada");
    }
    const doc = snapshot.docs[0];
    const disciplineRef = doc.ref;
    const arrayUnion = FieldValue.arrayUnion;
    const articleWithId = {
      ...article,
      id: uuidv4(),
    };
    const updateData = { articles: arrayUnion(articleWithId) };
    await disciplineRef.update(updateData);
    return "Artigo criado com sucesso";
  } catch (error) {
    throw new Error(error);
  }
}

async function removeDiscipline(id) {
  const disciplineDoc = db.collection("Disciplines").where("id" === id);
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
  getNameAndId,
  getDisciplinesData,
  getOnlyArticles,
  createDiscipline,
  updateDiscipline,
  updateArticle,
  removeDiscipline,
  postArticle,
  removeArticle,
};
