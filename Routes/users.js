const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const dbo = require('../db/conn')
const ObjectId = require('mongodb').ObjectId
const passport = require('passport')
const LocalStrategy = require('passport-local')


// passport.use(new LocalStrategy(function verify(username, password, cb) {
//     let db_connect = dbo.getDb('trasn-vill');
//     db_connect.collection('customers').find({username: })
// }))

router.post('/login', (req, res) => {
    let db_connect = dbo.getDb('trasn-vill');
    let query = {username: req.body.username};
    db_connect.collection('drivers').findOne(query, (err, result) => {
            if (err) throw err;
            res.json(result)
        })
})

module.exports = router