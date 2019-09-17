require("dotenv").config()
const express = require("express")
const session = require("express-session")
const massive = require("massive")

// Requiring Controllers
let admin = require("./Controllers/AdminController")
let user = require("./Controllers/UserController")

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

// Custome middleware
app.use((req, res, next) => {
    if (ENVIRONMENT === "DEV") {
        let devAdmin = {
            type: "developer",
            auth: true
        }
        req.session.admin = devAdmin
        next()
    }
    else {
        next ()
    }
})

// Admin endpoints
app.get("/auth/admin/callback", admin.login)
app.get("/api/admin/admin-data", admin.checkAdminCred)
app.get("/api/admin/logout", admin.logout)
app.put("/api/admin/home/img", admin.updateHomeImg)
app.put("/api/admin/home/background", admin.updateHomeBackgroundImg)
app.put("/api/admin/about/description", admin.updateAboutDescription)


// User endpoints
app.get("/api/user/home-info", user.getHomeInfo)
app.get("/api/user/about-info", user.getAboutInfo)

massive(CONNECTION_STRING).then(db => {
    app.set("db", db)
    app.listen(port, () => console.log(`Listening on port ${port}`))
}).catch(err => console.log(err))