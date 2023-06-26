const mongoose = require("mongoose");

const departamentoSchema = new mongoose.Schema({
  nome: { type: String, require: true },
  cod: { type: String, require: true },
});

module.exports = mongoose.model("departamentos", departamentoSchema);
