const mongoose = require("mongoose");

const solicitacaoMatriculaSchema = new mongoose.Schema({
  matriculaAluno: { type: String, require: true },
  data: { type: Date, require: true, default: Date.now },
  disciplinas: [{ cod: { type: String, required: true } }],
});

module.exports = mongoose.model(
  "SolicitacaoMatricula",
  solicitacaoMatriculaSchema
);
