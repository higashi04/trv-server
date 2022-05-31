const express = require('express')
const router = express.Router()
const buses = require('../models/buses')

router.get('/getBuses', async(req, res) => {
    const data = await buses.find({}).exec()
    res.send(data)
})
router.get('/getBuses/:id', async(req, res) => {
const data = await buses.findById(req.params.id).exec()
res.send(data)
})


module.exports = router