const express = require('express')
const router = express.Router()
const dbo = require('../db/conn')
const ObjectId = require('mongodb').ObjectId

const busSchema = require('../models/buses')

router.get('/getBuses', async(req, res) => {

        await busSchema.find({}).populate({path: 'driver'}).exec((err, data) => {
    if(err) throw err
    res.send(data)
})
})
router.get('/getBuses/:id', (req, res) => {
    let db_connect = dbo.getDb();
    let query = {_id: ObjectId(req.params.id)};
    db_connect.collection('buses').findOne(query, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
})

// let db_connect = dbo.getDb('trasn-vill');
// db_connect.collection('buses').find({}).toArray((err, result) => {
//         if(err) throw err
//         res.json(result)
//     })
module.exports = router