const express = require("express");
const router = express.Router();
const {registerUser, loginUser, getMe} = require('../controllers/users')

router.post("/signup", registerUser);

router.post("/login", loginUser);

router.post('/me', getMe)

module.exports = router;
