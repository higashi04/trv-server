const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const MongoStore = require('connect-mongo');

const busRoutes = require('./Routes/buses')
const driverRoutes = require('./Routes/drivers')
const userRoutes = require('./Routes/users')

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
 

const store = MongoStore.create({
    mongoUrl: process.env.DB_URL,
    touchAfter: 24 * 3600,
    crypto: {
        secret: process.env.SECRET
    }
});

store.on('error', (e)=>{
    console.log(e)
})

app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60*24,
        maxAge: 1000 * 60 * 60*24
    }
}))
app.use(cookieParser(process.env.SECRET))
app.use(passport.initialize());
app.use(passport.session());
require('./config/passportConfig')(passport)

app.use('/buses', busRoutes);
app.use('/drivers', driverRoutes);
app.use('/users', userRoutes);

const port = process.env.PORT || 8083
const dbo = require('./db/conn');

app.get('/', (req, res) => {
    res.send('this is a server only, no frontend pretty thingies')
})

app.listen(port, () => {
    dbo.connectToServer((err) => {
        if (err) console.error(err)
    })
    console.log(`App running on port ${port}`)
})