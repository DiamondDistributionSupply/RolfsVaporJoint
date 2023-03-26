import React, { Component } from "react"
// import axios from "axios"
import { Carousel } from "react-responsive-carousel"

import SiteBanner from "../../ReusableComponents/SiteBanner/SiteBanner"
import UserNavbar from "../../ReusableComponents/UserNavbar/UserNavbar"
import UserFooter from "../../ReusableComponents/UserFooter/UserFooter"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import  "./Home.scss"

class Home extends Component {
    // constructor() {
    //     super()

    //     this.state = {
    //         backgroundImg: { id: 1, img: ""},
    //         imgs: []
    //     }
    // }

    // async componentDidMount() {
    //     try {
    //         let InfoRes = await axios.get("/api/user/home-info")
    //         this.setState({
    //             backgroundImg: InfoRes.data[0][0],
    //             imgs: InfoRes.data[1]
    //         })
    //     }
    //     catch(err) {
    //         console.log(err)
    //     }
    // }

    render() {
        const { REACT_APP_SERVER_HOST } = process.env
        // let imgs = null
        // if (this.state.imgs.length) {
        //     imgs = this.state.imgs.map((img, i) => {
        //         return (
        //             <div key={i}>
        //                 <img className="home_img" src={img.img} alt=""/>
        //             </div>
        //         )
        //     })
        // }
        // const carousel = this.state.imgs.length
        // ?
        // <Carousel
        //     autoPlay={true}
        //     infiniteLoop={true}
        //     showThumbs={false}
        // >
        //     {imgs}
        // </Carousel>
        // :
        // null

        return (
            <div id="home">
                <SiteBanner />
                <UserNavbar />
                <div className="ccc">
                    <div className="carousel_container">
                        {/* {carousel} */}
                        <Carousel
                        autoPlay={true}
                        infiniteLoop={true}
                        showThumbs={false}
                        >
                            <img className="home_img" src={`${REACT_APP_SERVER_HOST}/pool-table.jpg`} alt="" />
                            <img className="home_img" src={`${REACT_APP_SERVER_HOST}/liquid-smoke.jpg`} alt="" />
                            <img className="home_img" src={`${REACT_APP_SERVER_HOST}/display-case.jpg`} alt="" />
                            <img className="home_img" src={`${REACT_APP_SERVER_HOST}/provo-store.jpg`} alt="" />
                            <img className="home_img" src={`${REACT_APP_SERVER_HOST}/orem-store.jpg`} alt="" />
                        </Carousel>
                    </div>
                </div>
                <UserFooter />
            </div>
        )
    }
}

export default Home