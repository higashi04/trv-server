const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const customerSchema = mongoose.model("customers");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, company } = req.body;
    console.log(req.body)
    const user = new customerSchema({
      username,
      email,
      password,
      firstName,
      lastName,
      company,
    });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  if (!email || !password)
    return res
      .status(422)
      .send({ error: "En necesario proveer el email y su contraseña." });
  const user = await customerSchema.findOne({ email: email });
  if (!user)
    return res
      .status(422)
      .send({ error: "Su email o contraseña están incorrectos." });
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, proccess.env.TOKEN_SECRET);
    res.send({ token });
    console.log(user)
  } catch (err) {
    return res
      .status(422)
      .send({ error: "Su email o contraseña están incorrectos." });
  }
});

module.exports = router;
