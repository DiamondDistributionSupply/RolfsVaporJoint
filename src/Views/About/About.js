import React, { Component } from "react"
import axios from "axios"

import UserNavbar from "../../ReusableComponents/UserNavbar/UserNavbar"
import UserFooter from "../../ReusableComponents/UserFooter/UserFooter"
import owner from "./RP.jpg"
import "./About.scss"

class About extends Component {
    constructor() {
        super()

        this.state = {
            backgroundImg: { id: 1, img: ""},
            description: ""
        }
    }

    async componentDidMount() {
        let aboutInfo = await axios.get("/api/user/about-info")
        this.setState({
            backgroundImg: aboutInfo.data[0][0],
            description: aboutInfo.data[1][0].description
        })
    }

    render() {
        let backgroundImg = {
            backgroundImage: `url(${this.state.backgroundImg.img})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }
        return (
            <div className="about" style={backgroundImg}>
                <UserNavbar />
                <div className="about_info_container">
                    <div className="about_img_container">
                        <img src={owner} alt="rolf"/>
                    </div>
                    <div className="about_description_container">
                        <p>{this.state.description}</p>
                    </div>
                </div>
                <div></div>
                <UserFooter />
            </div>
        )
    }
}

export default About