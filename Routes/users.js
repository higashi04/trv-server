const express = require('express')
const router = express.Router()

const passport = require('passport')



router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err
        if (!user) res.send('La contraseña o el usuario están incorrectos.')
        else {
            req.logIn(user, err => {
                if (err) throw err
                res.send('Bienvenido')
            }) 
        }
    })(req, res, next)
})

module.exports = router