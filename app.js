const express = require("express");
const routeDisciplines = require("./routes/disciplines");

const app = express();
app.use(express.json());
app.use("/disciplines", routeDisciplines);

const port = 8080;

app.get("/", (req, res) => {
  res.send("Rota base não possui retorno!");
});

app.listen(port, () => {
  console.log(`Aguardando porta ${port}`);
});
