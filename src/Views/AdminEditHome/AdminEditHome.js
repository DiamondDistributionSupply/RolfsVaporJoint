import React, { Component } from "react"
import axios from "axios"
import { connect } from "react-redux"

import EditHomeImg from "../../ReusableComponents/EditHomeImg/EditHomeImg"
import { getAdminData } from "../../Ducks/reducer"

class AdminEditHome extends Component {
    constructor() {
        super()

        this.state = {
            imgs: [],
            description: "",
            editing: false
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
            let infoRes = await axios.get("/api/user/home-info")
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

    updateEditing = () => {
        this.setState({
            editing: !this.state.editing
        })
    }

    updateInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updateDescription = async () => {
        axios.put("/api/admin/home/description", { description: this.state.description })
        this.updateEditing()
        alert("Description updated")
    }

    render() {
        let imgs = this.state.imgs.length
        ? 
        this.state.imgs.map((img, i) => {
            return (
                <EditHomeImg key={i} img={img.img} id={img.id}/>
            )
        })
        :
        null

        return (
            <div className="admin_home">
                <div className="edit_home_images_container">
                    {imgs}
                </div>
                <div className="edit_home_description_container">
                    {
                    this.state.editing
                    ?
                    <div>
                        <p>Description:</p>
                        <input type="text"
                        placeholder="Enter description"
                        name="description"
                        value={this.state.description}
                        onChange={this.updateInput}/>
                        <button onClick={this.updateDescription}>Save</button>
                        <button onClick={this.updateEditing}>X</button>
                    </div>
                    :
                    <div>
                        <p>Description:</p>
                        <p>{this.state.description}</p>
                        <button onClick={this.updateEditing}>edit</button>
                    </div>
                    }
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

export default connected(AdminEditHome)