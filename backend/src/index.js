require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')


const connectDB = require('./api/config/dbConn');
const handleNewUser = require('./api/controllers/registerController')

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Connecting to the Database
const connection = connectDB();

app.get("/", (req, res) => {
    res.send("hello world");    
});

app.use("/register-user", require('./api/routes/registerRoute'));

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
});