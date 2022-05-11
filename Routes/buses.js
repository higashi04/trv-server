const express = require('express')
const router = express.Router()
const dbo = require('../db/conn')
const ObjectId = require('mongodb').ObjectId

router.get('/getBuses', (req, res) => {
    let db_connect = dbo.getDb('trasn-vill');
    db_connect.collection('buses').find({}).toArray((err, result) => {
            if(err) throw err
            res.json(result)
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

module.exports = router