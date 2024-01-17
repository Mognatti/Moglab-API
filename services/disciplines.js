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
      return data.sort((a, b) => {
        if (a.title > b.title) {
          return 1;
        } else if (a.title < b.title) {
          return -1;
        } else {
          return 0;
        }
      });
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
      return data.sort((a, b) => {
        if (a.title > b.title) {
          return 1;
        } else if (a.title < b.title) {
          return -1;
        } else {
          return 0;
        }
      });
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
    const query = disciplinesRef.where("title", "==", title);
    const snapshot = await query.get();
    console.log(snapshot);
    if (!snapshot.empty) {
      return { status: 409, message: "Uma disciplina com o mesmo nome já existe!", error: true };
    }
    const id = uuidv4();
    const disciplineDoc = disciplinesRef.doc(id);
    await disciplineDoc.set({
      title: title,
      description: description,
      articles: [],
      id: id,
    });
    return { status: 201, message: "Disciplina criada com sucesso!", error: false };
  } catch (error) {
    return { status: 500, message: "Erro ao criar disciplina!", error: true };
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
  const disciplineDoc = db.collection("Disciplines").doc(id);
  try {
    await disciplineDoc.delete();
    return "Disciplina deletada com sucesso";
  } catch (error) {
    return "Erro ao deletar disciplina";
  }
}

async function removeArticle(discipline, article) {
  const disciplineDoc = db.collection("Disciplines").where("title", "==", discipline);
  try {
    const snapshot = await disciplineDoc.get();

    if (snapshot.empty) {
      return { status: 404, message: "Disciplina não encontrada", error: true };
    }

    if (snapshot.size > 1) {
      return { status: 409, message: "Mais de uma disciplina encontrada!", error: true };
    }
    const doc = snapshot.docs[0];
    const articlesArray = doc.data().articles;
    const findArticle = articlesArray.find((item) => item.id === article);
    console.log(findArticle);

    if (!findArticle) {
      return { status: 404, message: "Artigo não encontrado!", error: true };
    }

    const updatedArticlesArray = articlesArray.filter((item) => item.id !== article);
    await doc.ref.update({ articles: updatedArticlesArray });
    return { status: 200, message: "Artigo deletado com sucesso", error: false };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Erro ao deletar artigo", error: true };
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
