const mongoose = require("mongoose");

const cursoSchema = new mongoose.Schema({
  nome: { type: String, require: true },
  cod: { type: String, require: true },
  departamento: { type: String, require: true },
});

module.exports = mongoose.model("Curso", cursoSchema);
