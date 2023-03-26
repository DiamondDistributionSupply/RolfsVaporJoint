import React, { Component } from "react"
// import axios from "axios"

import UserNavbar from "../../ReusableComponents/UserNavbar/UserNavbar"
import UserFooter from "../../ReusableComponents/UserFooter/UserFooter"
import "./About.scss"

class About extends Component {
    // constructor() {
    //     super()

        // this.state = {
        //     backgroundImg: { id: 1, img: ""},
        //     aboutImg: {id: 1, img: ""},
        //     description: ""
        // }
    // }

    // async componentDidMount() {
    //     let aboutInfo = await axios.get("/api/user/about-info")
    //     this.setState({
    //         backgroundImg: aboutInfo.data[0][0],
    //         aboutImg: aboutInfo.data[1][0],
    //         description: aboutInfo.data[2][0].description
    //     })
    // }

    render() {
        // let backgroundImg = {
        //     backgroundImage: `url(${this.state.backgroundImg.img})`,
        //     backgroundRepeat: "no-repeat",
        //     backgroundSize: "cover"
        // }
        const { REACT_APP_SERVER_HOST } = process.env
        return (
            <div className="about">
                <UserNavbar />
                <div className="about_info_container">
                    <div className="about_img_container">
                        <img src={`${REACT_APP_SERVER_HOST}/owners.jpg`} alt="rolf"/>
                    </div>
                    <div className="about_description_container">
                        <p>Coming Soon</p>
                    </div>
                </div>
                <div></div>
                <UserFooter />
            </div>
        )
    }
}

export default About