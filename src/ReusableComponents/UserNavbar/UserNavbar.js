import React from "react"
import { Link, withRouter } from "react-router-dom"

import "./UserNavbar.scss"

function UserNavbar() {
    return (
        <div className="user_navbar">
            <Link className="navbar_fst" to="/">
                <button className="navbar_btn">Home</button>
            </Link>
            <div className="navbar_fst navbar_btn">
                <p>Products</p>
            </div>
            <div className="navbar_fst navbar_btn">
                <p>Locations</p>
            </div>
            <Link className="navbar_fst">
                <button className="navbar_btn">About</button>
            </Link>
            <div className="navbar_btn">
                <p>Contact</p>
            </div>
        </div>
    )
}

export default withRouter(UserNavbar)