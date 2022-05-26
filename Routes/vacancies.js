const express = require('express')
const router = express.Router()
const dbo = require('../db/conn')
const ObjectId = require('mongodb').ObjectId



router.get('/getVacancies', async(req, res) => {
    let db_connect = dbo.getDb('trasn-vill');
    db_connect.collection('vacancies').find({covered: false}).toArray((err, result) => {
            if(err) throw err
            res.json(result)
        })
        
})
router.get('/getVacancies/:id', (req, res) => {
    let db_connect = dbo.getDb();
    let query = {_id: ObjectId(req.params.id)};
    db_connect.collection('vacancies').findOne(query, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
})


module.exports = router