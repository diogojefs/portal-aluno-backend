const mongoose = require("mongoose");

const resultadoMatriculaSchema = new mongoose.Schema({
  codDisciplina: { type: String, require: true },
  matriculaAlunos: { type: Array, require: true, default: [] },
});

module.exports = mongoose.model("ResultadoMatricula", resultadoMatriculaSchema);
