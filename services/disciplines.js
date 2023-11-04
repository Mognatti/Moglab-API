const fs = require("fs");

const disciplines = JSON.parse(fs.readFileSync("disciplines.json"));

function fetchAllDisciplines() {
  return disciplines.sort((a, b) => {
    if (a.id > b.id) return 1;
    else if (a.id < b.id) return -1;
  });
}

function fetchDisciplinesById(id) {
  return disciplines.filter((item) => item.id == id);
}

function fetchDisciplinesByName(name) {
  const result = disciplines.filter(
    (item) => item.name.toLowerCase() == name.toLowerCase()
  );
  if (result) {
    return result;
  }
  return "Nenhuma disciplona encontrada";
}

function createDiscipline(newDiscipline) {
  fs.writeFileSync(
    "disciplines.json",
    JSON.stringify([...disciplines, newDiscipline])
  );
}

function updateDiscipline(id, content) {
  let original = JSON.parse(fs.readFileSync("disciplines.json"));
  const index = original.findIndex((item) => item.id == id);
  const newContent = { ...original[index], ...content };
  original[index] = newContent;
  fs.writeFileSync("disciplines.json", JSON.stringify(original));
}

function removeDiscipline(id) {
  let original = JSON.parse(fs.readFileSync("disciplines.json"));

  const newList = original.filter((item) => item.id != id);
  fs.writeFileSync("disciplines.json", JSON.stringify(newList));
}

module.exports = {
  fetchAllDisciplines,
  fetchDisciplinesById,
  fetchDisciplinesByName,
  createDiscipline,
  updateDiscipline,
  removeDiscipline,
};
