import React, { Component } from "react"
import axios from "axios"

import UserNavbar from "../../ReusableComponents/UserNavbar/UserNavbar"
import UserFooter from "../../ReusableComponents/UserFooter/UserFooter"
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
            backgroundImage: `url(${this.state.backgroundImg.img})`
        }
        return (
            <div className="about" style={backgroundImg}>
                <UserNavbar />
                <div className="about_info_container">
                    <img src="" alt="rolf"/>
                    <p>{this.state.description}</p>
                </div>
                <div></div>
                <UserFooter />
            </div>
        )
    }
}

export default About