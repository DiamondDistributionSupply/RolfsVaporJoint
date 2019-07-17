import React, { Component } from "react"

import SiteBanner from "../../ReusableComponents/SiteBanner/SiteBanner"
import AdminNavbar from "../../ReusableComponents/AdminNavbar/AdminNavbar"

class AdminProduct extends Component {
    constructor() {
        super()

        this.state = {
            juices: [],
            hardware: []
        }
    }

    render() {
        return (
            <div>
                <SiteBanner />
                <AdminNavbar />
                <p>Admin Products Coming Soon</p>
            </div>
        )
    }
}

export default AdminProduct