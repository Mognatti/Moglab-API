const express = require("express");
require("dotenv").config();
const routeDisciplines = require("./routes/disciplines");
const routeUser = require("./routes/user");
let cors = require("cors");

const port = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/disciplines", routeDisciplines);
app.use("/user", routeUser);

app.get("/", (req, res) => {
  res.send(
    `
    <div>
      <p>
        Bem vindo à API MogLab! Para acessar as disciplinas, visite
        '/disciplines'
      </p>
      <p>Criado e desenvolvido por: Caio Mognatti</p>
    </div>`
  );
});

app.listen(port, () => {
  console.log(`Aguardando porta ${port}`);
});
