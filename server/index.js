require("dotenv").config();

const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");  

const app = express();

const isAuth = require("./middleware/auth")

const DEFAULT_PORT = 3333
const currentPort = process.env.PORT || DEFAULT_PORT

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cors())

const register = require( "./controllers/register.js")
const login = require( "./controllers/login.js")

app.post('/login', login)
app.post('/register', register)
app.post('/got',isAuth,(req,res) => (res.send('H-i')))




console.log(`Running on port ${currentPort}`)
app.listen(currentPort)