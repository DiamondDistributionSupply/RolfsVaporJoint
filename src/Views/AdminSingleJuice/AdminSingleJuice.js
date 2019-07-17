import React, { Component } from "react"

import SiteBanner from "../../ReusableComponents/SiteBanner/SiteBanner"
import AdminNavbar from "../../ReusableComponents/AdminNavbar/AdminNavbar"

class AdminSingleJuice extends Component {
    constructor() {
        super()

        this.state = {
            juice: {}
        }
    }

    render() {
        return (
            <div>
                <SiteBanner />
                <AdminNavbar />
                <p>Admin Single Juice Coming Soon</p>
            </div>
        )
    }
}

export default AdminSingleJuice