const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();

const busRoutes = require('./Routes/buses')

app.use(cors());
app.use(express.json());
app.use('/buses', busRoutes);
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