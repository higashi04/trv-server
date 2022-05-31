const express = require('express')
const router = express.Router()
const drivers = require('../models/drivers')

router.get('/getDrivers', async(req, res) => {
    const data = await drivers.find({}).exec()
    res.send(data)
})

router.get('/getDrivers/:id', async(req, res) => {
    const data = await drivers.findById(req.params.id).exec()
    res.send(data)
})


module.exports = router