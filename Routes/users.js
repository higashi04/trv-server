const express = require('express')
const router = express.Router()
const dbo = require('../db/conn')
const ObjectId = require('mongodb').ObjectId


router.post('/login', (req, res) => {
    res.send(req.body)
})

module.exports = router