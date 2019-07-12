import React, { Component } from "react"
import axios from "axios"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import { getAdminData } from "../../Ducks/reducer"

class AdminHome extends Component {
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
    }

    workInProgress = () => {
        alert("Work In Progress")
    }

    render() {
        return (
            <div className="admin_home">
                <div className="home_button_containers">
                    <Link to="/admin/edit/home"><button>Edit Home Page</button></Link>
                    {/* <Link> */}
                        <button onClick={this.workInProgress}>View Products</button>
                    {/* </Link> */}
                    <button onClick={this.workInProgress}>Add a Product</button>
                </div>
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