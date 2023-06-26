const mongoose = require("mongoose");

const alunoSchema = new mongoose.Schema({
  nome: { type: String, require: true },
  email: { type: String, require: true },
  senha: { type: String, require: true, default: "aluno123" },
  matricula: { type: String, require: true },
  curso: {
    nome: { type: String, required: true },
    cod: { type: String, required: true },
  },
  departamento: {
    nome: { type: String, required: true },
    cod: { type: String, required: true },
  },
  coeficienteRendimento: { type: Number, require: true },
});

module.exports = mongoose.model("aluno", alunoSchema);
