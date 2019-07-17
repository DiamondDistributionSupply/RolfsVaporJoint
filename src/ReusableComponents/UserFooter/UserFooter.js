import React from "react"

import "./UserFooter.scss"

function UserFooter() {
    return (
        <footer>
            <div className="footer_site_name">
                <p className="site_name">Rolfs Vapor Joint</p>
            </div>
            <div className="footer_location">
                <p>Locations</p>
                <div>
                    <p>Provo: 895 S University Ave, Provo, UT 84601</p>
                    <p>Orem: 016 Industrial Park Rd, Orem, UT 84057</p>
                </div>
            </div>
            <div className="footer_contact">
                <p>Contact Us</p>
                <div>
                    <p>Provo: (801) 691-1487</p>
                    <p>Orem: (801) 607-5542</p>
                </div>
            </div>
        </footer>
    )
}

export default UserFooter