import React, { Component } from "react"
import axios from "axios"
import { connect } from "react-redux"

import { getAdminData } from "../../Ducks/reducer"

class AdminHome extends Component {
    constructor() {
        super()

        this.state = {
            images: [],
            description: ""
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
    }

    render() {
        return (
            <div className="admin_home">
                <div className="edit_images_container">
                    
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