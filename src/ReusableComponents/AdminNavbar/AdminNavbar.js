import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"

import AddProductModal from "../AddProductModal/AddProductModal"
import "./AdminNavbar.scss"

class AdminNavbar extends Component {
    constructor() {
        super()

        this.state = {
            show: false
        }
    }

    comingSoon = () => {
        alert("Coming Soon")
    }

    toggleShow = () => {
        this.setState({
            show: !this.state.show
        })
    }

    render() {
        return (
            <div className="admin_navbar">
                <Link to="/admin/home"><button className="admin_navbar_btn">Home</button></Link>
                <Link to="/admin/edit/main"><button className="admin_navbar_btn">Edit Home Page</button></Link>
                <button className="admin_navbar_btn" onClick={this.comingSoon}>View Products</button>
                <button className="admin_navbar_btn" onClick={this.toggleShow}>Add a product</button>
                <AddProductModal show={this.state.show} toggleShow={this.toggleShow} />
            </div>
        )
    }
}

export default withRouter(AdminNavbar)