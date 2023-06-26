const express = require("express");
const router = express.Router();
const Person = require("../models/disciplina");

router.get("/", async (req, res) => {
  try {
    const person = await Person.find();
    res.json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", getPersons, (req, res) => {
  res.json(res.person);
});

router.post("/", async (req, res) => {
  const person = new Person({
    name: req.body.name,
    age: req.body.age,
    birthday: req.body.birthday,
    sex: req.body.sex,
    weight: req.body.weight,
    height: req.body.height,
    office: req.body.office,
    wage: req.body.wage,
    civilStatus: req.body.civilStatus,
    childrens: req.body.childrens,
  });

  try {
    const newPerson = await person.save();
    res.status(201).json(newPerson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", getPersons, async (req, res) => {
  // replace values from body
  Object.keys(req.body).forEach((key) => {
    if (!!res.person[key]) {
      res.person[key] = req.body[key];
    }
  });

  try {
    const updatePerson = await res.person.save();

    res.json(updatePerson);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", getPersons, async (req, res) => {
  try {
    console.log(res.person);
    await res.person.deleteOne();
    res.json({ message: "Person was deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getPersons(req, res, next) {
  let person;
  try {
    person = await Person.findById(req.params.id);
    if (person == null) {
      return res.status(404).json({ message: "person not found!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.person = person;
  next();
}

module.exports = router;
