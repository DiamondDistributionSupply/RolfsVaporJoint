module.exports = {
    getHomeInfo: async (req, res) => {
        try {
            const db = req.app.get("db")

            let imgs = await db.get_home_imgs()

            console.log(imgs)

            let description = await db.get_home_description()

            res.status(200).send([imgs, description])
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    }
}