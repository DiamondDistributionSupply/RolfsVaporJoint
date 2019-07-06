require("dotenv").config()
const express = require("express")
const session = require("express-session")
const massive = require("massive")

const app = express ()

const {
    CONNECTION_STRING,
    SERVER_PORT,
    SECRET,
    ENVIRONMENT
} = process.env

const port = SERVER_PORT || 3005

app.use(express.json())
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true
}))

massive(CONNECTION_STRING).then(db => {
    app.set("db", db)
    app.listen(port, () => console.log(`Listening on port ${port}`))
}).catch(err => console.log(err))