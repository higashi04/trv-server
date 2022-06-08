const express = require('express')
const router = express.Router()
const drivers = require('../models/drivers')

router.get('/getDrivers', async(req, res) => {
    const data = await drivers.find({fueDadoDeBaja: false}).exec()
    res.send(data)
})

router.get('/getDrivers/medline', async(req, res) => {
    const data = await drivers.find({company: 'MEDLINE', fueDadoDeBaja: false}).exec()
    res.send(data)
})
router.get('/getDrivers/oes', async(req, res) => {
    const data = await drivers.find({company: 'OES', fueDadoDeBaja: false}).exec()
    res.send(data)
})
router.get('/getDrivers/bpi', async(req, res) => {
    const data = await drivers.find({company: 'BPI', fueDadoDeBaja: false}).exec()
    res.send(data)
})
router.get('/getDrivers/aistermi', async(req, res) => {
    const data = await drivers.find({company: 'AISTERMI', fueDadoDeBaja: false}).exec()
    res.send(data)
})

router.get('/getDrivers/:id', async(req, res) => {
    const data = await drivers.findById(req.params.id).populate({path: "bus"}).exec()
    res.send(data)
})


module.exports = router