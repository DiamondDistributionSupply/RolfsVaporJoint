import React, { Component } from "react"
import axios from "axios"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import { getAdminData } from "../../Ducks/reducer"
import AddProductModal from "../../ReusableComponents/AddProductModal/AddProductModal"
import SiteBanner from "../../ReusableComponents/SiteBanner/SiteBanner"
import "./AdminHome.scss"

class AdminHome extends Component {
    constructor() {
        super()

        this.state = {
            show: false,
            backgroundImg: {id: 1, img: ""}
        }
    }

    async componentDidMount() {
        // Make sure authorized admin is logged in
        try {
            let adminRes = await axios.get("/api/admin/admin-data")
            this.props.getAdminData(adminRes.data)
        }
        catch(err) {
            if (err.response.status === 403) {
                alert("unauthorized")
                this.props.history.push("/admin/login")
            }
        }

        // After checking cred grab needed assets
        let backgroundRes = await axios.get("/api/admin/get/background")
        this.setState({
            backgroundImg: backgroundRes.data[0]
        })
    }

    workInProgress = () => {
        alert("Work In Progress")
    }

    toggleShow = () => {
        this.setState({
            show: !this.state.show
        })
    }

    render() {
        const backgroundStyle = {
            backgroundImage: `url(${this.state.backgroundImg.img})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }

        return (
            <div className="admin_home" style={backgroundStyle}>
                <SiteBanner />
                <div className="admin_home_button_containers">
                    <div className="admin_home_top">
                        <Link to="/admin/edit/main">
                            <button className="admin_home_btn">Edit Main Info</button>
                        </Link>
                        {/* <Link> */}
                            <button className="admin_home_btn" onClick={this.workInProgress}>View Products</button>
                        {/* </Link> */}
                    </div>
                    <div className="admin_home_bottom">
                        <button className="admin_home_btn" onClick={this.toggleShow}>Add a Product</button>
                    </div>
                </div>
                <AddProductModal show={this.state.show} toggleShow={this.toggleShow} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        admin: state.admin
    }
}

const actionOutputs = {
    getAdminData: getAdminData
}

const connected = connect(mapStateToProps, actionOutputs)

export default connected(AdminHome)