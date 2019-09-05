import React, { Component } from "react"
import axios from "axios"

import SiteBanner from "../../ReusableComponents/SiteBanner/SiteBanner"
import "./AdminLogin.scss"

class AdminLogin extends Component {
   constructor() {
       super()

       this.state = {
           backgroundImg: { id: 1, img: "" }
       }
   }

   async componentDidMount() {
       let backgroundRes = await axios.get("/api/admin/get/background")
       console.log(backgroundRes)
       this.setState({
           backgroundImg: backgroundRes.data[0]
       })
   }

   login = () => {
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

   render() {
    const backgroundStyle = {
        backgroundImage: `url(${this.state.backgroundImg.img})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    }

    return (
        <div className="admin_login" style={backgroundStyle}>
            <SiteBanner />
            <div className="login_container">
                <button className="button" onClick={this.login}>Login</button>
            </div>
            <div></div>
        </div>
    )
   }
}

export default AdminLogin