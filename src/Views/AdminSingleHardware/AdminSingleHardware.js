import React, { Component } from "react"

import SiteBanner from "../../ReusableComponents/SiteBanner/SiteBanner"
import AdminNavbar from "../../ReusableComponents/AdminNavbar/AdminNavbar"

class AdminSingleHardware extends Component {
    constructor() {
        super()

        this.state = {
            hardware: {}
        }
    }

    render() {
        return (
            <div>
                <SiteBanner />
                <AdminNavbar />
                <p>Admin Single Hardware Coming Soon</p>
            </div>
        )
    }
}

export default AdminSingleHardware