import React, { Component } from "react"
import axios from "axios"
import { connect } from "react-redux"

import { getAdminData } from "../../Ducks/reducer"

class AdminHome extends Component {
    constructor() {
        super()

        this.state = {
            imgs: [],
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
                console.log(err)
                alert("unauthorized")
                this.props.history.push("/admin/login")
            }
        }

        try {
            let infoRes = await axios.get("/api/user/home-images")
            this.setState({
                imgs: infoRes.data[0],
                description: infoRes.data[1][0].description
            })
            console.log(infoRes)
        }
        catch(err) {
            console.log(err)
        }
    }

    render() {

        let imgs = this.state.imgs.map((img, i) => {
            return (
                <div key={i}>
                    <img src={img.img} alt="home"/>
                    <button>edit</button>
                </div>
            )
        })

        return (
            <div className="admin_home">
                <div className="edit_home_images_container">
                    {imgs}
                </div>
                <div className="edit_home_description_container">
                    <p>{this.state.description}</p>
                    <button>edit</button>
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