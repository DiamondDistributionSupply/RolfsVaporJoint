import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"

import "./UserNavbar.scss"

class UserNavbar extends Component {
    constructor() {
        super()

        this.state = {
            productsListStyle: { display: "none" },
            locationsListStyle: { display: "none" },
            contactListStyle: { display: "none" }
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
            contactListStyle: {display: "block"}
        })
    }

    onContactLeave = () => {
        this.setState({
            contactListStyle: { display: "none" }
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
                    <button className="navbar_btn">Home</button>
                </Link>
                <div className="navbar_fst navbar_btn"
                onMouseEnter={this.onLocationEnter}
                onMouseLeave={this.onLocationLeave}
                >
                    <p>Locations</p>
                    <div className="locations_list" style={this.state.locationsListStyle}>
                        <div className="locations_list_provo">
                            <p>Provo</p>
                            <p>895 S University Ave, Provo, UT 84601</p>
                            <button onClick={ (e) => this.getDirections(e, "895 S University Ave, Provo, UT 84601")}>Get Directions</button>
                            <p>Hours</p>
                            <p>Monday - Sunday: 11AM - 9PM </p>
                        </div>
                        <div className="locations_list_orem">
                            <p>Orem</p>
                            <p>1016 Industrial Park Rd, Orem, UT 84057</p>
                            <button onClick={(e) => this.getDirections(e, "016 Industrial Park Rd, Orem, UT 84057")}>Get Directions</button>
                            <p>Hours</p>
                            <p>Monday - Saturday: 11AM - 9PM</p>
                            <p>Sunday: Closed</p>
                        </div>
                    </div>
                </div>
                <Link className="navbar_fst"  to="/about">
                    <button className="navbar_btn">About</button>
                </Link>
                <div className="navbar_btn"
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