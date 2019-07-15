import React, { Component } from "react"
import axios from "axios"
import { Carousel } from "react-responsive-carousel"

import "react-responsive-carousel/lib/styles/carousel.min.css"
import  "./Home.scss"

class Home extends Component {
    constructor() {
        super()

        this.state = {
            backgroundImg: { id: 1, img: ""},
            imgs: []
        }
    }

    async componentDidMount() {
        try {
            let InfoRes = await axios.get("/api/user/home-info")
            this.setState({
                backgroundImg: InfoRes.data[0][0],
                imgs: InfoRes.data[1]
            })
        }
        catch(err) {
            console.log(err)
        }
    }

    render() {
        let imgs = null
        if (this.state.imgs.length) {
            imgs = this.state.imgs.map((img, i) => {
                return (
                    <div key={i}>
                        <img className="home_img" src={img.img} alt=""/>
                    </div>
                )
            })
        }
        const carousel = this.state.imgs.length
        ?
        <Carousel
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
        >
            {imgs}
        </Carousel>
        :
        null

        const backgroundStyle = {
            backgroundImage: `url(${this.state.backgroundImg.img})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }

        return (
            <div id="home" style={backgroundStyle}>
                <header className="site_banner">
                    <img src="" alt="logo" />
                    <p>Rolf's Vapor Joint</p>
                    <div></div>
                </header>
                <div className="carousel_container">
                    {carousel}
                </div>
                <div className="description_container">
                    <p>{this.state.description}</p>
                </div>
                <footer></footer>
            </div>
        )
    }
}

export default Home