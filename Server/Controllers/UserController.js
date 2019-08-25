module.exports = {
    getHomeInfo: async (req, res) => {
        try {
            const db = req.app.get("db")

            let backgroundImg = await db.get_home_bg_img()
            let imgs = await db.get_home_imgs()

            res.status(200).send([backgroundImg, imgs])
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    getAboutInfo: async (req, res) => {
        try {
            const db = req.app.get("db")

            let background = await db.get_home_bg_img()
            let description = await db.get_about_description()

            res.status(200).send([background, description])
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    getProductTypes: async (req, res) => {
        try {
            const db = req.app.get("db")

            let juiceTypes = await db.get_juice_types()
            let hardwareTypes = await db.get_hardware_types()

            res.status(200).send([juiceTypes, hardwareTypes])
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    }
}