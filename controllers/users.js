const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const customerSchema = mongoose.model("customers");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
      expiresIn: '30d',
    })
  }

const registerUser = async (req, res) => {
  const { username, email, password, firstName, lastName, company } = req.body;
  if (!username || !email || !password || !firstName || !lastName || !company) {
    res.status(400);
    throw new Error("Favor de llenar todos los campos");
  }

  const userExists = await customerSchema.findOne({ username });
  if (userExists) {
    res.status(400);
    throw new Error("El usuario ya se encuentra registrado.");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await customerSchema.create({
    username,
    email,
    password: hashedPassword,
    firstName,
    lastName,
    company,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      company: user.company,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Datos no validos.");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await customerSchema.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      company: user.company,
      token: generateToken(user._id),
    });
  } else {
      res.status(400)
      throw new Error('Revise su contraseña y/o su email.')
  }
};

const getMe = async(req, res) => {
    res.status(200).json(req.user)
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
  }