const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const customerSchema = mongoose.model("customers");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ error: "Necesita iniciar sesión." });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, payload) => {
    if (err) return res.status(401).send({ error: "Necesita iniciar sesión." });
    const { userId } = payload;
    const user = await customerSchema.findById(userId);
    req.user = user;
    next();
  });
};