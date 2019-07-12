const axios = require("axios")

const {
    REACT_APP_DOMAIN,
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET,
    HTTP,
    AA
} = process.env

module.exports = {
    login: async (req, res) => {
        try {
            const db = req.app.get("db")

            // Payload to give to auth0
            let payload = {
                client_id: REACT_APP_CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code: req.query.code,
                grant_type: "authorization_code",
                redirect_uri: `${HTTP}://${req.headers.host}/auth/admin/callback`
            }

            // Ask for token with payload to auth0
            let resWithToken = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`, payload)

            // Get user data with the recieved token
            let resWithUserData = await axios.post(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${resWithToken.data.access_token}`)

            // Check to see if admin credentials are correct
            const { sub } = resWithUserData.data
            let admin = await db.admin_login([sub])
            if (sub === `${AA}`) {
                req.session.admin = admin
                res.redirect("/#/admin/home")
            }
            else {
                res.status(403).redirect("/#/admin/login")
            }
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },
    
    checkAdminCred: (req, res) => {
        try {
            if (req.session.admin) {
                res.status(200).send(req.session.admin)
            }
            else {
                res.status(403).send("unauthorized")
            }
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    updateHomeImg: async (req, res) => {
        try {
            const db = req.app.get("db")
            const { img, id } = req.body

            await db.update_home_img([img, id])

            res.sendStatus(200)
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    updateHomeDescription: async (req, res) => {
        try {
            const db = req.app.get("db")
            const { description } = req.body

            await db.update_home_description([description])

            res.sendStatus(200)
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    }
}