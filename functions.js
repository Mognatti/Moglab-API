function checkName(name) {
  return name && String(name);
}

function badKey(res) {
  return res.status(422).send(`Disciplina não encontrada!`);
}

function checkParamsForPost(body) {
  const params = ["title", "description"];
  for (const key in body) {
    if (!params.includes(key)) {
      return false;
    }
  }
  for (const param in params) {
    if (!body.hasOwnProperty(params[param])) {
      return false;
    }
  }
  return true;
}

module.exports = {
  checkName,
  badKey,
  checkParamsForPost,
};
