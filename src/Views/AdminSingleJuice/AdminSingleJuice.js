import React, { Component } from "react"
import axios from "axios"

import SiteBanner from "../../ReusableComponents/SiteBanner/SiteBanner"
import AdminNavbar from "../../ReusableComponents/AdminNavbar/AdminNavbar"
import "./AdminSingleJuice.scss"

class AdminSingleJuice extends Component {
    constructor() {
        super()

        this.state = {
            juice: {},
            backgroundImg: { id: 1, img: "" }
        }
    }

    async componentDidMount() {
        let backgroundRes = await axios.get("/api/admin/get/background")
        this.setState({
            backgroundImg: backgroundRes.data[0]
        })
    }

    render() {
        const backgroundStyle = {
            backgroundImage: `url(${this.state.backgroundImg.img})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }

        return (
            <div className="admin_single_juice" style={backgroundStyle}>
                <SiteBanner />
                <AdminNavbar />
                <p>Admin Single Juice Coming Soon</p>
            </div>
        )
    }
}

export default AdminSingleJuice