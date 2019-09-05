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

    updateHomeBackgroundImg: async (req, res) => {
        try {
            const db = req.app.get("db")
            const { img } = req.body

            await db.update_home_bg_img([img])

            res.sendStatus(200)
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    updateAboutDescription: async (req, res) => {
        try {
            const db = req.app.get("db")
            const { description } = req.body

            await db.update_about_description([description])

            res.sendStatus(200)
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    getJuiceTypes: async (req, res) => {
        try {
            const db = req.app.get("db")

            let juiceTypes = await db.get_juice_types()

            res.status(200).send(juiceTypes)
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    getHardwareTypes: async (req, res) => {
        try {
            const db = req.app.get("db")

            let hardwareTypes =  await db.get_hardware_types()

            res.status(200).send(hardwareTypes)
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    addJuiceType: async (req, res) => {
        try {
            const db = req.app.get("db")
            const { name } = req.body

            await db.add_juice_type([name])

            res.sendStatus(200)
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    addHardwareType: async (req, res) => {
        try {
            const db = req.app.get("db")
            const { name } = req.body

            await db.add_hardware_type([name])

            res.sendStatus(200)
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    addJuice: async (req, res) => {
        try {
            const db = req.app.get("db")
            const {
                name,
                description,
                flavorProfile,
                size,
                nicotine,
                type,
                otherDetails,
                price,
                images,
                brand
            } = req.body.productInfo

            let productId = await db.add_juice([name, description, flavorProfile, type, otherDetails, brand])

            await db.add_juice_variation([productId[0].id, size, nicotine, price])

            for(let i = 0; i < images.length; i++) {
                await db.add_juice_images([productId[0].id, images[i]])
            }

            res.status(200).send(productId)
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    addHardware: async (req, res) => {
        try {
            const db = req.app.get("db")
            const {
                type,
                name,
                description,
                attributes,
                otherDetails,
                price,
                images,
                brand
            } = req.body.productInfo

            let productId = await db.add_hardware([type, name, description, attributes, otherDetails, price, brand])

            for(let i = 0; i < images.length; i++) {
                await db.add_hardware_images([productId[0].id, images[i]])
            }

            res.status(200).send(productId)
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    getBackground: async (req, res) => {
        try {
            const db = req.app.get("db")

            let background = await db.get_home_bg_img()

            res.status(200).send(background)
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    }
}