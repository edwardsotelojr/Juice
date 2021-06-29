
const key = require('./keys.js');
const routes = require("./routes/auth");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const PORT = 8000;
const passport = require("passport");
const cors = require('cors')

app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
//middlewares
app.use(bodyParser.json());

// root
// mongo password: pegvI3-puxnok-wymmuc
mongoose.connect(key.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Mongoose Connected. ");
})
.catch(err => console.log(err));

app.use(passport.initialize());
// Passport config
require("./passport")(passport);
/*
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB datebase connection established successfully");
});*/
app.use("/users", routes);
app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
});


