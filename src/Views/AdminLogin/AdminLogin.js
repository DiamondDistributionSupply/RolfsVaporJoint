import React from "react"

import SiteBanner from "../../ReusableComponents/SiteBanner/SiteBanner"
import "./AdminLogin.scss"

let login = () => {
    try {
        // Grab auth0 stuff from env
        let {
            REACT_APP_DOMAIN,
            REACT_APP_CLIENT_ID
        } = process.env
    
        // Use auth0 to login admin
    
        let url = encodeURIComponent(`${window.location.origin}/auth/admin/callback`)
        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`
    }
    catch(err) {
        console.log(err)
    }
}

function AdminLogin(props) {
    return (
        <div className="admin_login">
            <SiteBanner />
            <div class="login_container">
                <button class="button" onClick={login}>Login</button>
            </div>
            <div></div>
        </div>
    )
}

export default AdminLogin