import React from "react"
import { Link, withRouter } from "react-router-dom"

import "./AdminNavbar.scss"

let comingSoon = () => {
    alert("Coming Soon")
}

function AdminNavbar() {
    const {
        REACT_APP_LOGOUT
    } = process.env

    return (
        <div className="admin_navbar">
            <Link to="/admin/home"><button className="navbar_button">Home</button></Link>
            <Link to="/admin/edit/main"><button className="navbar_button">Edit Home Page</button></Link>
            <button className="navbar_button" onClick={comingSoon}>View Products</button>
            <button className="navbar_button" onClick={comingSoon}>Add a product</button>
            <a className="logout" href={`${REACT_APP_LOGOUT}`}>Logout</a>
        </div>
    )
}

export default withRouter(AdminNavbar)