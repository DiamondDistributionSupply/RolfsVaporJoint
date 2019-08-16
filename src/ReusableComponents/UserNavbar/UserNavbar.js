import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"

import "./UserNavbar.scss"

class UserNavbar extends Component {
    constructor() {
        super()

        this.state = {
            productsListStyle: { display: "none" },
            locationsListStyle: { display: "none" },
            contactListStyle: { display: "none" },
            productsJuiceStyle: { display: "none" },
            productsHardwareStyle: { display: "none" }
        }
    }

    onProductEnter = () => {
        this.setState({
            productsListStyle: {display: "block"}
        })
    }

    onProductLeave = () => {
        this.setState({
            productsListStyle: { display: "none" }
        })
    }

    onLocationEnter = () => {
        this.setState({
            locationsListStyle: {display: "block"}
        })
    }

    onLocationLeave = () => {
        this.setState({
            locationsListStyle: { display: "none" }
        })
    }

    onContactEnter = () => {
        this.setState({
            contactListStyle: { display: "block" }
        })
    }

    onContactLeave = () => {
        this.setState({
            contactListStyle: { display: "none" }
        })
    }

    onJuiceEnter = () => {
        this.setState({
            productsJuiceStyle: { display: "flex" }
        })
    }

    onJuiceLeave = () => {
        this.setState({
            productsJuiceStyle: { display: "none" }
        })
    }

    onHardwareEnter = () => {
        this.setState({
            productsHardwareStyle: { display: "flex" }
        })
    }

    onHardwareLeave = () => {
        this.setState({
            productsHardwareStyle: { display: "none" }
        })
    }

    getDirections = (e, address) => {
        e.stopPropagation()
        let url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
        window.open(url, "_blank")
    }

    render() {
        return (
            <div className="user_navbar">
                <Link className="navbar_fst" to="/">
                    <button className="navbar_btn navbar_hover">Home</button>
                </Link>
                <div className="navbar_fst navbar_btn navbar_hover"
                onMouseEnter={this.onProductEnter}
                onMouseLeave={this.onProductLeave}
                >
                    <p>Products</p>
                    <div className="products_list" style={this.state.productsListStyle}>
                        <div className="navbar_hover"
                        onMouseOver={this.onJuiceEnter}
                        onMouseOut={this.onJuiceLeave}
                        >
                            <p>Juices</p>
                            <div className="products_list_juices" style={this.state.productsJuiceStyle}>
                                <button className="navbar_hover">E-juices</button>
                                <button className="navbar_hover">Salts</button>
                            </div>
                        </div>
                        <div className="navbar_hover"
                        onMouseEnter={this.onHardwareEnter}
                        onMouseLeave={this.onHardwareLeave}
                        >
                            <p>Hardware</p>
                            <div className="products_list_hardware" style={this.state.productsHardwareStyle}>
                                <button className="navbar_hover">tanks</button>
                                <button className="navbar_hover">coils</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="navbar_fst navbar_btn navbar_hover"
                onMouseEnter={this.onLocationEnter}
                onMouseLeave={this.onLocationLeave}
                >
                    <p>Locations</p>
                    <div className="locations_list" style={this.state.locationsListStyle}>
                        <p>Provo: 895 S University Ave, Provo, UT 84601</p>
                        <button onClick={ (e) => this.getDirections(e, "895 S University Ave, Provo, UT 84601")}>Get Directions</button>
                        <p>Orem: 016 Industrial Park Rd, Orem, UT 84057</p>
                        <button onClick={(e) => this.getDirections(e, "016 Industrial Park Rd, Orem, UT 84057")}>Get Directions</button>
                    </div>
                </div>
                <Link className="navbar_fst"  to="/about">
                    <button className="navbar_btn navbar_hover">About</button>
                </Link>
                <div className="navbar_btn navbar_hover"
                onMouseEnter={this.onContactEnter}
                onMouseLeave={this.onContactLeave}
                >
                    <p>Contact</p>
                    <div className="contact_list" style={this.state.contactListStyle}>
                        <p>Provo: (801) 691-1487</p>
                        <p>Orem: (801) 607-5542</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(UserNavbar)