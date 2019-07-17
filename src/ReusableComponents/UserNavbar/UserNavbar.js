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

    render() {
        return (
            <div className="user_navbar">
                <Link className="navbar_fst" to="/">
                    <button className="navbar_btn">Home</button>
                </Link>
                <div className="navbar_fst navbar_btn"
                onMouseEnter={this.onProductEnter}
                onMouseLeave={this.onProductLeave}
                >
                    <p>Products</p>
                    <div className="products_list" style={this.state.productsListStyle}>
                        <p>Coming Soon</p>
                    </div>
                </div>
                <div className="navbar_fst navbar_btn"
                onMouseEnter={this.onLocationEnter}
                onMouseLeave={this.onLocationLeave}
                >
                    <p>Locations</p>
                    <div className="locations_list" style={this.state.locationsListStyle}>
                        <p>List</p>
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
                        <p>List</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(UserNavbar)