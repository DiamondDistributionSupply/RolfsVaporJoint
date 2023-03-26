require("dotenv").config()
const express = require("express")
const session = require("express-session")
// const massive = require("massive")

// Requiring Controllers
// let admin = require("./Controllers/AdminController")
// let user = require("./Controllers/UserController")

const app = express ()

const {
    SERVER_PORT,
    SECRET
} = process.env

const port = SERVER_PORT || 3005

app.use(express.json())
app.use(express.static(`${__dirname}/../src/Styles/Images`))
app.use(express.static(`${__dirname}/../build`))
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true
}))

// Admin endpoints
// app.get("/auth/admin/callback", admin.login)
// app.get("/api/admin/admin-data", admin.checkAdminCred)
// app.get("/api/admin/logout", admin.logout)
// app.put("/api/admin/home/img", admin.updateHomeImg)
// app.put("/api/admin/home/background", admin.updateHomeBackgroundImg)
// app.put("/api/admin/about/img", admin.updateAboutImg)
// app.put("/api/admin/about/description", admin.updateAboutDescription)


// User endpoints
// app.get("/api/user/home-info", user.getHomeInfo)
// app.get("/api/user/about-info", user.getAboutInfo)

try {
    app.listen(port, () => console.log(`Listening on port ${port}`))
}
catch(err) {
    console.log(err)
}