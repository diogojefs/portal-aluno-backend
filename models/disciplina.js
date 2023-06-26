const mongoose = require("mongoose");

const disciplinaSchema = new mongoose.Schema({
  nome: { type: String, require: true },
  cod: { type: String, require: true },
  curso: { type: String, require: true },
  cargaHoraria: { type: Number, require: true },
  ementa: { type: String, require: true },
});

module.exports = mongoose.model("Disciplina", disciplinaSchema);
