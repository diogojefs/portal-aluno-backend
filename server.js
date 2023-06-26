require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongose = require("mongoose");

mongose.connect(process.env.DATABASE_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Database connected!"));

app.use(cors());
app.use(express.json());

//route login
const loginRouter = require("./routes/login");
app.use("/login", loginRouter);

//route oferta
const ofertaRouter = require("./routes/oferta");
app.use("/oferta", ofertaRouter);

//route oferta
const disciplinaRouter = require("./routes/disciplina");
app.use("/disciplina", disciplinaRouter);

//route solicitacao matricula
const solicitacaoMatriculaRouter = require("./routes/solicitacaoMatricula");
app.use("/solicitacao-matricula", solicitacaoMatriculaRouter);

app.listen(3003, () => console.log("Portal Aluno Service running"));
