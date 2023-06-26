const express = require("express");
const router = express.Router();
const Oferta = require("../models/oferta");

router.get("/:id_curso", getOferta, async (req, res) => {
  res.json(res.oferta);
});

async function getOferta(req, res, next) {
  let oferta;
  try {
    oferta = await Oferta.find({ codCurso: req.params.id_curso });
    if (oferta.length === 0) {
      return res
        .status(404)
        .json({ message: "Não há oferta para esse curso!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.oferta = oferta;
  next();
}

module.exports = router;
