const express = require("express");
const router = express.Router();
const Disciplina = require("../models/disciplina");

router.get("/:cod_disciplina", getDisciplina, (req, res) => {
  res.json(res.disciplina);
});

async function getDisciplina(req, res, next) {
  let disciplina;
  try {
    disciplina = await Disciplina.findOne({ cod: req.params.cod_disciplina });
    if (disciplina == null) {
      return res.status(404).json({ message: "disciplina not found!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.disciplina = disciplina;
  next();
}

module.exports = router;
