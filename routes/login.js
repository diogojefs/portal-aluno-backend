const express = require("express");
const router = express.Router();
const Aluno = require("../models/aluno");

router.post("/", getAluno, async (req, res) => {
  res.json(res.aluno);
});

async function getAluno(req, res, next) {
  let aluno;
  try {
    aluno = await Aluno.findOne({ matricula: req.body.matricula });
    if (aluno == null) {
      return res.status(404).json({ message: "aluno não-encontrado!" });
    }
    if (aluno.senha !== req.body.senha)
      return res.status(404).json({ message: "senha incorreta!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.aluno = aluno;
  next();
}

module.exports = router;
