const mongoose = require("mongoose");

const ofertaSchema = new mongoose.Schema({
  nomeDisciplina: { type: String, require: true },
  codCurso: { type: String, require: true },
  codDisciplina: { type: String, require: true },
  numeroVagas: { type: Number, require: true, default: 30 },
});

module.exports = mongoose.model("Oferta", ofertaSchema);
