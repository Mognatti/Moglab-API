function checkId(id) {
  return id && Number(id);
}

function badId(res) {
  return res.status(422).send(`Id inválido`);
}

function checkParamsForPost(body) {
  const params = ["id", "name"];
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
  checkId,
  badId,
  checkParamsForPost,
};
