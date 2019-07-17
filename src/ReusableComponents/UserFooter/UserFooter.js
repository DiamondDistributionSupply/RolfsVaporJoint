import React from "react"

import "./UserFooter.scss"

function UserFooter() {
    return (
        <footer>
            <div className="footer_site_name">
                <p className="site_name">Rolfs Vapor Joint</p>
            </div>
            <div className="footer_location">
                <p>Locations:</p>
                <div>
                    <p>Orem</p>
                    <p>Provo</p>
                </div>
            </div>
            <div className="footer_contact">
                <p>Contact Us</p>
                <p>Number</p>
            </div>
        </footer>
    )
}

export default UserFooter