const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const dbo = require('../db/conn')

module.exports = function(passport) {
    let db_connect = dbo.getDb();
    passport.use(
        new LocalStrategy((username, password, done) => {
            db_connect.collection('customers').findOne({username: username}, (err, user) => {
                if (err) throw err;
                if (!user) return done(null, false);
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                        return done(null, user)
                    } else {
                        return done(null, false)
                    }
                })
            }) 
        })
        )

        passport.serializeUser((user, cb) => {
            cb(null, user.id);
        })
        passport.deserializeUser((id, cb) => {
            db_connect.collection('customers').findOne({_id: id}, (err, user) => {
                cb(err, user)
            })
        })
}

// let db_connect = dbo.getDb();
// let query = {_id: ObjectId(req.params.id)};
// db_connect.collection