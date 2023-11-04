const express = require("express");
const routeDisciplines = require("./routes/disciplines");
var cors = require("cors");

const port = 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/disciplines", routeDisciplines);

app.get("/", (req, res) => {
  res.send(
    "Bem vindo à API MogLab! Para acessar as disciplinas, visite '/disciplines'"
  );
});

app.listen(port, () => {
  console.log(`Aguardando porta ${port}`);
});
