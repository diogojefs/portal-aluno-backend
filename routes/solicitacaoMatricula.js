const express = require("express");
const router = express.Router();
const SolicitacaoMatricula = require("../models/solicitacaoMatricula");
const Disciplina = require("../models/disciplina");

router.get("/:matricula_aluno", getSolicitacoes, async (req, res) => {
  res.json(res.solicitacoes);
});

router.post("/", verificaDisciplinasNoCurso, async (req, res) => {
  const solicitacao = {
    matriculaAluno: req.body.matriculaAluno,
    disciplinas: req.body.disciplinas,
  };

  try {
    if (!res.result)
      return res
        .status(400)
        .json({ message: "Curso e disciplinas não estão relacionadas!" });

    const newSolicitacaoMatricula = await SolicitacaoMatricula.replaceOne(
      { matriculaAluno: req.body.matriculaAluno },
      solicitacao,
      {
        upsert: true,
      }
    );
    res.status(201).json(newSolicitacaoMatricula);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

async function verificaDisciplinasNoCurso(req, res, next) {
  const solicitacao = {
    matriculaAluno: req.body.matriculaAluno,
    codCurso: req.body.codCurso,
    disciplinas: req.body.disciplinas,
  };

  let result = true;

  await Promise.all(
    solicitacao.disciplinas.map(async (element) => {
      try {
        const query = await Disciplina.findOne({
          cod: element.cod,
          curso: solicitacao.codCurso,
        });

        if (query == null) result = false;
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    })
  );

  res.result = result;
  next();
}

async function getSolicitacoes(req, res, next) {
  let solicitacoes;
  try {
    solicitacoes = await SolicitacaoMatricula.findOne({
      matriculaAluno: req.params.matricula_aluno,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.solicitacoes = solicitacoes;
  next();
}

module.exports = router;
