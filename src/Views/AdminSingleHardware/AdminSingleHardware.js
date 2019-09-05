import React, { Component } from "react"
import axios from "axios"

import SiteBanner from "../../ReusableComponents/SiteBanner/SiteBanner"
import AdminNavbar from "../../ReusableComponents/AdminNavbar/AdminNavbar"
import "./AdminSingleHardware.scss"

class AdminSingleHardware extends Component {
    constructor() {
        super()

        this.state = {
            hardware: {},
            backgroundImg: { id: 1, img: ""}
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
            <div className="admin_single_hardware" style={backgroundStyle}>
                <SiteBanner />
                <AdminNavbar />
                <p>Admin Single Hardware Coming Soon</p>
            </div>
        )
    }
}

export default AdminSingleHardware