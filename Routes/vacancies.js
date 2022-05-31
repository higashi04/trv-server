const express = require("express");
const router = express.Router();

const vacancies = require("../models/vacancies");

router.get("/getVacancies", async (req, res) => {
  const data = await vacancies.find({}).exec();
  res.send(data);
});
router.get("/getVacancies/:id", async (req, res) => {
  const data = await vacancies.findById(req.params.id).exec();
  res.send(data);
});

module.exports = router;
