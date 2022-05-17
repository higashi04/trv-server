const express = require('express')
const router = express.Router()
const dbo = require('../db/conn')
const ObjectId = require('mongodb').ObjectId



router.get('/getDrivers', async(req, res) => {
    let db_connect = dbo.getDb('trasn-vill');
    db_connect.collection('drivers').find({company: req.body}).toArray((err, result) => {
            if(err) throw err
            res.json(result)
        })
        
})
router.get('/getDrivers/:id', (req, res) => {
    let db_connect = dbo.getDb();
    let query = {_id: ObjectId(req.params.id)};
    db_connect.collection('drivers').findOne(query, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
})


module.exports = router