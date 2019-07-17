import React from "react"
import logo from "./RVJLogo.png"

import "./SiteBanner.scss"

function SiteBanner() {
    return (
        <header className="site_banner">
            <img src={logo} alt="logo" />
            <p>Rolf's Vapor Joint</p>
            <div></div>
        </header>
    )
}

export default SiteBanner