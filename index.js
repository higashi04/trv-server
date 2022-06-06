require("./models/customer");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
// const session = require("express-session");
// const MemoryStore = require('memorystore')(session)
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const requireAuth = require("./middleware/requireAuth");

const busRoutes = require("./Routes/buses");
const driverRoutes = require("./Routes/drivers");
const userRoutes = require("./Routes/users");
const vacanciesRoutes = require("./Routes/vacancies");

const whitelist = "https://transportevillarreal.herokuapp.com"

const corsOpts = {
  origin: function(origin, callback) {
    if(!origin || whitelist.indexOf(origin !== -1)) {
      callback(null, true)
    } else {
      callback(new Error('Sitio Bloqueado'))
    }
  },
  credentials: true
}


app.use(cors(corsOpts));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const store = MongoStore.create({
  mongoUrl: process.env.DB_URL,
  touchAfter: 24 * 3600,
  crypto: {
    secret: process.env.SECRET,
  },
});

store.on("error", (e) => {
  console.log(e);
});
mongoose.connect(process.env.DB_URL);
mongoose.connection.on("connected", () => {
  console.log("mongo atlas is running");
});
mongoose.connection.on("error", (err) => {
  console.error("Error on mongo", err);
});
// app.use(
//   session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       httpOnly: true,
//       // secure: true,
//       expires: Date.now() + 1000 * 60 * 60 * 24,
//       maxAge: 1000 * 60 * 60 * 24,
//     },
//   })
// );
app.use(cookieParser(process.env.SECRET));
app.use("/buses", busRoutes);
app.use("/drivers", driverRoutes);
app.use("/users", userRoutes);
app.use("/vacantes", vacanciesRoutes);

const port = process.env.PORT || 8083;
app.get("/", (req, res) => {
  res.send(
    `this is a server only, no frontend pretty thingies`
  );
  console.log(`this is a server only, no frontend pretty thingies`)
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
